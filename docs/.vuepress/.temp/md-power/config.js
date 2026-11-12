import { defineClientConfig } from 'vuepress/client'
import { setupMarkHighlight } from '/home/ub001/homelab/node_modules/.pnpm/vuepress-plugin-md-power@1.0.0-rc.216_@types+markdown-it@14.2.0_@vuepress+bundler-vite@_ec495fb484dbfde6d6c2c42960eab2f1/node_modules/vuepress-plugin-md-power/dist/client/composables/mark.js'

import '/home/ub001/homelab/node_modules/.pnpm/vuepress-plugin-md-power@1.0.0-rc.216_@types+markdown-it@14.2.0_@vuepress+bundler-vite@_ec495fb484dbfde6d6c2c42960eab2f1/node_modules/vuepress-plugin-md-power/dist/client/styles/index.css'

export default defineClientConfig({
  enhance({ router, app }) {

  },
  setup() {
        setupMarkHighlight("eager")

  }
})
