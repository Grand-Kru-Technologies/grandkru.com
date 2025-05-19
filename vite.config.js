import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import path from 'path'

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '')
  const isProduction = mode === 'production'

  return {
    plugins: [vue(), vueDevTools()],
    base: '/',
    server: {
      port: 5173,
      host: true
    },
    build: {
      sourcemap: !isProduction,
      minify: isProduction,
      rollupOptions: {
        output: {
          manualChunks: undefined
        }
      },
      chunkSizeWarningLimit: 1000,
      assetsDir: 'assets',
      emptyOutDir: true
    },
    logLevel: 'debug',
    // Expose env variables to the client
    define: {
      'process.env': env
    },
  }
})
