<template>
  <div class="login-page">
    <h2 class="title">登录 可云</h2>

    <div class="form">
      <input v-model="email" placeholder="邮箱" class="input" />
      <input v-model="password" type="password" placeholder="密码" class="input" />

      <button class="btn" @click="login">登 录</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import api from "../api/http"
import { useRouter } from "vue-router"

const email = ref("")
const password = ref("")
const router = useRouter()

async function login() {
  if (!email.value || !password.value) {
    alert("请输入邮箱和密码")
    return
  }

  try {
    const res = await api.post("/passport/login", {
      email: email.value,
      password: password.value
    })

    const token = res.data.data.token
    localStorage.setItem("token", token)

    router.push("/dashboard")
  } catch (e) {
    alert("登录失败，请检查账号密码")
  }
}
</script>

<style scoped>
.login-page {
  padding: 30px 20px;
}

.title {
  text-align: center;
  font-size: 24px;
  margin-bottom: 30px;
}

.form {
  display: flex;
  flex-direction: column;
}

.input {
  padding: 12px;
  border-radius: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
}

.btn {
  padding: 12px;
  background: #007aff;
  color: white;
  border-radius: 10px;
  border: none;
  font-size: 18px;
}
</style>
