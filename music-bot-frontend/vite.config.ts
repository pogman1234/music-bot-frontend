import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  envPrefix: 'VITE_',
  server: {
    proxy: {
      '/sse': {
        target: process.env.VITE_API_BASE_URL,
        changeOrigin: true
      }
    }
  }
})
