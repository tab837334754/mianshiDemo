<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link v-if="!authStore.isAuthenticated" to="/login">Login</router-link>
      <router-link v-else to="/profile">Profile</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script setup>
import { useAuthStore } from './stores/auth'

const authStore = useAuthStore()
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

nav {
  padding: 20px 0;
  border-bottom: 1px solid #eee;
  margin-bottom: 20px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  margin: 0 10px;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>