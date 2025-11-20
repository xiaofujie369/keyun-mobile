<template>
  <div class="page">
    <h2 class="title">节点列表</h2>

    <div v-if="loading" class="loading">加载中…</div>

    <div 
      v-for="node in nodes" 
      :key="node.id" 
      class="node-card"
    >
      <div class="left">
        <div class="flag">{{ node.flag || "🛰️" }}</div>
        <div class="info">
          <div class="name">{{ node.name }}</div>
          <div class="desc">{{ node.group }}</div>
        </div>
      </div>

      <div class="right">
        <div class="latency" :style="{ color: getColor(node.latency) }">
          {{ node.latency }}ms
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import api from "../api/http"

const loading = ref(true)
const nodes = ref([])

onMounted(async () => {
  try {
    const res = await api.get("/user/getNodes")
    nodes.value = res.data.data || []
  } catch (e) {
    console.log("节点获取失败", e)
  }
  loading.value = false
})

function getColor(ms) {
  if (ms < 80) return "#28c76f"
  if (ms < 150) return "#ffa600"
  return "#ff4d4f"
}
</script>

<style scoped>
.page {
  padding: 16px;
}

.title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 12px;
}

.node-card {
  background: #fff;
  padding: 12px;
  border-radius: 12px;
  margin-bottom: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 6px rgba(0,0,0,0.06);
}

.left {
  display: flex;
  align-items: center;
}

.flag {
  font-size: 24px;
  margin-right: 10px;
}

.name {
  font-size: 16px;
  font-weight: 600;
}

.desc {
  color: #999;
  font-size: 12px;
}

.right {
  text-align: right;
}

.latency {
  font-size: 15px;
  font-weight: bold;
}
.loading {
  padding: 20px;
  text-align: center;
}
</style>
