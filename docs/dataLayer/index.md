import Link from '@docusaurus/Link';

# data layer

## relational 

<div className="roadmap-row">

  <Link className="roadmap-card" to="/docs/dataLayer/relational/mysql/">
    <div className="roadmap-badge">mysql</div>
    <div className="roadmap-title">MySQL</div>
    <div className="roadmap-desc">
      主流开源关系型数据库，事务、索引与执行计划
    </div>
    <div className="roadmap-tags">
      <span className="roadmap-tag">事务</span>
      <span className="roadmap-tag">索引</span>
      <span className="roadmap-tag">性能优化</span>
    </div>
  </Link>

  <Link className="roadmap-card" to="/docs/dataLayer/relational/postgresql/">
    <div className="roadmap-badge">postgresql</div>
    <div className="roadmap-title">PostgreSQL</div>
    <div className="roadmap-desc">
      功能丰富的企业级关系型数据库
    </div>
    <div className="roadmap-tags">
      <span className="roadmap-tag">扩展性</span>
      <span className="roadmap-tag">事务</span>
    </div>
  </Link>

  <Link className="roadmap-card" to="/docs/dataLayer/relational/oracle/">
    <div className="roadmap-badge">oracle</div>
    <div className="roadmap-title">Oracle</div>
    <div className="roadmap-desc">
      传统企业常用商业数据库与 PL/SQL
    </div>
    <div className="roadmap-tags">
      <span className="roadmap-tag">PL/SQL</span>
      <span className="roadmap-tag">权限</span>
    </div>
  </Link>

  <Link className="roadmap-card" to="/docs/dataLayer/relational/mariadb/">
    <div className="roadmap-badge">mariadb</div>
    <div className="roadmap-title">MariaDB</div>
    <div className="roadmap-desc">
      MySQL 分支，兼容且增强的开源数据库
    </div>
    <div className="roadmap-tags">
      <span className="roadmap-tag">兼容</span>
      <span className="roadmap-tag">开源</span>
    </div>
  </Link>

  <Link className="roadmap-card" to="/docs/dataLayer/relational/h2/">
    <div className="roadmap-badge">h2</div>
    <div className="roadmap-title">H2</div>
    <div className="roadmap-desc">
      轻量级内存数据库，常用于开发与测试
    </div>
    <div className="roadmap-tags">
      <span className="roadmap-tag">内存数据库</span>
      <span className="roadmap-tag">嵌入式</span>
    </div>
  </Link>

  <Link className="roadmap-card" to="/docs/dataLayer/relational/hsqldb/">
    <div className="roadmap-badge">hsqldb</div>
    <div className="roadmap-title">HSQLDB</div>
    <div className="roadmap-desc">
      纯 Java 的轻量级关系型数据库
    </div>
    <div className="roadmap-tags">
      <span className="roadmap-tag">嵌入式</span>
      <span className="roadmap-tag">Java</span>
    </div>
  </Link>

</div>

## nosql 

<div className="roadmap-row">

  <Link className="roadmap-card" to="/docs/dataLayer/nosql/redis/">
    <div className="roadmap-badge">redis</div>
    <div className="roadmap-title">Redis</div>
    <div className="roadmap-desc">
      高性能 KV 存储，缓存、分布式锁与消息队列
    </div>
    <div className="roadmap-tags">
      <span className="roadmap-tag">缓存</span>
      <span className="roadmap-tag">分布式锁</span>
      <span className="roadmap-tag">消息队列</span>
    </div>
  </Link>

  <Link className="roadmap-card" to="/docs/dataLayer/nosql/es/">
    <div className="roadmap-badge">es</div>
    <div className="roadmap-title">Elasticsearch</div>
    <div className="roadmap-desc">
      分布式搜索与分析引擎
    </div>
    <div className="roadmap-tags">
      <span className="roadmap-tag">全文检索</span>
      <span className="roadmap-tag">聚合</span>
    </div>
  </Link>

  <Link className="roadmap-card" to="/docs/dataLayer/nosql/valkey/">
    <div className="roadmap-badge">valkey</div>
    <div className="roadmap-title">Valkey</div>
    <div className="roadmap-desc">
      Redis 协议兼容的社区分支实现
    </div>
    <div className="roadmap-tags">
      <span className="roadmap-tag">兼容 Redis</span>
      <span className="roadmap-tag">开源社区</span>
    </div>
  </Link>

  <Link className="roadmap-card" to="/docs/dataLayer/nosql/redisson/">
    <div className="roadmap-badge">redisson</div>
    <div className="roadmap-title">Redisson</div>
    <div className="roadmap-desc">
      Redis Java 客户端与分布式工具包
    </div>
    <div className="roadmap-tags">
      <span className="roadmap-tag">Java</span>
      <span className="roadmap-tag">分布式工具</span>
    </div>
  </Link>

