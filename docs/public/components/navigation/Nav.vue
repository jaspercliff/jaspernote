<script setup>
import { ref, computed } from 'vue'
import { inBrowser } from 'vitepress'

import { websites } from './data'
import NavLinks from "../../../.vitepress/theme/components/NavLinks.vue";

const LINKS_KEY = 'jaspernote-links'

const getItems = () => {
  if (!inBrowser) {
    return []
  }
  const value = localStorage.getItem(LINKS_KEY)
  if (value) {
    try {
      return JSON.parse(value)
    } catch (e) {
      return []
    }
  }
  return []
}

const items = ref(getItems())

const handleClick = (data) => {
  let newData = items.value.filter((item) => item.link !== data.link)
  newData.unshift(data)
  if (newData.length > 4) {
    newData = newData.slice(0, 4)
  }
  localStorage.setItem(LINKS_KEY, JSON.stringify(newData))
  items.value = newData
}

// 计算大纲项目
const outlineItems = computed(() => {
  const outline = []
  if (items.value.length) {
    outline.push({title: "最近使用", id: "recent"})
  }
  websites.forEach(category => {
    outline.push({title: category.title, id: category.title.toLowerCase().replace(/\s+/g, '-')})
  })
  return outline
})
</script>

<template>
  <div class="navigation-container">
    <div class="main-content">
      <NavLinks v-if="items.length" title="最近使用" @nav-click="handleClick" :items="items"/>
      <NavLinks v-for="item in websites" :key="item.title" v-bind="item" @nav-click="handleClick"/>
    </div>
    <nav class="page-outline">
      <h2>页面大纲</h2>
      <ul>
        <li v-for="item in outlineItems" :key="item.id">
          <a :href="'#' + item.id">{{ item.title }}</a>
        </li>
      </ul>
    </nav>
  </div>
</template>


<style lang="scss" scoped>
.navigation-container {
  display: flex;
  justify-content: space-between;
  max-width: 85vw;
  margin: 0 auto;
  padding: 20px;
}

.main-content {
  flex: 1;
  margin-right: 20px;
}

.page-outline {
  width: 250px;
  position: sticky;
  top: 20px;
  align-self: flex-start;
  background: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  max-height: calc(100vh - 40px);
  overflow-y: auto;

  h2 {
    font-size: 18px;
    margin-bottom: 10px;
    border-bottom: 1px solid #eee;
    padding-bottom: 5px;
  }

  ul {
    list-style-type: none;
    padding-left: 0;

    li {
      margin-bottom: 5px;

      a {
        color: #333;
        text-decoration: none;
        font-size: 14px;

        &:hover {
          color: #0066cc;
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .navigation-container {
    flex-direction: column;
  }

  .main-content {
    margin-right: 0;
  }

  .page-outline {
    width: 100%;
    position: static;
    margin-top: 20px;
  }
}
</style>