import http from '../utils/http'

export const getCsrfCookie = async () => {
  try {
    // 确保这个请求不会无限循环
    const response = await http.get('/csrf-cookie', {
      _retry: true // 自定义属性用于防止无限重试
    })
    return true
  } catch (error) {
    console.error('Failed to get CSRF cookie:', error)
    return false
  }
}