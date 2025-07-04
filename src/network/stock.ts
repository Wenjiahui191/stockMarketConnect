import request from './request'

export interface Stock {
  id: string
  name: string
  price: number
  change: number
}

/** 获取股票列表 */
export function fetchStocks(): Promise<Stock[]> {
  return request<Stock[]>({
    method: 'GET',
    url: '/api/stocks',
  })
}

/** 获取单只股票详情 */
export function fetchStockDetail(id: string): Promise<Stock> {
  return request<Stock>({
    method: 'GET',
    url: `/api/stocks/${id}`,
  })
}
