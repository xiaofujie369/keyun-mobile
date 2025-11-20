<template>
  <div class="page">

    <!-- 公告卡片 -->
    <div class="card notice">
      <div class="title">新人必看</div>
      <div class="time">{{ now }}</div>
    </div>

    <!-- 套餐信息 -->
    <div class="card">
      <div class="label">我的套餐</div>
      <div class="plan">{{ user.plan_name }}</div>
      <div class="expire">到期时间：{{ user.expire }}</div>

      <div class="usage">
        <div class="bar-bg">
          <div class="bar" :style="{ width: usagePercent + '%' }"></div>
        </div>
        <div class="usage-text">
          {{ user.used }} GB / {{ user.total }} GB ({{ usagePercent }}%)
        </div>
      </div>
    </div>

    <!-- 节点数量 -->
    <div class="card">
      <div class="label">节点数量</div>
      <div class="big">{{ nodes }} 个</div>
    </div>

    <!-- 订阅 -->
    <div class="card btn-card" @click="copySub()">
      🔗 一键复制订阅链接
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import api from "../api/http"

const now = new Date().toLocaleString()

const user = ref({
  plan_name: "加载中",
  expire: "加载中",
  used: 0,
  total: 1,
})

const nodes = ref(0)
const usagePercent = ref(0)

onMounted(async () => {
  // 获取用户信息
  const u = await api.get("/user/getSubscribe")
  user.value.plan_name = u.data.data.plan || "未知套餐"
  user.value.expire = u.data.data.expire_date || "未知"
  user.value.used = (u.data.data.u || 0) / 1024 / 1024 / 1024
  user.value.total = u.data.data.transfer_enable / 1024 / 1024 / 1024

  usagePercent.value = Math.floor((user.value.used / user.value.total) * 100)

  // 获取节点列表
  const n = await api.get("/user/getNodes")
  nodes.value = n.data.data.length
})

function copySub() {
  navigator.clipboard.writeText(location.origin + "/subscribe")
  alert("已复制订阅链接！")
}
</script>

<style scoped>
.page {
  padding: 15px;
}

.card {
  background: #fff;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 3px 6px rgba(0,0,0,0.05);
  margin-bottom: 14px;
}

.notice {
  background: linear-gradient(135deg, #fff0f6, #ffe6f0);
  border: 1px solid #ffd6e7;
}

.title {
  font-size: 18px;
  font-weight: bold;
}

.time {
  font-size: 13px;
  color: #666;
  margin-top: 4px;
}

.label {
  font-size: 14px;
  color: #666;
  margin-bottom: 6px;
}

.plan {
  font-size: 18px;
  font-weight: 700;
}

.expire {
  margin-top: 6px;
  font-size: 13px;
  color: #666;
}

.usage {
  margin-top: 12px;
}

.bar-bg {
  background: #eee;
  border-radius: 8px;
  height: 10px;
}

.bar {
  height: 10px;
  background: #007aff;
  border-radius: 8px;
}

.usage-text {
  margin-top: 6px;
  font-size: 13px;
  color: #444;
}

.big {
  font-size: 26px;
  font-weight: bold;
  margin-top: 4px;
}

.btn-card {
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  background: #007aff;
  color: white;
}
</style>
