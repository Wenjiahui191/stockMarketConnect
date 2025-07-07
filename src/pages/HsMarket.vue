<template>
  <div v-loading="isLoading" class="hs-market">
    <!-- 错误状态 -->
    <div v-if="error" class="error-container">
      <p>加载失败：{{ error?.message || '未知错误' }}</p>
      <button @click="refetch">重试</button>
    </div>

    <!-- 数据展示 -->
    <div v-else-if="data && !isLoading" class="stocks-container">
      <el-radio-group v-model="marketType" @change="() => stockPageNum = 1">
        <el-radio-button label="上证指数" :value="0"></el-radio-button>
        <el-radio-button label="深证成指" :value="1"></el-radio-button>
      </el-radio-group>
      <StockInfoCard v-if="data" :stock="data" />
      <div v-else class="no-data">
        暂无数据
      </div>
    </div>

    <!-- 此处展示沪深股票列表 使用el-table -->
    <div  class="stocks-table"  v-loading="isLoadingStocks">
      <el-table v-if="stockList && stockList.length > 0" :data="stockList" style="width: 100%;height: 100%;" >
        <el-table-column prop="symbol" label="代码" />
        <el-table-column prop="name" label="名称" />
        <el-table-column prop="trade" label="最新价" />
        <el-table-column prop="pricechange" label="涨跌额" sortable />
        <el-table-column prop="changepercent" label="涨跌幅(%)" sortable/>
        <el-table-column prop="buy" label="买入" />
        <el-table-column prop="sell" label="卖出" />
        <el-table-column prop="settlement" label="昨收" />
        <el-table-column prop="open" label="今开" />
        <el-table-column prop="high" label="最高" />
        <el-table-column prop="low" label="最低" />
        <el-table-column prop="volume" label="成交量" sortable/>
        <el-table-column prop="amount" label="成交额" sortable/>
        <el-table-column prop="ticktime" label="时间" />
        <el-table-column prop="per" label="市盈率" v-if="stockList.length && stockList[0].per !== undefined" />
        <el-table-column prop="pb" label="市净率" v-if="stockList.length && stockList[0].pb !== undefined" />
        <el-table-column prop="mktcap" label="总市值(万)" v-if="stockList.length && stockList[0].mktcap !== undefined" />
        <el-table-column prop="nmc" label="流通值(万)" v-if="stockList.length && stockList[0].nmc !== undefined" />
        <el-table-column prop="turnoverratio" label="换手率"
          v-if="stockList.length && stockList[0].turnoverratio !== undefined" />
      </el-table>
      <div class="stocks-table-footer" v-if="stockList && stockList.length > 0">
        <span class="total-count">共 {{ total }} 条</span>
        <el-pagination layout="prev, pager, next" size="small" background :total="total" :current-page="stockPageNum"
          @current-change="page => stockPageNum = page" />

      </div>
    </div>
  </div>


</template>

<script setup>

import { fetchStocks, fetchShStocks, fetchSzStocks } from '@/network/stock'
import { ref, watch, computed } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import StockInfoCard from '@/components/StockInfoCard.vue'

const marketType = ref(0) // 0: 沪市, 1: 深市
const stockPageNum = ref(1) // 当前页码

//获取沪深概览数据
const { data, isLoading, error, refetch } = useQuery({
  queryKey: [marketType],
  queryFn: () => fetchStocks({ type: marketType.value }),
  refetchOnWindowFocus: false,
  retry: 0, // 重试次数
  refetchInterval: 10000, // 每10秒重新请求一次
})

// 根据市场类型获取对应的股票数据列表请求的方法
const fetchStockList = () => {
  if (marketType.value === 0) {
    return fetchShStocks({ page: stockPageNum.value })
  } else {
    return fetchSzStocks({ page: stockPageNum.value })
  }
}

// 获取沪深股票列表信息
const { data: stockListData, isLoading: isLoadingStocks, error: stockError } = useQuery({
  queryKey: ['shStocks', stockPageNum, marketType],
  queryFn: () => fetchStockList(),
  refetchOnWindowFocus: false,
  retry: 0,
})

const stockListPage = computed(() => stockListData.value || {})
const stockList = computed(() => stockListPage.value.data || [])
//转换为数字类型
const total = computed(() => Number(stockListPage.value.totalCount) || 10)


watch(stockPageNum, (newVal,oldVal) => {
  console.log(`Page changed from ${oldVal} to ${newVal}`)
})
</script>

<style scoped lang="less">
.hs-market {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.error-container {
  text-align: center;
  padding: 20px;
  color: #f56c6c;

  button {
    margin-top: 10px;
    padding: 8px 16px;
    background: #409eff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
}

.stocks-container {
  padding: 20px;
}

// 指数卡片样式
.stock-info-card {
  margin-top: 20px;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px #f0f1f2;

  .stock-title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 12px;
  }

  .stock-row {
    display: flex;
    gap: 16px;
    margin-bottom: 8px;

    &:last-child {
      border-bottom: none;
    }
  }
}

.change {
  &.positive {
    color: #67c23a;
  }

  &.negative {
    color: #f56c6c;
  }
}

.no-data {
  text-align: center;
  padding: 40px;
  color: #909399;
}

.stocks-table {
  flex: 1;
  margin-top: 20px;
  padding-bottom: 52px;
  overflow: hidden;

  .stocks-table-footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0 30px;
    margin-top: 20px;
    .total-count {
      margin-right: 20px;
      color: #909399;
    }
  }
}
</style>
