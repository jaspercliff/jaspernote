---
layout: home

hero:
  name: "Jasper的开发笔记"
  text: "探索开发的无限可能"
  image:
    src: /logo.png
    alt: VitePress
  tagline: "记录技术成长之路，分享开发中的每个精彩时刻"
  actions:
    - theme: brand
      text: java开发
      link: /java
    - theme: alt
      text: 工具与技巧
      link: /utils

features:
  - title: 高效开发实践
    details: 分享高效的开发实践，帮助你在开发过程中节省时间与精力。
  - title: 深入工具链
    details: 介绍主流开发工具链，提升开发效率与代码质量。
  - title: 前后端协作
    details: 探索前后端协作的最佳实践，实现快速高效的开发流程。
---



<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #bd34fe, #41d1ff);
  --vp-home-hero-text-font-family: 'Arial', sans-serif;
  --vp-home-hero-text-font-weight: bold;
  --vp-home-hero-tagline-font-size: 1.25rem;
  --vp-home-hero-tagline-color: #555;
  --vp-home-hero-actions-gap: 20px;
  --vp-home-hero-image-border-radius: 50%;
}
.vp-home-hero {
  text-align: center;
  padding: 50px 20px;
}
.vp-home-hero img {
  border-radius: 50%;
}
.vp-home-hero h1 {
  font-size: 3rem;
  color: var(--vp-home-hero-name-background);
  background-clip: text;
  -webkit-background-clip: text;
  font-family: var(--vp-home-hero-text-font-family);
  font-weight: var(--vp-home-hero-text-font-weight);
}

.vp-home-hero p {
  font-size: var(--vp-home-hero-tagline-font-size);
  color: var(--vp-home-hero-tagline-color);
  margin-top: 10px;
}

.vp-home-hero .vp-home-hero-actions {
  margin-top: 30px;
  display: flex;
  gap: var(--vp-home-hero-actions-gap);
  justify-content: center;
}

.vp-home-hero .vp-home-hero-actions .vp-button {
  padding: 12px 30px;
  font-size: 1.1rem;
  border-radius: 30px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.vp-home-hero .vp-home-hero-actions .vp-button:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.features-section {
  margin-top: 50px;
  text-align: center;
}

.features-section .feature {
  margin: 20px;
  padding: 20px;
  background-color: #f4f7fb;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.features-section .feature h3 {
  color: #333;
  font-size: 1.5rem;
  font-weight: 600;
}

.features-section .feature p {
  color: #555;
  font-size: 1rem;
  line-height: 1.6;
}
</style>