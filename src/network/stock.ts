import request from './request'

export interface Stock {
  id: string
  name: string
  price: number
  change: number
}

/** 获取股票列表 */
export function fetchStocks(): Promise<Stock[]> {
  //延迟2s返回
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        { id: '1', name: '股票A', price: 100, change: 1.5 },
        { id: '2', name: '股票B', price: 200, change: -0.5 },
        { id: '3', name: '股票C', price: 300, change: 2.0 },
      ])
    }, 2000)
  })
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
