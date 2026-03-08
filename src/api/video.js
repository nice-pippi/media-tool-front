import { request } from '@/utils/request';

const baseURL = '/video';

// 创建视频下载任务
export function createDownloadTask(data) {
  return request({
    url: `${baseURL}/create-download-task`,
    method: 'post',
    data,
  });
}
