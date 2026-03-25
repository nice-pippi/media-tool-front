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

// 初始化 WebSocket
const {
  data, // 接收到的消息
  isConnected, // 连接状态
  error, // 错误信息
  connect, // 连接方法
  disconnect, // 断开方法
  send, // 发送方法
} = useWebSocket('ws://localhost:8888/media-tool/ws/123', {
  autoReconnect: true, // 自动重连
  reconnectInterval: 3000, // 重连间隔
  maxReconnectAttempts: 5, // 最大重连次数
});

// 发送消息
const sendMessage = () => {
  send('Hello Server!');
};
</script>
