/**
 * @see https://theme-plume.vuejs.press/guide/collection/ 查看文档了解配置详情。
 *
 * Collections 配置文件，它在 `.vuepress/plume.config.ts` 中被导入。
 *
 * 请注意，你应该先在这里配置好 Collections，然后再启动 vuepress，主题会在启动 vuepress 时，
 * 读取这里配置的 Collections，然后在与 Collection 相关的 Markdown 文件中，自动生成 permalink。
 *
 * collection 的  type 为 `post` 时，表示为 文档列表类型（即没有侧边导航栏，有文档列表页）
 * 可用于实现如 博客、专栏 等以文章列表聚合形式的文档集合 （内容相对碎片化的）
 *
 * collection 的 type 为 `doc` 时，表示为文档类型（即有侧边导航栏）
 * 可用于实现如 笔记、知识库、文档等以侧边导航栏形式的文档集合 （内容强关联、成体系的）
 * 如果发现 侧边栏没有显示，那么请检查你的配置是否正确，以及 Markdown 文件中的 permalink
 * 是否是以对应的 Collection 配置的 link 的前缀开头。 是否展示侧边栏是根据 页面链接 的前缀 与 `collection.link`
 * 的前缀是否匹配来决定。
 */

/**
 * 在受支持的 IDE 中会智能提示配置项。
 *
 * - `defineCollections` 是用于定义 collection 集合的帮助函数
 * - `defineCollection` 是用于定义单个 collection 配置的帮助函数
 *
 * 通过 `defineCollection` 定义的 collection 配置，应该填入 `defineCollections` 中
 */
import { defineCollection, defineCollections } from 'vuepress-theme-plume'

// const blog = defineCollection({
//   type: 'post',
//   dir: 'blog',
//   title: 'Blog',
//   link: '/blog/',
// })

// 路由器
const routerosDoc = defineCollection({
  type: 'doc',
  dir: 'router/routeros',
  linkPrefix: '/router/routeros/',
  title: 'RouterOS',
  // 根据文件结构自动生成侧边栏
  sidebar: 'auto',
})

const ikuaiDoc = defineCollection({
  type: 'doc',
  dir: 'router/ikuai/',
  linkPrefix: '/router/ikuai/',
  title: 'iKuai',
  // 根据文件结构自动生成侧边栏
  sidebar: 'auto',
})

const openwrtDoc = defineCollection({
  type: 'doc',
  dir: 'router/openwrt/',
  linkPrefix: '/router/openwrt/',
  title: 'OpenWrt',
  // 根据文件结构自动生成侧边栏
  sidebar: 'auto',
})

// 虚拟机
const esxiDoc = defineCollection({
  type: 'doc',
  dir: 'vm/esxi/',
  linkPrefix: '/vm/esxi/',
  title: 'ESXi',
  // 根据文件结构自动生成侧边栏
  sidebar: 'auto',
})

const pveDoc = defineCollection({
  type: 'doc',
  dir: 'vm/pve/',
  linkPrefix: '/vm/pve/',
  title: 'Proxmox VE',
  // 根据文件结构自动生成侧边栏
  sidebar: 'auto',
})

// 操作系统
const debianDoc = defineCollection({
  type: 'doc',
  dir: 'os/debian/',
  linkPrefix: '/os/debian/',
  title: 'Debian',
  // 根据文件结构自动生成侧边栏
  sidebar: 'auto',
})

const ubuntuDoc = defineCollection({
  type: 'doc',
  dir: 'os/ubuntu/',
  linkPrefix: '/os/ubuntu/',
  title: 'Ubuntu',
  // 根据文件结构自动生成侧边栏
  sidebar: 'auto',
})

const windowsDoc = defineCollection({
  type: 'doc',
  dir: 'os/windows/',
  linkPrefix: '/os/windows/',
  title: 'Windows',
  // 根据文件结构自动生成侧边栏
  sidebar: 'auto',
})

const dsmDoc = defineCollection({
  type: 'doc',
  dir: 'os/dsm/',
  linkPrefix: '/os/dsm/',
  title: 'DSM',
  // 根据文件结构自动生成侧边栏
  sidebar: 'auto',
})

const qtsDoc = defineCollection({
  type: 'doc',
  dir: 'os/qts/',
  linkPrefix: '/os/qts/',
  title: 'QTS',
  // 根据文件结构自动生成侧边栏
  sidebar: 'auto',
})

const unraidDoc = defineCollection({
  type: 'doc',
  dir: 'os/unraid/',
  linkPrefix: '/os/unraid/',
  title: 'Unraid',
  // 根据文件结构自动生成侧边栏
  sidebar: 'auto',
})

const fnosDoc = defineCollection({
  type: 'doc',
  dir: 'os/fnos/',
  linkPrefix: '/os/fnos/',
  title: 'fnOS',
  // 根据文件结构自动生成侧边栏
  sidebar: 'auto',
})


// 服务部署
const dockerDoc = defineCollection({
  type: 'doc',
  dir: 'deploy/docker/',
  linkPrefix: '/deploy/docker/',
  title: 'Docker',
  // 根据文件结构自动生成侧边栏
  sidebar: 'auto',
})

const nativeDoc = defineCollection({
  type: 'doc',
  dir: 'deploy/native/',
  linkPrefix: '/deploy/native/',
  title: 'Native',
  // 根据文件结构自动生成侧边栏
  sidebar: 'auto',
})

// 工具收藏
const navDoc = defineCollection({
  type: 'doc',
  dir: 'tool/nav/',
  linkPrefix: '/tool/nav/',
  title: 'Navigation',
  // 根据文件结构自动生成侧边栏
  sidebar: 'auto',
})

const githubDoc = defineCollection({
  type: 'doc',
  dir: 'tool/github/',
  linkPrefix: '/tool/github/',
  title: 'GitHub',
  // 根据文件结构自动生成侧边栏
  sidebar: 'auto',
})

const noteDoc = defineCollection({
  type: 'doc',
  dir: 'tool/note/',
  linkPrefix: '/tool/note/',
  title: 'Note',
  // 根据文件结构自动生成侧边栏
  sidebar: 'auto',
})

const plumeDoc = defineCollection({
  type: 'doc',
  dir: 'tool/plume/',
  linkPrefix: '/tool/plume/',
  title: 'Plume',
  // 根据文件结构自动生成侧边栏
  sidebar: 'auto',
})

export default defineCollections([
  // blog,
  // 路由器
  routerosDoc,
  ikuaiDoc,
  openwrtDoc,
  // 虚拟机
  esxiDoc,
  pveDoc,
  // 操作系统
  debianDoc,
  ubuntuDoc,
  windowsDoc,
  dsmDoc,
  qtsDoc,
  unraidDoc,
  fnosDoc,
  // 服务部署
  dockerDoc,
  nativeDoc,
  // 工具收藏
  navDoc,
  githubDoc,
  noteDoc,
  plumeDoc,
])
