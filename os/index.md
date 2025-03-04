---
sidebar: false
layout: home
---

# system and system design

<Card
title="hardware"
description="硬件知识"
link="/os/hardware"
image="/jaspernote/os/assets/hardware.png"
/>

<script setup>
// 定义 items 数组，作为传递给 CardList 的数据
const items = [
  { title: "linux", link: "/jaspernote/os/linux",image: "/jaspernote/os/assets/linux.png" },
  { title: "windows", link: "/jaspernote/os/windows",image: "/jaspernote/os/assets/windows.png" },
  { title: "mac", link: "/jaspernote/os/mac" ,image: "/jaspernote/os/assets/mac.png"},
  { title: "Docker", link: "/jaspernote/os/docker" ,image: "/jaspernote/os/assets/docker.png"},
  { title: "Kubernetes", link: "/jaspernote/os/k8s" ,image: "/jaspernote/os/assets/k8s.png"},
  { title: "system design", link: "/jaspernote/os/systemDesign" ,image: "/jaspernote/os/assets/design.png"},
];
</script>


<CardList :items="items" />