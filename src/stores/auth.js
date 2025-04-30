import { defineStore } from 'pinia'
import { login, logout, getServerInfo } from '../api/auth'
import { getUserProfile } from '../api/user'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    serverInfo: null,
    isAuthenticated: false
  }),
  actions: {
    async fetchServerInfo() {
      try {
        this.serverInfo = await getServerInfo()
      } catch (error) {
        console.error('Failed to fetch server info:', error)
      }
    },
    async loginUser(credentials) {
      try {
        await login(credentials)
        await this.fetchUser()
        this.isAuthenticated = true
        return true
      } catch (error) {
        this.isAuthenticated = false
        throw error
      }
    },
    async logoutUser() {
      try {
        await logout()
        this.user = null
        this.isAuthenticated = false
      } catch (error) {
        console.error('Logout failed:', error)
      }
    },
    async fetchUser() {
      try {
        this.user = await getUserProfile()
        this.isAuthenticated = true
      } catch (error) {
        this.user = null
        this.isAuthenticated = false
      }
    }
  }
})