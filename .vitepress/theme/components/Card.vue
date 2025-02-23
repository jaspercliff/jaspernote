<template>
  <div class="card" @click="navigate(link)">
    <img :src="randomImage" class="card-image" alt="Card Image" />
    <div class="card-content">
      <p class="card-description">{{ description }}</p> <!-- 新增描述 -->
      <h3 class="card-title">{{ title }}</h3>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

defineProps({
  title: String,
  link: String,
  description: String  // 新增 description 属性
});

const images = [
  "https://picsum.photos/500/300?random=1",
  "https://picsum.photos/500/300?random=2",
  "https://picsum.photos/500/300?random=3",
  "https://picsum.photos/500/300?random=4",
  "https://picsum.photos/500/300?random=5",
  "https://picsum.photos/500/300?random=6",
  "https://picsum.photos/500/300?random=7",
  "https://picsum.photos/500/300?random=8",
  "https://picsum.photos/500/300?random=9"
];

const randomImage = ref("https://picsum.photos/500/300");
const usedImages = ref(new Set());

onMounted(() => {
  let image;
  do {
    image = images[Math.floor(Math.random() * images.length)];
  } while (usedImages.value.has(image));  // 检查图片是否已被使用

  randomImage.value = image;
  usedImages.value.add(image);  // 将选中的图片标记为已使用
});

const navigate = (link) => {
  if (typeof link === "string" && link.trim() !== "") {
    window.location.href = link; // ✅ 确保 link 是字符串
  } else {
    console.error("无效的跳转链接:", link);
  }
};
</script>

<style>
.card {
  cursor: pointer;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.2s ease-in-out;
  background: white;
}

.card:hover {
  transform: scale(1.05);
}

.card-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.card-content {
  padding: 1px;
  text-align: center;
}

.card-title {
  font-size: 18px;
  font-weight: bold;
  margin-top: 1px; /* 减小标题和描述之间的间距 */
}

.card-description {
  font-size: 14px;
  color: #555;
  margin-bottom: 1px; /* 减小描述和标题之间的间距 */
}
</style>