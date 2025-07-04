<template>
  <h1 v-loading="loading">欢迎使用股票信息平台 {{ loading }}</h1>
</template>

<script setup lang="ts">
// 首页内容，自动触发请求并监听 loading

import { useStocksStore } from '@/stores/stocks'
import { useRequest } from '@/hooks/useRequest'
import { fetchStocks } from '@/network/stock'

const stocksStore = useStocksStore()
const { loading } = useRequest(fetchStocks, {
  defaultParams: [],
  onSuccess: data => stocksStore.setStocks(data),
})
</script>

<style scoped>
h1 {
  text-align: center;
  margin-top: 2rem;
}
</style>
