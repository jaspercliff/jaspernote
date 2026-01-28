---
sidebar_position: 1
title: Java 学习路线图
---

import Link from '@docusaurus/Link';

# Java 学习路线图（从青铜到大神）

> 目标：从「能写代码」到「能设计系统」，用一条清晰可执行的路线把 Java 技术栈串起来。

<div className="java-roadmap">

  <div className="java-roadmap-row">
    <Link className="java-roadmap-card" to="/docs/java/roadmap/bronze">
      <div className="java-roadmap-badge">阶段一 · 青铜</div>
      <div className="java-roadmap-title">夯实 Java 核心（Core Java）</div>
      <div className="java-roadmap-desc">
        完全掌握 Java 语言本身，为后续框架与分布式打下坚实基础。
      </div>
      <div className="java-roadmap-tags">
        <span className="java-roadmap-tag">基础语法 / OOP</span>
        <span className="java-roadmap-tag">集合框架</span>
        <span className="java-roadmap-tag">异常 &amp; 泛型</span>
        <span className="java-roadmap-tag">I/O &amp; NIO</span>
        <span className="java-roadmap-tag">Java 8-21 新特性</span>
      </div>
    </Link>

    <div className="java-roadmap-arrow">➜</div>

    <Link className="java-roadmap-card" to="/docs/java/roadmap/silver">
      <div className="java-roadmap-badge">阶段二 · 白银</div>
      <div className="java-roadmap-title">工程化与持久化（Database &amp; Tools）</div>
      <div className="java-roadmap-desc">
        能够参与团队开发，完成从代码到数据库、从构建到版本管理的完整闭环。
      </div>
      <div className="java-roadmap-tags">
        <span className="java-roadmap-tag">Maven / Gradle</span>
        <span className="java-roadmap-tag">MySQL / PostgreSQL</span>
        <span className="java-roadmap-tag">索引 &amp; 事务 &amp; MVCC</span>
        <span className="java-roadmap-tag">ORM / MyBatis-Plus</span>
        <span className="java-roadmap-tag">Git 流程</span>
      </div>
    </Link>
  </div>

  <div className="java-roadmap-row">
    <Link className="java-roadmap-card" to="/docs/java/roadmap/gold">
      <div className="java-roadmap-badge">阶段三 · 黄金</div>
      <div className="java-roadmap-title">企业级主流框架（Spring Family）</div>
      <div className="java-roadmap-desc">
        掌握国内 90% 公司使用的 Spring 全家桶，胜任主流企业级项目开发。
      </div>
      <div className="java-roadmap-tags">
        <span className="java-roadmap-tag">Spring IOC &amp; AOP</span>
        <span className="java-roadmap-tag">Spring Boot 3.x</span>
        <span className="java-roadmap-tag">RESTful API</span>
        <span className="java-roadmap-tag">JUnit / Mockito</span>
        <span className="java-roadmap-tag">Redis / 缓存设计</span>
        <span className="java-roadmap-tag">消息队列 MQ</span>
      </div>
    </Link>

    <div className="java-roadmap-arrow">➜</div>

    <Link className="java-roadmap-card" to="/docs/java/roadmap/platinum">
      <div className="java-roadmap-badge">阶段四 · 铂金</div>
      <div className="java-roadmap-title">分布式与架构设计（Microservices）</div>
      <div className="java-roadmap-desc">
        能够设计和维护高并发、高可用的分布式系统，理解微服务背后的权衡。
      </div>
      <div className="java-roadmap-tags">
        <span className="java-roadmap-tag">Spring Cloud Alibaba</span>
        <span className="java-roadmap-tag">Nacos / Sentinel / Gateway</span>
        <span className="java-roadmap-tag">分布式事务 / Seata</span>
        <span className="java-roadmap-tag">Docker / K8s</span>
        <span className="java-roadmap-tag">监控 &amp; 链路追踪</span>
      </div>
    </Link>
  </div>

  <div className="java-roadmap-row">
    <Link className="java-roadmap-card" to="/docs/java/roadmap/master">
      <div className="java-roadmap-badge">阶段五 · 大神</div>
      <div className="java-roadmap-title">底层钻研与 AI 赋能（Expert &amp; AI）</div>
      <div className="java-roadmap-desc">
        从「写业务」升级为「雕刻系统」，在性能、并发与 AI 方向深度钻研。
      </div>
      <div className="java-roadmap-tags">
        <span className="java-roadmap-tag">JMM &amp; JVM 调优</span>
        <span className="java-roadmap-tag">GC / ZGC 实战</span>
        <span className="java-roadmap-tag">JUC &amp; 虚拟线程</span>
        <span className="java-roadmap-tag">LangChain4j / RAG</span>
        <span className="java-roadmap-tag">GraalVM Native Image</span>
      </div>
    </Link>
  </div>

</div>

> 提示：上面每个阶段卡片现在都已经是可点击的链接（`to="/docs/java/roadmap/xxx"`）。  
> 你只需要把这些链接改成你真实的文档路径，比如 `/docs/java/basic/...`、`/docs/java/framework/...` 就可以了。

