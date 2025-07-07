<template>
  <div class="nav">
    <div class="header-container">
      <div class="nav-left">
        <img src="@/assets/logo.svg" alt="通亿股市通" class="logo" />
        <el-input
          v-model="keyword"
          style="width: 240px"
          size="large"
          placeholder="请输入股票代码或名称"
          :suffix-icon="Search"
        />
      </div>
      <div class="nav-right">
        <UserInfo />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import UserInfo from './UserInfo.vue'
const keyword = ref('')
</script>

<style scoped lang="less">
.nav {
  flex-shrink: 0;
  width: 100%;
  height: 69px;
  background-color: #fff;
  border-bottom: 1px solid #eaeaea;

  .header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    padding: 0 20px;

    .nav-left {
      display: flex;
      align-items: center;

      .logo {
        width: 450px;
        height: auto;
        margin-right: 10px;
      }

      .el-input {
        width: 240px;
      }
    }

    .nav-right {
      font-size: 16px;
      color: #333;
    }
  }
}
</style>
