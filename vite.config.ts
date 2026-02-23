import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
  plugins: [vue()],
  base: process.env.VITE_BASE_URL || "/",
  server: {
    port: 5173,
    host: true,
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/scss/theming" as *;`,
        silenceDeprecations: ["color-functions", "global-builtin", "import", "mixed-decls"],
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
