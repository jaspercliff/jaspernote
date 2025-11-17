export const nav = [
  {
    text: "导航",
    link: "/public/nav/index",
  },
  {
    text: "java",
    items: [
      {
        text: "java基础",
        link: "/java/basic/index.md",
      },
      { text: "dev tools", link: "/java/devTools/index.md" },
      { text: "常用类方法", link: "/java/basic/commonClass/index.md" },
      { text: "新特性", link: "/java/basic/newFeature/index.md" },
      { text: "juc", link: "/java/basic/juc/index.md" },
      { text: "jvm", link: "/java/jvm/index.md" },
      { text: "framework", link: "/java/framework/index.md" },
      { text: "utils", link: "/java/utils/index.md" },
    ],
  },
  {
    text: "设计模式",
    link: "/designPattern/index.md",
  },
  {
    text: "中间件",
    items: [
      { text: "minio", link: "/java/middleware/minio/index.md" },
      { text: "rocketmq", link: "/java/middleware/rocketmq/index.md" },
    ],
  },
  {
    text: "数据层",
    items: [
      {
        text: "关系型数据库（RDBMS）",
        items: [
          {
            text: "PostgreSQL",
            link: "/dataLayer/relational/postgresql/index.md",
          },
          { text: "MySQL", link: "/dataLayer/relational/mysql/index.md" },
          { text: "Oracle", link: "/dataLayer/relational/oracle/index.md" },
          { text: "SQLite", link: "/dataLayer/relational/sqlite/index.md" },
          { text: "H2", link: "/dataLayer/relational/h2/index.md" },
          { text: "HSQLDB", link: "/dataLayer/relational/hsqldb/index.md" }, // 文字可美化
        ],
      },
      {
        text: "分布式数据库",
        items: [
          { text: "TDSQL", link: "/dataLayer/distributed/tdsql/index.md" }, // 建议路径也分类
          {
            text: "OceanBase",
            link: "/dataLayer/distributed/oceanbase/index.md",
          },
        ],
      },
      {
        text: "NoSQL",
        items: [
          { text: "Redis", link: "/dataLayer/nosql/redis/index.md" },
          { text: "Elasticsearch", link: "/dataLayer/nosql/es/index.md" }, // 文字建议写全称
        ],
      },
      {
        text: "分库分表（Sharding）",
        items: [
          { text: "MyCat", link: "/dataLayer/sharding/mycat/index.md" },
          {
            text: "ShardingSphere-JDBC",
            link: "/dataLayer/sharding/shardingjdbc/index.md",
          }, // 修正链接！
        ],
      },
      {
        text: "连接池（Connection Pool）",
        items: [
          { text: "Druid", link: "/dataLayer/connection-pool/druid/index.md" },
          {
            text: "HikariCP",
            link: "/dataLayer/connection-pool/hikari/index.md",
          }, // 修复 % 错误！
        ],
      },
      {
        text: "通用 SQL 与工具",
        items: [
          { text: "SQL 规范与最佳实践", link: "/dataLayer/tools/sql/index.md" }, // 建议加 .md 或 index.md
        ],
      },
    ],
  },
  { text: "数据结构", link: "/dataStructure/index.md" },
  {
    text: "os",
    link: "/os/index",
  },
  {
    text: "python",
    link: "/python/index.md",
  },
  // {
  //     text: "cpp",
  //     link: "/cpp/dataType.md",
  // },
  {
    text: "groovy",
    link: "/groovy/index.md",
  },
  {
    text: "kotlin",
    link: "/kotlin/index.md",
  },
  {
    text: "lua",
    link: "/lua/index.md",
  },
  {
    text: "front",
    link: "/front/index.md",
  },
  {
    text: "源码解析",
    link: "/sourceCode/index.md",
  },
  {
    text: "utils",
    items: [
      {
        text: "git",
        link: "utils/git/index.md",
      },
      {
        text: "jmeter",
        link: "utils/jmeter/index.md",
      },
      {
        text: "vim",
        link: "utils/vim/index.md",
      },
      {
        text: "neovim",
        link: "utils/neovim/index.md",
      },
    ],
  },
];
