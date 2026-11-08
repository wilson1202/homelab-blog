import { defineClientConfig } from 'vuepress/client'
import { setupMarkHighlight } from '/home/ub001/homelab/node_modules/.pnpm/vuepress-plugin-md-power@1.0.0-rc.215_@types+markdown-it@14.2.0_@vuepress+bundler-vite@_f7aeace760a21dbd6a0dd5624d9cc6d5/node_modules/vuepress-plugin-md-power/dist/client/composables/mark.js'

import '/home/ub001/homelab/node_modules/.pnpm/vuepress-plugin-md-power@1.0.0-rc.215_@types+markdown-it@14.2.0_@vuepress+bundler-vite@_f7aeace760a21dbd6a0dd5624d9cc6d5/node_modules/vuepress-plugin-md-power/dist/client/styles/index.css'

export default defineClientConfig({
  enhance({ router, app }) {

  },
  setup() {
        setupMarkHighlight("eager")

  }
})
