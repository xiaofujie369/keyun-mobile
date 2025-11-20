import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/', redirect: '/dashboard' },
  { path: '/login', component: () => import('../pages/Login.vue') },
  { path: '/dashboard', component: () => import('../pages/Dashboard.vue') },
  { path: '/nodes', component: () => import('../pages/Nodes.vue') },
  { path: '/subscribe', component: () => import('../pages/Subscribe.vue') },
  { path: '/profile', component: () => import('../pages/Profile.vue') },
]

export default createRouter({
  history: createWebHashHistory(),
  routes,
})
