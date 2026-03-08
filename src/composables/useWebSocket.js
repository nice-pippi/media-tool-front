import { ref, onUnmounted } from 'vue';

export function useWebSocket(url, options = {}) {
  const {
    autoReconnect = false,
    reconnectInterval = 3000,
    maxReconnectAttempts = 5,
    heartbeatInterval = 30000,
    heartbeatMessage = 'ping',
  } = options;

  const data = ref(null);
  const isConnected = ref(false);
  const error = ref(null);
  const reconnectAttempts = ref(0);

  let socket = null;
  let heartbeatTimer = null;
  let reconnectTimer = null;
  let manualDisconnect = false;

  const clearHeartbeat = () => {
    if (heartbeatTimer) {
      clearInterval(heartbeatTimer);
      heartbeatTimer = null;
    }
  };

  const startHeartbeat = () => {
    if (!heartbeatInterval) return;
    clearHeartbeat();
    heartbeatTimer = setInterval(() => {
      if (socket && socket.readyState === WebSocket.OPEN) {
        send(heartbeatMessage);
      }
    }, heartbeatInterval);
  };

  const attemptReconnect = () => {
    // 使用正确的条件，并检查是否手动断开
    if (!autoReconnect || manualDisconnect) return;
    if (reconnectAttempts.value < maxReconnectAttempts) {
      reconnectTimer = setTimeout(() => {
        reconnectAttempts.value++;
        console.log(
          `Attempting to reconnect... (${reconnectAttempts.value}/${maxReconnectAttempts})`
        );
        connect();
      }, reconnectInterval);
    }
  };

  const connect = () => {
    // 防止重复连接
    if (
      socket &&
      (socket.readyState === WebSocket.OPEN ||
        socket.readyState === WebSocket.CONNECTING)
    ) {
      return;
    }

    // 清除之前的重连定时器
    if (reconnectTimer) {
      clearTimeout(reconnectTimer);
      reconnectTimer = null;
    }

    // 重置手动断开标志
    manualDisconnect = false;

    socket = new WebSocket(url);

    socket.onopen = () => {
      isConnected.value = true;
      error.value = null;
      reconnectAttempts.value = 0;
      console.log('WebSocket connected');
      // 连接成功也清除重连定时器
      if (reconnectTimer) {
        clearTimeout(reconnectTimer);
        reconnectTimer = null;
      }
      startHeartbeat();
    };

    socket.onmessage = (event) => {
      try {
        data.value = JSON.parse(event.data);
      } catch {
        data.value = event.data;
      }
    };

    socket.onerror = (err) => {
      error.value = err;
      console.error('WebSocket error', err);
      if (socket) {
        socket.close();
      }
    };

    socket.onclose = () => {
      isConnected.value = false;
      clearHeartbeat();
      console.log('WebSocket disconnected');

      // 仅当非手动断开时才尝试重连
      if (!manualDisconnect) {
        attemptReconnect();
      }
    };
  };

  const send = (message) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(message);
      return true;
    }
    return false;
  };

  const disconnect = () => {
    manualDisconnect = true; // 标记手动断开
    clearHeartbeat();
    if (reconnectTimer) {
      clearTimeout(reconnectTimer);
      reconnectTimer = null;
    }
    if (socket) {
      socket.close();
    }
  };

  onUnmounted(() => {
    disconnect();
  });

  return {
    data,
    isConnected,
    error,
    reconnectAttempts,
    connect,
    disconnect,
    send,
  };
}
