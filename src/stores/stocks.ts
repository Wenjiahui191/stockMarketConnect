import { defineStore } from 'pinia'
import { fetchStocks, fetchStockDetail, Stock } from '@/network/stock'
import { useRequest } from '@/hooks/useRequest'

export const useStocksStore = defineStore('stocks', {
  state: () => ({
    list: [] as Stock[],
    current: null as Stock | null,
  }),
  actions: {
    setStocks(stocks: Stock[]) {
      this.list = stocks
    },
  },
})
