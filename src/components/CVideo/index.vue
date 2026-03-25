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
  </a-modal>
</template>

<script setup>
import { ref, defineAsyncComponent, markRaw } from 'vue';

// 弹窗显示状态
const visible = ref(false);

// 当前选中的表单 key
const currentKey = ref('');

// 当前选中的表单配置
const currentConfig = ref(null);

// 动态表单组件的 ref
const form = ref(null);

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

// 打开表单弹窗
const handleOpen = (key) => {
  currentConfig.value = formConfigs.find((item) => item.key === key);
  currentKey.value = key;
  visible.value = true;
};

// 提交表单
const handleOk = async () => {
  if (form.value) {
    const isValid = await form.value.validate();
    if (isValid) {
      const formData = form.value.getData();
      console.log('表单数据:', formData);
      visible.value = false;
      form.value.reset();
    }
  } else {
    visible.value = false;
  }
};
</script>

<style lang="less" scoped></style>
