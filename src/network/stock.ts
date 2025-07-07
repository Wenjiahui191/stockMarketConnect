import request from './request'

export interface StockIndexData {
  /** 成交量(手) */
  dealNum: string
  /** 成交额 */
  dealPri: string
  /** 最高 */
  highPri: string
  /** 涨跌百分比 */
  increPer: string
  /** 涨跌幅 */
  increase: string
  /** 最低 */
  lowpri: string
  /** 名称 */
  name: string
  /** 当前价格 */
  nowpri: string
  /** 今开 */
  openPri: string
  /** 时间 */
  time: string
  /** 昨收 */
  yesPri: string
}

/** 通用的股票列表接口 */
export interface CommonStockIndexData {
 totalCount: string /*总条数*/
  page: string /*当前页*/
  num: string /*显示条数*/
}

/** 沪深列表数据 */
export interface HsStockIndexDataResponse  extends CommonStockIndexData{
  data: Stock[]
}



export interface Stock {
  /** 代码 */
  symbol: string
  /** 名称 */
  name: string
  /** 最新价 */
  trade: string
  /** 涨跌额 */
  pricechange: string
  /** 涨跌幅 */
  changepercent: string
  /** 买入 */
  buy: string
  /** 卖出 */
  sell: string
  /** 昨收 */
  settlement: string
  /** 今开 */
  open: string
  /** 最高 */
  high: string
  /** 最低 */
  low: string
  /** 成交量 */
  volume: number
  /** 成交额 */
  amount: number
  /** 简码 */
  code: string
  /** 时间 */
  ticktime: string
  /** 未说明 */
  per?: number
  /** 市净率 */
  pb?: number
  /** 总市值(万) */
  mktcap?: number
  /** 流通值(万) */
  nmc?: number
  /** 换手率 */
  turnoverratio?: number
}

/** 获取沪深股票 */
export function fetchStocks(params: any): Promise<StockIndexData> {
  return request<StockIndexData>({
    method: 'GET',
    url: '/hs',
    params: {
      key: import.meta.env.VITE_APIKEY, // .env 里的 apikey
      ...params, // 其他查询参数
    },
  })
}

/** 获取上证个股股票列表 */
export function fetchShStocks(params: any): Promise<HsStockIndexDataResponse> {
  return request<HsStockIndexDataResponse>({
    method: 'GET',
    url: '/shall',
    params: {
      key: import.meta.env.VITE_APIKEY, // .env 里的 apikey
      ...params, // 其他查询参数
    },
  })
}


/** 获取深证个股股票列表 */
export function fetchSzStocks(params: any): Promise<HsStockIndexDataResponse> {
  return request<HsStockIndexDataResponse>({
    method: 'GET',
    url: '/szall',
    params: {
      key: import.meta.env.VITE_APIKEY, // .env 里的 apikey
      ...params, // 其他查询参数
    },
  })
}
