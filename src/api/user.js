import http from '../utils/http'

export const getUserProfile = async () => {
  return http.get('/api/user')
}