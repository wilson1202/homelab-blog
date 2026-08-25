/**
 * 查看以下文档了解主题配置
 * - @see https://theme-plume.vuejs.press/config/intro/ 配置说明
 * - @see https://theme-plume.vuejs.press/config/theme/ 主题配置项
 *
 * 请注意，对此文件的修改不会重启 vuepress 服务，而是通过热更新的方式生效
 * 但同时部分配置项不支持热更新，请查看文档说明
 * 对于不支持热更新的配置项，请在 `.vuepress/config.ts` 文件中配置
 *
 * 特别的，请不要在两个配置文件中重复配置相同的项，当前文件的配置项会覆盖 `.vuepress/config.ts` 文件中的配置
 */

import { defineThemeConfig } from 'vuepress-theme-plume'
import collections from './collections'
import navbar from './navbar'

/**
 * @see https://theme-plume.vuejs.press/config/theme/
 */
export default defineThemeConfig({
  logo: '/avatar.png',

  // social: [
  //   { icon: 'github', link: '/' },
  // ],

  /**
   * @see https://theme-plume.vuejs.press/config/theme/#profile
   */
  profile: {
    avatar: '/avatar.png',
    name: 'Homelab',
    description: '家庭网络与虚拟化实验室 · 路由器 / 虚拟机 / 自托管服务折腾笔记',
  },

  navbar,
  collections,

})
