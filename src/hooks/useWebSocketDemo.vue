<template>
  <div>
    <button @click="connect" :disabled="isConnected">连接</button>
    <button @click="disconnect" :disabled="!isConnected">断开</button>
    <button @click="sendMessage" :disabled="!isConnected">发送消息</button>

    <p>状态: {{ isConnected ? '已连接' : '未连接' }}</p>
    <p>收到消息: {{ data }}</p>
    <p v-if="error">错误: {{ error }}</p>
  </div>
</template>

<script setup>
import { useWebSocket } from '@/hooks/useWebSocket';

// 1. 初始化，指定URL和配置
const {
  data, // 接收到的消息（响应式）
  isConnected, // 连接状态（响应式）
  error, // 错误信息（响应式）
  connect, // 连接方法
  disconnect, // 断开方法
  send, // 发送方法
} = useWebSocket('ws://localhost:8888/ws/media-tool/123', {
  autoReconnect: true, // 自动重连
  reconnectInterval: 3000, // 3秒重连一次
  maxReconnectAttempts: 5, // 最多重连5次
  heartbeatInterval: 30000, // 30秒心跳
  heartbeatMessage: 'ping', // 心跳消息
});

// 2. 发送消息的方法
const sendMessage = () => {
  const success = send('Hello Server!');
  if (success) {
    console.log('发送成功');
  } else {
    console.log('发送失败，未连接');
  }
};

// 3. 需要时手动连接（用户点击按钮触发）
const handleConnect = () => {
  connect();
};

// 4. 手动断开
const handleDisconnect = () => {
  disconnect();
};
</script>
