import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

/**
 * 后端标准返回格式
 */
interface ResponseData<T> {
  code: number;
  msg: string;
  data: T;
}

// 创建 Axios 实例
const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "",
  timeout: 10000,
});

// 请求拦截器：可附带 token
service.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 响应拦截器：统一处理 code !== 0 的错误
service.interceptors.response.use(
  (response: AxiosResponse<ResponseData<any>>) => {
    const res = response.data;
    if (res.code !== 0) {
      return Promise.reject(new Error(res.msg || "Error"));
    }
    return res.data;
  },
  (error) => Promise.reject(error)
);

/**
 * 通用请求方法
 * @param config Axios 请求配置
 */
export default function request<T = any>(
  config: AxiosRequestConfig
): Promise<T> {
  return service
    .request<ResponseData<T>>(config)
    .then((res) => res as unknown as T);
}
