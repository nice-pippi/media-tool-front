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
      ref="form"
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
};

// 表单配置
const formConfigs = [
  { key: 'downloadVideo', name: '下载视频', img: 'download-video.png' },
];

// 当前选中的配置
const currentConfig = ref(null);

// 子组件 ref
const form = ref(null);

// 处理打开弹窗事件
const handleOpen = (key) => {
  currentConfig.value = formConfigs.find((item) => item.key === key);
  currentKey.value = key;
  visible.value = true;
};

// 提交表单
const handleOk = async () => {
  if (form.value) {
    // 1. 先验证表单
    const isValid = await form.value.validate();

    if (isValid) {
      // 2. 验证通过后获取数据
      const formData = form.value.getData();
      console.log('表单数据:', formData);

      // TODO: 调用接口提交数据
      // await api.submit(formData);

      // 3. 提交成功后关闭弹窗并重置表单
      visible.value = false;
      form.value.reset();
    } else {
      console.log('表单验证失败');
    }
  } else {
    visible.value = false;
  }
};
</script>

<style lang="less" scoped></style>
