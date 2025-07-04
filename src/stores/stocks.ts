import { defineStore } from "pinia";
import { fetchStocks, fetchStockDetail, Stock } from "@/network/stock";

export const useStocksStore = defineStore("stocks", {
  state: () => ({
    list: [] as Stock[],
    current: null as Stock | null,
  }),
  actions: {
    async loadStocks() {
      this.list = await fetchStocks();
    },
    async loadStockDetail(id: string) {
      this.current = await fetchStockDetail(id);
    },
  },
});
