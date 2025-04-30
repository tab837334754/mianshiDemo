import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'


export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    base: '/',
    plugins: [vue()],
    define: {
      'process.env': {
        VITE_API_URL: env.VITE_API_URL,
      },
    },
    server: {
      port: 8089,
      host: true,
      open: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      proxy: {
        [`/${env.VITE_API_BASE_URL}`]: {
          target: 'https://dev.178778.xyz',
          changeOrigin: true,
          rewrite: (path) => path.replace(new RegExp(`^\\/${env.VITE_API_BASE_URL}`), ''),
          secure: false, // 如果是http协议需要设置
          // 添加调试日志
          configure: (proxy, options) => {
            proxy.on('error', (err, req, res) => {
              console.log('proxy error:', err)
            })
            proxy.on('proxyReq', (proxyReq, req, res) => {
              console.log('Proxy request:', req.url)
            })
          }
        },
      }
    }
  }
})