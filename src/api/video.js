import { request } from '@/utils/request';

const baseURL = '/video';

/**
 * 下载视频
 * @param {*} params
 * @returns
 */
export function download(params) {
  return request({
    url: `${baseURL}/download`,
    method: 'get',
    params,
  });
}
