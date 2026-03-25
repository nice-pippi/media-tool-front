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
import { useForm } from '@/hooks/useForm';

// 使用 Hook，传入初始数据
const { formRef, formData, validate, getData, reset } = useForm({
  url: '',
});

// 暴露给父组件
defineExpose({
  validate,
  getData,
  reset,
});
</script>
