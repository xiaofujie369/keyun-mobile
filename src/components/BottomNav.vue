<template>
  <nav class="bottom-nav">
    <div 
      v-for="item in navItems" 
      :key="item.path"
      class="nav-item"
      :class="{ active: route.path.startsWith(item.path) }"
      @click="go(item.path)"
    >
      <div class="icon">{{ item.icon }}</div>
      <div class="label">{{ item.label }}</div>
    </div>
  </nav>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router"

const router = useRouter()
const route = useRoute()

const navItems = [
  { label: "首页", path: "/dashboard", icon: "🏠" },
  { label: "节点", path: "/nodes", icon: "🛰️" },
  { label: "订阅", path: "/subscribe", icon: "📡" },
  { label: "我的", path: "/profile", icon: "👤" },
]

const go = (path) => router.push(path)
</script>

<style scoped>
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 56px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-top: 1px solid #eee;
  background: #ffffff;
}

.nav-item {
  flex: 1;
  text-align: center;
  color: #777;
  font-size: 13px;
  padding-top: 4px;
}

.nav-item.active {
  color: #007aff;
  font-weight: 600;
}

.icon {
  font-size: 20px;
  line-height: 20px;
}
</style>
