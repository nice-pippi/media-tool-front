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
      :is="componentMap[currentKey]"
      v-if="currentKey && componentMap[currentKey]"
    />
  </a-modal>
</template>

<script setup>
import { ref, defineAsyncComponent } from 'vue';

const visible = ref(false);
const currentKey = ref('');

// 组件映射表
const componentMap = {
  downloadVideo: defineAsyncComponent(() => import('./DownloadVideo.vue')),
  // 未来继续扩展...
};

// 表单配置
const formConfigs = [
  { key: 'downloadVideo', name: '下载视频', img: 'download-video.png' },
];

// 当前选中的配置
const currentConfig = ref(null);

const handleOpen = (key) => {
  currentConfig.value = formConfigs.find((item) => item.key === key);
  currentKey.value = key;
  visible.value = true;
};

const handleOk = async () => {
  visible.value = false;
};
</script>

<style lang="less" scoped></style>
