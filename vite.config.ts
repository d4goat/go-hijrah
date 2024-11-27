import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    chunkSizeWarningLimit: 1000
  },
  server: {
    proxy: {
      '/api/islami': {
        target: 'https://api-islami.herokuapp.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/islami/, '')
      }
    }
  }
})
