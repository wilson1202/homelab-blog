/**
 * 查看以下文档了解主题配置
 * - @see https://theme-plume.vuejs.press/config/intro/ 配置说明
 * - @see https://theme-plume.vuejs.press/config/theme/ 主题配置项
 *
 * 请注意，对此文件的修改都会重启 vuepress 服务。
 * 部分配置项的更新没有必要重启 vuepress 服务，建议请在 `.vuepress/config.ts` 文件中配置
 *
 * 特别的，请不要在两个配置文件中重复配置相同的项，当前文件的配置项会被覆盖
 */

import { viteBundler } from '@vuepress/bundler-vite'
import { defineUserConfig } from 'vuepress'
import { plumeTheme } from 'vuepress-theme-plume'
import { pwaPlugin } from '@vuepress/plugin-pwa'
import metingPlugin from 'vuepress-plugin-meting2'

const siteTitle = 'Powersen'
const siteDescription = "This is Powersen's personal blog & notebook."
const siteLang = 'zh-CN'

// 定义主题颜色
const lightThemeColor = '#fcfcfc' // 明亮模式颜色
const darkThemeColor = '#1a1a1a'  // 暗黑模式颜色

export default defineUserConfig({
  base: '/',
  lang: siteLang,
  title: siteTitle,
  description: siteDescription,

  plugins: [
    pwaPlugin({
      showInstall: true,
      manifest: {
        name: siteTitle,
        short_name: siteTitle,
        description: siteDescription,
        lang: siteLang,
        background_color: '#ffffff',
        theme_color: darkThemeColor, // 默认使用明亮模式颜色
        orientation: 'portrait-primary',
        start_url: '/',
        display: 'standalone', // 改为 standalone 以获得更好的 PWA 体验
        icons: [
          {
            src: 'favicons/android-chrome-512x512.png',
            type: 'image/png',
            sizes: '512x512'
          },
          {
            src: 'favicons/android-chrome-192x192.png',
            type: 'image/png',
            sizes: '192x192'
          }
        ],
      },
      update: 'hint',
      favicon: 'favicons/favicon.ico',
    }),

    // 音乐播放器插件
    metingPlugin({
      metingOptions: {
        global: true, // 开启关闭全局播放器
        server: "netease", // 音乐服务提供者 netease,tencent
        api: "https://api.injahow.cn/meting/?server=:server&type=:type&id=:id&auth=:auth&r=:r",
        type: "playlist",
        mid: "3080704436",
        aplayerOptions: {
          // lrcType: 2, // 不显示歌词
          lrcDisplay: 'toggle', // 切换歌词显示
          loop: 'all',
          order: 'random',
          preload: 'auto',
          volume: 0.5,
          mutex: true,
        },
      },
    }),
  ],

  head: [
    // 配置站点图标
    ['link', { rel: 'icon', type: 'image/png', href: 'favicons/favicon-32x32.png' }],
    ['script', { src: 'https://umami.powersen.cn/script.js', 'data-website-id': '2cf893e9-bd26-4919-b1d3-335ee18e23b4' }],
    // 添加响应式的 theme-color meta 标签
    ['meta', { name: 'theme-color', content: lightThemeColor, media: '(prefers-color-scheme: light)' }],
    ['meta', { name: 'theme-color', content: darkThemeColor, media: '(prefers-color-scheme: dark)' }],
    // 兼容性 meta 标签
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' }],
    ['link', { rel: 'apple-touch-icon', href: 'favicons/apple-touch-icon.png' }],
    ['link', { rel: 'mask-icon', href: 'favicons/safari-pinned-tab.svg', color: lightThemeColor }],
  ],

  bundler: viteBundler(),
  shouldPrefetch: false, // 站点较大，页面数量较多时，不建议启用

  theme: plumeTheme({
    /* 添加您的部署域名, 有助于 SEO, 生成 sitemap */
    hostname: 'https://powersen.cn',

    /* 文档仓库配置，用于 editLink */
    // docsRepo: '',
    // docsDir: 'docs',
    // docsBranch: '',

    /* 页内信息 */
    // editLink: true,
    lastUpdated: false,
    contributors: false,
    // changelog: false,

    /**
     * 编译缓存，加快编译速度
     * @see https://theme-plume.vuejs.press/config/basic/#cache
     */
    cache: 'filesystem',

    /**
     * 为 markdown 文件自动添加 frontmatter 配置
     * @see https://theme-plume.vuejs.press/config/basic/#autofrontmatter
     */
    // autoFrontmatter: {
    //   permalink: true,  // 是否生成永久链接
    //   createTime: true, // 是否生成创建时间
    //   title: true,      // 是否生成标题
    // },

    /* 本地搜索, 默认启用 */
    // search: { provider: 'local' },

    /**
     * Algolia DocSearch
     * 启用此搜索需要将 本地搜索 search 设置为 false
     * @see https://theme-plume.vuejs.press/config/plugins/search/#algolia-docsearch
     */
    search: {
      provider: 'algolia',
      appId: 'AJ60JVPY1F',
      apiKey: '6476161cdbd1c2613d2bc3bdda1a1277',
      indices: ['powersen'],
    },

    /**
     * Shiki 代码高亮
     * @see https://theme-plume.vuejs.press/config/plugins/code-highlight/
     */
    // codeHighlighter: {
    //   twoslash: true, // 启用 twoslash
    //   whitespace: true, // 启用 空格/Tab 高亮
    //   lineNumbers: true, // 启用行号
    // },

    /* 文章字数统计、阅读时间，设置为 false 则禁用 */
    // readingTime: true,

    /**
     * markdown
     * @see https://theme-plume.vuejs.press/config/markdown/
     */
    markdown: {
    //   abbr: true,         // 启用 abbr 语法  *[label]: content
    //   annotation: true,   // 启用 annotation 语法  [+label]: content
    //   pdf: true,          // 启用 PDF 嵌入 @[pdf](/xxx.pdf)
    //   caniuse: true,      // 启用 caniuse 语法  @[caniuse](feature_name)
      plot: true,         // 启用隐秘文本语法 !!xxxx!!
      bilibili: true,     // 启用嵌入 bilibili视频 语法 @[bilibili](bid)
      youtube: true,      // 启用嵌入 youtube视频 语法 @[youtube](video_id)
    //   artPlayer: true,    // 启用嵌入 artPlayer 本地视频 语法 @[artPlayer](url)
    //   audioReader: true,  // 启用嵌入音频朗读功能 语法 @[audioReader](url)
      icon: { 
        provider: 'iconify'  // 图标提供者，支持 iconify、iconfont、fontawesome,
        // assets: 'https://at.alicdn.com/t/c/font_4954043_01c55ayfadj8.css' // 示例地址
      },        // 启用内置图标语法  ::icon-name::
    //   table: true,        // 启用表格增强容器语法 ::: table
    //   codepen: true,      // 启用嵌入 codepen 语法 @[codepen](user/slash)
    //   replit: true,       // 启用嵌入 replit 语法 @[replit](user/repl-name)
    //   codeSandbox: true,  // 启用嵌入 codeSandbox 语法 @[codeSandbox](id)
    //   jsfiddle: true,     // 启用嵌入 jsfiddle 语法 @[jsfiddle](user/id)
    //   npmTo: true,        // 启用 npm-to 容器  ::: npm-to
    //   demo: true,         // 启用 demo 容器  ::: demo
    //   repl: {             // 启用 代码演示容器
    //     go: true,         // ::: go-repl
    //     rust: true,       // ::: rust-repl
    //     kotlin: true,     // ::: kotlin-repl
    //     python: true,     // ::: python-repl
    //   },
      math: {             // 启用数学公式
        type: 'katex',
      },
      chartjs: true,      // 启用 chart.js
      echarts: true,      // 启用 ECharts
      mermaid: true,      // 启用 mermaid
      flowchart: true,    // 启用 flowchart
    //   image: {
    //     figure: true,     // 启用 figure
    //     lazyload: true,   // 启用图片懒加载
    //     mark: true,       // 启用图片标记
    //     size: true,       // 启用图片大小
    //   },
    //   include: true,      // 在 Markdown 文件中导入其他 markdown 文件内容
      collapse: true,     // 启用折叠面板
      markmap: true,      // 启用思维导图
      imageSize: 'local', // 启用 自动填充 图片宽高属性，避免页面抖动
    },

    /**
     * 水印
     * @see https://theme-plume.vuejs.press/guide/features/watermark/
     */
    // watermark: true,

    /**
     * 评论 comments
     * @see https://theme-plume.vuejs.press/guide/features/comments/
     */
    comment: {
      provider: 'Twikoo', // "Artalk" | "Giscus" | "Twikoo" | "Waline"
      comment: true,
      envId: 'https://powersen-twikoo.netlify.app/.netlify/functions/twikoo', // Twikoo 环境 ID
      // repo: '',
      // repoId: '',
      // category: '',
      // categoryId: '',
      // mapping: 'pathname',
      // reactionsEnabled: true,
      // inputPosition: 'top',
    },

    /**
     * 资源链接替换
     * @see https://theme-plume.vuejs.press/guide/features/replace-assets/
     */
    // replaceAssets: 'https://cdn.example.com',

    /**
     * 加密功能
     * @see https://theme-plume.vuejs.press/guide/features/encryption/
     */
    // encrypt: {},
  }),
})
