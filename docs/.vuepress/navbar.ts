/**
 * @see https://theme-plume.vuejs.press/config/navigation/ 查看文档了解配置详情
 *
 * Navbar 配置文件，它在 `.vuepress/plume.config.ts` 中被导入。
 */

import { defineNavbarConfig } from 'vuepress-theme-plume'

export default defineNavbarConfig([
  // { text: '首页', link: '/' },
  // { text: '博客', link: '/blog/' },
  // { text: ' 标签', link: '/blog/tags/' },
  // { text: '归档', link: '/blog/archives/' },

  {
    text: '路由器',
    icon: 'material-symbols:router',
    items: [
      { text: 'RouterOS', link: '/router/routeros/README.md', icon: 'simple-icons:mikrotik' },
      { text: 'iKuai', link: '/router/ikuai/README.md', icon: 'selfhst:ikuai' },
      { text: 'OpenWrt', link: '/router/openwrt/README.md', icon: 'thesvg-color:openwrt' },
    ],
  },

  {
    text: '虚拟机',
    icon: 'carbon:virtual-machine',
    items: [
      { text: 'ESXi', link: '/vm/esxi/README.md', icon: 'selfhst:vmware-esx' },
      { text: 'PVE', link: '/vm/pve/README.md', icon: 'selfhst:proxmox' },
    ],
  },

  {
    text: '操作系统',
    icon: 'ix:operating-system',
    items: [
      { text: 'Debian', link: '/os/debian/README.md', icon: 'logos:debian' },
      { text: 'Ubuntu', link: '/os/ubuntu/README.md', icon: 'logos:ubuntu' },
      { text: 'Windows', link: '/os/windows/README.md', icon: 'logos:microsoft-windows-icon' },
      { text: 'DSM', link: '/os/dsm/README.md', icon: 'cbi:synology-dsm' },
      { text: 'QTS', link: '/os/qts/README.md', icon: 'selfhst:qnap' },
      { text: 'Unraid', link: '/os/unraid/README.md', icon: 'selfhst:unraid' },
      { text: 'fnOS', link: '/os/fnos/README.md', icon: 'selfhst:fnos' },
    ],
  },

  {
    text: '服务部署',
    icon: 'fa-solid:server',
    items: [
      { text: 'Docker', link: '/deploy/docker/README.md', icon: 'selfhst:docker' },
      { text: 'Native', link: '/deploy/native/README.md', icon: 'emojione:package' },
    ],
  },

  {
    text: '工具收藏',
    icon: 'fa6-solid:screwdriver-wrench',
    items: [
      { text: '导航', link: '/tool/nav/README.md', icon: 'token-branded:nav' },
      { text: '收藏', link: '/tool/github/README.md', icon: 'akar-icons:github-fill' },
      { text: '笔记', link: '/tool/note/README.md', icon: 'twemoji:memo' },
      { text: '配置', link: '/tool/plume/README.md', icon: 'selfhst:vue-js' },
    ],
  },

])