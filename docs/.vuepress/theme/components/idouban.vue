<template>
  <div id="douban-container"></div>
</template>

<script setup>
import { onMounted } from 'vue'

// 定义 props，接受 type 参数（默认值设为 'book'）
const props = defineProps({
  type: {
    type: String,
    default: 'book', // 默认类型为 'book'
    validator: (value) => ['book', 'movie', 'song', 'game'].includes(value), // 可选：验证参数合法性
  },
  doubanId: { // 可选：你也可以让 douban_id 通过 props 传入
    type: String,
    default: '162448367',
  },
})

onMounted(() => {
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = 'https://cdn.jsdelivr.net/npm/idouban@1.1.3/dist/index.css'
  document.head.appendChild(link)

  const script = document.createElement('script')
  script.src = 'https://cdn.jsdelivr.net/npm/idouban@1.1.3/dist/index.js'
  script.onload = () => {
    window.idouban?.init({
      selector: '#douban-container',
      douban_id: props.doubanId, // 使用 props.doubanId
      type: props.type,          // 使用 props.type
    })
  }
  document.head.appendChild(script)
})
</script>