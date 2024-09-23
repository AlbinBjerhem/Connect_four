import { defineConfig } from 'vite';
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/solve': {
        target: 'https://ludolab.net',
        changeOrigin: true,
        secure: true
      }
    }
  }
});