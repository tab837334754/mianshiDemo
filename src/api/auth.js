import http from '../utils/http'
import { getCsrfCookie } from './csrf'

export const login = async (credentials) => {
  // 确保先获取 CSRF token
  const csrfSuccess = await getCsrfCookie()
  if (!csrfSuccess) {
    throw new Error('Failed to obtain CSRF token')
  }
  
  return http.post('/login', credentials)
}

export const logout = async () => {
  return http.post('/logout')
}

export const getServerInfo = async () => {
  return http.get('/')
}