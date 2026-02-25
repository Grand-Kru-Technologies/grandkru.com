import { defineConfig, loadEnv } from 'vite'
import { cloudflare } from '@cloudflare/vite-plugin'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  const isProduction = mode === 'production'

  return {
    plugins: [
      vue(),
      cloudflare(),
      !isProduction && vueDevTools()
    ].filter(Boolean),
    base: env.VITE_BASE_URL || '/',
    server: {
      port: 5173,
      host: true
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
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
    logLevel: isProduction ? 'error' : 'debug',
    // Expose env variables to the client
    define: {
      'process.env': env
    }
  }
})
