import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { VitePWA } from "vite-plugin-pwa";
import path from 'path';

export default defineConfig({
  plugins: [
    vue(),
    VitePWA({ registerType: 'autoUpdate' }) // 自动更新 PWA
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // 让 @ 指向 src 目录
    },
  },
  server: {
    port: 8000, // 指定端口号
    proxy: {
      '/log': {
        target: 'http://10.112.244.193:8002',
        changeOrigin: true,
      },
    },
    historyApiFallback: true, // ✅ 让 Vite 处理 history 模式路由
  },
});
