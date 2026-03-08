// 开发环境 - 本地调试用
const DEV_CONFIG = {
  apiUrl: 'http://localhost:8888/media-tool', // 本地后端地址
  name: '开发环境',
};

// 生产环境 - 线上用
const PROD_CONFIG = {
  apiUrl: '/api', // 生产环境通过nginx转发
  name: '生产环境',
};

// 根据环境变量自动选择
const isProd = process.env.NODE_ENV === 'production';
export const config = isProd ? PROD_CONFIG : DEV_CONFIG;
