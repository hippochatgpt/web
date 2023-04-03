import axios from 'axios'
import { Message } from 'element-ui'
import login from '../components/login'
import store from '@/store'
class axiosInstance {
  constructor(config) {
    this.instance = axios.create(config)
    this.instance.interceptors.request.use(
      config => {
        const token = sessionStorage.getItem('token')
        config.headers['Authorization'] = token
        return config
      },
      error => {
        return Promise.reject(error)
      }
    )

    this.instance.interceptors.response.use(
      response => {
        const data = response.data
        if (data.code === 200) {
          return data.data
        } else if (data.code === 401) {
          Message.warning('登录过期了')
          sessionStorage.removeItem('token')
          store.commit('updateToken', '')
          login()
          return Promise.reject(data.msg)
        } else {
          Message.warning(data.msg)
          return Promise.reject(data.msg)
        }
      },
      error => {
        Message.warning('请求错误！')
        return Promise.reject(error.data)
      }
    )
  }
  getInstance() {
    return this.instance
  }
}

export const http = new axiosInstance({
  timeout: 1000 * 90,
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  },
  baseURL: process.env.VUE_APP_BASE_URL
}).getInstance()
