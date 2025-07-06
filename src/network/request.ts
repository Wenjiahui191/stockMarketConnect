import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'

/**
 * 后端标准返回格式
 */
interface ResponseData<T> {
  error_code: number
  reason: string
  // reason 字段用于兼容旧版 API 的错误信息
  result: T
}

// 创建 Axios 实例
const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '',
  timeout: 10000,
})

// 请求拦截器：可附带 token
service.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  error => Promise.reject(error)
)

// 响应拦截器：统一处理 code !== 0 的错误
service.interceptors.response.use(
  (response: AxiosResponse<ResponseData<any>>) => {
    const res = response.data
    if (res.error_code !== 0) {
      return Promise.reject(res.reason || 'Error')
    }
    return res.result
  },
  error => Promise.reject(error)
)

/**
 * 通用请求方法
 * @param config Axios 请求配置
 */
export default function request<T = any>(config: AxiosRequestConfig): Promise<T> {
  return service
    .request<ResponseData<T>>(config)
    .then(res => res as unknown as T)
    .catch(error => {
      ElMessage.error(error.message || '请求失败')
      return Promise.reject(error)
    })
}
