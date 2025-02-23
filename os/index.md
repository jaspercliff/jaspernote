---
sidebar: false
layout: home
---

# system and system design

- [hardware](hardware)
- [linux](linux)
- [windows](windows)
- [mac](mac)
- [docker](docker)
- [k8s](k8s)
- [system design](systemDesign)

<Card
title="hardware"
description="硬件知识"
link="/linux"
/>

<script setup>
// 定义 items 数组，作为传递给 CardList 的数据
const items = [
  { title: "linux", link: "/linux/index.md" },
  { title: "Python", link: "/python" },
  { title: "Vue.js", link: "/vue" },
  { title: "Docker", link: "/docker" },
  { title: "Linux", link: "/linux" },
  { title: "Kubernetes", link: "/k8s" }
];
</script>

# 我的技术列表

<CardList :items="items" />