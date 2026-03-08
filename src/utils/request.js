import axios from 'axios';
import { message } from 'ant-design-vue';
import { config } from '@/config/api';

const service = axios.create({
  baseURL: config.apiUrl,
  timeout: 15000,
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (res.code && res.code !== 200) {
      message.error(res.message || '请求失败');
      return Promise.reject(new Error(res.message || '请求失败'));
    }
    return res;
  },
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          message.error('未授权，请重新登录');
          break;
        case 403:
          message.error('拒绝访问');
          break;
        case 404:
          message.error('请求地址不存在');
          break;
        case 500:
          message.error('服务器错误');
          break;
        default:
          message.error(`连接错误：${error.response.status}`);
      }
    } else if (error.request) {
      message.error('网络连接失败');
    } else {
      message.error('请求配置错误');
    }
    return Promise.reject(error);
  }
);

export function request(config) {
  return service(config);
}

export default service;
