---
sidebar: false
layout: home
---

# system and system design

<Card
title="hardware"
description="硬件知识"
link="/os/hardware"
/>

<script setup>
// 定义 items 数组，作为传递给 CardList 的数据
const items = [
  { title: "linux", link: "/jaspernote/os/linux" },
  { title: "windows", link: "/jaspernote/os/windows" },
  { title: "mac", link: "/jaspernote/os/mac" },
  { title: "Docker", link: "/jaspernote/os/docker" },
  { title: "Kubernetes", link: "/jaspernote/os/k8s" },
  { title: "system design", link: "/jaspernote/os/systemDesign" },
];
</script>


<CardList :items="items" />