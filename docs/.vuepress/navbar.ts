/**
 * @see https://theme-plume.vuejs.press/config/navigation/ 查看文档了解配置详情
 *
 * Navbar 配置文件，它在 `.vuepress/plume.config.ts` 中被导入。
 */

import { defineNavbarConfig } from 'vuepress-theme-plume'

export default defineNavbarConfig([
  // { text: '首页', link: '/', icon: 'lets-icons:home-duotone' },
  { text: '博客', link: '/blog/', icon: 'solar:book-2-bold' },
  // { text: '分类', link: '/blog/categories/', icon: 'mingcute:classify-2-fill' },
  // { text: '标签', link: '/blog/tags/', icon: 'mingcute:tag-2-fill' },
  // { text: '归档', link: '/blog/archives/', icon: 'mingcute:box-2-fill' },

  {
    text: '笔记',
    icon: 'mingcute:book-3-fill',
    items: [
      { text: '中级会计', link: '/notes/中级会计/README.md', icon: 'emojione-monotone:letter-m' },
      { text: 'CTA', link: '/notes/CTA/README.md', icon: 'emojione-monotone:letter-c' },
      { text: 'CPA', link: '/notes/CPA/README.md', icon: 'emojione-monotone:letter-c' },
    ],
  },

  // {
  //   text: '政策',
  //   icon: 'mingcute:building-4-fill',
  //   items: [
  //     { text: '房地产', link: '/notes/房地产/' }
  //   ]
  // },

  {
    text: '时光',
    icon: 'streamline-logos:douban-logo-solid',  
    items: [
      { text: '说说', link: '/times/说说/1.shuoshuo.md', icon: 'fa6-brands:weibo' },
      { text: '读书', link: '/times/豆瓣/1.book.md', icon: 'ic:twotone-menu-book' },
      { text: '电影', link: '/times/豆瓣/2.movie.md', icon: 'si:movie-duotone' },
      { text: '音乐', link: '/times/豆瓣/3.song.md', icon: 'bi:music-player-fill' },
      { text: '游戏', link: '/times/豆瓣/4.game.md', icon: 'icon-park-twotone:gamepad' },
    ]
  }
])
