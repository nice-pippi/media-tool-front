import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// ant
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';

// animate
import 'animate.css';

// 自定义全局组件
import GlobalComponents from './components';

createApp(App).use(router).use(Antd).use(GlobalComponents).mount('#app');
