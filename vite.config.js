import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: { port: 10010 },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@scss': path.resolve(__dirname, 'src/assets/scss'),
      '@svg': path.resolve(__dirname, 'src/assets/svg'),
      '@common': path.resolve(__dirname, 'src/common'),
      '@cmp': path.resolve(__dirname, 'src/components'),
      '@views': path.resolve(__dirname, 'src/views'),
    }
  }
})
