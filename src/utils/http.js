import axios from 'axios'
import Cookies from 'js-cookie'

const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  // headers: {
  //   'Accept': 'application/json',
  //   'Content-Type': 'application/json'
  // }
})

// 请求拦截器 - 添加 CSRF token
http.interceptors.request.use(async config => {
  // 从 cookie 中获取 CSRF token
  const token = Cookies.get('XSRF-TOKEN')
  console.log('token', token)
  
  // 如果是修改型请求(POST, PUT, PATCH, DELETE)且存在 token，添加到 header
  // if (['post', 'put', 'patch', 'delete'].includes(config.method.toLowerCase())) {
    if (token) config.headers['X-XSRF-TOKEN'] = token
  // }
  
  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截器 - 处理常见HTTP状态码
http.interceptors.response.use(response => {
  return response.data
}, error => {
  if (error.response) {
    switch (error.response.status) {
      case 401:
        // 未授权，跳转到登录页
        window.location.href = '/login'
        break
      case 403:
        // 禁止访问
        alert('您没有权限执行此操作')
        break
      case 404:
        // 资源不存在
        alert('请求的资源不存在')
        break
      case 422:
        // 验证错误
        return Promise.reject(error.response.data.errors)
      case 500:
        // 服务器错误
        alert('服务器发生错误，请稍后再试')
        break
      default:
        break
    }
  }
  return Promise.reject(error)
})

export default http