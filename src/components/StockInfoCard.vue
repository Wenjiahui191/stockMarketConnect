<template>
  <div class="stock-info-card" v-if="stock">
    <div class="stock-title">{{ stock.name }}</div>
    <div class="stock-row">
      <span>当前价：</span><span>{{ stock.nowpri }}</span>
    </div>
    <div class="stock-row">
      <span>涨跌幅：</span>
      <span :class="['change', stock.increase >= 0 ? 'positive' : 'negative']">
        {{ stock.increase >= 0 ? '+' : '' }}{{ stock.increase }}
      </span>
      <span>({{ stock.increPer }}%)</span>
    </div>
    <div class="stock-row">
      <span>最高：</span><span>{{ stock.highPri }}</span>
      <span>最低：</span><span>{{ stock.lowpri }}</span>
    </div>
    <div class="stock-row">
      <span>今开：</span><span>{{ stock.openPri }}</span>
      <span>昨收：</span><span>{{ stock.yesPri }}</span>
    </div>
    <div class="stock-row">
      <span>成交量：</span><span>{{ stock.dealNum }}</span>
      <span>成交额：</span><span>{{ stock.dealPri }}</span>
    </div>
    <div class="stock-row">
      <span>时间：</span><span>{{ stock.time }}</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  stock: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.stock-info-card {
  margin-top: 20px;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px #f0f1f2;
}
.stock-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 12px;
}
.stock-row {
  display: flex;
  gap: 16px;
  margin-bottom: 8px;
}
.change.positive {
  color: #67c23a;
}
.change.negative {
  color: #f56c6c;
}
</style>
