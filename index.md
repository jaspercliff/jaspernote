---
layout: home
hero:
  name: Jasper的开发笔记
  text: 探索开发的无限可能
  image:
    src: /logo.png
    alt: VitePress
  tagline: 记录技术成长之路，分享开发中的每个精彩时刻
  actions:
    - theme: brand
      text: 🚀 Java开发
      link: /java
    - theme: brand
      text: 🐍 Python开发
      link: /python
    - theme: alt
      text: ⚡ 工具与技巧
      link: /utils
features:
  - title: ⚡ 高效开发实践
    details: 分享高效的开发实践，帮助你在开发过程中节省时间与精力。
  - title: 🔧 深入工具链
    details: 介绍主流开发工具链，提升开发效率与代码质量。
  - title: 🤝 前后端协作
    details: 探索前后端协作的最佳实践，实现快速高效的开发流程。
---

<div class="tech-stack">
  <div class="tech-item">
    <span class="tech-icon">⚡</span>
    <span>VitePress</span>
  </div>
  <div class="tech-item">
    <span class="tech-icon">🎨</span>
    <span>Modern CSS</span>
  </div>
  <div class="tech-item">
    <span class="tech-icon">✨</span>
    <span>Animations</span>
  </div>
  <div class="tech-item">
    <span class="tech-icon">🚀</span>
    <span>Performance</span>
  </div>
</div>

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%);
  --vp-home-hero-text-font-family: 'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
  --vp-home-hero-text-font-weight: 800;
  --vp-home-hero-tagline-font-size: 1.4rem;
  --vp-home-hero-tagline-color: rgba(255, 255, 255, 0.9);
  --vp-home-hero-actions-gap: 20px;
  --vp-home-hero-image-border-radius: 50%;
  
  /* 新增变量 */
  --gradient-1: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --gradient-2: linear-gradient(135deg, #f093fb 0%, #4facfe 100%);
  --gradient-3: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  --shadow-glow: 0 0 40px rgba(102, 126, 234, 0.4);
  --shadow-glow-hover: 0 0 60px rgba(102, 126, 234, 0.6);
}

/* 动态背景 - 合并渐变和粒子效果 */
.vp-home-hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 50%, rgba(102, 126, 234, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(118, 75, 162, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 40% 20%, rgba(240, 147, 251, 0.2) 0%, transparent 50%),
    radial-gradient(2px 2px at 20% 30%, rgba(255, 255, 255, 0.3), transparent),
    radial-gradient(2px 2px at 60% 70%, rgba(102, 126, 234, 0.3), transparent),
    radial-gradient(1px 1px at 50% 50%, rgba(255, 255, 255, 0.2), transparent),
    radial-gradient(1px 1px at 80% 10%, rgba(118, 75, 162, 0.3), transparent),
    radial-gradient(2px 2px at 90% 40%, rgba(240, 147, 251, 0.2), transparent),
    radial-gradient(1px 1px at 33% 60%, rgba(79, 172, 254, 0.3), transparent),
    radial-gradient(2px 2px at 10% 80%, rgba(0, 242, 254, 0.2), transparent);
  background-size: 100% 100%, 100% 100%, 100% 100%, 200% 200%, 200% 200%, 200% 200%, 200% 200%, 200% 200%, 200% 200%, 200% 200%;
  background-position: 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%;
  animation: gradientShift 15s ease infinite, particleMove 20s linear infinite;
  z-index: -1;
  pointer-events: none;
}

@keyframes gradientShift {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.1);
  }
}

@keyframes particleMove {
  0% {
    background-position: 0% 0%;
  }
  100% {
    background-position: 100% 100%;
  }
}

