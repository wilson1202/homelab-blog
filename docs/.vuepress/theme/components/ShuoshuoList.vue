<template>
  <div class="shuoshuo-list">
    <div v-if="loading" class="status">正在加载说说...</div>
    <div v-else-if="error" class="status error">加载失败：{{ error }}</div>
    <div v-else>
      <div
        v-for="(item, index) in paginatedShuoshuos"
        :key="index"
        class="shuoshuo-item"
      >
        <p class="text">{{ item.text }}</p>

        <div v-if="item.image?.length" class="images">
          <img
            v-for="(img, idx) in item.image"
            :key="idx"
            :src="img"
            alt="微博图片"
            loading="lazy"
          />
        </div>

        <div v-if="item.video && item.video.length > 5" class="video">
          <video controls :src="item.video" preload="metadata" />
        </div>

        <div class="date">
          发布于: {{ formatDate(item.date) }}<span v-if="item.place">&nbsp;{{ item.place }}</span>
        </div>



        <!-- <a
          class="link"
          :href="item.link"
          target="_blank"
          rel="noopener noreferrer"
        >
          查看原微博
        </a> -->

        <hr />
      </div>

      <div class="pagination" v-if="totalPages > 1">
        <button @click="goToPage(1)" :disabled="currentPage === 1">首页</button>
        <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">上一页</button>

        <button
          v-for="page in visiblePages"
          :key="page"
          @click="goToPage(page)"
          :class="{ active: page === currentPage }"
        >
          {{ page }}
        </button>

        <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages">下一页</button>
        <button @click="goToPage(totalPages)" :disabled="currentPage === totalPages">尾页</button>

        <input
          v-model.number="jumpPage"
          type="number"
          min="1"
          :max="totalPages"
          class="jump-input"
          placeholder="页码"
        />
        <button @click="goToPage(jumpPage)">跳转</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const shuoshuos = ref([])
const loading = ref(true)
const error = ref(null)

const itemsPerPage = 10
const currentPage = ref(1)
const jumpPage = ref(1)

const totalPages = computed(() =>
  Math.ceil(shuoshuos.value.length / itemsPerPage)
)

const paginatedShuoshuos = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return shuoshuos.value.slice(start, start + itemsPerPage)
})

const visiblePages = computed(() => {
  const total = totalPages.value
  const cur = currentPage.value
  const range = []

  let start = Math.max(1, cur - 2)
  let end = Math.min(total, cur + 2)

  if (cur <= 3) {
    end = Math.min(5, total)
  } else if (cur >= total - 2) {
    start = Math.max(1, total - 4)
  }

  for (let i = start; i <= end; i++) {
    range.push(i)
  }

  return range
})

function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

function formatDate(dateStr) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
}

onMounted(async () => {
  try {
    const res = await fetch(
      'https://weibo.070112.xyz/shuoshuo.json'
    )
    if (!res.ok) throw new Error(`状态码 ${res.status}`)
    shuoshuos.value = await res.json()
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.shuoshuo-list {
  max-width: 960px;
  margin: 0 auto;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  color: var(--vp-c-text-1);
  line-height: 1.4;
  font-size: 0.92rem;
}

.status {
  text-align: center;
  color: #888;
  padding: 1.5rem 0;
  font-size: 0.95rem;
}
.status.error {
  color: red;
}

.shuoshuo-item {
  margin-bottom: 1.2rem;
}

.text {
  font-size: 1rem;
  white-space: pre-wrap;
  margin-bottom: 0.4rem;
}

.images {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 0.4rem;
}

.images img {
  max-width: 100px;
  border-radius: 4px;
  object-fit: cover;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.images img:hover {
  transform: scale(1.04);
}

.video {
  margin-bottom: 0.4rem;
}

video {
  max-width: 100%;
  border-radius: 6px;
  outline: none;
}

.date {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.3rem;
}

.link {
  font-size: 0.8rem;
  color: var(--vp-c-brand);
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}

hr {
  border: none;
  border-top: 1px solid var(--vp-c-divider);
  margin: 0.8rem 0;
}

.pagination {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin: 1.5rem 0;
  font-size: 0.85rem;
}

.pagination button {
  padding: 0.3rem 0.6rem;
  font-size: 0.82rem;
  cursor: pointer;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  border-radius: 4px;
  transition: background 0.2s;
}

.pagination button.active {
  font-weight: bold;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-bg);
}

.pagination button:hover:not(:disabled) {
  background: var(--vp-c-hover);
}

.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.jump-input {
  width: 55px;
  padding: 0.3rem;
  font-size: 0.82rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
}

</style>
