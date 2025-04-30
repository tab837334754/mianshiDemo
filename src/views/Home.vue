<template>
  <div class="home-container">
    <div v-if="authStore.serverInfo">
      <h2>Server Information</h2>
      <pre>{{ JSON.stringify(authStore.serverInfo, null, 2) }}</pre>
    </div>
    <div v-if="authStore.isAuthenticated">
      <p>已登录</p>
      <router-link to="/profile">Go to Profile</router-link>
    </div>
    <div v-else>
      <p>未登录</p>
      <router-link to="/login">Login</router-link>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()

onMounted(() => {
  authStore.fetchServerInfo()
  if (!authStore.isAuthenticated) {
    authStore.fetchUser()
  }
})
</script>

<style scoped>
.home-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
pre {
  background-color: #f5f5f5;
  padding: 15px;
  border-radius: 4px;
  overflow-x: auto;
}
</style>