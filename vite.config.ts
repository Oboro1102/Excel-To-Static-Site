import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/Excel-To-Static-Site/',
  build: {
    outDir: 'docs'
  }
})
