<template>
  <div class="home-container">
    <Header />

    <div class="content">
      <h1>全球股市</h1>
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane
          v-for="item in stockMarkets"
          :key="item.code"
          :label="item.name"
          :name="item.name"
        >
        </el-tab-pane>
      </el-tabs>
      <div class="tab-content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/Header.vue'
import { ref, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const stockMarkets = [
  { name: '沪深', code: 'hs' },
  { name: '港股', code: 'hk' },
  { name: '美股', code: 'us' },
  { name: '全球指数', code: 'global' },
]

const activeName = ref('沪深') // 默认选中沪深市场

// 路由和 tab 同步
const route = router.currentRoute
const routeNameToTab = new Map([
  ['HsMarket', '沪深'],
  ['HkMarket', '港股'],
  ['UsMarket', '美股'],
  ['GlobalMarket', '全球指数'],
])
onMounted(() => {
  activeName.value = '沪深'
})

const handleClick = (tab: (typeof stockMarkets)[0], event: MouseEvent) => {
  console.log('Tab clicked:', tab, event)
  // 可以在这里处理 tab 切换逻辑
  activeName.value = tab.name
}

watch(
  activeName,
  newVal => {
    router.push({
      name:
        newVal === '沪深'
          ? 'HsMarket'
          : newVal === '港股'
          ? 'HkMarket'
          : newVal === '美股'
          ? 'UsMarket'
          : 'GlobalMarket',
    })
  },
  { immediate: true }
)
</script>

<style scoped lang="less">
.home-container {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px 30px;
    background-color: #fff;

    .tab-content {
      flex: auto;
    }
  }
}
</style>
