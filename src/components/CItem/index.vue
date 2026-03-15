<template>
  <a-card class="card-container" hoverable>
    <template #cover>
      <slot></slot>
    </template>
    <a-card-meta :title="title"></a-card-meta>
  </a-card>
</template>

<script setup>
defineProps({
  title: String,
});
</script>

<style lang="less" scoped>
.card-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px;
}

::v-deep .ant-cart-body {
  padding: 12px;
}
</style>
