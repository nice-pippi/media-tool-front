<template>
  <div class="tab-container animate__animated animate__fadeInUp">
    <a-tabs
      v-model="activeKey"
      centered
      :tabBarGutter="100"
      @change="handleTabChange"
    >
      <a-tab-pane key="video" tab="视频">
        <div class="tab-content">
          <c-video></c-video>
        </div>
      </a-tab-pane>
      <a-tab-pane key="audio" tab="音频">
        <div class="tab-content">
          <c-audio></c-audio>
        </div>
      </a-tab-pane>
      <a-tab-pane key="image" tab="图片">
        <div class="tab-content">
          <c-image></c-image>
        </div>
      </a-tab-pane>
    </a-tabs>
    <router-view />
  </div>
</template>

<script setup>
import { ref } from 'vue';
const activeKey = ref('video');

// 切换 tab
const handleTabChange = (key) => {
  console.log('key = ', key);
};
</script>

<style lang="less" scoped>
.tab-container {
  width: clamp(300px, 70%, 1200px);
  height: 46px;
  border-radius: 30px;
  margin: 20px auto;
  background-color: white;

  ::v-deep .ant-tabs-nav::before {
    display: none !important;
  }
  ::v-deep .ant-tabs-tab-btn {
    color: #0f2248 !important;
  }
  ::v-deep .ant-tabs-ink-bar {
    background: #f06906;
    width: 40px !important;
    margin-left: -6px;
  }
}

// 内容区域样式 - 宽度比tab容器大
.tab-content {
  width: calc(100% + 200px);
  margin-left: -100px;
}
</style>
