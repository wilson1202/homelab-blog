<script setup>
import { Layout } from 'vuepress-theme-plume/client'
import { onMounted, ref } from 'vue'

// Current title and URL
const title = ref('')
const url = ref('')

onMounted(() => {
  title.value = document.title
  url.value = window.location.href
})

const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(url.value)
    alert('链接已复制！')
  } catch (e) {
    alert('复制失败，请手动复制')
  }
}
</script>

<template>
  <Layout>
    <template #doc-footer-before>
      <div class="doc-footer-container">
        <div class="license-info">
          本文由作者按照
          <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer">
            CC-BY-4.0
          </a>
          进行授权
        </div>
        <div class="share-wrapper">
          <span class="share-label">分享:</span>

          <!-- Twitter Share -->
          <a
            :href="`https://twitter.com/intent/tweet?text=${encodeURIComponent(title + ' ' + url)}`"
            target="_blank"
            rel="noopener noreferrer"
            class="share-icon twitter-icon"
            title="分享到 Twitter"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="448" height="512" viewBox="0 0 448 512"><path d="M64 32C28.7 32 0 60.7 0 96v320c0 35.3 28.7 64 64 64h320c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64zm297.1 84L257.3 234.6L379.4 396h-95.6L209 298.1L123.3 396H75.8l111-126.9L69.7 116h98l67.7 89.5l78.2-89.5zm-37.8 251.6L153.4 142.9h-28.3l171.8 224.7h26.3z"/></svg>
          </a>

          <!-- Weibo Share -->
          <a
            :href="`https://service.weibo.com/share/share.php?title=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`"
            target="_blank"
            rel="noopener noreferrer"
            class="share-icon weibo-icon"
            title="分享到微博"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path d="M10.878 1.093a4.23 4.23 0 0 1 4.031 1.305a4.22 4.22 0 0 1 .886 4.14v.001a.612.612 0 0 1-1.166-.377a3.01 3.01 0 0 0-3.495-3.873a.611.611 0 1 1-.256-1.196M3.753 9.465c.548-1.11 1.972-1.74 3.233-1.411c1.304.338 1.971 1.568 1.437 2.764c-.541 1.221-2.095 1.875-3.416 1.449c-1.271-.411-1.812-1.67-1.254-2.802m2.658.567c.16.066.365-.009.458-.168c.088-.16.03-.34-.129-.397c-.156-.062-.353.013-.446.168c-.09.154-.041.333.117.397m-1.607 1.314c.413.188.963.009 1.219-.4c.252-.413.12-.883-.296-1.062c-.41-.172-.94.005-1.194.402c-.256.4-.135.874.271 1.06"/><path d="m12.014 7.238l.005.001c.919.285 1.941.974 1.939 2.188c0 2.007-2.895 4.535-7.246 4.535C3.393 13.962 0 12.352 0 9.708c0-1.385.876-2.985 2.384-4.493C4.4 3.199 6.751 2.28 7.634 3.165c.39.392.427 1.065.177 1.87c-.132.405.38.182.38.182c1.63-.682 3.051-.722 3.57.02c.278.397.252.951-.004 1.594c-.116.293.035.34.257.407m-10.4 3.101c.172 1.738 2.46 2.936 5.109 2.674c2.647-.26 4.656-1.883 4.482-3.623c-.17-1.738-2.458-2.937-5.107-2.674c-2.647.263-4.656 1.883-4.484 3.623m11.681-6.484a2.06 2.06 0 0 0-1.962-.634a.526.526 0 1 0 .219 1.031a1.008 1.008 0 0 1 1.17 1.296a.528.528 0 0 0 1.005.325a2.06 2.06 0 0 0-.432-2.018"/></svg>
          </a>

          <!-- Copy Link -->
          <button class="share-icon copy-icon" @click="copyLink" title="复制链接">
            <svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256"><path d="m218.34 119.6l-34.74 34.74a46.58 46.58 0 0 1-44.31 12.26c-.31.34-.62.67-.95 1l-34.74 34.74a46.63 46.63 0 1 1-65.94-65.94l34.74-34.74a46.6 46.6 0 0 1 44.31-12.26c.31-.34.62-.67 1-1l34.69-34.74a46.63 46.63 0 0 1 65.94 65.94" opacity="0.2"/><path d="M240 88.23a54.43 54.43 0 0 1-16 37L189.25 160a54.27 54.27 0 0 1-38.63 16h-.05A54.63 54.63 0 0 1 96 119.84a8 8 0 0 1 16 .45A38.62 38.62 0 0 0 150.58 160a38.4 38.4 0 0 0 27.31-11.31l34.75-34.75a38.63 38.63 0 0 0-54.63-54.63l-11 11A8 8 0 0 1 135.7 59l11-11a54.65 54.65 0 0 1 77.3 0a54.86 54.86 0 0 1 16 40.23m-131 97.43l-11 11A38.4 38.4 0 0 1 70.6 208a38.63 38.63 0 0 1-27.29-65.94L78 107.31a38.63 38.63 0 0 1 66 28.4a8 8 0 0 0 7.78 8.22h.22a8 8 0 0 0 8-7.78A54.86 54.86 0 0 0 144 96a54.65 54.65 0 0 0-77.27 0L32 130.75A54.62 54.62 0 0 0 70.56 224a54.28 54.28 0 0 0 38.64-16l11-11a8 8 0 0 0-11.2-11.34"/></svg>
          </button>
        </div>
      </div>
    </template>
  </Layout>
