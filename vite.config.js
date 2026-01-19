import { fileURLToPath, URL } from 'node:url'

// to display images in Vuetify without needing require()
// https://github.com/vuetifyjs/vuetify/issues/5403
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls }
    }),
    vuetify({
      styles: { configFile: 'src/scss/variables-vuetify.scss' }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        additionalData: `@use "@/scss/variables-app.scss" as *;`
      }
    }
  },
  // Netlify assumes the site will serve from the root i.e mjwals.co.uk
  // we use the below to point Netlify to a subfolder e.g mjwals.co.uk/subfolder
  base: '/taxtharich/'
})
