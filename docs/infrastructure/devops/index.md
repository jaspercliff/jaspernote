---
sidebar_position: 1
---

import Link from '@docusaurus/Link';


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
        无守护进程、支持非 Root 运行的安全容器引擎
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