.vp-home-hero {
  position: relative;
  text-align: center;
  padding: 80px 20px;
  overflow: hidden;
  min-height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

/* Logo 进入动画 */
.vp-home-hero img {
  animation: logoEntrance 1s cubic-bezier(0.34, 1.56, 0.64, 1) both,
             float 6s ease-in-out infinite,
             logoPulse 3s ease-in-out infinite;
  position: relative;
  z-index: 2;
}

@keyframes logoEntrance {
  0% {
    opacity: 0;
    transform: scale(0.5) rotate(-180deg);
  }
  100% {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }
}

/* Logo 光环效果 - 使用伪元素创建两个光环 */
.vp-home-hero {
  position: relative;
}

/* 第一个光环 - 内圈 */
.vp-home-hero::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 180px;
  height: 180px;
  border-radius: 50%;
  border: 3px solid transparent;
  background: linear-gradient(135deg, #667eea, #764ba2, #f093fb, #4facfe) border-box;
  -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  animation: rotateRing 3s linear infinite, pulseRing 2s ease-in-out infinite;
  opacity: 0.6;
  pointer-events: none;
  z-index: 1;
  margin-top: -20px;
}

/* 使用 box-shadow 创建第二个光环 */
.vp-home-hero::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border: 3px solid transparent;
  background: linear-gradient(135deg, #4facfe, #00f2fe, #667eea) border-box;
  -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  animation: rotateRing 4s linear infinite reverse, pulseRing 2.5s ease-in-out infinite;
  opacity: 0.4;
  animation-delay: 0.5s;
  pointer-events: none;
  z-index: 0;
  margin-top: -20px;
}

@keyframes rotateRing {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

@keyframes pulseRing {
  0%, 100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.6;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.1);
    opacity: 0.3;
  }
}

/* Logo 3D 旋转效果 */
.vp-home-hero img {
  position: relative;
  z-index: 1;
  border-radius: 50%;
  width: 150px;
  height: 150px;
  object-fit: cover;
  box-shadow: var(--shadow-glow);
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
  border: 3px solid transparent;
  background: linear-gradient(white, white) padding-box,
              var(--vp-home-hero-name-background) border-box;
  filter: drop-shadow(0 10px 20px rgba(102, 126, 234, 0.3));
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  25% {
    transform: translateY(-15px) rotate(2deg);
  }
  50% {
    transform: translateY(-25px) rotate(0deg);
  }
  75% {
    transform: translateY(-15px) rotate(-2deg);
  }
}

@keyframes logoPulse {
  0%, 100% {
    box-shadow: 0 0 40px rgba(102, 126, 234, 0.4),
                0 0 60px rgba(118, 75, 162, 0.2);
  }
  50% {
    box-shadow: 0 0 60px rgba(102, 126, 234, 0.6),
                0 0 80px rgba(118, 75, 162, 0.4),
                0 0 100px rgba(240, 147, 251, 0.2);
  }
}

.vp-home-hero img:hover {
  transform: translateY(-15px) rotate(360deg) scale(1.15);
  box-shadow: 0 0 80px rgba(102, 126, 234, 0.8),
              0 0 100px rgba(118, 75, 162, 0.6),
              0 0 120px rgba(240, 147, 251, 0.4);
  animation-play-state: paused;
  filter: brightness(1.1) drop-shadow(0 15px 30px rgba(102, 126, 234, 0.5));
}

/* Logo 悬停时的额外光效 */
.vp-home-hero:hover::before,
.vp-home-hero:hover::after {
  animation-duration: 1s, 1s;
  opacity: 0.8;
}

/* 标题渐变文字 */
.vp-home-hero h1 {
  font-size: clamp(2.5rem, 8vw, 4.5rem);
  background: var(--vp-home-hero-name-background);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-family: var(--vp-home-hero-text-font-family);
  font-weight: var(--vp-home-hero-text-font-weight);
  letter-spacing: -0.02em;
  margin: 20px 0;
  animation: gradientFlow 8s ease infinite, textGlow 3s ease-in-out infinite alternate;
  position: relative;
  text-shadow: 0 0 30px rgba(102, 126, 234, 0.3);
}

