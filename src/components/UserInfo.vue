<template>
  <div class="user-info" @mouseenter="showPanel" @mouseleave="hidePanel">
    <el-avatar :icon="UserFilled" @click="togglePanel" />
    <span class="user-name" @click="togglePanel">User Name</span>

    <transition name="fade">
      <div v-show="userDetailPanelVisible" class="user-detail-panel" ref="userDetailPanel">
        <!-- 用户详细信息面板内容 -->
        <ul class="user-details">
          <li>详细信息 1</li>
          <li>详细信息 2</li>
          <li>详细信息 3</li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { UserFilled } from '@element-plus/icons-vue'
import { ref } from 'vue'
const userDetailPanelVisible = ref(false)

const showPanel = () => (userDetailPanelVisible.value = true)
const hidePanel = () => (userDetailPanelVisible.value = false)
const togglePanel = () => (userDetailPanelVisible.value = !userDetailPanelVisible.value)
</script>

<style scoped lang="less">
.user-info {
  position: relative;
  display: flex;
  align-items: center;

  .user-name {
    margin-left: 8px;
    font-size: 14px;
    color: #333;
    cursor: pointer;
  }

  .user-detail-panel {
    position: absolute;
    top: 100% + 20px;
    left: 0;
    background-color: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    padding: 10px;
    width: 200px;
    z-index: 1000;
    opacity: 1;
    transition: opacity 0.3s;

    // 增加伪元素 左上角三角形指向上方头像
    &:before {
      content: '';
      position: absolute;
      bottom: 100%;
      left: 20px;
      margin-left: -8px;
      border-width: 8px;
      border-style: solid;
      border-color: transparent transparent #fff transparent;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
