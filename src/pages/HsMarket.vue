<template>
  <div v-loading="loading"></div>
</template>

<script setup>
// 首页内容，自动触发请求并监听 loading
import { fetchStocks } from '@/network/stock'
import { onMounted, watch } from 'vue'

onMounted(async () => {
  const data = await fetchStocks({ type: 0 })
  console.log('沪深指数数据:', data)
})
</script>

<style scoped></style>
