<template>
  <div class="app-container">
    <router-view />

    <!-- 全局底部导航（部分页面隐藏） -->
    <BottomNav
      v-if="showNav"
    />
  </div>
</template>

<script setup>
import { useRoute } from "vue-router"
import BottomNav from "./components/BottomNav.vue"

const route = useRoute()

// 登录、注册页等不显示底部导航
const hidePages = ["/login", "/register"]

const showNav = !hidePages.includes(route.path)
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  background: #f7f7f7;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto;
}

.app-container {
  padding-bottom: 56px; /* 给底部导航留空间 */
}
</style>
