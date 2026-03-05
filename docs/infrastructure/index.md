# infrastructure

import Link from '@docusaurus/Link';

## devops

<div className="roadmap-row">

  <Link className="roadmap-card" to="/docs/infrastructure/devops/nginx">
    <div className="roadmap-badge">Nginx</div>
    <div className="roadmap-title">Nginx</div>
    <div className="roadmap-desc">
        高性能 Web 服务器、反向代理及负载均衡器
    </div>
    <div className="roadmap-tags">
      <span className="roadmap-tag">Proxy</span>
      <span className="roadmap-tag">Web Server</span>
    </div>
  </Link>

  <Link className="roadmap-card" to="/docs/infrastructure/devops/containerd">
    <div className="roadmap-badge">containerd</div>
    <div className="roadmap-title">containerd</div>
    <div className="roadmap-desc">
        行业标准的底层容器运行时，专注于容器生命周期管理
    </div>
    <div className="roadmap-tags">
      <span className="roadmap-tag">Runtime</span>
      <span className="roadmap-tag">CRI</span>
    </div>
  </Link>

  <Link className="roadmap-card" to="/docs/infrastructure/devops/docker">
    <div className="roadmap-badge">Docker</div>
    <div className="roadmap-title">Docker</div>
    <div className="roadmap-desc">
        全栈容器开发平台，提供构建、打包及运行的一站式体验
    </div>
    <div className="roadmap-tags">
      <span className="roadmap-tag">Build</span>
      <span className="roadmap-tag">Ship</span>
      <span className="roadmap-tag">Run</span>
    </div>
  </Link>

  <Link className="roadmap-card" to="/docs/infrastructure/devops/podman">
    <div className="roadmap-badge">Podman</div>
    <div className="roadmap-title">Podman</div>
    <div className="roadmap-desc">
        无守护进程、支持非 Root(rootless) 运行的安全容器引擎
    </div>
    <div className="roadmap-tags">
      <span className="roadmap-tag">Daemonless</span>
      <span className="roadmap-tag">Rootless</span>
    </div>
  </Link>

  <Link className="roadmap-card" to="/docs/infrastructure/devops/k8s">
    <div className="roadmap-badge">Kubernetes</div>
    <div className="roadmap-title">K8s</div>
    <div className="roadmap-desc">
        工业级容器编排系统，实现大规模集群的自动化调度
    </div>
    <div className="roadmap-tags">
      <span className="roadmap-tag">Orchestration</span>
      <span className="roadmap-tag">Cluster</span>
    </div>
  </Link>

</div>

## operating system

<div className="roadmap-row">

  <Link className="roadmap-card" to="/docs/infrastructure/os/hardware/">
    <div className="roadmap-badge">Hardware</div>
    <div className="roadmap-title">硬件基础</div>
    <div className="roadmap-desc">
        CPU 等硬件基础知识，为系统调优提供底层视角
    </div>
    <div className="roadmap-tags">
      <span className="roadmap-tag">CPU</span>
      <span className="roadmap-tag">性能</span>
    </div>
  </Link>


  <Link className="roadmap-card" to="/docs/infrastructure/os/windows/">
    <div className="roadmap-badge">Windows</div>
    <div className="roadmap-title">Windows</div>
    <div className="roadmap-desc">
        桌面环境与开发环境的基础配置与日常运维
    </div>
    <div className="roadmap-tags">
      <span className="roadmap-tag">Disk</span>
      <span className="roadmap-tag">Boot</span>
    </div>
  </Link>

  <Link className="roadmap-card" to="/docs/infrastructure/os/mac/">
    <div className="roadmap-badge">macOS</div>
    <div className="roadmap-title">macOS</div>
    <div className="roadmap-desc">
        开发者常用桌面系统，熟悉终端、brew 与快捷操作
    </div>
    <div className="roadmap-tags">
      <span className="roadmap-tag">Homebrew</span>
      <span className="roadmap-tag">Shortcut</span>
    </div>
  </Link>

  <Link className="roadmap-card" to="/docs/infrastructure/os/linux/">
    <div className="roadmap-badge">Linux</div>
    <div className="roadmap-title">Linux</div>
    <div className="roadmap-desc">
        开发与服务器场景下最常见的操作系统，掌握命令行与系统管理
    </div>
    <div className="roadmap-tags">
      <span className="roadmap-tag">Shell</span>
      <span className="roadmap-tag">Process</span>
      <span className="roadmap-tag">FileSystem</span>
    </div>
  </Link>

  <Link className="roadmap-card" to="/docs/infrastructure/os/archlinux/">
    <div className="roadmap-badge">Arch Linux</div>
    <div className="roadmap-title">Arch Linux</div>
    <div className="roadmap-desc">
        极客友好的滚动发行版，适合深度定制桌面与终端体验
    </div>
    <div className="roadmap-tags">
      <span className="roadmap-tag">Pacman</span>
      <span className="roadmap-tag">Desktop</span>
    </div>
  </Link>



</div>

## design

<div className="roadmap-row">

  <Link className="roadmap-card" to="/docs/infrastructure/design/systemDesign/">
    <div className="roadmap-badge">System Design</div>
    <div className="roadmap-title">系统设计</div>
    <div className="roadmap-desc">
        从整体架构、事件驱动、多租户到 SSO 的系统设计实践
    </div>
    <div className="roadmap-tags">
      <span className="roadmap-tag">Architecture</span>
      <span className="roadmap-tag">Multi-tenant</span>
      <span className="roadmap-tag">SSO</span>
    </div>
  </Link>

  <Link className="roadmap-card" to="/docs/infrastructure/design/distributed/">
    <div className="roadmap-badge">Distributed</div>
    <div className="roadmap-title">分布式设计</div>
    <div className="roadmap-desc">
        CAP 理论、全局唯一 ID、分布式锁等核心概念与实现
    </div>
    <div className="roadmap-tags">
      <span className="roadmap-tag">CAP</span>
      <span className="roadmap-tag">Global ID</span>
      <span className="roadmap-tag">Lock</span>
    </div>
  </Link>

  <Link className="roadmap-card" to="/docs/infrastructure/design/systemConcept/zeroCopy">
    <div className="roadmap-badge">Zero Copy</div>
    <div className="roadmap-title">零拷贝</div>
    <div className="roadmap-desc">
        操作系统与网络中常见的性能优化技术概念
    </div>
    <div className="roadmap-tags">
      <span className="roadmap-tag">IO</span>
      <span className="roadmap-tag">性能优化</span>
    </div>
  </Link>

</div>
