import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  base: './', // Relative base for GitHub Pages
  build: {
    rollupOptions: {
      input: {
        main: resolve('index.html'),
        privacy_policy: resolve('privacy_policy.html'),
        terms_of_service: resolve('terms_of_service.html'),
      },
    },
  },
})
