<template>
  <div class="page">
    <h2 class="title">订阅中心</h2>

    <div class="card">
      <div class="label">订阅链接</div>
      <input 
        readonly 
        class="sub-input"
        :value="subUrl"
      />
      <button class="btn" @click="copy">复制链接</button>
    </div>

    <div class="card">
      <button class="btn-danger" @click="reset">重置订阅链接</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import api from "../api/http"

const subUrl = ref("加载中...")

onMounted(async () => {
  const res = await api.get("/user/getSubscribe")
  subUrl.value = res.data.data.subscribe_url
})

function copy() {
  navigator.clipboard.writeText(subUrl.value)
  alert("已复制")
}

async function reset() {
  await api.post("/user/resetSubLink")
  alert("已重置，请刷新页面")
}
</script>

<style scoped>
.page {
  padding: 16px;
}

.title {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 14px;
}

.card {
  background: #ffffff;
  padding: 16px;
  border-radius: 12px;
  margin-bottom: 14px;
  box-shadow: 0 3px 6px rgba(0,0,0,0.05);
}

.label {
  font-size: 14px;
  margin-bottom: 8px;
  color: #666;
}

.sub-input {
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 14px;
  margin-bottom: 12px;
}

.btn {
  width: 100%;
  padding: 12px;
  background: #007aff;
  color: #fff;
  border-radius: 8px;
  border: none;
  font-size: 16px;
}

.btn-danger {
  width: 100%;
  padding: 12px;
  background: #ff4d4f;
  color: white;
  border: none;
  border-radius: 8px;
}
</style>
