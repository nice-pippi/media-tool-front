<template>
  <a-flex wrap="wrap" gap="small">
    <c-item
      v-for="item in formConfigs"
      :key="item.key"
      :title="item.name"
      :img="item.img"
      @click="handleOpen(item.key)"
    />
  </a-flex>

  <a-modal
    v-model:open="visible"
    @ok="handleOk"
    :title="currentConfig?.name"
    destroy-on-close
  >
    <component
      :is="currentConfig?.component"
      v-if="currentConfig?.component"
      ref="form"
    />

    <a-progress
      :stroke-color="{
        '0%': '#108ee9',
        '100%': '#87d068',
      }"
      v-if="progressShow"
      :percent="percent"
    />
  </a-modal>
</template>

<script setup>
import { ref, defineAsyncComponent, markRaw } from 'vue';
import { useWebSocket } from '@/hooks/useWebSocket';
import { createDownloadTask } from '@/api/video';

// WebSocket 基础地址
const baseWebSocketURL = 'ws://localhost:8888/media-tool/ws/';

// 弹窗显示状态
const visible = ref(false);
// 当前选中的表单配置
const currentConfig = ref(null);
// 表单组件实例
const form = ref(null);
// 进度百分比
const percent = ref(0);
// 是否显示进度条
const progressShow = ref(false);

// WebSocket 实例
let wsInstance = null;

// 表单配置列表
const formConfigs = [
  {
    key: 'downloadVideo',
    name: '下载视频',
    img: 'download-video.png',
    component: markRaw(
      defineAsyncComponent(() => import('./DownloadVideo.vue'))
    ),
  },
];

/**
 * 打开表单弹窗
 * @param {string} key - 表单标识
 */
const handleOpen = (key) => {
  // 获取当前表单配置
  currentConfig.value = formConfigs.find((item) => item.key === key);
  // 打开弹窗
  visible.value = true;
  // 重置进度
  percent.value = 0;
  progressShow.value = false;

  // 清理旧的 WebSocket 连接
  if (wsInstance) {
    wsInstance.disconnect();
    wsInstance = null;
  }
};

/**
 * 提交表单
 */
const handleOk = async () => {
  // 表单不存在则直接关闭
  if (!form.value) return;

  // 表单验证
  const isValid = await form.value.validate();
  if (!isValid) return;

  // 生成任务ID
  const taskId = Math.random();
  // 获取表单数据
  const formData = form.value.getData();
  // 创建下载任务
  await createDownloadTask({ ...formData, taskId });

  // 创建 WebSocket 连接
  wsInstance = useWebSocket(baseWebSocketURL + taskId, {
    // 接收进度消息
    onMessage: (progressData) => {
      // 更新进度条
      percent.value = progressData;

      // 下载完成，延迟关闭弹窗
      if (progressData >= 100) {
        setTimeout(() => {
          visible.value = false;
        }, 1000);
      }
    },
    // 错误处理
    onError: (err) => {
      console.error('WebSocket错误:', err);
    },
    // 开启自动重连
    autoReconnect: true,
  });

  // 建立连接
  wsInstance.connect();
  // 显示进度条
  progressShow.value = true;
  // 重置表单
  form.value.reset();
};
</script>

<style lang="less" scoped></style>