</div>

## connected pool 

<div className="roadmap-row">

  <Link className="roadmap-card" to="/docs/dataLayer/connectPool/druid/">
    <div className="roadmap-badge">druid</div>
    <div className="roadmap-title">Druid</div>
    <div className="roadmap-desc">
      阿里开源数据库连接池与监控
    </div>
    <div className="roadmap-tags">
      <span className="roadmap-tag">连接池</span>
      <span className="roadmap-tag">监控</span>
    </div>
  </Link>

  <Link className="roadmap-card" to="/docs/dataLayer/connectPool/hikari/">
    <div className="roadmap-badge">hikari</div>
    <div className="roadmap-title">HikariCP</div>
    <div className="roadmap-desc">
      轻量高性能数据库连接池
    </div>
    <div className="roadmap-tags">
      <span className="roadmap-tag">高性能</span>
      <span className="roadmap-tag">连接池</span>
    </div>
  </Link>

</div>

## sharding

<div className="roadmap-row">

  <Link className="roadmap-card" to="/docs/dataLayer/sharding/">
    <div className="roadmap-badge">sharding</div>
    <div className="roadmap-title">分库分表</div>
    <div className="roadmap-desc">
      通过拆分库表应对数据量与并发量增长
    </div>
    <div className="roadmap-tags">
      <span className="roadmap-tag">水平拆分</span>
      <span className="roadmap-tag">垂直拆分</span>
    </div>
  </Link>

  <Link className="roadmap-card" to="/docs/dataLayer/sharding/shardingjdbc/">
    <div className="roadmap-badge">shardingjdbc</div>
    <div className="roadmap-title">Sharding-JDBC</div>
    <div className="roadmap-desc">
      基于 JDBC 的分库分表中间件
    </div>
    <div className="roadmap-tags">
      <span className="roadmap-tag">中间件</span>
      <span className="roadmap-tag">Java</span>
    </div>
  </Link>

  <Link className="roadmap-card" to="/docs/dataLayer/sharding/mycat/">
    <div className="roadmap-badge">mycat</div>
    <div className="roadmap-title">MyCAT</div>
    <div className="roadmap-desc">
      基于协议层的数据库分库分表中间件
    </div>
    <div className="roadmap-tags">
      <span className="roadmap-tag">中间件</span>
      <span className="roadmap-tag">分库分表</span>
    </div>
  </Link>

</div>

## distributed 

<div className="roadmap-row">

  <Link className="roadmap-card" to="/docs/dataLayer/distributed/">
    <div className="roadmap-badge">distributed</div>
    <div className="roadmap-title">分布式数据库概览</div>
    <div className="roadmap-desc">
      分布式事务、一致性与高可用架构
    </div>
    <div className="roadmap-tags">
      <span className="roadmap-tag">CAP</span>
      <span className="roadmap-tag">高可用</span>
    </div>
  </Link>

  <Link className="roadmap-card" to="/docs/dataLayer/distributed/tdsql/">
    <div className="roadmap-badge">tdsql</div>
    <div className="roadmap-title">TDSQL</div>
    <div className="roadmap-desc">
      分布式金融级数据库方案
    </div>
    <div className="roadmap-tags">
      <span className="roadmap-tag">金融级</span>
      <span className="roadmap-tag">分布式</span>
    </div>
  </Link>

  <Link className="roadmap-card" to="/docs/dataLayer/distributed/oceanbase/">
    <div className="roadmap-badge">oceanbase</div>
    <div className="roadmap-title">OceanBase</div>
    <div className="roadmap-desc">
      分布式关系型数据库，兼容多种协议
    </div>
    <div className="roadmap-tags">
      <span className="roadmap-tag">分布式</span>
      <span className="roadmap-tag">高可用</span>
    </div>
  </Link>

</div>

