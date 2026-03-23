<template>
  <a-flex wrap="wrap" gap="small">
    <c-item
      title="下载视频"
      img="download-video.png"
      @click="handleOpen('downloadVideo')"
    >
    </c-item>
  </a-flex>

  <a-modal
    v-model:open="visible"
    @ok="handleOk"
    :title="currentFormConfig.name"
  >
    <component :is="currentFormConfig.component || ''"></component>
  </a-modal>
</template>

<script setup>
import { ref, reactive } from 'vue';

// 模态框显示状态
const visible = ref(false);

// 所有表单配置
const formConfigs = reactive([
  { key: 'downloadVideo', name: '下载视频', component: 'a-input' },
]);

// 当前表单配置
const currentFormConfig = ref({});

// 打开模态框
const handleOpen = (key) => {
  const formConfig = formConfigs.find((item) => item.key === key);
  currentFormConfig.value = formConfig;
  visible.value = true;
};

// 确认按钮回调，提交表单
const handleOk = async () => {
  visible.value = false;
};
</script>

<style lang="less" scoped></style>
