import request from './request'

export interface Stock {
  id: string
  name: string
  price: number
  change: number
}

/** 获取沪深股票 */
export function fetchStocks(params: any): Promise<Stock[]> {
  return request<Stock[]>({
    method: 'GET',
    url: '/hs',
    params: {
      key: import.meta.env.VITE_APIKEY, // .env 里的 apikey
      ...params, // 其他查询参数
    },
  })
}

/** 获取港股股票 */
export function fetchHkStocks(params: any): Promise<Stock[]> {
  return request<Stock[]>({
    method: 'GET',
    url: '/hk',
    params: {
      key: import.meta.env.VITE_APIKEY,
      ...params,
    },
  })
}
