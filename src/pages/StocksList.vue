<template>
  <div>
    <h2>股票列表</h2>
    <ul>
      <li v-for="stock in stocksStore.list" :key="stock.id">
        <router-link :to="`/stocks/${stock.id}`">{{ stock.name }} ({{ stock.price }})</router-link>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useStocksStore } from '@/stores/stocks'
const stocksStore = useStocksStore()

onMounted(() => {})
</script>

<style scoped>
ul {
  list-style: none;
  padding: 0;
}
li {
  margin: 0.5rem 0;
}
</style>
