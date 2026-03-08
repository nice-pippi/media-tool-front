// 从环境变量读取配置
export const config = {
  apiUrl: process.env.VUE_APP_API_URL,
  name: process.env.VUE_APP_ENV_NAME,
};

console.log('当前环境配置：', config);