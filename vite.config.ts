import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import AutoImport from 'unplugin-auto-import/vite' //vant按需引入
import Components from 'unplugin-vue-components/vite' //vant按需引入
import { VantResolver } from '@vant/auto-import-resolver' //vant按需引入

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      //vant按需引入
      resolvers: [VantResolver()]
    }),
    Components({
      //vant按需引入
      resolvers: [VantResolver()]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 3000,
    proxy: {
      '/api': 'http://localhost:8000/',
      '/imgs': 'http://localhost:8000/'
    }
  }
})
