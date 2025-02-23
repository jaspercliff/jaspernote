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
  { title: "linux", link: "/os/linux" },
  { title: "windows", link: "/os/windows" },
  { title: "mac", link: "/os/mac" },
  { title: "Docker", link: "/os/docker" },
  { title: "Kubernetes", link: "/os/k8s" },
  { title: "system design", link: "/os/systemDesign" },
];
</script>


<CardList :items="items" />