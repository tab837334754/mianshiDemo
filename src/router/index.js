import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Profile from '../views/Profile.vue'
import { useAuthStore } from '../stores/auth'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: false }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresAuth: false }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  
  // 如果路由需要认证
  if (to.meta.requiresAuth) {
    // 先尝试获取用户信息
    if (!authStore.isAuthenticated) {
      try {
        await authStore.fetchUser()
      } catch (error) {
        console.error('Failed to fetch user:', error)
      }
    }
    
    // 如果仍然未认证，跳转到登录页
    if (!authStore.isAuthenticated) {
      return next('/login')
    }
  }
  
  next()
})

export default router