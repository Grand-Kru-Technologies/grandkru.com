import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  base: '/grandkru.com/',
  server: {
    port: 5173,
    host: true
  },
  build: {
    sourcemap: true,
    minify: false,
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  },
  logLevel: 'info'
})