</template>

<style>
:root {
  /* Light theme */
  --footer-text-color: var(--vp-c-text-3);
  --footer-border-color: var(--c-border);
  --footer-link-color: var(--vp-c-text-2);
  --share-label-color: var(--c-text-light);
  
  /* Twitter icon */
  --twitter-icon-color: #1da1f2;
  /* --twitter-icon-bg: rgba(29, 161, 242, 0.1); */
  
  /* Weibo icon */
  --weibo-icon-color: #e6162d;
  /* --weibo-icon-bg: rgba(230, 22, 45, 0.1); */
  
  /* Copy icon */
  --copy-icon-color: #5f6368;
  /* --copy-icon-bg: rgba(95, 99, 104, 0.1); */
}

[data-theme="dark"] {
  /* Dark theme */
  --footer-text-color: var(--vp-c-text-3);
  --footer-border-color: var(--c-border-dark);
  --footer-link-color: var(--vp-c-text-2);
  --share-label-color: var(--c-text-dark-light);
  
  /* Twitter icon */
  --twitter-icon-color: #1da1f2;
  /* --twitter-icon-bg: rgba(29, 161, 242, 0.2); */
  
  /* Weibo icon */
  --weibo-icon-color: #ff5b72;
  /* --weibo-icon-bg: rgba(255, 91, 114, 0.2); */
  
  /* Copy icon */
  --copy-icon-color: #9aa0a6;
  /* --copy-icon-bg: rgba(154, 160, 166, 0.2); */
}

.doc-footer-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  color: var(--footer-text-color);
  font-size: 0.85em;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--footer-border-color);
}

.license-info a {
  color: var(--footer-link-color);
  font-weight: bold;
  text-decoration: none;
  transition: color 0.2s ease;
}

.license-info a:hover {
  text-decoration: underline;
}

.share-wrapper {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.share-label {
  color: var(--share-label-color);
}

.share-icon {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  opacity: 0.9;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  /* width: 36px;
  height: 36px; */
  border-radius: 50%;
}

.share-icon:hover {
  opacity: 1;
  transform: translateY(-2px);
}

/* Twitter icon specific styles */
.twitter-icon {
  background: var(--twitter-icon-bg);
}
.twitter-icon svg {
  fill: var(--twitter-icon-color);
}
.twitter-icon:hover svg {
  fill: #0d8bd9;
}

/* Weibo icon specific styles */
.weibo-icon {
  background: var(--weibo-icon-bg);
}
.weibo-icon svg {
  fill: var(--weibo-icon-color);
}
.weibo-icon:hover svg {
  fill: #d10f26;
}

/* Copy icon specific styles */
.copy-icon {
  background: var(--copy-icon-bg);
}
.copy-icon svg {
  fill: var(--copy-icon-color);
}
.copy-icon:hover svg {
  fill: #202124;
}
[data-theme="dark"] .copy-icon:hover svg {
  fill: #ffffff;
}

.share-icon svg {
  width: 20px;
  height: 20px;
  display: block;
  transition: fill 0.2s ease;
}
</style>