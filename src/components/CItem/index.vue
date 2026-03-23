<template>
  <a-card class="card-container animate__animated animate__fadeInUp" hoverable>
    <template #cover>
      <img :src="img" class="img-container" />
    </template>
    <a-card-meta :title="title"></a-card-meta>
  </a-card>
</template>

<script setup>
defineProps({
  title: String,
  img: String,
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

.img-container {
  width: 183px;
}
</style>
