<template>
  <div class="page">
    <div class="profile-card">
      <div class="avatar">👤</div>
      <div class="info">
        <div class="email">{{ user.email }}</div>
        <div class="plan">套餐：{{ user.plan || "未知" }}</div>
      </div>
    </div>

    <div class="list">
      <div class="item">查看教程</div>
      <div class="item">联系客服</div>
      <div class="item">修改密码</div>
      <div class="item logout" @click="logout">退出登录</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import api from "../api/http"
import { useRouter } from "vue-router"

const router = useRouter()
const user = ref({ email: "加载中…" })

onMounted(async () => {
  const res = await api.get("/user/info")
  user.value = res.data.data
})

function logout() {
  localStorage.clear()
  router.push("/login")
}
</script>

<style scoped>
.page {
  padding: 16px;
}

.profile-card {
  display: flex;
  background: white;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 3px 6px rgba(0,0,0,0.05);
  align-items: center;
  margin-bottom: 16px;
}

.avatar {
  font-size: 48px;
  margin-right: 12px;
}

.email {
  font-size: 16px;
  font-weight: 600;
}

.plan {
  font-size: 13px;
  color: #999;
}

.list .item {
  background: white;
  padding: 14px;
  border-radius: 10px;
  margin-bottom: 12px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.04);
}

.logout {
  color: #ff4d4f;
  font-weight: bold;
}
</style>
