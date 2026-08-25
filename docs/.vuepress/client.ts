import { defineClientConfig } from 'vuepress/client'

import './theme/styles/_index.css' // import your custom styles / 导入自定义样式

export default defineClientConfig({
  enhance({ app }) {
    // do something...
  },
})