@keyframes gradientFlow {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

@keyframes textGlow {
  0% {
    filter: brightness(1);
  }
  100% {
    filter: brightness(1.2);
  }
}

/* 副标题 */
.vp-home-hero p {
  font-size: var(--vp-home-hero-tagline-font-size);
  color: var(--vp-home-hero-tagline-color);
  margin-top: 20px;
  font-weight: 400;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  animation: fadeInUp 1s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 按钮组 */
.vp-home-hero .vp-home-hero-actions {
  margin-top: 50px;
  display: flex;
  gap: var(--vp-home-hero-actions-gap);
  justify-content: center;
  flex-wrap: wrap;
  animation: fadeInUp 1s ease-out 0.3s both;
}

.vp-home-hero .vp-home-hero-actions .vp-button {
  padding: 16px 36px;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 50px;
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  border: 2px solid transparent;
  background-clip: padding-box;
}

.vp-home-hero .vp-home-hero-actions .vp-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s;
}

.vp-home-hero .vp-home-hero-actions .vp-button:hover::before {
  left: 100%;
}

.vp-home-hero .vp-home-hero-actions .vp-button:hover {
  transform: translateY(-8px) scale(1.05);
  box-shadow: 0 15px 35px rgba(102, 126, 234, 0.4);
}

.vp-home-hero .vp-home-hero-actions .vp-button:active {
  transform: translateY(-4px) scale(1.02);
}

/* Features 区域 */
.vp-home-features {
  margin-top: 100px;
  padding: 60px 20px;
  position: relative;
}

.vp-home-features::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.5), transparent);
}

/* Feature 卡片容器 - 添加进入动画 */
.vp-home-features .vp-features-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 40px;
}

/* Feature 卡片 */
.vp-home-features .vp-feature {
  position: relative;
  padding: 40px 30px;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  overflow: hidden;
  margin-bottom: 30px;
  opacity: 0;
  animation: featureSlideIn 0.8s ease-out forwards;
}

/* 每个卡片不同的进入方向 */
.vp-home-features .vp-feature:nth-child(1) {
  animation-delay: 0.1s;
  transform: translateX(-50px);
}

.vp-home-features .vp-feature:nth-child(2) {
  animation-delay: 0.3s;
  transform: translateY(50px);
}

.vp-home-features .vp-feature:nth-child(3) {
  animation-delay: 0.5s;
  transform: translateX(50px);
}

@keyframes featureSlideIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
    transform: translate(0, 0);
  }
}

/* Feature 背景光效 */
.vp-home-features .vp-feature::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(102, 126, 234, 0.1) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.5s ease;
  pointer-events: none;
}

.vp-home-features .vp-feature:hover::after {
  opacity: 1;
}

/* Feature 顶部渐变条 */
.vp-home-features .vp-feature::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--vp-home-hero-name-background);
  background-size: 200% 200%;
  animation: gradientFlow 3s ease infinite;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s ease;
  z-index: 1;
}

.vp-home-features .vp-feature:hover::before {
  transform: scaleX(1);
}

/* Feature 图标动画 */
.vp-home-features .vp-feature h2 {
  position: relative;
  color: #1a1a1a;
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 15px;
  background: var(--vp-home-hero-name-background);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 10px;
}

/* Feature 标题中的 emoji 图标动画 */
.vp-home-features .vp-feature h2 {
  position: relative;
}

/* 使用 CSS 选择器定位第一个字符（emoji） */
.vp-home-features .vp-feature h2::first-letter,
.vp-home-features .vp-feature h2 span:first-child {
  display: inline-block;
  animation: iconFloat 3s ease-in-out infinite;
  filter: drop-shadow(0 4px 8px rgba(102, 126, 234, 0.3));
  margin-right: 8px;
}

.vp-home-features .vp-feature:nth-child(1) h2::first-letter,
.vp-home-features .vp-feature:nth-child(1) h2 span:first-child {
  animation-delay: 0s;
}

.vp-home-features .vp-feature:nth-child(2) h2::first-letter,
.vp-home-features .vp-feature:nth-child(2) h2 span:first-child {
  animation-delay: 0.5s;
}

