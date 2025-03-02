<script setup>
import { onMounted, watch, nextTick } from 'vue'
import { useRoute } from 'vitepress'

const route = useRoute()

onMounted(() => {
  loadGiscus()
})

watch(() => route.path, async () => {
  await nextTick() // 确保 DOM 渲染完毕
  loadGiscus()
})

function loadGiscus() {
  const container = document.getElementById('giscus-container')

  // **清除已有的 Giscus 防止重复加载**
  if (container) {
    container.innerHTML = ''
  }

  const script = document.createElement('script')
  script.src = 'https://giscus.app/client.js'
  script.setAttribute('data-repo', 'jaspercliff/jaspernote')
  script.setAttribute('data-repo-id', 'R_kgDON6bcCg')
  script.setAttribute('data-category', 'Announcements')
  script.setAttribute('data-category-id', 'DIC_kwDON6bcCs4Cnbg_')
  script.setAttribute('data-mapping', 'pathname')
  script.setAttribute('data-strict', '0')
  script.setAttribute('data-reactions-enabled', '1')
  script.setAttribute('data-emit-metadata', '0')
  script.setAttribute('data-input-position', 'top')
  script.setAttribute('data-theme', 'preferred_color_scheme')
  script.setAttribute('data-lang', 'zh-CN')
  script.setAttribute('crossorigin', 'anonymous')
  script.setAttribute('async', '')

  container?.appendChild(script)
}
</script>

<template>
  <div class="giscus-wrapper">
    <div id="giscus-container"></div>
  </div>
</template>

<style scoped>
.giscus-wrapper {
  margin-top: 2rem;
}
</style>