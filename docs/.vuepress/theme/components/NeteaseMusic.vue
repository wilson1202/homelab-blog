<!-- .vuepress/components/NeteaseMusic.vue -->
<template>
  <iframe
    frameborder="no"
    border="0"
    marginwidth="0"
    marginheight="0"
    width="330"
    height="450"
    :src="src">
  </iframe>
</template>

<script setup>
const props = defineProps({
  id: String
})
const src = `//music.163.com/outchain/player?type=4&id=${props.id}&auto=1&height=430`
</script>
