import DefaultTheme from 'vitepress/theme'
import { h, ref, onMounted } from 'vue'

export default {
  ...DefaultTheme,
  setup() {
    const files = ref([])

    onMounted(async () => {
      try {
        const response = await fetch('/latestMdFiles.json')
        files.value = await response.json()
      } catch (error) {
        console.error('Error loading latest files:', error)
      }
    })

    return {
      files
    }
  }
}