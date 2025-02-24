---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Jasper的开发笔记"
  text: "Java开发者的技术分享"
  tagline: "深入Java技术栈，记录开发过程中的心得与解决方案"
  actions:
    - theme: brand
      text: Java 示例
      link: /java-examples
    - theme: alt
      text: 框架与工具
      link: /frameworks-tools

features:
  - title: Java基础与进阶
    details: 从基础语法到高级特性，帮助你深入理解Java语言的核心。
  - title: 常用Java框架
    details: 详细解析Spring、Hibernate等主流框架的使用方法及最佳实践。
  - title: 性能优化与调试
    details: 分享常见的性能优化技巧，帮助你提升Java应用的性能与可维护性。
---



<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #007bff, #28a745);
  --vp-home-hero-text-font-family: 'Arial', sans-serif;
  --vp-home-hero-text-font-weight: bold;
  --vp-home-hero-tagline-font-size: 1.25rem;
  --vp-home-hero-tagline-color: #555;
  --vp-home-hero-actions-gap: 20px;
}

.vp-home-hero {
  text-align: center;
  padding: 50px 20px;
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