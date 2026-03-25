<template>
  <a-form :model="formData" ref="formRef">
    <a-form-item
      label="视频URL"
      name="url"
      :rules="[{ required: true, message: '请填写视频URL！' }]"
    >
      <a-input v-model:value="formData.url" />
    </a-form-item>
  </a-form>
</template>

<script setup>
import { reactive, ref, defineExpose } from 'vue';

const formRef = ref();
const formData = reactive({
  url: '',
  taskId: '',
});

// 暴露给父组件的方法
const validate = async () => {
  try {
    // 使用 Ant Design Vue 的表单验证
    await formRef.value?.validate();
    return true;
  } catch (error) {
    console.log('表单验证失败:', error);
    return false;
  }
};

const getData = () => {
  return { ...formData }; // 返回副本，避免外部直接修改
};

const reset = () => {
  formData.url = '';
  formData.taskId = '';
  formRef.value?.clearValidate();
};

defineExpose({
  validate,
  getData,
  reset,
});
</script>
