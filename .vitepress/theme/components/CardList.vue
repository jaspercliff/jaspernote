<template>
  <div class="card-container">
    <Card
        v-for="(item, index) in items"
        :key="index"
        :title="item.title"
        :link="item.link"
        :image = "item.image"
    />
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import Card from './Card.vue';

// 定义 props 接收父组件传递的 items 数组
const props = defineProps({
  items: {
    type: Array,
    required: true
  }
});
</script>

<style>
.card-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); /* 三列布局 */
  gap: 16px; /* 卡片间距 */
  padding: 20px;
}
</style>