<template>
  <div id="app">
    <nav>
      <router-link to="/">首页</router-link>
      <router-link to="/stocks">股票列表</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script setup lang="ts">
// 空脚本
</script>

<style scoped lang="less">
nav {
  padding: 1rem;
  background: #f5f5f5;
  a {
    margin-right: 1rem;
    color: #333;
    text-decoration: none;
    .router-link-active {
      font-weight: bold;
    }
  }
}
</style>
