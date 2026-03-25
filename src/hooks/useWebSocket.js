// hooks/useWebSocket.js
import { ref, onUnmounted } from 'vue';

export function useWebSocket(url, options = {}) {
  const {
    onMessage = null, // 消息回调
    onOpen = null, // 连接成功回调
    onError = null, // 错误回调
    onClose = null, // 关闭回调
    autoReconnect = false,
    reconnectInterval = 3000,
    maxReconnectAttempts = 5,
  } = options;

  const data = ref(null);
  const isConnected = ref(false);
  const error = ref(null);

  let socket = null;
  let reconnectTimer = null;
  let reconnectAttempts = 0;
  let manualDisconnect = false;

  const connect = () => {
    // 防止重复连接
    if (
      socket &&
      (socket.readyState === WebSocket.OPEN ||
        socket.readyState === WebSocket.CONNECTING)
    ) {
      return;
    }

    // 清除重连定时器
    if (reconnectTimer) {
      clearTimeout(reconnectTimer);
      reconnectTimer = null;
    }

    manualDisconnect = false;
    socket = new WebSocket(url);

    socket.onopen = () => {
      isConnected.value = true;
      error.value = null;
      reconnectAttempts = 0;
      onOpen && onOpen();
    };

    socket.onmessage = (event) => {
      try {
        const parsedData = JSON.parse(event.data);
        data.value = parsedData;
        // 如果有回调函数，直接调用并传入数据
        onMessage && onMessage(parsedData);
      } catch {
        data.value = event.data;
        onMessage && onMessage(event.data);
      }
    };

    socket.onerror = (err) => {
      error.value = err;
      onError && onError(err);
    };

    socket.onclose = () => {
      isConnected.value = false;
      onClose && onClose();

      // 自动重连
      if (
        autoReconnect &&
        !manualDisconnect &&
        reconnectAttempts < maxReconnectAttempts
      ) {
        reconnectTimer = setTimeout(() => {
          reconnectAttempts++;
          connect();
        }, reconnectInterval);
      }
    };
  };

  const send = (message) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(
        typeof message === 'string' ? message : JSON.stringify(message)
      );
      return true;
    }
    return false;
  };

  const disconnect = () => {
    manualDisconnect = true;
    if (reconnectTimer) {
      clearTimeout(reconnectTimer);
      reconnectTimer = null;
    }
    if (socket) {
      socket.close();
      socket = null;
    }
  };

  onUnmounted(() => {
    disconnect();
  });

  return {
    data, // 响应式数据
    isConnected, // 连接状态
    error, // 错误信息
    connect, // 连接方法
    disconnect, // 断开方法
    send, // 发送消息
  };
}
