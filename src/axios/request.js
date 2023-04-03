import { http } from './axios'
export const get = (url, params, config = {}) => {
  return http({
    method: 'get',
    url,
    params,
    ...config
  })
}
export const post = (url, data, config = {}) => {
  return http({
    method: 'post',
    url,
    data,
    ...config
  })
}
