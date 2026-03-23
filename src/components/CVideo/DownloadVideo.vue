<template>
  <a-form :model="formData">
    <a-form-item
      label="视频URL"
      name="videoURL"
      :rules="[{ required: true, message: '请填写视频URL！' }]"
    >
      <a-input v-model:value="formData.url" />
    </a-form-item>
  </a-form>
</template>
<script setup>
import { reactive } from 'vue';
const formData = reactive({
  url: '',
  taskId: '',
});
</script>
