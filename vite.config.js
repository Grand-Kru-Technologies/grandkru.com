import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [vue()],
    base: '/',
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
    logLevel: 'debug',
    // Expose env variables to the client
    define: {
      'process.env': env
    }
  }
})