.vp-home-features .vp-feature:nth-child(3) h2::first-letter,
.vp-home-features .vp-feature:nth-child(3) h2 span:first-child {
  animation-delay: 1s;
}

@keyframes iconFloat {
  0%, 100% {
    transform: translateY(0) rotate(0deg) scale(1);
  }
  25% {
    transform: translateY(-8px) rotate(5deg) scale(1.1);
  }
  50% {
    transform: translateY(-12px) rotate(0deg) scale(1.15);
  }
  75% {
    transform: translateY(-8px) rotate(-5deg) scale(1.1);
  }
}

.vp-home-features .vp-feature:hover h2 {
  transform: translateX(5px);
}

.vp-home-features .vp-feature:hover h2::first-letter,
.vp-home-features .vp-feature:hover h2 span:first-child {
  animation-duration: 1s;
  transform: scale(1.3) rotate(360deg);
}

/* Feature 内容 */
.vp-home-features .vp-feature p {
  color: #666;
  font-size: 1.1rem;
  line-height: 1.8;
  margin: 0;
  position: relative;
  z-index: 1;
  transition: all 0.3s ease;
}

.vp-home-features .vp-feature:hover p {
  color: #333;
  transform: translateX(5px);
}

/* Feature 悬停效果 */
.vp-home-features .vp-feature:hover {
  transform: translateY(-15px) scale(1.03) rotateY(5deg);
  box-shadow: 0 25px 70px rgba(102, 126, 234, 0.4),
              0 0 40px rgba(118, 75, 162, 0.2);
  border-color: rgba(102, 126, 234, 0.6);
  background: rgba(255, 255, 255, 0.9);
}

/* Feature 卡片内部光效 */
.vp-home-features .vp-feature {
  background-image: 
    linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, transparent 50%),
    linear-gradient(225deg, rgba(118, 75, 162, 0.05) 0%, transparent 50%);
  background-size: 200% 200%;
  background-position: 0% 0%;
  transition: background-position 0.5s ease;
}

.vp-home-features .vp-feature:hover {
  background-position: 100% 100%;
}

/* 技术栈展示 */
.tech-stack {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  margin: 60px auto;
  padding: 30px;
  flex-wrap: wrap;
  max-width: 1200px;
}

.tech-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 20px 30px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  cursor: default;
  font-weight: 600;
  color: #333;
}

.tech-item:hover {
  transform: translateY(-8px) scale(1.1);
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
  background: rgba(255, 255, 255, 0.95);
}

.tech-icon {
  font-size: 2.5rem;
  animation: bounce 2s ease-in-out infinite;
  display: block;
}

.tech-item:nth-child(2) .tech-icon {
  animation-delay: 0.2s;
}

.tech-item:nth-child(3) .tech-icon {
  animation-delay: 0.4s;
}

.tech-item:nth-child(4) .tech-icon {
  animation-delay: 0.6s;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .vp-home-hero {
    padding: 40px 20px;
    min-height: 60vh;
  }
  
  .vp-home-hero img {
    width: 120px;
    height: 120px;
  }
  
  .vp-home-hero .vp-home-hero-actions {
    flex-direction: column;
    align-items: stretch;
  }
  
  .vp-home-hero .vp-home-hero-actions .vp-button {
    width: 100%;
  }
  
  .tech-stack {
    gap: 15px;
  }
  
  .tech-item {
    padding: 15px 20px;
    font-size: 0.9rem;
  }
  
  .tech-icon {
    font-size: 2rem;
  }
}

/* 滚动条美化 */
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.05);
}

::-webkit-scrollbar-thumb {
  background: var(--vp-home-hero-name-background);
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--gradient-1);
}

/* 页面加载动画 */
@keyframes pageLoad {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.vp-home-hero > * {
  animation: pageLoad 0.8s ease-out both;
}

.vp-home-hero > *:nth-child(1) { animation-delay: 0.1s; }
.vp-home-hero > *:nth-child(2) { animation-delay: 0.2s; }
.vp-home-hero > *:nth-child(3) { animation-delay: 0.3s; }
</style>
