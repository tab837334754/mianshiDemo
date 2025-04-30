<template>
  <div class="profile-container">
    <h1>User Profile</h1>
    <div v-if="authStore.user">
      <p>Name: {{ authStore.user.name }}</p>
      <p>Email: {{ authStore.user.email }}</p>
    </div>
    <button @click="handleLogout">Logout</button>
  </div>
</template>

<script setup>
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const handleLogout = async () => {
  try {
    await authStore.logoutUser()
    router.push('/login')
  } catch (error) {
    console.error('Logout failed:', error)
  }
}
</script>

<style scoped>
.profile-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}
button {
  padding: 10px 15px;
  background-color: #f44336;
  color: white;
  border: none;
  cursor: pointer;
  margin-top: 20px;
}
</style>