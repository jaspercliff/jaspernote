import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/jaspernote/blog',
    component: ComponentCreator('/jaspernote/blog', 'f8b'),
    exact: true
  },
  {
    path: '/jaspernote/blog/archive',
    component: ComponentCreator('/jaspernote/blog/archive', '542'),
    exact: true
  },
  {
    path: '/jaspernote/blog/authors',
    component: ComponentCreator('/jaspernote/blog/authors', '0d9'),
    exact: true
  },
  {
    path: '/jaspernote/blog/authors/all-sebastien-lorber-articles',
    component: ComponentCreator('/jaspernote/blog/authors/all-sebastien-lorber-articles', '6f6'),
    exact: true
  },
  {
    path: '/jaspernote/blog/authors/yangshun',
    component: ComponentCreator('/jaspernote/blog/authors/yangshun', '9ff'),
    exact: true
  },
  {
    path: '/jaspernote/blog/first-blog-post',
    component: ComponentCreator('/jaspernote/blog/first-blog-post', 'b01'),
    exact: true
  },
  {
    path: '/jaspernote/blog/long-blog-post',
    component: ComponentCreator('/jaspernote/blog/long-blog-post', '04b'),
    exact: true
  },
  {
    path: '/jaspernote/blog/mdx-blog-post',
    component: ComponentCreator('/jaspernote/blog/mdx-blog-post', '57d'),
    exact: true
  },
  {
    path: '/jaspernote/blog/nvim-keymap',
    component: ComponentCreator('/jaspernote/blog/nvim-keymap', '667'),
    exact: true
  },
  {
    path: '/jaspernote/blog/tags',
    component: ComponentCreator('/jaspernote/blog/tags', 'b5e'),
    exact: true
  },
  {
    path: '/jaspernote/blog/tags/docusaurus',
    component: ComponentCreator('/jaspernote/blog/tags/docusaurus', '1b6'),
    exact: true
  },
  {
    path: '/jaspernote/blog/tags/facebook',
    component: ComponentCreator('/jaspernote/blog/tags/facebook', 'e9a'),
    exact: true
  },
  {
    path: '/jaspernote/blog/tags/hell',
    component: ComponentCreator('/jaspernote/blog/tags/hell', '7dc'),
    exact: true
  },
  {
    path: '/jaspernote/blog/tags/hola',
    component: ComponentCreator('/jaspernote/blog/tags/hola', '9af'),
    exact: true
  },
  {
    path: '/jaspernote/blog/welcome',
    component: ComponentCreator('/jaspernote/blog/welcome', 'e7f'),
    exact: true
  },
  {
    path: '/jaspernote/helloReact',
    component: ComponentCreator('/jaspernote/helloReact', '95b'),
    exact: true
  },
  {
    path: '/jaspernote/markdown-page',
    component: ComponentCreator('/jaspernote/markdown-page', 'cd1'),
    exact: true
  },
  {
    path: '/jaspernote/docs',
    component: ComponentCreator('/jaspernote/docs', '166'),
    routes: [
      {
        path: '/jaspernote/docs',
        component: ComponentCreator('/jaspernote/docs', 'f3c'),
        routes: [
          {
            path: '/jaspernote/docs/tags',
            component: ComponentCreator('/jaspernote/docs/tags', 'd18'),
            exact: true
          },
          {
            path: '/jaspernote/docs/tags/creational',
            component: ComponentCreator('/jaspernote/docs/tags/creational', '513'),
            exact: true
          },
          {
            path: '/jaspernote/docs',
            component: ComponentCreator('/jaspernote/docs', '7aa'),
            routes: [
              {
                path: '/jaspernote/docs/c/',
                component: ComponentCreator('/jaspernote/docs/c/', '83f'),
                exact: true
              },
              {
                path: '/jaspernote/docs/dataLayer/',
                component: ComponentCreator('/jaspernote/docs/dataLayer/', '6bd'),
                exact: true
              },
              {
                path: '/jaspernote/docs/dataLayer/connectPool/',
                component: ComponentCreator('/jaspernote/docs/dataLayer/connectPool/', 'af9'),
                exact: true,
                sidebar: "connectPool"
              },
              {
                path: '/jaspernote/docs/dataLayer/connectPool/druid/',
                component: ComponentCreator('/jaspernote/docs/dataLayer/connectPool/druid/', 'de1'),
                exact: true,
                sidebar: "connectPool"
              },
              {
                path: '/jaspernote/docs/dataLayer/connectPool/hikari/',
                component: ComponentCreator('/jaspernote/docs/dataLayer/connectPool/hikari/', 'c1c'),
                exact: true,
                sidebar: "connectPool"
              },
              {
                path: '/jaspernote/docs/dataLayer/distributed/',
                component: ComponentCreator('/jaspernote/docs/dataLayer/distributed/', '5b1'),
                exact: true,
                sidebar: "distributed"
              },
              {
                path: '/jaspernote/docs/dataLayer/distributed/oceanbase/',
                component: ComponentCreator('/jaspernote/docs/dataLayer/distributed/oceanbase/', '644'),
                exact: true,
                sidebar: "distributed"
              },
              {
                path: '/jaspernote/docs/dataLayer/distributed/tdsql/',
                component: ComponentCreator('/jaspernote/docs/dataLayer/distributed/tdsql/', 'a7a'),
                exact: true,
                sidebar: "distributed"
              },
              {
                path: '/jaspernote/docs/dataLayer/nosql/',
                component: ComponentCreator('/jaspernote/docs/dataLayer/nosql/', '060'),
                exact: true,
                sidebar: "nosql"
              },
              {
                path: '/jaspernote/docs/dataLayer/nosql/es/',
                component: ComponentCreator('/jaspernote/docs/dataLayer/nosql/es/', 'b23'),
                exact: true,
                sidebar: "nosql"
              },
              {
                path: '/jaspernote/docs/dataLayer/nosql/es/01 install',
                component: ComponentCreator('/jaspernote/docs/dataLayer/nosql/es/01 install', '43e'),
                exact: true,
                sidebar: "nosql"
              },
              {
                path: '/jaspernote/docs/dataLayer/nosql/es/02 crud',
                component: ComponentCreator('/jaspernote/docs/dataLayer/nosql/es/02 crud', '556'),
                exact: true,
                sidebar: "nosql"
              },
              {
                path: '/jaspernote/docs/dataLayer/nosql/es/02 query condition',
                component: ComponentCreator('/jaspernote/docs/dataLayer/nosql/es/02 query condition', '8f2'),
                exact: true,
                sidebar: "nosql"
              },
              {
                path: '/jaspernote/docs/dataLayer/nosql/es/04映射关系',
                component: ComponentCreator('/jaspernote/docs/dataLayer/nosql/es/04映射关系', 'ba5'),
                exact: true,
                sidebar: "nosql"
              },
              {
                path: '/jaspernote/docs/dataLayer/nosql/redis/',
                component: ComponentCreator('/jaspernote/docs/dataLayer/nosql/redis/', '1dd'),
                exact: true,
                sidebar: "nosql"
              },
              {
                path: '/jaspernote/docs/dataLayer/nosql/redis/basic/commonCommand',
                component: ComponentCreator('/jaspernote/docs/dataLayer/nosql/redis/basic/commonCommand', '4d9'),
                exact: true,
                sidebar: "nosql"
              },
              {
                path: '/jaspernote/docs/dataLayer/nosql/redis/dataType/',
                component: ComponentCreator('/jaspernote/docs/dataLayer/nosql/redis/dataType/', 'b8d'),
                exact: true,
                sidebar: "nosql"
              },
              {
                path: '/jaspernote/docs/dataLayer/nosql/redis/dataType/bitmap',
                component: ComponentCreator('/jaspernote/docs/dataLayer/nosql/redis/dataType/bitmap', 'c65'),
                exact: true,
                sidebar: "nosql"
              },
              {
                path: '/jaspernote/docs/dataLayer/nosql/redis/dataType/bloomfilter',
                component: ComponentCreator('/jaspernote/docs/dataLayer/nosql/redis/dataType/bloomfilter', 'd69'),
                exact: true,
                sidebar: "nosql"
              },
              {
                path: '/jaspernote/docs/dataLayer/nosql/redis/dataType/geo',
                component: ComponentCreator('/jaspernote/docs/dataLayer/nosql/redis/dataType/geo', '7e3'),
                exact: true,
                sidebar: "nosql"
              },
              {
                path: '/jaspernote/docs/dataLayer/nosql/redis/dataType/hash',
                component: ComponentCreator('/jaspernote/docs/dataLayer/nosql/redis/dataType/hash', '793'),
                exact: true,
                sidebar: "nosql"
              },
              {
                path: '/jaspernote/docs/dataLayer/nosql/redis/dataType/hyperoglog',
                component: ComponentCreator('/jaspernote/docs/dataLayer/nosql/redis/dataType/hyperoglog', '151'),
                exact: true,
                sidebar: "nosql"
              },
              {
                path: '/jaspernote/docs/dataLayer/nosql/redis/dataType/list',
                component: ComponentCreator('/jaspernote/docs/dataLayer/nosql/redis/dataType/list', 'd24'),
                exact: true,
                sidebar: "nosql"
              },
              {
                path: '/jaspernote/docs/dataLayer/nosql/redis/dataType/set',
                component: ComponentCreator('/jaspernote/docs/dataLayer/nosql/redis/dataType/set', 'f51'),
                exact: true,
                sidebar: "nosql"
              },
              {
                path: '/jaspernote/docs/dataLayer/nosql/redis/dataType/sortedSet',
                component: ComponentCreator('/jaspernote/docs/dataLayer/nosql/redis/dataType/sortedSet', 'd33'),
                exact: true,
                sidebar: "nosql"
              },
              {
                path: '/jaspernote/docs/dataLayer/nosql/redis/dataType/stream',
                component: ComponentCreator('/jaspernote/docs/dataLayer/nosql/redis/dataType/stream', 'bc0'),
                exact: true,
                sidebar: "nosql"
              },
              {
                path: '/jaspernote/docs/dataLayer/nosql/redis/dataType/string',
                component: ComponentCreator('/jaspernote/docs/dataLayer/nosql/redis/dataType/string', 'fc5'),
                exact: true,
                sidebar: "nosql"
              },
              {
                path: '/jaspernote/docs/dataLayer/nosql/redis/deploy/cluster',
                component: ComponentCreator('/jaspernote/docs/dataLayer/nosql/redis/deploy/cluster', '2cd'),
                exact: true,
                sidebar: "nosql"
              },
              {
                path: '/jaspernote/docs/dataLayer/nosql/redis/deploy/install',
                component: ComponentCreator('/jaspernote/docs/dataLayer/nosql/redis/deploy/install', '240'),
                exact: true,
                sidebar: "nosql"
              },
              {
                path: '/jaspernote/docs/dataLayer/nosql/redis/deploy/persistence',
                component: ComponentCreator('/jaspernote/docs/dataLayer/nosql/redis/deploy/persistence', '86a'),
                exact: true,
                sidebar: "nosql"
              },
              {
                path: '/jaspernote/docs/dataLayer/nosql/redis/deploy/replication',
                component: ComponentCreator('/jaspernote/docs/dataLayer/nosql/redis/deploy/replication', 'ef7'),
                exact: true,
                sidebar: "nosql"
              },
              {
                path: '/jaspernote/docs/dataLayer/nosql/redis/deploy/sentinel',
                component: ComponentCreator('/jaspernote/docs/dataLayer/nosql/redis/deploy/sentinel', '8c1'),
                exact: true,
                sidebar: "nosql"
              },
              {
                path: '/jaspernote/docs/dataLayer/nosql/redis/java/jedis/',
                component: ComponentCreator('/jaspernote/docs/dataLayer/nosql/redis/java/jedis/', 'bfd'),
                exact: true,
                sidebar: "nosql"
              },
              {
                path: '/jaspernote/docs/dataLayer/nosql/redis/java/springdataredis/',
                component: ComponentCreator('/jaspernote/docs/dataLayer/nosql/redis/java/springdataredis/', '1d1'),
                exact: true,
                sidebar: "nosql"
              },
              {
                path: '/jaspernote/docs/dataLayer/nosql/redis/java/springdataredis/serialization',
                component: ComponentCreator('/jaspernote/docs/dataLayer/nosql/redis/java/springdataredis/serialization', 'bb6'),
                exact: true,
                sidebar: "nosql"
              },
              {
                path: '/jaspernote/docs/dataLayer/nosql/redis/mult',
                component: ComponentCreator('/jaspernote/docs/dataLayer/nosql/redis/mult', '064'),
                exact: true,
                sidebar: "nosql"
              },
              {
                path: '/jaspernote/docs/dataLayer/nosql/redis/optimization',
                component: ComponentCreator('/jaspernote/docs/dataLayer/nosql/redis/optimization', '39c'),
                exact: true,
                sidebar: "nosql"
              },
              {
                path: '/jaspernote/docs/dataLayer/nosql/redis/pipeline',
                component: ComponentCreator('/jaspernote/docs/dataLayer/nosql/redis/pipeline', 'ba3'),
                exact: true,
                sidebar: "nosql"
              },
              {
                path: '/jaspernote/docs/dataLayer/nosql/redis/problem/cacheAvalanche',
                component: ComponentCreator('/jaspernote/docs/dataLayer/nosql/redis/problem/cacheAvalanche', 'e56'),
                exact: true,
                sidebar: "nosql"
              },
              {
                path: '/jaspernote/docs/dataLayer/nosql/redis/problem/cacheBreakdown',
                component: ComponentCreator('/jaspernote/docs/dataLayer/nosql/redis/problem/cacheBreakdown', 'e8e'),
                exact: true,
                sidebar: "nosql"
              },
              {
                path: '/jaspernote/docs/dataLayer/nosql/redis/problem/cachePenetration',
                component: ComponentCreator('/jaspernote/docs/dataLayer/nosql/redis/problem/cachePenetration', '5f8'),
                exact: true,
                sidebar: "nosql"
              },
              {
                path: '/jaspernote/docs/dataLayer/nosql/redis/problem/distributedLock',
                component: ComponentCreator('/jaspernote/docs/dataLayer/nosql/redis/problem/distributedLock', '10c'),
                exact: true,
                sidebar: "nosql"
              },
              {
                path: '/jaspernote/docs/dataLayer/nosql/redis/problem/feed',
                component: ComponentCreator('/jaspernote/docs/dataLayer/nosql/redis/problem/feed', '5eb'),
                exact: true,
                sidebar: "nosql"
              },
              {
                path: '/jaspernote/docs/dataLayer/nosql/redis/problem/globalId',
                component: ComponentCreator('/jaspernote/docs/dataLayer/nosql/redis/problem/globalId', '89d'),
                exact: true,
                sidebar: "nosql"
              },
              {
                path: '/jaspernote/docs/dataLayer/nosql/redis/problem/like',
                component: ComponentCreator('/jaspernote/docs/dataLayer/nosql/redis/problem/like', '3fc'),
                exact: true,
                sidebar: "nosql"
              },
              {
                path: '/jaspernote/docs/dataLayer/nosql/redis/problem/mq',
                component: ComponentCreator('/jaspernote/docs/dataLayer/nosql/redis/problem/mq', '470'),
                exact: true,
                sidebar: "nosql"
              },
              {
                path: '/jaspernote/docs/dataLayer/nosql/redis/problem/oversell',
                component: ComponentCreator('/jaspernote/docs/dataLayer/nosql/redis/problem/oversell', 'aab'),
                exact: true,
                sidebar: "nosql"
              },
              {
                path: '/jaspernote/docs/dataLayer/nosql/redis/problem/scrollPage',
                component: ComponentCreator('/jaspernote/docs/dataLayer/nosql/redis/problem/scrollPage', '801'),
                exact: true,
                sidebar: "nosql"
              },
              {
                path: '/jaspernote/docs/dataLayer/nosql/redis/problem/update',
                component: ComponentCreator('/jaspernote/docs/dataLayer/nosql/redis/problem/update', '78b'),
                exact: true,
                sidebar: "nosql"
              },
              {
                path: '/jaspernote/docs/dataLayer/nosql/redis/programmability/function/',
                component: ComponentCreator('/jaspernote/docs/dataLayer/nosql/redis/programmability/function/', 'fea'),
                exact: true,
                sidebar: "nosql"
              },
              {
                path: '/jaspernote/docs/dataLayer/nosql/redis/programmability/luascript/',
                component: ComponentCreator('/jaspernote/docs/dataLayer/nosql/redis/programmability/luascript/', 'cfe'),
                exact: true,
                sidebar: "nosql"
              },
              {
                path: '/jaspernote/docs/dataLayer/nosql/redis/programmability/luascript/debug',
                component: ComponentCreator('/jaspernote/docs/dataLayer/nosql/redis/programmability/luascript/debug', 'b6f'),
                exact: true,
                sidebar: "nosql"
              },
              {
                path: '/jaspernote/docs/dataLayer/nosql/redis/programmability/luascript/eval',
                component: ComponentCreator('/jaspernote/docs/dataLayer/nosql/redis/programmability/luascript/eval', '131'),
                exact: true,
                sidebar: "nosql"
              },
              {
                path: '/jaspernote/docs/dataLayer/nosql/redis/pubsub/',
                component: ComponentCreator('/jaspernote/docs/dataLayer/nosql/redis/pubsub/', '69e'),
                exact: true,
                sidebar: "nosql"
              },
              {
                path: '/jaspernote/docs/dataLayer/nosql/redis/spec',
                component: ComponentCreator('/jaspernote/docs/dataLayer/nosql/redis/spec', '156'),
                exact: true,
                sidebar: "nosql"
              },
              {
                path: '/jaspernote/docs/dataLayer/nosql/redis/transaction',
                component: ComponentCreator('/jaspernote/docs/dataLayer/nosql/redis/transaction', '729'),
                exact: true,
                sidebar: "nosql"
              },
              {
                path: '/jaspernote/docs/dataLayer/nosql/redisson/',
                component: ComponentCreator('/jaspernote/docs/dataLayer/nosql/redisson/', '52a'),
                exact: true,
                sidebar: "nosql"
              },
              {
                path: '/jaspernote/docs/dataLayer/nosql/redisson/intergration',
                component: ComponentCreator('/jaspernote/docs/dataLayer/nosql/redisson/intergration', 'fe2'),
                exact: true,
                sidebar: "nosql"
              },
              {
                path: '/jaspernote/docs/dataLayer/nosql/redisson/watchDog',
                component: ComponentCreator('/jaspernote/docs/dataLayer/nosql/redisson/watchDog', 'dec'),
                exact: true,
                sidebar: "nosql"
              },
              {
                path: '/jaspernote/docs/dataLayer/nosql/valkey/',
                component: ComponentCreator('/jaspernote/docs/dataLayer/nosql/valkey/', '79d'),
                exact: true,
                sidebar: "nosql"
              },
              {
                path: '/jaspernote/docs/dataLayer/relational/',
                component: ComponentCreator('/jaspernote/docs/dataLayer/relational/', '71a'),
                exact: true,
                sidebar: "relational"
              },
              {
                path: '/jaspernote/docs/dataLayer/relational/canal/',
                component: ComponentCreator('/jaspernote/docs/dataLayer/relational/canal/', '3b1'),
                exact: true,
                sidebar: "relational"
              },
              {
                path: '/jaspernote/docs/dataLayer/relational/h2/',
                component: ComponentCreator('/jaspernote/docs/dataLayer/relational/h2/', 'fe3'),
                exact: true,
                sidebar: "relational"
              },
              {
                path: '/jaspernote/docs/dataLayer/relational/hsqldb/',
                component: ComponentCreator('/jaspernote/docs/dataLayer/relational/hsqldb/', '7de'),
                exact: true,
                sidebar: "relational"
              },
              {
                path: '/jaspernote/docs/dataLayer/relational/mariadb/',
                component: ComponentCreator('/jaspernote/docs/dataLayer/relational/mariadb/', '700'),
                exact: true,
                sidebar: "relational"
              },
              {
                path: '/jaspernote/docs/dataLayer/relational/mariadb/install',
                component: ComponentCreator('/jaspernote/docs/dataLayer/relational/mariadb/install', '7c2'),
                exact: true,
                sidebar: "relational"
              },
              {
                path: '/jaspernote/docs/dataLayer/relational/mysql/',
                component: ComponentCreator('/jaspernote/docs/dataLayer/relational/mysql/', '97d'),
                exact: true,
                sidebar: "relational"
              },
              {
                path: '/jaspernote/docs/dataLayer/relational/mysql/01install',
                component: ComponentCreator('/jaspernote/docs/dataLayer/relational/mysql/01install', 'f1d'),
                exact: true,
                sidebar: "relational"
              },
              {
                path: '/jaspernote/docs/dataLayer/relational/mysql/04 explain',
                component: ComponentCreator('/jaspernote/docs/dataLayer/relational/mysql/04 explain', '519'),
                exact: true,
                sidebar: "relational"
              },
              {
                path: '/jaspernote/docs/dataLayer/relational/mysql/backup',
                component: ComponentCreator('/jaspernote/docs/dataLayer/relational/mysql/backup', 'de3'),
                exact: true,
                sidebar: "relational"
              },
              {
                path: '/jaspernote/docs/dataLayer/relational/mysql/basic',
                component: ComponentCreator('/jaspernote/docs/dataLayer/relational/mysql/basic', '1c6'),
                exact: true,
                sidebar: "relational"
              },
              {
                path: '/jaspernote/docs/dataLayer/relational/mysql/function',
                component: ComponentCreator('/jaspernote/docs/dataLayer/relational/mysql/function', '556'),
                exact: true,
                sidebar: "relational"
              },
              {
                path: '/jaspernote/docs/dataLayer/relational/mysql/functions/count',
                component: ComponentCreator('/jaspernote/docs/dataLayer/relational/mysql/functions/count', '5fb'),
                exact: true,
                sidebar: "relational"
              },
              {
                path: '/jaspernote/docs/dataLayer/relational/mysql/jdbc',
                component: ComponentCreator('/jaspernote/docs/dataLayer/relational/mysql/jdbc', '898'),
                exact: true,
                sidebar: "relational"
              },
              {
                path: '/jaspernote/docs/dataLayer/relational/mysql/log',
                component: ComponentCreator('/jaspernote/docs/dataLayer/relational/mysql/log', '7d4'),
                exact: true,
                sidebar: "relational"
              },
              {
                path: '/jaspernote/docs/dataLayer/relational/mysql/other',
                component: ComponentCreator('/jaspernote/docs/dataLayer/relational/mysql/other', '6ba'),
                exact: true,
                sidebar: "relational"
              },
              {
                path: '/jaspernote/docs/dataLayer/relational/mysql/privilege',
                component: ComponentCreator('/jaspernote/docs/dataLayer/relational/mysql/privilege', '48b'),
                exact: true,
                sidebar: "relational"
              },
              {
                path: '/jaspernote/docs/dataLayer/relational/mysql/problems/countDifference',
                component: ComponentCreator('/jaspernote/docs/dataLayer/relational/mysql/problems/countDifference', '0d5'),
                exact: true,
                sidebar: "relational"
              },
              {
                path: '/jaspernote/docs/dataLayer/relational/mysql/problems/delete和truncate的区别',
                component: ComponentCreator('/jaspernote/docs/dataLayer/relational/mysql/problems/delete和truncate的区别', '1ba'),
                exact: true,
                sidebar: "relational"
              },
              {
                path: '/jaspernote/docs/dataLayer/relational/mysql/problems/exist和in的区别',
                component: ComponentCreator('/jaspernote/docs/dataLayer/relational/mysql/problems/exist和in的区别', '0c5'),
                exact: true,
                sidebar: "relational"
              },
              {
                path: '/jaspernote/docs/dataLayer/relational/mysql/replication',
                component: ComponentCreator('/jaspernote/docs/dataLayer/relational/mysql/replication', 'dd6'),
                exact: true,
                sidebar: "relational"
              },
              {
                path: '/jaspernote/docs/dataLayer/relational/mysql/事务隔离级别',
                component: ComponentCreator('/jaspernote/docs/dataLayer/relational/mysql/事务隔离级别', 'f8c'),
                exact: true,
                sidebar: "relational"
              },
              {
                path: '/jaspernote/docs/dataLayer/relational/mysql/存储引擎',
                component: ComponentCreator('/jaspernote/docs/dataLayer/relational/mysql/存储引擎', 'bd4'),
                exact: true,
                sidebar: "relational"
              },
              {
                path: '/jaspernote/docs/dataLayer/relational/mysql/数据类型',
                component: ComponentCreator('/jaspernote/docs/dataLayer/relational/mysql/数据类型', '29d'),
                exact: true,
                sidebar: "relational"
              },
              {
                path: '/jaspernote/docs/dataLayer/relational/mysql/索引',
                component: ComponentCreator('/jaspernote/docs/dataLayer/relational/mysql/索引', '08c'),
                exact: true,
                sidebar: "relational"
              },
              {
                path: '/jaspernote/docs/dataLayer/relational/mysql/表的备份',
                component: ComponentCreator('/jaspernote/docs/dataLayer/relational/mysql/表的备份', '97a'),
                exact: true,
                sidebar: "relational"
              },
              {
                path: '/jaspernote/docs/dataLayer/relational/mysql/表连接',
                component: ComponentCreator('/jaspernote/docs/dataLayer/relational/mysql/表连接', '0e5'),
                exact: true,
                sidebar: "relational"
              },
              {
                path: '/jaspernote/docs/dataLayer/relational/mysql/锁及mvcc',
                component: ComponentCreator('/jaspernote/docs/dataLayer/relational/mysql/锁及mvcc', '0a0'),
                exact: true,
                sidebar: "relational"
              },
              {
                path: '/jaspernote/docs/dataLayer/relational/oracle/',
                component: ComponentCreator('/jaspernote/docs/dataLayer/relational/oracle/', 'eca'),
                exact: true,
                sidebar: "relational"
              },
              {
                path: '/jaspernote/docs/dataLayer/relational/oracle/container',
                component: ComponentCreator('/jaspernote/docs/dataLayer/relational/oracle/container', '940'),
                exact: true,
                sidebar: "relational"
              },
              {
                path: '/jaspernote/docs/dataLayer/relational/oracle/dataType',
                component: ComponentCreator('/jaspernote/docs/dataLayer/relational/oracle/dataType', 'a3b'),
                exact: true,
                sidebar: "relational"
              },
              {
                path: '/jaspernote/docs/dataLayer/relational/oracle/fun',
                component: ComponentCreator('/jaspernote/docs/dataLayer/relational/oracle/fun', 'f92'),
                exact: true,
                sidebar: "relational"
              },
              {
                path: '/jaspernote/docs/dataLayer/relational/oracle/function/',
                component: ComponentCreator('/jaspernote/docs/dataLayer/relational/oracle/function/', 'fe5'),
                exact: true,
                sidebar: "relational"
              },
              {
                path: '/jaspernote/docs/dataLayer/relational/oracle/function/subString',
                component: ComponentCreator('/jaspernote/docs/dataLayer/relational/oracle/function/subString', '612'),
                exact: true,
                sidebar: "relational"
              },
              {
                path: '/jaspernote/docs/dataLayer/relational/oracle/install',
                component: ComponentCreator('/jaspernote/docs/dataLayer/relational/oracle/install', '953'),
                exact: true,
                sidebar: "relational"
              },
              {
                path: '/jaspernote/docs/dataLayer/relational/oracle/netManager',
                component: ComponentCreator('/jaspernote/docs/dataLayer/relational/oracle/netManager', 'b39'),
                exact: true,
                sidebar: "relational"
              },
              {
                path: '/jaspernote/docs/dataLayer/relational/oracle/other',
                component: ComponentCreator('/jaspernote/docs/dataLayer/relational/oracle/other', '4b7'),
                exact: true,
                sidebar: "relational"
              },
              {
                path: '/jaspernote/docs/dataLayer/relational/oracle/plsql/',
                component: ComponentCreator('/jaspernote/docs/dataLayer/relational/oracle/plsql/', '417'),
                exact: true,
                sidebar: "relational"
              },
              {
                path: '/jaspernote/docs/dataLayer/relational/oracle/plsql/basic',
                component: ComponentCreator('/jaspernote/docs/dataLayer/relational/oracle/plsql/basic', 'd56'),
                exact: true,
                sidebar: "relational"
              },
              {
                path: '/jaspernote/docs/dataLayer/relational/oracle/plsql/dataType',
                component: ComponentCreator('/jaspernote/docs/dataLayer/relational/oracle/plsql/dataType', 'aa8'),
                exact: true,
                sidebar: "relational"
              },
              {
                path: '/jaspernote/docs/dataLayer/relational/oracle/plsql/helloworld',
                component: ComponentCreator('/jaspernote/docs/dataLayer/relational/oracle/plsql/helloworld', '578'),
                exact: true,
                sidebar: "relational"
              },
              {
                path: '/jaspernote/docs/dataLayer/relational/oracle/plsql/loop',
                component: ComponentCreator('/jaspernote/docs/dataLayer/relational/oracle/plsql/loop', '884'),
                exact: true,
                sidebar: "relational"
              },
              {
                path: '/jaspernote/docs/dataLayer/relational/oracle/plsql/package',
                component: ComponentCreator('/jaspernote/docs/dataLayer/relational/oracle/plsql/package', '444'),
                exact: true,
                sidebar: "relational"
              },
              {
                path: '/jaspernote/docs/dataLayer/relational/oracle/plsql/test',
                component: ComponentCreator('/jaspernote/docs/dataLayer/relational/oracle/plsql/test', '69f'),
                exact: true,
                sidebar: "relational"
              },
              {
                path: '/jaspernote/docs/dataLayer/relational/oracle/sequence',
                component: ComponentCreator('/jaspernote/docs/dataLayer/relational/oracle/sequence', '5bf'),
                exact: true,
                sidebar: "relational"
              },
              {
                path: '/jaspernote/docs/dataLayer/relational/oracle/userPrivilege',
                component: ComponentCreator('/jaspernote/docs/dataLayer/relational/oracle/userPrivilege', '55b'),
                exact: true,
                sidebar: "relational"
              },
              {
                path: '/jaspernote/docs/dataLayer/relational/postgresql/',
                component: ComponentCreator('/jaspernote/docs/dataLayer/relational/postgresql/', '9ec'),
                exact: true,
                sidebar: "relational"
              },
              {
                path: '/jaspernote/docs/dataLayer/relational/sqlite/',
                component: ComponentCreator('/jaspernote/docs/dataLayer/relational/sqlite/', '1b6'),
                exact: true,
                sidebar: "relational"
              },
              {
                path: '/jaspernote/docs/dataLayer/sharding/',
                component: ComponentCreator('/jaspernote/docs/dataLayer/sharding/', 'c23'),
                exact: true,
                sidebar: "sharding"
              },
              {
                path: '/jaspernote/docs/dataLayer/sharding/mycat/',
                component: ComponentCreator('/jaspernote/docs/dataLayer/sharding/mycat/', '1a2'),
                exact: true,
                sidebar: "sharding"
              },
              {
                path: '/jaspernote/docs/dataLayer/sharding/shardingjdbc/',
                component: ComponentCreator('/jaspernote/docs/dataLayer/sharding/shardingjdbc/', '97d'),
                exact: true,
                sidebar: "sharding"
              },
              {
                path: '/jaspernote/docs/dataLayer/sharding/分库分表/',
                component: ComponentCreator('/jaspernote/docs/dataLayer/sharding/分库分表/', '4cb'),
                exact: true,
                sidebar: "sharding"
              },
              {
                path: '/jaspernote/docs/dataLayer/sql/',
                component: ComponentCreator('/jaspernote/docs/dataLayer/sql/', '396'),
                exact: true
              },
              {
                path: '/jaspernote/docs/dataLayer/sql/dml/cte',
                component: ComponentCreator('/jaspernote/docs/dataLayer/sql/dml/cte', '410'),
                exact: true
              },
              {
                path: '/jaspernote/docs/dataStructure/',
                component: ComponentCreator('/jaspernote/docs/dataStructure/', '04f'),
                exact: true,
                sidebar: "dataStructure"
              },
              {
                path: '/jaspernote/docs/dataStructure/01iterateAndRecursion',
                component: ComponentCreator('/jaspernote/docs/dataStructure/01iterateAndRecursion', '112'),
                exact: true,
                sidebar: "dataStructure"
              },
              {
                path: '/jaspernote/docs/dataStructure/algo/',
                component: ComponentCreator('/jaspernote/docs/dataStructure/algo/', '0b2'),
                exact: true,
                sidebar: "dataStructure"
              },
              {
                path: '/jaspernote/docs/dataStructure/algo/bloomfilter',
                component: ComponentCreator('/jaspernote/docs/dataStructure/algo/bloomfilter', '948'),
                exact: true,
                sidebar: "dataStructure"
              },
              {
                path: '/jaspernote/docs/dataStructure/algo/cache/lru',
                component: ComponentCreator('/jaspernote/docs/dataStructure/algo/cache/lru', '543'),
                exact: true,
                sidebar: "dataStructure"
              },
              {
                path: '/jaspernote/docs/dataStructure/algo/cache/tinyLru',
                component: ComponentCreator('/jaspernote/docs/dataStructure/algo/cache/tinyLru', '828'),
                exact: true,
                sidebar: "dataStructure"
              },
              {
                path: '/jaspernote/docs/dataStructure/algo/dynamic',
                component: ComponentCreator('/jaspernote/docs/dataStructure/algo/dynamic', '040'),
                exact: true,
                sidebar: "dataStructure"
              },
              {
                path: '/jaspernote/docs/dataStructure/algo/encryption/gpg',
                component: ComponentCreator('/jaspernote/docs/dataStructure/algo/encryption/gpg', 'eb0'),
                exact: true,
                sidebar: "dataStructure"
              },
              {
                path: '/jaspernote/docs/dataStructure/algo/hashOrSummarization/md5',
                component: ComponentCreator('/jaspernote/docs/dataStructure/algo/hashOrSummarization/md5', 'a50'),
                exact: true,
                sidebar: "dataStructure"
              },
              {
                path: '/jaspernote/docs/dataStructure/algo/hashOrSummarization/sha256',
                component: ComponentCreator('/jaspernote/docs/dataStructure/algo/hashOrSummarization/sha256', '5b8'),
                exact: true,
                sidebar: "dataStructure"
              },
              {
                path: '/jaspernote/docs/dataStructure/algo/slideWindow',
                component: ComponentCreator('/jaspernote/docs/dataStructure/algo/slideWindow', 'f6f'),
                exact: true,
                sidebar: "dataStructure"
              },
              {
                path: '/jaspernote/docs/dataStructure/algo/sort/',
                component: ComponentCreator('/jaspernote/docs/dataStructure/algo/sort/', 'ee8'),
                exact: true,
                sidebar: "dataStructure"
              },
              {
                path: '/jaspernote/docs/dataStructure/algo/sort/bubble',
                component: ComponentCreator('/jaspernote/docs/dataStructure/algo/sort/bubble', '60b'),
                exact: true,
                sidebar: "dataStructure"
              },
              {
                path: '/jaspernote/docs/dataStructure/algo/sort/quick',
                component: ComponentCreator('/jaspernote/docs/dataStructure/algo/sort/quick', 'f1a'),
                exact: true,
                sidebar: "dataStructure"
              },
              {
                path: '/jaspernote/docs/dataStructure/algo/two-condition',
                component: ComponentCreator('/jaspernote/docs/dataStructure/algo/two-condition', 'ffb'),
                exact: true,
                sidebar: "dataStructure"
              },
              {
                path: '/jaspernote/docs/dataStructure/array/inPlaceHashing',
                component: ComponentCreator('/jaspernote/docs/dataStructure/array/inPlaceHashing', '0cb'),
                exact: true,
                sidebar: "dataStructure"
              },
              {
                path: '/jaspernote/docs/dataStructure/array/prefixCounting',
                component: ComponentCreator('/jaspernote/docs/dataStructure/array/prefixCounting', '900'),
                exact: true,
                sidebar: "dataStructure"
              },
              {
                path: '/jaspernote/docs/dataStructure/hash/',
                component: ComponentCreator('/jaspernote/docs/dataStructure/hash/', '991'),
                exact: true,
                sidebar: "dataStructure"
              },
              {
                path: '/jaspernote/docs/dataStructure/heap/',
                component: ComponentCreator('/jaspernote/docs/dataStructure/heap/', '89c'),
                exact: true,
                sidebar: "dataStructure"
              },
              {
                path: '/jaspernote/docs/dataStructure/heap/impl',
                component: ComponentCreator('/jaspernote/docs/dataStructure/heap/impl', '039'),
                exact: true,
                sidebar: "dataStructure"
              },
              {
                path: '/jaspernote/docs/dataStructure/numEncoding',
                component: ComponentCreator('/jaspernote/docs/dataStructure/numEncoding', 'a00'),
                exact: true,
                sidebar: "dataStructure"
              },
              {
                path: '/jaspernote/docs/dataStructure/queue/',
                component: ComponentCreator('/jaspernote/docs/dataStructure/queue/', 'afd'),
                exact: true,
                sidebar: "dataStructure"
              },
              {
                path: '/jaspernote/docs/dataStructure/queue/stackImpl',
                component: ComponentCreator('/jaspernote/docs/dataStructure/queue/stackImpl', '803'),
                exact: true,
                sidebar: "dataStructure"
              },
              {
                path: '/jaspernote/docs/dataStructure/stack/',
                component: ComponentCreator('/jaspernote/docs/dataStructure/stack/', '629'),
                exact: true,
                sidebar: "dataStructure"
              },
              {
                path: '/jaspernote/docs/dataStructure/stack/monotonicStack',
                component: ComponentCreator('/jaspernote/docs/dataStructure/stack/monotonicStack', 'fd8'),
                exact: true,
                sidebar: "dataStructure"
              },
              {
                path: '/jaspernote/docs/dataStructure/stack/rpn',
                component: ComponentCreator('/jaspernote/docs/dataStructure/stack/rpn', '4bc'),
                exact: true,
                sidebar: "dataStructure"
              },
              {
                path: '/jaspernote/docs/dataStructure/tree/ast',
                component: ComponentCreator('/jaspernote/docs/dataStructure/tree/ast', '623'),
                exact: true,
                sidebar: "dataStructure"
              },
              {
                path: '/jaspernote/docs/dataStructure/tree/bst',
                component: ComponentCreator('/jaspernote/docs/dataStructure/tree/bst', '0c4'),
                exact: true,
                sidebar: "dataStructure"
              },
              {
                path: '/jaspernote/docs/dataStructure/tree/iterate',
                component: ComponentCreator('/jaspernote/docs/dataStructure/tree/iterate', '58c'),
                exact: true,
                sidebar: "dataStructure"
              },
              {
                path: '/jaspernote/docs/dataStructure/tree/radixTree',
                component: ComponentCreator('/jaspernote/docs/dataStructure/tree/radixTree', 'cef'),
                exact: true,
                sidebar: "dataStructure"
              },
              {
                path: '/jaspernote/docs/dataStructure/tree/rbTree',
                component: ComponentCreator('/jaspernote/docs/dataStructure/tree/rbTree', 'f8f'),
                exact: true,
                sidebar: "dataStructure"
              },
              {
                path: '/jaspernote/docs/front/',
                component: ComponentCreator('/jaspernote/docs/front/', 'd1f'),
                exact: true
              },
              {
                path: '/jaspernote/docs/front/css/',
                component: ComponentCreator('/jaspernote/docs/front/css/', '9c2'),
                exact: true,
                sidebar: "css"
              },
              {
                path: '/jaspernote/docs/front/docusaurus/',
                component: ComponentCreator('/jaspernote/docs/front/docusaurus/', 'da8'),
                exact: true,
                sidebar: "docusaurus"
              },
              {
                path: '/jaspernote/docs/front/html/',
                component: ComponentCreator('/jaspernote/docs/front/html/', '391'),
                exact: true,
                sidebar: "html"
              },
              {
                path: '/jaspernote/docs/front/jquery/',
                component: ComponentCreator('/jaspernote/docs/front/jquery/', '9da'),
                exact: true,
                sidebar: "jquery"
              },
              {
                path: '/jaspernote/docs/front/js/',
                component: ComponentCreator('/jaspernote/docs/front/js/', '6f5'),
                exact: true,
                sidebar: "js"
              },
              {
                path: '/jaspernote/docs/front/node/',
                component: ComponentCreator('/jaspernote/docs/front/node/', '307'),
                exact: true
              },
              {
                path: '/jaspernote/docs/front/node/npm',
                component: ComponentCreator('/jaspernote/docs/front/node/npm', 'fba'),
                exact: true
              },
              {
                path: '/jaspernote/docs/front/protocols/websocket',
                component: ComponentCreator('/jaspernote/docs/front/protocols/websocket', '29a'),
                exact: true
              },
              {
                path: '/jaspernote/docs/front/react/',
                component: ComponentCreator('/jaspernote/docs/front/react/', '96c'),
                exact: true,
                sidebar: "react"
              },
              {
                path: '/jaspernote/docs/front/react/jsx',
                component: ComponentCreator('/jaspernote/docs/front/react/jsx', '20e'),
                exact: true,
                sidebar: "react"
              },
              {
                path: '/jaspernote/docs/front/vitepress/',
                component: ComponentCreator('/jaspernote/docs/front/vitepress/', '970'),
                exact: true,
                sidebar: "vitepress"
              },
              {
                path: '/jaspernote/docs/front/vitepress/problem',
                component: ComponentCreator('/jaspernote/docs/front/vitepress/problem', 'b8e'),
                exact: true,
                sidebar: "vitepress"
              },
              {
                path: '/jaspernote/docs/front/vitepress/使用自定义组件',
                component: ComponentCreator('/jaspernote/docs/front/vitepress/使用自定义组件', 'ab8'),
                exact: true,
                sidebar: "vitepress"
              },
              {
                path: '/jaspernote/docs/front/vitepress/引入plantuml',
                component: ComponentCreator('/jaspernote/docs/front/vitepress/引入plantuml', '1bf'),
                exact: true,
                sidebar: "vitepress"
              },
              {
                path: '/jaspernote/docs/front/vue/',
                component: ComponentCreator('/jaspernote/docs/front/vue/', '4cf'),
                exact: true,
                sidebar: "vue"
              },
              {
                path: '/jaspernote/docs/front/vue/basic',
                component: ComponentCreator('/jaspernote/docs/front/vue/basic', '5eb'),
                exact: true,
                sidebar: "vue"
              },
              {
                path: '/jaspernote/docs/infrastructure/',
                component: ComponentCreator('/jaspernote/docs/infrastructure/', 'a99'),
                exact: true
              },
              {
                path: '/jaspernote/docs/infrastructure/design/',
                component: ComponentCreator('/jaspernote/docs/infrastructure/design/', '5c2'),
                exact: true,
                sidebar: "design"
              },
              {
                path: '/jaspernote/docs/infrastructure/design/distributed/',
                component: ComponentCreator('/jaspernote/docs/infrastructure/design/distributed/', '252'),
                exact: true,
                sidebar: "design"
              },
              {
                path: '/jaspernote/docs/infrastructure/design/distributed/cap',
                component: ComponentCreator('/jaspernote/docs/infrastructure/design/distributed/cap', '6c9'),
                exact: true,
                sidebar: "design"
              },
              {
                path: '/jaspernote/docs/infrastructure/design/distributed/distributedLock',
                component: ComponentCreator('/jaspernote/docs/infrastructure/design/distributed/distributedLock', '2f6'),
                exact: true,
                sidebar: "design"
              },
              {
                path: '/jaspernote/docs/infrastructure/design/distributed/globalUniqueId',
                component: ComponentCreator('/jaspernote/docs/infrastructure/design/distributed/globalUniqueId', '5be'),
                exact: true,
                sidebar: "design"
              },
              {
                path: '/jaspernote/docs/infrastructure/design/systemConcept/zeroCopy',
                component: ComponentCreator('/jaspernote/docs/infrastructure/design/systemConcept/zeroCopy', 'dae'),
                exact: true,
                sidebar: "design"
              },
              {
                path: '/jaspernote/docs/infrastructure/design/systemDesign/',
                component: ComponentCreator('/jaspernote/docs/infrastructure/design/systemDesign/', '08e'),
                exact: true,
                sidebar: "design"
              },
              {
                path: '/jaspernote/docs/infrastructure/design/systemDesign/arch',
                component: ComponentCreator('/jaspernote/docs/infrastructure/design/systemDesign/arch', '071'),
                exact: true,
                sidebar: "design"
              },
              {
                path: '/jaspernote/docs/infrastructure/design/systemDesign/eventDriven',
                component: ComponentCreator('/jaspernote/docs/infrastructure/design/systemDesign/eventDriven', '835'),
                exact: true,
                sidebar: "design"
              },
              {
                path: '/jaspernote/docs/infrastructure/design/systemDesign/multiTenant',
                component: ComponentCreator('/jaspernote/docs/infrastructure/design/systemDesign/multiTenant', '137'),
                exact: true,
                sidebar: "design"
              },
              {
                path: '/jaspernote/docs/infrastructure/design/systemDesign/pojo',
                component: ComponentCreator('/jaspernote/docs/infrastructure/design/systemDesign/pojo', '8f1'),
                exact: true,
                sidebar: "design"
              },
              {
                path: '/jaspernote/docs/infrastructure/design/systemDesign/privilege/sso',
                component: ComponentCreator('/jaspernote/docs/infrastructure/design/systemDesign/privilege/sso', '46d'),
                exact: true,
                sidebar: "design"
              },
              {
                path: '/jaspernote/docs/infrastructure/devops/',
                component: ComponentCreator('/jaspernote/docs/infrastructure/devops/', 'e33'),
                exact: true,
                sidebar: "devops"
              },
              {
                path: '/jaspernote/docs/infrastructure/devops/concept',
                component: ComponentCreator('/jaspernote/docs/infrastructure/devops/concept', '171'),
                exact: true,
                sidebar: "devops"
              },
              {
                path: '/jaspernote/docs/infrastructure/devops/containerd/',
                component: ComponentCreator('/jaspernote/docs/infrastructure/devops/containerd/', '163'),
                exact: true,
                sidebar: "devops"
              },
              {
                path: '/jaspernote/docs/infrastructure/devops/containerd/nerdctl/',
                component: ComponentCreator('/jaspernote/docs/infrastructure/devops/containerd/nerdctl/', '123'),
                exact: true,
                sidebar: "devops"
              },
              {
                path: '/jaspernote/docs/infrastructure/devops/docker/',
                component: ComponentCreator('/jaspernote/docs/infrastructure/devops/docker/', '1a1'),
                exact: true,
                sidebar: "devops"
              },
              {
                path: '/jaspernote/docs/infrastructure/devops/docker/command',
                component: ComponentCreator('/jaspernote/docs/infrastructure/devops/docker/command', '636'),
                exact: true,
                sidebar: "devops"
              },
              {
                path: '/jaspernote/docs/infrastructure/devops/docker/dockercompose/',
                component: ComponentCreator('/jaspernote/docs/infrastructure/devops/docker/dockercompose/', 'be2'),
                exact: true,
                sidebar: "devops"
              },
              {
                path: '/jaspernote/docs/infrastructure/devops/docker/docker和虚拟机的区别',
                component: ComponentCreator('/jaspernote/docs/infrastructure/devops/docker/docker和虚拟机的区别', '84e'),
                exact: true,
                sidebar: "devops"
              },
              {
                path: '/jaspernote/docs/infrastructure/devops/docker/Internet',
                component: ComponentCreator('/jaspernote/docs/infrastructure/devops/docker/Internet', 'cb3'),
                exact: true,
                sidebar: "devops"
              },
              {
                path: '/jaspernote/docs/infrastructure/devops/docker/problem',
                component: ComponentCreator('/jaspernote/docs/infrastructure/devops/docker/problem', '1f9'),
                exact: true,
                sidebar: "devops"
              },
              {
                path: '/jaspernote/docs/infrastructure/devops/docker/将本地docker镜像导出到服务器',
                component: ComponentCreator('/jaspernote/docs/infrastructure/devops/docker/将本地docker镜像导出到服务器', '42b'),
                exact: true,
                sidebar: "devops"
              },
              {
                path: '/jaspernote/docs/infrastructure/devops/envoy/',
                component: ComponentCreator('/jaspernote/docs/infrastructure/devops/envoy/', '2f6'),
                exact: true,
                sidebar: "devops"
              },
              {
                path: '/jaspernote/docs/infrastructure/devops/k8s/',
                component: ComponentCreator('/jaspernote/docs/infrastructure/devops/k8s/', '25e'),
                exact: true,
                sidebar: "devops"
              },
              {
                path: '/jaspernote/docs/infrastructure/devops/nginx/',
                component: ComponentCreator('/jaspernote/docs/infrastructure/devops/nginx/', 'e9e'),
                exact: true,
                sidebar: "devops"
              },
              {
                path: '/jaspernote/docs/infrastructure/devops/nginx/configure',
                component: ComponentCreator('/jaspernote/docs/infrastructure/devops/nginx/configure', '56f'),
                exact: true,
                sidebar: "devops"
              },
              {
                path: '/jaspernote/docs/infrastructure/devops/nginx/install',
                component: ComponentCreator('/jaspernote/docs/infrastructure/devops/nginx/install', '725'),
                exact: true,
                sidebar: "devops"
              },
              {
                path: '/jaspernote/docs/infrastructure/devops/openresty/',
                component: ComponentCreator('/jaspernote/docs/infrastructure/devops/openresty/', '186'),
                exact: true,
                sidebar: "devops"
              },
              {
                path: '/jaspernote/docs/infrastructure/devops/pod/',
                component: ComponentCreator('/jaspernote/docs/infrastructure/devops/pod/', '5ee'),
                exact: true,
                sidebar: "devops"
              },
              {
                path: '/jaspernote/docs/infrastructure/devops/pod/valkey',
                component: ComponentCreator('/jaspernote/docs/infrastructure/devops/pod/valkey', '491'),
                exact: true,
                sidebar: "devops"
              },
              {
                path: '/jaspernote/docs/infrastructure/devops/podman/',
                component: ComponentCreator('/jaspernote/docs/infrastructure/devops/podman/', '7eb'),
                exact: true,
                sidebar: "devops"
              },
              {
                path: '/jaspernote/docs/infrastructure/devops/podman/command',
                component: ComponentCreator('/jaspernote/docs/infrastructure/devops/podman/command', 'a3d'),
                exact: true,
                sidebar: "devops"
              },
              {
                path: '/jaspernote/docs/infrastructure/devops/podman/network',
                component: ComponentCreator('/jaspernote/docs/infrastructure/devops/podman/network', 'd00'),
                exact: true,
                sidebar: "devops"
              },
              {
                path: '/jaspernote/docs/infrastructure/devops/podman/podmanCompose/log',
                component: ComponentCreator('/jaspernote/docs/infrastructure/devops/podman/podmanCompose/log', 'f5e'),
                exact: true,
                sidebar: "devops"
              },
              {
                path: '/jaspernote/docs/infrastructure/devops/podman/problem/privilege',
                component: ComponentCreator('/jaspernote/docs/infrastructure/devops/podman/problem/privilege', '457'),
                exact: true,
                sidebar: "devops"
              },
              {
                path: '/jaspernote/docs/infrastructure/devops/podman/utils',
                component: ComponentCreator('/jaspernote/docs/infrastructure/devops/podman/utils', 'ca9'),
                exact: true,
                sidebar: "devops"
              },
              {
                path: '/jaspernote/docs/infrastructure/os/',
                component: ComponentCreator('/jaspernote/docs/infrastructure/os/', '94a'),
                exact: true,
                sidebar: "os"
              },
              {
                path: '/jaspernote/docs/infrastructure/os/archlinux/',
                component: ComponentCreator('/jaspernote/docs/infrastructure/os/archlinux/', '7e6'),
                exact: true,
                sidebar: "os"
              },
              {
                path: '/jaspernote/docs/infrastructure/os/archlinux/desktop/',
                component: ComponentCreator('/jaspernote/docs/infrastructure/os/archlinux/desktop/', '3fc'),
                exact: true,
                sidebar: "os"
              },
              {
                path: '/jaspernote/docs/infrastructure/os/archlinux/desktop/desktopShell',
                component: ComponentCreator('/jaspernote/docs/infrastructure/os/archlinux/desktop/desktopShell', 'caa'),
                exact: true,
                sidebar: "os"
              },
              {
                path: '/jaspernote/docs/infrastructure/os/archlinux/desktop/kde',
                component: ComponentCreator('/jaspernote/docs/infrastructure/os/archlinux/desktop/kde', '38f'),
                exact: true,
                sidebar: "os"
              },
              {
                path: '/jaspernote/docs/infrastructure/os/archlinux/desktop/niri',
                component: ComponentCreator('/jaspernote/docs/infrastructure/os/archlinux/desktop/niri', '45c'),
                exact: true,
                sidebar: "os"
              },
              {
                path: '/jaspernote/docs/infrastructure/os/archlinux/desktop/software',
                component: ComponentCreator('/jaspernote/docs/infrastructure/os/archlinux/desktop/software', 'b90'),
                exact: true,
                sidebar: "os"
              },
              {
                path: '/jaspernote/docs/infrastructure/os/archlinux/desktop/terminal',
                component: ComponentCreator('/jaspernote/docs/infrastructure/os/archlinux/desktop/terminal', 'd58'),
                exact: true,
                sidebar: "os"
              },
              {
                path: '/jaspernote/docs/infrastructure/os/archlinux/desktop/theme',
                component: ComponentCreator('/jaspernote/docs/infrastructure/os/archlinux/desktop/theme', '60f'),
                exact: true,
                sidebar: "os"
              },
              {
                path: '/jaspernote/docs/infrastructure/os/archlinux/pacman',
                component: ComponentCreator('/jaspernote/docs/infrastructure/os/archlinux/pacman', 'c34'),
                exact: true,
                sidebar: "os"
              },
              {
                path: '/jaspernote/docs/infrastructure/os/archlinux/paru',
                component: ComponentCreator('/jaspernote/docs/infrastructure/os/archlinux/paru', '3fc'),
                exact: true,
                sidebar: "os"
              },
              {
                path: '/jaspernote/docs/infrastructure/os/hardware/',
                component: ComponentCreator('/jaspernote/docs/infrastructure/os/hardware/', 'b43'),
                exact: true,
                sidebar: "os"
              },
              {
                path: '/jaspernote/docs/infrastructure/os/hardware/cpu',
                component: ComponentCreator('/jaspernote/docs/infrastructure/os/hardware/cpu', '7fe'),
                exact: true,
                sidebar: "os"
              },
              {
                path: '/jaspernote/docs/infrastructure/os/linux/',
                component: ComponentCreator('/jaspernote/docs/infrastructure/os/linux/', 'dc3'),
                exact: true,
                sidebar: "os"
              },
              {
                path: '/jaspernote/docs/infrastructure/os/linux/5systemManager/',
                component: ComponentCreator('/jaspernote/docs/infrastructure/os/linux/5systemManager/', '014'),
                exact: true,
                sidebar: "os"
              },
              {
                path: '/jaspernote/docs/infrastructure/os/linux/5systemManager/systemService',
                component: ComponentCreator('/jaspernote/docs/infrastructure/os/linux/5systemManager/systemService', '3af'),
                exact: true,
                sidebar: "os"
              },
              {
                path: '/jaspernote/docs/infrastructure/os/linux/commonCommand',
                component: ComponentCreator('/jaspernote/docs/infrastructure/os/linux/commonCommand', 'c87'),
                exact: true,
                sidebar: "os"
              },
              {
                path: '/jaspernote/docs/infrastructure/os/linux/env',
                component: ComponentCreator('/jaspernote/docs/infrastructure/os/linux/env', 'bbf'),
                exact: true,
                sidebar: "os"
              },
              {
                path: '/jaspernote/docs/infrastructure/os/linux/file/',
                component: ComponentCreator('/jaspernote/docs/infrastructure/os/linux/file/', '59b'),
                exact: true,
                sidebar: "os"
              },
              {
                path: '/jaspernote/docs/infrastructure/os/linux/file/btrfs',
                component: ComponentCreator('/jaspernote/docs/infrastructure/os/linux/file/btrfs', '59e'),
                exact: true,
                sidebar: "os"
              },
              {
                path: '/jaspernote/docs/infrastructure/os/linux/file/compress',
                component: ComponentCreator('/jaspernote/docs/infrastructure/os/linux/file/compress', '308'),
                exact: true,
                sidebar: "os"
              },
              {
                path: '/jaspernote/docs/infrastructure/os/linux/file/other',
                component: ComponentCreator('/jaspernote/docs/infrastructure/os/linux/file/other', '08d'),
                exact: true,
                sidebar: "os"
              },
              {
                path: '/jaspernote/docs/infrastructure/os/linux/file/privilege',
                component: ComponentCreator('/jaspernote/docs/infrastructure/os/linux/file/privilege', '61d'),
                exact: true,
                sidebar: "os"
              },
              {
                path: '/jaspernote/docs/infrastructure/os/linux/file/snapper',
                component: ComponentCreator('/jaspernote/docs/infrastructure/os/linux/file/snapper', '930'),
                exact: true,
                sidebar: "os"
              },
              {
                path: '/jaspernote/docs/infrastructure/os/linux/file/文件系统',
                component: ComponentCreator('/jaspernote/docs/infrastructure/os/linux/file/文件系统', 'b5a'),
                exact: true,
                sidebar: "os"
              },
              {
                path: '/jaspernote/docs/infrastructure/os/linux/internet/netstat',
                component: ComponentCreator('/jaspernote/docs/infrastructure/os/linux/internet/netstat', '4f7'),
                exact: true,
                sidebar: "os"
              },
              {
                path: '/jaspernote/docs/infrastructure/os/linux/nohup',
                component: ComponentCreator('/jaspernote/docs/infrastructure/os/linux/nohup', '131'),
                exact: true,
                sidebar: "os"
              },
              {
                path: '/jaspernote/docs/infrastructure/os/linux/process/lsof',
                component: ComponentCreator('/jaspernote/docs/infrastructure/os/linux/process/lsof', '4ce'),
                exact: true,
                sidebar: "os"
              },
              {
                path: '/jaspernote/docs/infrastructure/os/linux/process/ps',
                component: ComponentCreator('/jaspernote/docs/infrastructure/os/linux/process/ps', '433'),
                exact: true,
                sidebar: "os"
              },
              {
                path: '/jaspernote/docs/infrastructure/os/linux/process/常用命令',
                component: ComponentCreator('/jaspernote/docs/infrastructure/os/linux/process/常用命令', 'c00'),
                exact: true,
                sidebar: "os"
              },
              {
                path: '/jaspernote/docs/infrastructure/os/linux/process/进程状态',
                component: ComponentCreator('/jaspernote/docs/infrastructure/os/linux/process/进程状态', 'dfd'),
                exact: true,
                sidebar: "os"
              },
              {
                path: '/jaspernote/docs/infrastructure/os/linux/shell/',
                component: ComponentCreator('/jaspernote/docs/infrastructure/os/linux/shell/', '3d6'),
                exact: true,
                sidebar: "os"
              },
              {
                path: '/jaspernote/docs/infrastructure/os/linux/shell/basic',
                component: ComponentCreator('/jaspernote/docs/infrastructure/os/linux/shell/basic', '3c1'),
                exact: true,
                sidebar: "os"
              },
              {
                path: '/jaspernote/docs/infrastructure/os/linux/shell/braceExpansion',
                component: ComponentCreator('/jaspernote/docs/infrastructure/os/linux/shell/braceExpansion', '53e'),
                exact: true,
                sidebar: "os"
              },
              {
                path: '/jaspernote/docs/infrastructure/os/linux/shell/control',
                component: ComponentCreator('/jaspernote/docs/infrastructure/os/linux/shell/control', '76a'),
                exact: true,
                sidebar: "os"
              },
              {
                path: '/jaspernote/docs/infrastructure/os/linux/shell/dataStreamRedirection/',
                component: ComponentCreator('/jaspernote/docs/infrastructure/os/linux/shell/dataStreamRedirection/', '493'),
                exact: true,
                sidebar: "os"
              },
              {
                path: '/jaspernote/docs/infrastructure/os/linux/shell/function',
                component: ComponentCreator('/jaspernote/docs/infrastructure/os/linux/shell/function', 'a50'),
                exact: true,
                sidebar: "os"
              },
              {
                path: '/jaspernote/docs/infrastructure/os/linux/shell/operator',
                component: ComponentCreator('/jaspernote/docs/infrastructure/os/linux/shell/operator', 'fd7'),
                exact: true,
                sidebar: "os"
              },
              {
                path: '/jaspernote/docs/infrastructure/os/linux/shell/other',
                component: ComponentCreator('/jaspernote/docs/infrastructure/os/linux/shell/other', '163'),
                exact: true,
                sidebar: "os"
              },
              {
                path: '/jaspernote/docs/infrastructure/os/linux/shell/param',
                component: ComponentCreator('/jaspernote/docs/infrastructure/os/linux/shell/param', 'd8b'),
                exact: true,
                sidebar: "os"
              },
              {
                path: '/jaspernote/docs/infrastructure/os/linux/shell/shellWidget',
                component: ComponentCreator('/jaspernote/docs/infrastructure/os/linux/shell/shellWidget', '010'),
                exact: true,
                sidebar: "os"
              },
              {
                path: '/jaspernote/docs/infrastructure/os/linux/shell/usage',
                component: ComponentCreator('/jaspernote/docs/infrastructure/os/linux/shell/usage', 'c79'),
                exact: true,
                sidebar: "os"
              },
              {
                path: '/jaspernote/docs/infrastructure/os/linux/shell/variable',
                component: ComponentCreator('/jaspernote/docs/infrastructure/os/linux/shell/variable', '37b'),
                exact: true,
                sidebar: "os"
              },
              {
                path: '/jaspernote/docs/infrastructure/os/linux/ssh',
                component: ComponentCreator('/jaspernote/docs/infrastructure/os/linux/ssh', '31e'),
                exact: true,
                sidebar: "os"
              },
              {
                path: '/jaspernote/docs/infrastructure/os/linux/utils/',
                component: ComponentCreator('/jaspernote/docs/infrastructure/os/linux/utils/', '11b'),
                exact: true,
                sidebar: "os"
              },
              {
                path: '/jaspernote/docs/infrastructure/os/linux/utils/native/awk',
                component: ComponentCreator('/jaspernote/docs/infrastructure/os/linux/utils/native/awk', '275'),
                exact: true,
                sidebar: "os"
              },
              {
                path: '/jaspernote/docs/infrastructure/os/linux/utils/native/curl',
                component: ComponentCreator('/jaspernote/docs/infrastructure/os/linux/utils/native/curl', 'a00'),
                exact: true,
                sidebar: "os"
              },
              {
                path: '/jaspernote/docs/infrastructure/os/linux/utils/native/envsubst',
                component: ComponentCreator('/jaspernote/docs/infrastructure/os/linux/utils/native/envsubst', '29d'),
                exact: true,
                sidebar: "os"
              },
              {
                path: '/jaspernote/docs/infrastructure/os/linux/utils/native/find',
                component: ComponentCreator('/jaspernote/docs/infrastructure/os/linux/utils/native/find', 'b06'),
                exact: true,
                sidebar: "os"
              },
              {
                path: '/jaspernote/docs/infrastructure/os/linux/utils/native/grep',
                component: ComponentCreator('/jaspernote/docs/infrastructure/os/linux/utils/native/grep', '6a1'),
                exact: true,
                sidebar: "os"
              },
              {
                path: '/jaspernote/docs/infrastructure/os/linux/utils/native/journalctl',
                component: ComponentCreator('/jaspernote/docs/infrastructure/os/linux/utils/native/journalctl', '971'),
                exact: true,
                sidebar: "os"
              },
              {
                path: '/jaspernote/docs/infrastructure/os/linux/utils/native/scp',
                component: ComponentCreator('/jaspernote/docs/infrastructure/os/linux/utils/native/scp', '2f6'),
                exact: true,
                sidebar: "os"
              },
              {
                path: '/jaspernote/docs/infrastructure/os/linux/utils/native/systemctl',
                component: ComponentCreator('/jaspernote/docs/infrastructure/os/linux/utils/native/systemctl', '7c9'),
                exact: true,
                sidebar: "os"
              },
              {
                path: '/jaspernote/docs/infrastructure/os/linux/utils/native/watch',
                component: ComponentCreator('/jaspernote/docs/infrastructure/os/linux/utils/native/watch', 'ebf'),
                exact: true,
                sidebar: "os"
              },
              {
                path: '/jaspernote/docs/infrastructure/os/linux/utils/open/direnv',
                component: ComponentCreator('/jaspernote/docs/infrastructure/os/linux/utils/open/direnv', 'fb6'),
                exact: true,
                sidebar: "os"
              },
              {
                path: '/jaspernote/docs/infrastructure/os/linux/utils/open/fd',
                component: ComponentCreator('/jaspernote/docs/infrastructure/os/linux/utils/open/fd', 'bb0'),
                exact: true,
                sidebar: "os"
              },
              {
                path: '/jaspernote/docs/infrastructure/os/linux/utils/open/frp',
                component: ComponentCreator('/jaspernote/docs/infrastructure/os/linux/utils/open/frp', '0b9'),
                exact: true,
                sidebar: "os"
              },
              {
                path: '/jaspernote/docs/infrastructure/os/linux/utils/open/fzf',
                component: ComponentCreator('/jaspernote/docs/infrastructure/os/linux/utils/open/fzf', '6bf'),
                exact: true,
                sidebar: "os"
              },
              {
                path: '/jaspernote/docs/infrastructure/os/linux/utils/open/jaq',
                component: ComponentCreator('/jaspernote/docs/infrastructure/os/linux/utils/open/jaq', '222'),
                exact: true,
                sidebar: "os"
              },
              {
                path: '/jaspernote/docs/infrastructure/os/linux/utils/open/just',
                component: ComponentCreator('/jaspernote/docs/infrastructure/os/linux/utils/open/just', 'bd5'),
                exact: true,
                sidebar: "os"
              },
              {
                path: '/jaspernote/docs/infrastructure/os/linux/utils/open/keychain',
                component: ComponentCreator('/jaspernote/docs/infrastructure/os/linux/utils/open/keychain', '0e5'),
                exact: true,
                sidebar: "os"
              },
              {
                path: '/jaspernote/docs/infrastructure/os/linux/utils/open/navi',
                component: ComponentCreator('/jaspernote/docs/infrastructure/os/linux/utils/open/navi', '428'),
                exact: true,
                sidebar: "os"
              },
              {
                path: '/jaspernote/docs/infrastructure/os/linux/utils/open/ripgrep',
                component: ComponentCreator('/jaspernote/docs/infrastructure/os/linux/utils/open/ripgrep', 'cac'),
                exact: true,
                sidebar: "os"
              },
              {
                path: '/jaspernote/docs/infrastructure/os/linux/utils/open/rsync',
                component: ComponentCreator('/jaspernote/docs/infrastructure/os/linux/utils/open/rsync', '3e7'),
                exact: true,
                sidebar: "os"
              },
              {
                path: '/jaspernote/docs/infrastructure/os/linux/utils/open/tree',
                component: ComponentCreator('/jaspernote/docs/infrastructure/os/linux/utils/open/tree', 'be1'),
                exact: true,
                sidebar: "os"
              },
              {
                path: '/jaspernote/docs/infrastructure/os/linux/utils/open/xh',
                component: ComponentCreator('/jaspernote/docs/infrastructure/os/linux/utils/open/xh', '048'),
                exact: true,
                sidebar: "os"
              },
              {
                path: '/jaspernote/docs/infrastructure/os/linux/utils/open/yazi',
                component: ComponentCreator('/jaspernote/docs/infrastructure/os/linux/utils/open/yazi', '47e'),
                exact: true,
                sidebar: "os"
              },
              {
                path: '/jaspernote/docs/infrastructure/os/linux/utils/open/zellij',
                component: ComponentCreator('/jaspernote/docs/infrastructure/os/linux/utils/open/zellij', '057'),
                exact: true,
                sidebar: "os"
              },
              {
                path: '/jaspernote/docs/infrastructure/os/linux/utils/open/zoxide',
                component: ComponentCreator('/jaspernote/docs/infrastructure/os/linux/utils/open/zoxide', 'a7d'),
                exact: true,
                sidebar: "os"
              },
              {
                path: '/jaspernote/docs/infrastructure/os/linux/查看日志',
                component: ComponentCreator('/jaspernote/docs/infrastructure/os/linux/查看日志', '97f'),
                exact: true,
                sidebar: "os"
              },
              {
                path: '/jaspernote/docs/infrastructure/os/mac/',
                component: ComponentCreator('/jaspernote/docs/infrastructure/os/mac/', '111'),
                exact: true,
                sidebar: "os"
              },
              {
                path: '/jaspernote/docs/infrastructure/os/mac/finder',
                component: ComponentCreator('/jaspernote/docs/infrastructure/os/mac/finder', 'bb4'),
                exact: true,
                sidebar: "os"
              },
              {
                path: '/jaspernote/docs/infrastructure/os/mac/homebrew',
                component: ComponentCreator('/jaspernote/docs/infrastructure/os/mac/homebrew', '688'),
                exact: true,
                sidebar: "os"
              },
              {
                path: '/jaspernote/docs/infrastructure/os/mac/keychain',
                component: ComponentCreator('/jaspernote/docs/infrastructure/os/mac/keychain', '250'),
                exact: true,
                sidebar: "os"
              },
              {
                path: '/jaspernote/docs/infrastructure/os/mac/keyShort',
                component: ComponentCreator('/jaspernote/docs/infrastructure/os/mac/keyShort', '604'),
                exact: true,
                sidebar: "os"
              },
              {
                path: '/jaspernote/docs/infrastructure/os/mac/other',
                component: ComponentCreator('/jaspernote/docs/infrastructure/os/mac/other', 'c7e'),
                exact: true,
                sidebar: "os"
              },
              {
                path: '/jaspernote/docs/infrastructure/os/mac/pathVariable',
                component: ComponentCreator('/jaspernote/docs/infrastructure/os/mac/pathVariable', 'de6'),
                exact: true,
                sidebar: "os"
              },
              {
                path: '/jaspernote/docs/infrastructure/os/mac/screeShot',
                component: ComponentCreator('/jaspernote/docs/infrastructure/os/mac/screeShot', '8bb'),
                exact: true,
                sidebar: "os"
              },
              {
                path: '/jaspernote/docs/infrastructure/os/terminal',
                component: ComponentCreator('/jaspernote/docs/infrastructure/os/terminal', 'c0a'),
                exact: true,
                sidebar: "os"
              },
              {
                path: '/jaspernote/docs/infrastructure/os/windows/',
                component: ComponentCreator('/jaspernote/docs/infrastructure/os/windows/', '87d'),
                exact: true,
                sidebar: "os"
              },
              {
                path: '/jaspernote/docs/infrastructure/os/windows/boot',
                component: ComponentCreator('/jaspernote/docs/infrastructure/os/windows/boot', '0b3'),
                exact: true,
                sidebar: "os"
              },
              {
                path: '/jaspernote/docs/infrastructure/os/windows/window software',
                component: ComponentCreator('/jaspernote/docs/infrastructure/os/windows/window software', '338'),
                exact: true,
                sidebar: "os"
              },
              {
                path: '/jaspernote/docs/infrastructure/os/windows/磁盘',
                component: ComponentCreator('/jaspernote/docs/infrastructure/os/windows/磁盘', 'a25'),
                exact: true,
                sidebar: "os"
              },
              {
                path: '/jaspernote/docs/java/',
                component: ComponentCreator('/jaspernote/docs/java/', 'e66'),
                exact: true
              },
              {
                path: '/jaspernote/docs/java/basic/',
                component: ComponentCreator('/jaspernote/docs/java/basic/', 'c91'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/commonClass/',
                component: ComponentCreator('/jaspernote/docs/java/basic/commonClass/', '34e'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/commonClass/Arrays',
                component: ComponentCreator('/jaspernote/docs/java/basic/commonClass/Arrays', '9b1'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/commonClass/Collections',
                component: ComponentCreator('/jaspernote/docs/java/basic/commonClass/Collections', '591'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/commonClass/dateRelated',
                component: ComponentCreator('/jaspernote/docs/java/basic/commonClass/dateRelated', 'ffb'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/commonClass/MessageDigest',
                component: ComponentCreator('/jaspernote/docs/java/basic/commonClass/MessageDigest', '186'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/commonClass/System',
                component: ComponentCreator('/jaspernote/docs/java/basic/commonClass/System', 'cbe'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/foundation/03operator',
                component: ComponentCreator('/jaspernote/docs/java/basic/foundation/03operator', 'b97'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/foundation/04control',
                component: ComponentCreator('/jaspernote/docs/java/basic/foundation/04control', 'ae7'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/foundation/anno',
                component: ComponentCreator('/jaspernote/docs/java/basic/foundation/anno', '97c'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/foundation/collection/',
                component: ComponentCreator('/jaspernote/docs/java/basic/foundation/collection/', 'a14'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/foundation/collection/enumMap',
                component: ComponentCreator('/jaspernote/docs/java/basic/foundation/collection/enumMap', '653'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/foundation/collection/LinkedList',
                component: ComponentCreator('/jaspernote/docs/java/basic/foundation/collection/LinkedList', 'e38'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/foundation/collection/list/ArrayList',
                component: ComponentCreator('/jaspernote/docs/java/basic/foundation/collection/list/ArrayList', '368'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/foundation/collection/list/linkedlist',
                component: ComponentCreator('/jaspernote/docs/java/basic/foundation/collection/list/linkedlist', '39a'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/foundation/collection/map/HashMap',
                component: ComponentCreator('/jaspernote/docs/java/basic/foundation/collection/map/HashMap', '947'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/foundation/collection/map/hashmapSource',
                component: ComponentCreator('/jaspernote/docs/java/basic/foundation/collection/map/hashmapSource', 'ce5'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/foundation/collection/queue/deque/ArrayDeque',
                component: ComponentCreator('/jaspernote/docs/java/basic/foundation/collection/queue/deque/ArrayDeque', '9c0'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/foundation/dataType/',
                component: ComponentCreator('/jaspernote/docs/java/basic/foundation/dataType/', '556'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/foundation/dataType/enum',
                component: ComponentCreator('/jaspernote/docs/java/basic/foundation/dataType/enum', 'c70'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/foundation/dataType/string',
                component: ComponentCreator('/jaspernote/docs/java/basic/foundation/dataType/string', '4ce'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/foundation/exception',
                component: ComponentCreator('/jaspernote/docs/java/basic/foundation/exception', 'dbf'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/foundation/generic',
                component: ComponentCreator('/jaspernote/docs/java/basic/foundation/generic', '252'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/foundation/io/',
                component: ComponentCreator('/jaspernote/docs/java/basic/foundation/io/', '3d8'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/foundation/io/BIO',
                component: ComponentCreator('/jaspernote/docs/java/basic/foundation/io/BIO', '9a9'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/foundation/io/nio',
                component: ComponentCreator('/jaspernote/docs/java/basic/foundation/io/nio', 'd08'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/foundation/io/NIO2/AIO',
                component: ComponentCreator('/jaspernote/docs/java/basic/foundation/io/NIO2/AIO', 'eab'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/foundation/io/NIO2/API',
                component: ComponentCreator('/jaspernote/docs/java/basic/foundation/io/NIO2/API', 'bab'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/foundation/io/网络编程',
                component: ComponentCreator('/jaspernote/docs/java/basic/foundation/io/网络编程', '9ac'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/foundation/keyword',
                component: ComponentCreator('/jaspernote/docs/java/basic/foundation/keyword', 'a5d'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/foundation/oop/class',
                component: ComponentCreator('/jaspernote/docs/java/basic/foundation/oop/class', '24b'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/foundation/oop/pillars',
                component: ComponentCreator('/jaspernote/docs/java/basic/foundation/oop/pillars', 'a67'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/foundation/oop/static',
                component: ComponentCreator('/jaspernote/docs/java/basic/foundation/oop/static', '70e'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/foundation/reflection',
                component: ComponentCreator('/jaspernote/docs/java/basic/foundation/reflection', '726'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/foundation/serial',
                component: ComponentCreator('/jaspernote/docs/java/basic/foundation/serial', '8c9'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/foundation/spi',
                component: ComponentCreator('/jaspernote/docs/java/basic/foundation/spi', '02f'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/foundation/thread/basic',
                component: ComponentCreator('/jaspernote/docs/java/basic/foundation/thread/basic', '3ff'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/foundation/thread/final',
                component: ComponentCreator('/jaspernote/docs/java/basic/foundation/thread/final', 'd56'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/foundation/thread/lock',
                component: ComponentCreator('/jaspernote/docs/java/basic/foundation/thread/lock', '556'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/foundation/thread/unsafe',
                component: ComponentCreator('/jaspernote/docs/java/basic/foundation/thread/unsafe', '988'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/foundation/thread/volatile',
                component: ComponentCreator('/jaspernote/docs/java/basic/foundation/thread/volatile', '84a'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/foundation/thread/线程基础',
                component: ComponentCreator('/jaspernote/docs/java/basic/foundation/thread/线程基础', 'f3a'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/jdk/javap',
                component: ComponentCreator('/jaspernote/docs/java/basic/jdk/javap', '8ad'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/jdk/monitor/jcmd',
                component: ComponentCreator('/jaspernote/docs/java/basic/jdk/monitor/jcmd', '09b'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/jdk/monitor/jps',
                component: ComponentCreator('/jaspernote/docs/java/basic/jdk/monitor/jps', '02f'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/jdk/monitor/jstack',
                component: ComponentCreator('/jaspernote/docs/java/basic/jdk/monitor/jstack', '92d'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/jdk/monitor/jstat',
                component: ComponentCreator('/jaspernote/docs/java/basic/jdk/monitor/jstat', 'aa1'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/juc/',
                component: ComponentCreator('/jaspernote/docs/java/basic/juc/', '11a'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/juc/AQS',
                component: ComponentCreator('/jaspernote/docs/java/basic/juc/AQS', '9bb'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/juc/atomic/',
                component: ComponentCreator('/jaspernote/docs/java/basic/juc/atomic/', 'dcc'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/juc/collections/',
                component: ComponentCreator('/jaspernote/docs/java/basic/juc/collections/', '6e7'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/juc/collections/basic',
                component: ComponentCreator('/jaspernote/docs/java/basic/juc/collections/basic', 'ee4'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/juc/collections/concurrentHashmap',
                component: ComponentCreator('/jaspernote/docs/java/basic/juc/collections/concurrentHashmap', 'a80'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/juc/collections/queue/ArrayBlockingQueue',
                component: ComponentCreator('/jaspernote/docs/java/basic/juc/collections/queue/ArrayBlockingQueue', '1c8'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/juc/collections/queue/blockingQueue',
                component: ComponentCreator('/jaspernote/docs/java/basic/juc/collections/queue/blockingQueue', '34e'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/juc/collections/queue/linkedblockingDeque',
                component: ComponentCreator('/jaspernote/docs/java/basic/juc/collections/queue/linkedblockingDeque', 'c97'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/juc/collections/queue/linkedblockingqueue',
                component: ComponentCreator('/jaspernote/docs/java/basic/juc/collections/queue/linkedblockingqueue', '1fa'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/juc/executor/customThreadPool',
                component: ComponentCreator('/jaspernote/docs/java/basic/juc/executor/customThreadPool', '744'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/juc/executor/executors',
                component: ComponentCreator('/jaspernote/docs/java/basic/juc/executor/executors', 'e0a'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/juc/executor/forkJoinPool',
                component: ComponentCreator('/jaspernote/docs/java/basic/juc/executor/forkJoinPool', '467'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/juc/future/',
                component: ComponentCreator('/jaspernote/docs/java/basic/juc/future/', '8fb'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/juc/future/completableFuture',
                component: ComponentCreator('/jaspernote/docs/java/basic/juc/future/completableFuture', 'f2a'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/juc/lock/AbstractQueuedSynchronizer',
                component: ComponentCreator('/jaspernote/docs/java/basic/juc/lock/AbstractQueuedSynchronizer', 'e4a'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/juc/lock/LockSupport',
                component: ComponentCreator('/jaspernote/docs/java/basic/juc/lock/LockSupport', '588'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/juc/lock/ReentrantLock',
                component: ComponentCreator('/jaspernote/docs/java/basic/juc/lock/ReentrantLock', '786'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/juc/lock/ReentrantReadWriteLock',
                component: ComponentCreator('/jaspernote/docs/java/basic/juc/lock/ReentrantReadWriteLock', '1fb'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/juc/ThreadLocal',
                component: ComponentCreator('/jaspernote/docs/java/basic/juc/ThreadLocal', 'e3a'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/juc/tools/CountDownLatch',
                component: ComponentCreator('/jaspernote/docs/java/basic/juc/tools/CountDownLatch', '75a'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/juc/tools/CyclicBarrier',
                component: ComponentCreator('/jaspernote/docs/java/basic/juc/tools/CyclicBarrier', '1e9'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/juc/tools/Exchanger',
                component: ComponentCreator('/jaspernote/docs/java/basic/juc/tools/Exchanger', '51b'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/juc/tools/Phaser',
                component: ComponentCreator('/jaspernote/docs/java/basic/juc/tools/Phaser', '97e'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/juc/tools/Semaphore',
                component: ComponentCreator('/jaspernote/docs/java/basic/juc/tools/Semaphore', '961'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/jvm/',
                component: ComponentCreator('/jaspernote/docs/java/basic/jvm/', 'b70'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/jvm/classload/',
                component: ComponentCreator('/jaspernote/docs/java/basic/jvm/classload/', '76b'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/jvm/classload/classLoader',
                component: ComponentCreator('/jaspernote/docs/java/basic/jvm/classload/classLoader', '276'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/jvm/classload/process/01load',
                component: ComponentCreator('/jaspernote/docs/java/basic/jvm/classload/process/01load', 'eea'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/jvm/classload/process/02verfication',
                component: ComponentCreator('/jaspernote/docs/java/basic/jvm/classload/process/02verfication', '6d3'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/jvm/classload/process/03preparation',
                component: ComponentCreator('/jaspernote/docs/java/basic/jvm/classload/process/03preparation', '432'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/jvm/classload/process/04resolution',
                component: ComponentCreator('/jaspernote/docs/java/basic/jvm/classload/process/04resolution', '570'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/jvm/classload/process/05initialization',
                component: ComponentCreator('/jaspernote/docs/java/basic/jvm/classload/process/05initialization', '512'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/jvm/gc',
                component: ComponentCreator('/jaspernote/docs/java/basic/jvm/gc', 'd4c'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/jvm/gc/basic',
                component: ComponentCreator('/jaspernote/docs/java/basic/jvm/gc/basic', '40b'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/jvm/gc/g1',
                component: ComponentCreator('/jaspernote/docs/java/basic/jvm/gc/g1', 'f4b'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/jvm/gc/parallelScavenge',
                component: ComponentCreator('/jaspernote/docs/java/basic/jvm/gc/parallelScavenge', 'ef3'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/jvm/jmm/',
                component: ComponentCreator('/jaspernote/docs/java/basic/jvm/jmm/', '712'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/jvm/jmm/memoryBarrier',
                component: ComponentCreator('/jaspernote/docs/java/basic/jvm/jmm/memoryBarrier', '94a'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/jvm/lock/biasedLock',
                component: ComponentCreator('/jaspernote/docs/java/basic/jvm/lock/biasedLock', '7ec'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/jvm/other/堆栈',
                component: ComponentCreator('/jaspernote/docs/java/basic/jvm/other/堆栈', 'e39'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/jvm/runtimeDataArea/',
                component: ComponentCreator('/jaspernote/docs/java/basic/jvm/runtimeDataArea/', '83f'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/jvm/runtimeDataArea/directMemory',
                component: ComponentCreator('/jaspernote/docs/java/basic/jvm/runtimeDataArea/directMemory', 'f5e'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/jvm/runtimeDataArea/heap',
                component: ComponentCreator('/jaspernote/docs/java/basic/jvm/runtimeDataArea/heap', '1eb'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/jvm/runtimeDataArea/methodArea',
                component: ComponentCreator('/jaspernote/docs/java/basic/jvm/runtimeDataArea/methodArea', 'a01'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/jvm/runtimeDataArea/nativeStack',
                component: ComponentCreator('/jaspernote/docs/java/basic/jvm/runtimeDataArea/nativeStack', '98b'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/jvm/runtimeDataArea/pcRegister',
                component: ComponentCreator('/jaspernote/docs/java/basic/jvm/runtimeDataArea/pcRegister', 'a46'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/jvm/runtimeDataArea/vmStack',
                component: ComponentCreator('/jaspernote/docs/java/basic/jvm/runtimeDataArea/vmStack', '648'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/jvm/systemProperties',
                component: ComponentCreator('/jaspernote/docs/java/basic/jvm/systemProperties', 'd2e'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/jvm/utils/jmap',
                component: ComponentCreator('/jaspernote/docs/java/basic/jvm/utils/jmap', 'd52'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/jvm/utils/mat(memory analyzer tool)',
                component: ComponentCreator('/jaspernote/docs/java/basic/jvm/utils/mat(memory analyzer tool)', 'bdd'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/jvm/vm参数',
                component: ComponentCreator('/jaspernote/docs/java/basic/jvm/vm参数', 'f94'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/jvm/学习路线',
                component: ComponentCreator('/jaspernote/docs/java/basic/jvm/学习路线', 'b6b'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/jvm/锁的优化和升级',
                component: ComponentCreator('/jaspernote/docs/java/basic/jvm/锁的优化和升级', '973'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/newFeature/',
                component: ComponentCreator('/jaspernote/docs/java/basic/newFeature/', 'eff'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/newFeature/17/',
                component: ComponentCreator('/jaspernote/docs/java/basic/newFeature/17/', '703'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/newFeature/21/collections/map',
                component: ComponentCreator('/jaspernote/docs/java/basic/newFeature/21/collections/map', 'a38'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/newFeature/21/virtualThread',
                component: ComponentCreator('/jaspernote/docs/java/basic/newFeature/21/virtualThread', '5ec'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/newFeature/8/',
                component: ComponentCreator('/jaspernote/docs/java/basic/newFeature/8/', 'b76'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/newFeature/8/functionInterface/',
                component: ComponentCreator('/jaspernote/docs/java/basic/newFeature/8/functionInterface/', '0b1'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/newFeature/8/functionInterface/BiConsumer',
                component: ComponentCreator('/jaspernote/docs/java/basic/newFeature/8/functionInterface/BiConsumer', '434'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/newFeature/8/functionInterface/biFunction',
                component: ComponentCreator('/jaspernote/docs/java/basic/newFeature/8/functionInterface/biFunction', '6be'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/newFeature/8/functionInterface/consumer',
                component: ComponentCreator('/jaspernote/docs/java/basic/newFeature/8/functionInterface/consumer', 'da0'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/newFeature/8/functionInterface/function',
                component: ComponentCreator('/jaspernote/docs/java/basic/newFeature/8/functionInterface/function', 'e42'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/newFeature/8/functionInterface/predicate',
                component: ComponentCreator('/jaspernote/docs/java/basic/newFeature/8/functionInterface/predicate', '27a'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/newFeature/8/functionInterface/supplier',
                component: ComponentCreator('/jaspernote/docs/java/basic/newFeature/8/functionInterface/supplier', 'c2f'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/newFeature/8/optional',
                component: ComponentCreator('/jaspernote/docs/java/basic/newFeature/8/optional', '777'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/newFeature/8/stream/',
                component: ComponentCreator('/jaspernote/docs/java/basic/newFeature/8/stream/', '059'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/newFeature/8/stream/intermediate/flatMap',
                component: ComponentCreator('/jaspernote/docs/java/basic/newFeature/8/stream/intermediate/flatMap', '68d'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/newFeature/8/stream/intermediate/map',
                component: ComponentCreator('/jaspernote/docs/java/basic/newFeature/8/stream/intermediate/map', '5a4'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/newFeature/8/stream/intermediate/skip',
                component: ComponentCreator('/jaspernote/docs/java/basic/newFeature/8/stream/intermediate/skip', 'a6b'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/newFeature/8/stream/intStream',
                component: ComponentCreator('/jaspernote/docs/java/basic/newFeature/8/stream/intStream', 'ba4'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/newFeature/8/stream/terminal/collect',
                component: ComponentCreator('/jaspernote/docs/java/basic/newFeature/8/stream/terminal/collect', 'e29'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/newFeature/8/stream/terminal/reduce',
                component: ComponentCreator('/jaspernote/docs/java/basic/newFeature/8/stream/terminal/reduce', 'cd5'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/newFeature/9/',
                component: ComponentCreator('/jaspernote/docs/java/basic/newFeature/9/', 'c38'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/basic/newFeature/9/module',
                component: ComponentCreator('/jaspernote/docs/java/basic/newFeature/9/module', '8d6'),
                exact: true,
                sidebar: "javaBasic"
              },
              {
                path: '/jaspernote/docs/java/devTools/',
                component: ComponentCreator('/jaspernote/docs/java/devTools/', '23b'),
                exact: true,
                sidebar: "devTools"
              },
              {
                path: '/jaspernote/docs/java/devTools/buildTools/gradle/',
                component: ComponentCreator('/jaspernote/docs/java/devTools/buildTools/gradle/', '388'),
                exact: true,
                sidebar: "devTools"
              },
              {
                path: '/jaspernote/docs/java/devTools/buildTools/gradle/config',
                component: ComponentCreator('/jaspernote/docs/java/devTools/buildTools/gradle/config', 'b88'),
                exact: true,
                sidebar: "devTools"
              },
              {
                path: '/jaspernote/docs/java/devTools/buildTools/maven/',
                component: ComponentCreator('/jaspernote/docs/java/devTools/buildTools/maven/', '800'),
                exact: true,
                sidebar: "devTools"
              },
              {
                path: '/jaspernote/docs/java/devTools/buildTools/maven/basic',
                component: ComponentCreator('/jaspernote/docs/java/devTools/buildTools/maven/basic', '4f5'),
                exact: true,
                sidebar: "devTools"
              },
              {
                path: '/jaspernote/docs/java/devTools/buildTools/maven/confilct',
                component: ComponentCreator('/jaspernote/docs/java/devTools/buildTools/maven/confilct', 'b7b'),
                exact: true,
                sidebar: "devTools"
              },
              {
                path: '/jaspernote/docs/java/devTools/idea/',
                component: ComponentCreator('/jaspernote/docs/java/devTools/idea/', '672'),
                exact: true,
                sidebar: "devTools"
              },
              {
                path: '/jaspernote/docs/java/devTools/idea/debug',
                component: ComponentCreator('/jaspernote/docs/java/devTools/idea/debug', '9b5'),
                exact: true,
                sidebar: "devTools"
              },
              {
                path: '/jaspernote/docs/java/devTools/idea/docker',
                component: ComponentCreator('/jaspernote/docs/java/devTools/idea/docker', 'e6c'),
                exact: true,
                sidebar: "devTools"
              },
              {
                path: '/jaspernote/docs/java/devTools/idea/httpClient/',
                component: ComponentCreator('/jaspernote/docs/java/devTools/idea/httpClient/', '948'),
                exact: true,
                sidebar: "devTools"
              },
              {
                path: '/jaspernote/docs/java/devTools/idea/httpClient/dynamicVariable',
                component: ComponentCreator('/jaspernote/docs/java/devTools/idea/httpClient/dynamicVariable', '113'),
                exact: true,
                sidebar: "devTools"
              },
              {
                path: '/jaspernote/docs/java/devTools/idea/liveTemplate',
                component: ComponentCreator('/jaspernote/docs/java/devTools/idea/liveTemplate', 'bc9'),
                exact: true,
                sidebar: "devTools"
              },
              {
                path: '/jaspernote/docs/java/devTools/idea/tips',
                component: ComponentCreator('/jaspernote/docs/java/devTools/idea/tips', '26c'),
                exact: true,
                sidebar: "devTools"
              },
              {
                path: '/jaspernote/docs/java/devTools/jenv/',
                component: ComponentCreator('/jaspernote/docs/java/devTools/jenv/', 'f32'),
                exact: true,
                sidebar: "devTools"
              },
              {
                path: '/jaspernote/docs/java/devTools/toad/',
                component: ComponentCreator('/jaspernote/docs/java/devTools/toad/', '3cf'),
                exact: true,
                sidebar: "devTools"
              },
              {
                path: '/jaspernote/docs/java/framework/',
                component: ComponentCreator('/jaspernote/docs/java/framework/', '7fd'),
                exact: true,
                sidebar: "framework"
              },
              {
                path: '/jaspernote/docs/java/framework/dubbo/',
                component: ComponentCreator('/jaspernote/docs/java/framework/dubbo/', '345'),
                exact: true,
                sidebar: "framework"
              },
              {
                path: '/jaspernote/docs/java/framework/jetCache/',
                component: ComponentCreator('/jaspernote/docs/java/framework/jetCache/', '8a4'),
                exact: true,
                sidebar: "framework"
              },
              {
                path: '/jaspernote/docs/java/framework/jpa/',
                component: ComponentCreator('/jaspernote/docs/java/framework/jpa/', 'e4f'),
                exact: true,
                sidebar: "framework"
              },
              {
                path: '/jaspernote/docs/java/framework/mybatis/',
                component: ComponentCreator('/jaspernote/docs/java/framework/mybatis/', 'd12'),
                exact: true,
                sidebar: "framework"
              },
              {
                path: '/jaspernote/docs/java/framework/mybatis/cache',
                component: ComponentCreator('/jaspernote/docs/java/framework/mybatis/cache', 'fa1'),
                exact: true,
                sidebar: "framework"
              },
              {
                path: '/jaspernote/docs/java/framework/mybatis/mybatis-spring',
                component: ComponentCreator('/jaspernote/docs/java/framework/mybatis/mybatis-spring', '751'),
                exact: true,
                sidebar: "framework"
              },
              {
                path: '/jaspernote/docs/java/framework/mybatis/mybatisPlugin',
                component: ComponentCreator('/jaspernote/docs/java/framework/mybatis/mybatisPlugin', '512'),
                exact: true,
                sidebar: "framework"
              },
              {
                path: '/jaspernote/docs/java/framework/mybatis/simpleUsage',
                component: ComponentCreator('/jaspernote/docs/java/framework/mybatis/simpleUsage', '0aa'),
                exact: true,
                sidebar: "framework"
              },
              {
                path: '/jaspernote/docs/java/framework/mybatis/sourceCode/mybatis-spring/',
                component: ComponentCreator('/jaspernote/docs/java/framework/mybatis/sourceCode/mybatis-spring/', '2cb'),
                exact: true,
                sidebar: "framework"
              },
              {
                path: '/jaspernote/docs/java/framework/mybatis/sourceCode/mybatis-spring/MapperScannerRegistrar',
                component: ComponentCreator('/jaspernote/docs/java/framework/mybatis/sourceCode/mybatis-spring/MapperScannerRegistrar', '048'),
                exact: true,
                sidebar: "framework"
              },
              {
                path: '/jaspernote/docs/java/framework/mybatis/sourceCode/mybatis-spring/SqlSessionUtils',
                component: ComponentCreator('/jaspernote/docs/java/framework/mybatis/sourceCode/mybatis-spring/SqlSessionUtils', '284'),
                exact: true,
                sidebar: "framework"
              },
              {
                path: '/jaspernote/docs/java/framework/mybatis/xml配置文件',
                component: ComponentCreator('/jaspernote/docs/java/framework/mybatis/xml配置文件', 'c87'),
                exact: true,
                sidebar: "framework"
              },
              {
                path: '/jaspernote/docs/java/framework/redisson/',
                component: ComponentCreator('/jaspernote/docs/java/framework/redisson/', '49c'),
                exact: true,
                sidebar: "framework"
              },
              {
                path: '/jaspernote/docs/java/framework/spring/',
                component: ComponentCreator('/jaspernote/docs/java/framework/spring/', 'de8'),
                exact: true,
                sidebar: "framework"
              },
              {
                path: '/jaspernote/docs/java/framework/spring/annotations/',
                component: ComponentCreator('/jaspernote/docs/java/framework/spring/annotations/', 'c77'),
                exact: true,
                sidebar: "framework"
              },
              {
                path: '/jaspernote/docs/java/framework/spring/annotations/AliasFor',
                component: ComponentCreator('/jaspernote/docs/java/framework/spring/annotations/AliasFor', 'ebd'),
                exact: true,
                sidebar: "framework"
              },
              {
                path: '/jaspernote/docs/java/framework/spring/annotations/Async',
                component: ComponentCreator('/jaspernote/docs/java/framework/spring/annotations/Async', 'f85'),
                exact: true,
                sidebar: "framework"
              },
              {
                path: '/jaspernote/docs/java/framework/spring/annotations/ConditionalOnProperty',
                component: ComponentCreator('/jaspernote/docs/java/framework/spring/annotations/ConditionalOnProperty', '627'),
                exact: true,
                sidebar: "framework"
              },
              {
                path: '/jaspernote/docs/java/framework/spring/annotations/DependsOn',
                component: ComponentCreator('/jaspernote/docs/java/framework/spring/annotations/DependsOn', '1a3'),
                exact: true,
                sidebar: "framework"
              },
              {
                path: '/jaspernote/docs/java/framework/spring/annotations/PostConstruct',
                component: ComponentCreator('/jaspernote/docs/java/framework/spring/annotations/PostConstruct', 'b30'),
                exact: true,
                sidebar: "framework"
              },
              {
                path: '/jaspernote/docs/java/framework/spring/annotations/requestMapping',
                component: ComponentCreator('/jaspernote/docs/java/framework/spring/annotations/requestMapping', 'c69'),
                exact: true,
                sidebar: "framework"
              },
              {
                path: '/jaspernote/docs/java/framework/spring/api/context/ApplicationContext',
                component: ComponentCreator('/jaspernote/docs/java/framework/spring/api/context/ApplicationContext', '73f'),
                exact: true,
                sidebar: "framework"
              },
              {
                path: '/jaspernote/docs/java/framework/spring/api/context/ApplicationContextAware',
                component: ComponentCreator('/jaspernote/docs/java/framework/spring/api/context/ApplicationContextAware', '013'),
                exact: true,
                sidebar: "framework"
              },
              {
                path: '/jaspernote/docs/java/framework/spring/api/context/FactoryBean',
                component: ComponentCreator('/jaspernote/docs/java/framework/spring/api/context/FactoryBean', 'aef'),
                exact: true,
                sidebar: "framework"
              },
              {
                path: '/jaspernote/docs/java/framework/spring/api/interfaces/InitializingBean',
                component: ComponentCreator('/jaspernote/docs/java/framework/spring/api/interfaces/InitializingBean', '616'),
                exact: true,
                sidebar: "framework"
              },
              {
                path: '/jaspernote/docs/java/framework/spring/api/utils/AnnotatedElementUtils',
                component: ComponentCreator('/jaspernote/docs/java/framework/spring/api/utils/AnnotatedElementUtils', '52d'),
                exact: true,
                sidebar: "framework"
              },
              {
                path: '/jaspernote/docs/java/framework/spring/api/utils/Assert',
                component: ComponentCreator('/jaspernote/docs/java/framework/spring/api/utils/Assert', 'ee5'),
                exact: true,
                sidebar: "framework"
              },
              {
                path: '/jaspernote/docs/java/framework/spring/api/utils/ReflectionUtils',
                component: ComponentCreator('/jaspernote/docs/java/framework/spring/api/utils/ReflectionUtils', 'ab6'),
                exact: true,
                sidebar: "framework"
              },
              {
                path: '/jaspernote/docs/java/framework/spring/core/aop/',
                component: ComponentCreator('/jaspernote/docs/java/framework/spring/core/aop/', '797'),
                exact: true,
                sidebar: "framework"
              },
              {
                path: '/jaspernote/docs/java/framework/spring/core/aop/spring',
                component: ComponentCreator('/jaspernote/docs/java/framework/spring/core/aop/spring', 'c6a'),
                exact: true,
                sidebar: "framework"
              },
              {
                path: '/jaspernote/docs/java/framework/spring/core/aspect/',
                component: ComponentCreator('/jaspernote/docs/java/framework/spring/core/aspect/', 'cae'),
                exact: true,
                sidebar: "framework"
              },
              {
                path: '/jaspernote/docs/java/framework/spring/core/aspect/pcd',
                component: ComponentCreator('/jaspernote/docs/java/framework/spring/core/aspect/pcd', '1a4'),
                exact: true,
                sidebar: "framework"
              },
              {
                path: '/jaspernote/docs/java/framework/spring/core/aspect/start',
                component: ComponentCreator('/jaspernote/docs/java/framework/spring/core/aspect/start', '49d'),
                exact: true,
                sidebar: "framework"
              },
              {
                path: '/jaspernote/docs/java/framework/spring/core/Event',
                component: ComponentCreator('/jaspernote/docs/java/framework/spring/core/Event', 'c8f'),
                exact: true,
                sidebar: "framework"
              },
              {
                path: '/jaspernote/docs/java/framework/spring/core/ioc/',
                component: ComponentCreator('/jaspernote/docs/java/framework/spring/core/ioc/', 'b5b'),
                exact: true,
                sidebar: "framework"
              },
              {
                path: '/jaspernote/docs/java/framework/spring/core/ioc/applicationContext/event',
                component: ComponentCreator('/jaspernote/docs/java/framework/spring/core/ioc/applicationContext/event', '6cf'),
                exact: true,
                sidebar: "framework"
              },
              {
                path: '/jaspernote/docs/java/framework/spring/core/ioc/bean',
                component: ComponentCreator('/jaspernote/docs/java/framework/spring/core/ioc/bean', 'c5c'),
                exact: true,
                sidebar: "framework"
              },
              {
                path: '/jaspernote/docs/java/framework/spring/core/ioc/BeanDefInheritance',
                component: ComponentCreator('/jaspernote/docs/java/framework/spring/core/ioc/BeanDefInheritance', '404'),
                exact: true,
                sidebar: "framework"
              },
              {
                path: '/jaspernote/docs/java/framework/spring/core/ioc/dependiencies/circular',
                component: ComponentCreator('/jaspernote/docs/java/framework/spring/core/ioc/dependiencies/circular', 'c13'),
                exact: true,
                sidebar: "framework"
              },
              {
                path: '/jaspernote/docs/java/framework/spring/core/ioc/lifecycle',
                component: ComponentCreator('/jaspernote/docs/java/framework/spring/core/ioc/lifecycle', '6f5'),
                exact: true,
                sidebar: "framework"
              },
              {
                path: '/jaspernote/docs/java/framework/spring/core/spel/',
                component: ComponentCreator('/jaspernote/docs/java/framework/spring/core/spel/', '23f'),
                exact: true,
                sidebar: "framework"
              },
              {
                path: '/jaspernote/docs/java/framework/spring/dataAccess/transaction',
                component: ComponentCreator('/jaspernote/docs/java/framework/spring/dataAccess/transaction', '9d2'),
                exact: true,
                sidebar: "framework"
              },
              {
                path: '/jaspernote/docs/java/framework/spring/dataAccess/transactionInvalid',
                component: ComponentCreator('/jaspernote/docs/java/framework/spring/dataAccess/transactionInvalid', '06e'),
                exact: true,
                sidebar: "framework"
              },
              {
                path: '/jaspernote/docs/java/framework/spring/dataAccess/transactionSynchronizeManager',
                component: ComponentCreator('/jaspernote/docs/java/framework/spring/dataAccess/transactionSynchronizeManager', '967'),
                exact: true,
                sidebar: "framework"
              },
              {
                path: '/jaspernote/docs/java/framework/spring/dataAccess/事务传播机制',
                component: ComponentCreator('/jaspernote/docs/java/framework/spring/dataAccess/事务传播机制', '4b0'),
                exact: true,
                sidebar: "framework"
              },
              {
                path: '/jaspernote/docs/java/framework/spring/integration/taskExecutionSchedule',
                component: ComponentCreator('/jaspernote/docs/java/framework/spring/integration/taskExecutionSchedule', 'ac2'),
                exact: true,
                sidebar: "framework"
              },
              {
                path: '/jaspernote/docs/java/framework/spring/sourceCode/transaction',
                component: ComponentCreator('/jaspernote/docs/java/framework/spring/sourceCode/transaction', '28e'),
                exact: true,
                sidebar: "framework"
              },
              {
                path: '/jaspernote/docs/java/framework/springBatch/',
                component: ComponentCreator('/jaspernote/docs/java/framework/springBatch/', '6d9'),
                exact: true,
                sidebar: "framework"
              },
              {
                path: '/jaspernote/docs/java/framework/springboot/',
                component: ComponentCreator('/jaspernote/docs/java/framework/springboot/', '15d'),
                exact: true,
                sidebar: "framework"
              },
              {
                path: '/jaspernote/docs/java/framework/springboot/CommandLineRunner',
                component: ComponentCreator('/jaspernote/docs/java/framework/springboot/CommandLineRunner', 'b72'),
                exact: true,
                sidebar: "framework"
              },
              {
                path: '/jaspernote/docs/java/framework/springboot/corefeature/dockercomposesupport',
                component: ComponentCreator('/jaspernote/docs/java/framework/springboot/corefeature/dockercomposesupport', '8dc'),
                exact: true,
                sidebar: "framework"
              },
              {
                path: '/jaspernote/docs/java/framework/springboot/integration/freemarker',
                component: ComponentCreator('/jaspernote/docs/java/framework/springboot/integration/freemarker', '5af'),
                exact: true,
                sidebar: "framework"
              },
              {
                path: '/jaspernote/docs/java/framework/springboot/integration/logback',
                component: ComponentCreator('/jaspernote/docs/java/framework/springboot/integration/logback', '852'),
                exact: true,
                sidebar: "framework"
              },
              {
                path: '/jaspernote/docs/java/framework/springboot/integration/mybatis',
                component: ComponentCreator('/jaspernote/docs/java/framework/springboot/integration/mybatis', 'add'),
                exact: true,
                sidebar: "framework"
              },
              {
                path: '/jaspernote/docs/java/framework/springboot/integration/sqlite',
                component: ComponentCreator('/jaspernote/docs/java/framework/springboot/integration/sqlite', '142'),
                exact: true,
                sidebar: "framework"
              },
              {
                path: '/jaspernote/docs/java/framework/springboot/other',
                component: ComponentCreator('/jaspernote/docs/java/framework/springboot/other', '476'),
                exact: true,
                sidebar: "framework"
              },
              {
                path: '/jaspernote/docs/java/framework/springboot/springbootReadConfig',
                component: ComponentCreator('/jaspernote/docs/java/framework/springboot/springbootReadConfig', 'ef2'),
                exact: true,
                sidebar: "framework"
              },
              {
                path: '/jaspernote/docs/java/framework/springboot/springbootReadFile',
                component: ComponentCreator('/jaspernote/docs/java/framework/springboot/springbootReadFile', '3a5'),
                exact: true,
                sidebar: "framework"
              },
              {
                path: '/jaspernote/docs/java/framework/springboot/自定义starter',
                component: ComponentCreator('/jaspernote/docs/java/framework/springboot/自定义starter', 'b4b'),
                exact: true,
                sidebar: "framework"
              },
              {
                path: '/jaspernote/docs/java/framework/springboot/配置文件',
                component: ComponentCreator('/jaspernote/docs/java/framework/springboot/配置文件', '752'),
                exact: true,
                sidebar: "framework"
              },
              {
                path: '/jaspernote/docs/java/framework/springcli/',
                component: ComponentCreator('/jaspernote/docs/java/framework/springcli/', 'edb'),
                exact: true,
                sidebar: "framework"
              },
              {
                path: '/jaspernote/docs/java/framework/springcloud/',
                component: ComponentCreator('/jaspernote/docs/java/framework/springcloud/', '0e6'),
                exact: true,
                sidebar: "framework"
              },
              {
                path: '/jaspernote/docs/java/framework/springcloud/seata/',
                component: ComponentCreator('/jaspernote/docs/java/framework/springcloud/seata/', 'e96'),
                exact: true,
                sidebar: "framework"
              },
              {
                path: '/jaspernote/docs/java/framework/springcloud/springCloudStream/',
                component: ComponentCreator('/jaspernote/docs/java/framework/springcloud/springCloudStream/', '272'),
                exact: true,
                sidebar: "framework"
              },
              {
                path: '/jaspernote/docs/java/framework/springData/',
                component: ComponentCreator('/jaspernote/docs/java/framework/springData/', 'f89'),
                exact: true,
                sidebar: "framework"
              },
              {
                path: '/jaspernote/docs/java/framework/springmvc/',
                component: ComponentCreator('/jaspernote/docs/java/framework/springmvc/', 'b93'),
                exact: true,
                sidebar: "framework"
              },
              {
                path: '/jaspernote/docs/java/framework/springmvc/cookieAndSession',
                component: ComponentCreator('/jaspernote/docs/java/framework/springmvc/cookieAndSession', 'eca'),
                exact: true,
                sidebar: "framework"
              },
              {
                path: '/jaspernote/docs/java/framework/springSecurity/',
                component: ComponentCreator('/jaspernote/docs/java/framework/springSecurity/', '483'),
                exact: true,
                sidebar: "framework"
              },
              {
                path: '/jaspernote/docs/java/framework/springSecurity/impl',
                component: ComponentCreator('/jaspernote/docs/java/framework/springSecurity/impl', 'd1e'),
                exact: true,
                sidebar: "framework"
              },
              {
                path: '/jaspernote/docs/java/middleware/minio/',
                component: ComponentCreator('/jaspernote/docs/java/middleware/minio/', '046'),
                exact: true
              },
              {
                path: '/jaspernote/docs/java/middleware/minio/docker搭建',
                component: ComponentCreator('/jaspernote/docs/java/middleware/minio/docker搭建', '683'),
                exact: true
              },
              {
                path: '/jaspernote/docs/java/middleware/minio/java',
                component: ComponentCreator('/jaspernote/docs/java/middleware/minio/java', '184'),
                exact: true
              },
              {
                path: '/jaspernote/docs/java/middleware/mq/',
                component: ComponentCreator('/jaspernote/docs/java/middleware/mq/', '9b0'),
                exact: true
              },
              {
                path: '/jaspernote/docs/java/middleware/mq/impl',
                component: ComponentCreator('/jaspernote/docs/java/middleware/mq/impl', '68d'),
                exact: true
              },
              {
                path: '/jaspernote/docs/java/middleware/rocketmq/',
                component: ComponentCreator('/jaspernote/docs/java/middleware/rocketmq/', '27e'),
                exact: true
              },
              {
                path: '/jaspernote/docs/java/middleware/rocketmq/00buildAndInstall',
                component: ComponentCreator('/jaspernote/docs/java/middleware/rocketmq/00buildAndInstall', 'aed'),
                exact: true
              },
              {
                path: '/jaspernote/docs/java/middleware/rocketmq/architecture',
                component: ComponentCreator('/jaspernote/docs/java/middleware/rocketmq/architecture', '47f'),
                exact: true
              },
              {
                path: '/jaspernote/docs/java/middleware/rocketmq/basic',
                component: ComponentCreator('/jaspernote/docs/java/middleware/rocketmq/basic', '97a'),
                exact: true
              },
              {
                path: '/jaspernote/docs/java/middleware/rocketmq/dashboard/concept',
                component: ComponentCreator('/jaspernote/docs/java/middleware/rocketmq/dashboard/concept', '2a8'),
                exact: true
              },
              {
                path: '/jaspernote/docs/java/middleware/rocketmq/dockercompose',
                component: ComponentCreator('/jaspernote/docs/java/middleware/rocketmq/dockercompose', 'f82'),
                exact: true
              },
              {
                path: '/jaspernote/docs/java/middleware/rocketmq/message/batch',
                component: ComponentCreator('/jaspernote/docs/java/middleware/rocketmq/message/batch', 'f5e'),
                exact: true
              },
              {
                path: '/jaspernote/docs/java/middleware/rocketmq/message/delay',
                component: ComponentCreator('/jaspernote/docs/java/middleware/rocketmq/message/delay', '4c6'),
                exact: true
              },
              {
                path: '/jaspernote/docs/java/middleware/rocketmq/message/messageFilter',
                component: ComponentCreator('/jaspernote/docs/java/middleware/rocketmq/message/messageFilter', '41a'),
                exact: true
              },
              {
                path: '/jaspernote/docs/java/middleware/rocketmq/message/order',
                component: ComponentCreator('/jaspernote/docs/java/middleware/rocketmq/message/order', '168'),
                exact: true
              },
              {
                path: '/jaspernote/docs/java/middleware/rocketmq/message/transaction',
                component: ComponentCreator('/jaspernote/docs/java/middleware/rocketmq/message/transaction', '73d'),
                exact: true
              },
              {
                path: '/jaspernote/docs/java/middleware/rocketmq/mq/concept',
                component: ComponentCreator('/jaspernote/docs/java/middleware/rocketmq/mq/concept', '10c'),
                exact: true
              },
              {
                path: '/jaspernote/docs/java/middleware/rocketmq/mq/feature',
                component: ComponentCreator('/jaspernote/docs/java/middleware/rocketmq/mq/feature', 'dc9'),
                exact: true
              },
              {
                path: '/jaspernote/docs/java/middleware/rocketmq/other',
                component: ComponentCreator('/jaspernote/docs/java/middleware/rocketmq/other', '1ec'),
                exact: true
              },
              {
                path: '/jaspernote/docs/java/middleware/rocketmq/problems',
                component: ComponentCreator('/jaspernote/docs/java/middleware/rocketmq/problems', 'da2'),
                exact: true
              },
              {
                path: '/jaspernote/docs/java/middleware/rocketmq/roundRobin',
                component: ComponentCreator('/jaspernote/docs/java/middleware/rocketmq/roundRobin', '51a'),
                exact: true
              },
              {
                path: '/jaspernote/docs/java/middleware/rocketmq/spring/',
                component: ComponentCreator('/jaspernote/docs/java/middleware/rocketmq/spring/', 'd29'),
                exact: true
              },
              {
                path: '/jaspernote/docs/java/middleware/rocketmq/spring/springboot',
                component: ComponentCreator('/jaspernote/docs/java/middleware/rocketmq/spring/springboot', '1fa'),
                exact: true
              },
              {
                path: '/jaspernote/docs/java/middleware/rocketmq/spring/springCloud',
                component: ComponentCreator('/jaspernote/docs/java/middleware/rocketmq/spring/springCloud', '840'),
                exact: true
              },
              {
                path: '/jaspernote/docs/java/middleware/rocketmq/tools/mqadmin',
                component: ComponentCreator('/jaspernote/docs/java/middleware/rocketmq/tools/mqadmin', '806'),
                exact: true
              },
              {
                path: '/jaspernote/docs/java/middleware/rocketmq/usage',
                component: ComponentCreator('/jaspernote/docs/java/middleware/rocketmq/usage', 'f97'),
                exact: true
              },
              {
                path: '/jaspernote/docs/java/middleware/rocketmq/调试源码',
                component: ComponentCreator('/jaspernote/docs/java/middleware/rocketmq/调试源码', '14b'),
                exact: true
              },
              {
                path: '/jaspernote/docs/java/middleware/workflow/flowable/',
                component: ComponentCreator('/jaspernote/docs/java/middleware/workflow/flowable/', 'b69'),
                exact: true
              },
              {
                path: '/jaspernote/docs/java/middleware/zookeeper/',
                component: ComponentCreator('/jaspernote/docs/java/middleware/zookeeper/', '9b5'),
                exact: true
              },
              {
                path: '/jaspernote/docs/java/middleware/zookeeper/install',
                component: ComponentCreator('/jaspernote/docs/java/middleware/zookeeper/install', 'f73'),
                exact: true
              },
              {
                path: '/jaspernote/docs/java/middleware/zookeeper/usage',
                component: ComponentCreator('/jaspernote/docs/java/middleware/zookeeper/usage', '6c6'),
                exact: true
              },
              {
                path: '/jaspernote/docs/java/network/netty/',
                component: ComponentCreator('/jaspernote/docs/java/network/netty/', 'cfa'),
                exact: true
              },
              {
                path: '/jaspernote/docs/java/network/websocket/',
                component: ComponentCreator('/jaspernote/docs/java/network/websocket/', '98b'),
                exact: true
              },
              {
                path: '/jaspernote/docs/java/roadmap',
                component: ComponentCreator('/jaspernote/docs/java/roadmap', 'a92'),
                exact: true
              },
              {
                path: '/jaspernote/docs/java/test/',
                component: ComponentCreator('/jaspernote/docs/java/test/', 'd9f'),
                exact: true
              },
              {
                path: '/jaspernote/docs/java/test/junit/',
                component: ComponentCreator('/jaspernote/docs/java/test/junit/', 'e6b'),
                exact: true
              },
              {
                path: '/jaspernote/docs/java/test/mockito/',
                component: ComponentCreator('/jaspernote/docs/java/test/mockito/', '9ff'),
                exact: true
              },
              {
                path: '/jaspernote/docs/java/utils/',
                component: ComponentCreator('/jaspernote/docs/java/utils/', '314'),
                exact: true
              },
              {
                path: '/jaspernote/docs/java/utils/apache/commons/pool',
                component: ComponentCreator('/jaspernote/docs/java/utils/apache/commons/pool', '1ae'),
                exact: true
              },
              {
                path: '/jaspernote/docs/java/utils/arthas/',
                component: ComponentCreator('/jaspernote/docs/java/utils/arthas/', 'ef6'),
                exact: true
              },
              {
                path: '/jaspernote/docs/java/utils/arthas/dashboard',
                component: ComponentCreator('/jaspernote/docs/java/utils/arthas/dashboard', '7b7'),
                exact: true
              },
              {
                path: '/jaspernote/docs/java/utils/bytebuddy/',
                component: ComponentCreator('/jaspernote/docs/java/utils/bytebuddy/', 'b79'),
                exact: true
              },
              {
                path: '/jaspernote/docs/java/utils/caffeine/',
                component: ComponentCreator('/jaspernote/docs/java/utils/caffeine/', 'd75'),
                exact: true
              },
              {
                path: '/jaspernote/docs/java/utils/caffeine/popultaion',
                component: ComponentCreator('/jaspernote/docs/java/utils/caffeine/popultaion', 'c56'),
                exact: true
              },
              {
                path: '/jaspernote/docs/java/utils/cglib/',
                component: ComponentCreator('/jaspernote/docs/java/utils/cglib/', '149'),
                exact: true
              },
              {
                path: '/jaspernote/docs/java/utils/guava/',
                component: ComponentCreator('/jaspernote/docs/java/utils/guava/', '63d'),
                exact: true
              },
              {
                path: '/jaspernote/docs/java/utils/guava/cache',
                component: ComponentCreator('/jaspernote/docs/java/utils/guava/cache', 'df9'),
                exact: true
              },
              {
                path: '/jaspernote/docs/java/utils/guava/collections/utils/Queues',
                component: ComponentCreator('/jaspernote/docs/java/utils/guava/collections/utils/Queues', 'd45'),
                exact: true
              },
              {
                path: '/jaspernote/docs/java/utils/guava/EventBus',
                component: ComponentCreator('/jaspernote/docs/java/utils/guava/EventBus', '4d7'),
                exact: true
              },
              {
                path: '/jaspernote/docs/java/utils/guava/Strings',
                component: ComponentCreator('/jaspernote/docs/java/utils/guava/Strings', '3da'),
                exact: true
              },
              {
                path: '/jaspernote/docs/java/utils/guava/utilities/stopWatch',
                component: ComponentCreator('/jaspernote/docs/java/utils/guava/utilities/stopWatch', '1a2'),
                exact: true
              },
              {
                path: '/jaspernote/docs/java/utils/hutool/',
                component: ComponentCreator('/jaspernote/docs/java/utils/hutool/', '621'),
                exact: true
              },
              {
                path: '/jaspernote/docs/java/utils/json/fastjson/',
                component: ComponentCreator('/jaspernote/docs/java/utils/json/fastjson/', 'b2c'),
                exact: true
              },
              {
                path: '/jaspernote/docs/java/utils/json/jackson/',
                component: ComponentCreator('/jaspernote/docs/java/utils/json/jackson/', 'f93'),
                exact: true
              },
              {
                path: '/jaspernote/docs/java/utils/json/jackson/ContainerNode',
                component: ComponentCreator('/jaspernote/docs/java/utils/json/jackson/ContainerNode', '645'),
                exact: true
              },
              {
                path: '/jaspernote/docs/java/utils/json/jackson/SerializationConfig',
                component: ComponentCreator('/jaspernote/docs/java/utils/json/jackson/SerializationConfig', '15c'),
                exact: true
              },
              {
                path: '/jaspernote/docs/java/utils/lombok/',
                component: ComponentCreator('/jaspernote/docs/java/utils/lombok/', '2b0'),
                exact: true
              },
              {
                path: '/jaspernote/docs/java/utils/lombok/annotations/Builder',
                component: ComponentCreator('/jaspernote/docs/java/utils/lombok/annotations/Builder', 'd12'),
                exact: true
              },
              {
                path: '/jaspernote/docs/java/utils/lombok/annotations/Generated',
                component: ComponentCreator('/jaspernote/docs/java/utils/lombok/annotations/Generated', '8c3'),
                exact: true
              },
              {
                path: '/jaspernote/docs/java/utils/lombok/annotations/SneakThrows',
                component: ComponentCreator('/jaspernote/docs/java/utils/lombok/annotations/SneakThrows', 'c9a'),
                exact: true
              },
              {
                path: '/jaspernote/docs/java/utils/lombok/import',
                component: ComponentCreator('/jaspernote/docs/java/utils/lombok/import', '120'),
                exact: true
              },
              {
                path: '/jaspernote/docs/java/utils/objectMapping/mapStruct/',
                component: ComponentCreator('/jaspernote/docs/java/utils/objectMapping/mapStruct/', 'ab3'),
                exact: true
              },
              {
                path: '/jaspernote/docs/java/utils/objectMapping/mapStruct/complexMapping',
                component: ComponentCreator('/jaspernote/docs/java/utils/objectMapping/mapStruct/complexMapping', '234'),
                exact: true
              },
              {
                path: '/jaspernote/docs/java/utils/objectMapping/mapStruct/qualifiedBy',
                component: ComponentCreator('/jaspernote/docs/java/utils/objectMapping/mapStruct/qualifiedBy', '3c9'),
                exact: true
              },
              {
                path: '/jaspernote/docs/java/utils/objectMapping/mapStruct/reuseMappingConfiguration',
                component: ComponentCreator('/jaspernote/docs/java/utils/objectMapping/mapStruct/reuseMappingConfiguration', '505'),
                exact: true
              },
              {
                path: '/jaspernote/docs/java/utils/objectMapping/orika/',
                component: ComponentCreator('/jaspernote/docs/java/utils/objectMapping/orika/', '9ef'),
                exact: true
              },
              {
                path: '/jaspernote/docs/java/utils/serialization/hessian/',
                component: ComponentCreator('/jaspernote/docs/java/utils/serialization/hessian/', 'cf6'),
                exact: true
              },
              {
                path: '/jaspernote/docs/java/utils/serialization/kyro/',
                component: ComponentCreator('/jaspernote/docs/java/utils/serialization/kyro/', 'bb3'),
                exact: true
              },
              {
                path: '/jaspernote/docs/java/utils/serialization/protoStuff/',
                component: ComponentCreator('/jaspernote/docs/java/utils/serialization/protoStuff/', '950'),
                exact: true
              },
              {
                path: '/jaspernote/docs/java/utils/serialization/protoStuff/简单使用',
                component: ComponentCreator('/jaspernote/docs/java/utils/serialization/protoStuff/简单使用', '820'),
                exact: true
              },
              {
                path: '/jaspernote/docs/java/web/',
                component: ComponentCreator('/jaspernote/docs/java/web/', 'acb'),
                exact: true
              },
              {
                path: '/jaspernote/docs/java/web/apidoc/springdoc/',
                component: ComponentCreator('/jaspernote/docs/java/web/apidoc/springdoc/', '063'),
                exact: true
              },
              {
                path: '/jaspernote/docs/java/web/jdbc/',
                component: ComponentCreator('/jaspernote/docs/java/web/jdbc/', 'c48'),
                exact: true
              },
              {
                path: '/jaspernote/docs/java/web/log/',
                component: ComponentCreator('/jaspernote/docs/java/web/log/', 'a9a'),
                exact: true
              },
              {
                path: '/jaspernote/docs/java/web/log/logback/',
                component: ComponentCreator('/jaspernote/docs/java/web/log/logback/', '15f'),
                exact: true
              },
              {
                path: '/jaspernote/docs/kotlin/',
                component: ComponentCreator('/jaspernote/docs/kotlin/', '9b2'),
                exact: true,
                sidebar: "kotlin"
              },
              {
                path: '/jaspernote/docs/kotlin/foundation/01keyword',
                component: ComponentCreator('/jaspernote/docs/kotlin/foundation/01keyword', 'c6c'),
                exact: true,
                sidebar: "kotlin"
              },
              {
                path: '/jaspernote/docs/kotlin/foundation/02dataType',
                component: ComponentCreator('/jaspernote/docs/kotlin/foundation/02dataType', '47e'),
                exact: true,
                sidebar: "kotlin"
              },
              {
                path: '/jaspernote/docs/kotlin/foundation/03control',
                component: ComponentCreator('/jaspernote/docs/kotlin/foundation/03control', 'd5d'),
                exact: true,
                sidebar: "kotlin"
              },
              {
                path: '/jaspernote/docs/kotlin/foundation/04function',
                component: ComponentCreator('/jaspernote/docs/kotlin/foundation/04function', '9c5'),
                exact: true,
                sidebar: "kotlin"
              },
              {
                path: '/jaspernote/docs/kotlin/foundation/05collection',
                component: ComponentCreator('/jaspernote/docs/kotlin/foundation/05collection', 'ae9'),
                exact: true,
                sidebar: "kotlin"
              },
              {
                path: '/jaspernote/docs/lua/foundation/',
                component: ComponentCreator('/jaspernote/docs/lua/foundation/', '0ee'),
                exact: true,
                sidebar: "lua"
              },
              {
                path: '/jaspernote/docs/lua/foundation/03control',
                component: ComponentCreator('/jaspernote/docs/lua/foundation/03control', 'f3c'),
                exact: true,
                sidebar: "lua"
              },
              {
                path: '/jaspernote/docs/lua/foundation/04fun',
                component: ComponentCreator('/jaspernote/docs/lua/foundation/04fun', '072'),
                exact: true,
                sidebar: "lua"
              },
              {
                path: '/jaspernote/docs/lua/foundation/install',
                component: ComponentCreator('/jaspernote/docs/lua/foundation/install', 'e9b'),
                exact: true,
                sidebar: "lua"
              },
              {
                path: '/jaspernote/docs/lua/foundation/module',
                component: ComponentCreator('/jaspernote/docs/lua/foundation/module', '5a1'),
                exact: true,
                sidebar: "lua"
              },
              {
                path: '/jaspernote/docs/patterns/',
                component: ComponentCreator('/jaspernote/docs/patterns/', '849'),
                exact: true,
                sidebar: "patterns"
              },
              {
                path: '/jaspernote/docs/patterns/behavioral/observer',
                component: ComponentCreator('/jaspernote/docs/patterns/behavioral/observer', '836'),
                exact: true,
                sidebar: "patterns"
              },
              {
                path: '/jaspernote/docs/patterns/behavioral/strategy',
                component: ComponentCreator('/jaspernote/docs/patterns/behavioral/strategy', '54e'),
                exact: true,
                sidebar: "patterns"
              },
              {
                path: '/jaspernote/docs/patterns/behavioral/templateMethod',
                component: ComponentCreator('/jaspernote/docs/patterns/behavioral/templateMethod', '16d'),
                exact: true,
                sidebar: "patterns"
              },
              {
                path: '/jaspernote/docs/patterns/creational/abstractFactory',
                component: ComponentCreator('/jaspernote/docs/patterns/creational/abstractFactory', '963'),
                exact: true,
                sidebar: "patterns"
              },
              {
                path: '/jaspernote/docs/patterns/creational/builder',
                component: ComponentCreator('/jaspernote/docs/patterns/creational/builder', '9bd'),
                exact: true,
                sidebar: "patterns"
              },
              {
                path: '/jaspernote/docs/patterns/creational/factoryMethod',
                component: ComponentCreator('/jaspernote/docs/patterns/creational/factoryMethod', 'bd0'),
                exact: true,
                sidebar: "patterns"
              },
              {
                path: '/jaspernote/docs/patterns/creational/prototype',
                component: ComponentCreator('/jaspernote/docs/patterns/creational/prototype', '054'),
                exact: true,
                sidebar: "patterns"
              },
              {
                path: '/jaspernote/docs/patterns/creational/simpleFactory',
                component: ComponentCreator('/jaspernote/docs/patterns/creational/simpleFactory', 'c4e'),
                exact: true,
                sidebar: "patterns"
              },
              {
                path: '/jaspernote/docs/patterns/creational/singleton',
                component: ComponentCreator('/jaspernote/docs/patterns/creational/singleton', '763'),
                exact: true,
                sidebar: "patterns"
              },
              {
                path: '/jaspernote/docs/patterns/SOLID',
                component: ComponentCreator('/jaspernote/docs/patterns/SOLID', '4d4'),
                exact: true,
                sidebar: "patterns"
              },
              {
                path: '/jaspernote/docs/patterns/structural/proxy',
                component: ComponentCreator('/jaspernote/docs/patterns/structural/proxy', '9fa'),
                exact: true,
                sidebar: "patterns"
              },
              {
                path: '/jaspernote/docs/python/',
                component: ComponentCreator('/jaspernote/docs/python/', '3c6'),
                exact: true,
                sidebar: "python"
              },
              {
                path: '/jaspernote/docs/python/environment/conda',
                component: ComponentCreator('/jaspernote/docs/python/environment/conda', '290'),
                exact: true,
                sidebar: "python"
              },
              {
                path: '/jaspernote/docs/python/environment/pip',
                component: ComponentCreator('/jaspernote/docs/python/environment/pip', 'ce7'),
                exact: true,
                sidebar: "python"
              },
              {
                path: '/jaspernote/docs/python/environment/pipx',
                component: ComponentCreator('/jaspernote/docs/python/environment/pipx', '60c'),
                exact: true,
                sidebar: "python"
              },
              {
                path: '/jaspernote/docs/python/environment/uv',
                component: ComponentCreator('/jaspernote/docs/python/environment/uv', 'c24'),
                exact: true,
                sidebar: "python"
              },
              {
                path: '/jaspernote/docs/python/environment/venv',
                component: ComponentCreator('/jaspernote/docs/python/environment/venv', 'a19'),
                exact: true,
                sidebar: "python"
              },
              {
                path: '/jaspernote/docs/python/foundation/',
                component: ComponentCreator('/jaspernote/docs/python/foundation/', 'dfc'),
                exact: true,
                sidebar: "python"
              },
              {
                path: '/jaspernote/docs/python/foundation/contrlAndloop',
                component: ComponentCreator('/jaspernote/docs/python/foundation/contrlAndloop', 'a29'),
                exact: true,
                sidebar: "python"
              },
              {
                path: '/jaspernote/docs/python/foundation/dataType/',
                component: ComponentCreator('/jaspernote/docs/python/foundation/dataType/', 'be9'),
                exact: true,
                sidebar: "python"
              },
              {
                path: '/jaspernote/docs/python/foundation/dataType/tuple',
                component: ComponentCreator('/jaspernote/docs/python/foundation/dataType/tuple', '7de'),
                exact: true,
                sidebar: "python"
              },
              {
                path: '/jaspernote/docs/python/foundation/function/',
                component: ComponentCreator('/jaspernote/docs/python/foundation/function/', 'd2a'),
                exact: true,
                sidebar: "python"
              },
              {
                path: '/jaspernote/docs/python/foundation/function/magicMethod',
                component: ComponentCreator('/jaspernote/docs/python/foundation/function/magicMethod', '0f3'),
                exact: true,
                sidebar: "python"
              },
              {
                path: '/jaspernote/docs/python/notebook/',
                component: ComponentCreator('/jaspernote/docs/python/notebook/', 'b5c'),
                exact: true,
                sidebar: "python"
              },
              {
                path: '/jaspernote/docs/python/utils',
                component: ComponentCreator('/jaspernote/docs/python/utils', 'ea1'),
                exact: true,
                sidebar: "python"
              },
              {
                path: '/jaspernote/docs/python/utils/',
                component: ComponentCreator('/jaspernote/docs/python/utils/', '4b0'),
                exact: true,
                sidebar: "python"
              },
              {
                path: '/jaspernote/docs/python/utils/mPara',
                component: ComponentCreator('/jaspernote/docs/python/utils/mPara', 'd90'),
                exact: true,
                sidebar: "python"
              },
              {
                path: '/jaspernote/docs/todo',
                component: ComponentCreator('/jaspernote/docs/todo', 'd0f'),
                exact: true
              },
              {
                path: '/jaspernote/docs/utils/',
                component: ComponentCreator('/jaspernote/docs/utils/', 'a55'),
                exact: true
              },
              {
                path: '/jaspernote/docs/utils/git/',
                component: ComponentCreator('/jaspernote/docs/utils/git/', 'a28'),
                exact: true,
                sidebar: "git"
              },
              {
                path: '/jaspernote/docs/utils/git/basic',
                component: ComponentCreator('/jaspernote/docs/utils/git/basic', '3cf'),
                exact: true,
                sidebar: "git"
              },
              {
                path: '/jaspernote/docs/utils/git/branch',
                component: ComponentCreator('/jaspernote/docs/utils/git/branch', '132'),
                exact: true,
                sidebar: "git"
              },
              {
                path: '/jaspernote/docs/utils/git/concept',
                component: ComponentCreator('/jaspernote/docs/utils/git/concept', '860'),
                exact: true,
                sidebar: "git"
              },
              {
                path: '/jaspernote/docs/utils/git/conflict',
                component: ComponentCreator('/jaspernote/docs/utils/git/conflict', '004'),
                exact: true,
                sidebar: "git"
              },
              {
                path: '/jaspernote/docs/utils/git/gitattributes',
                component: ComponentCreator('/jaspernote/docs/utils/git/gitattributes', '176'),
                exact: true,
                sidebar: "git"
              },
              {
                path: '/jaspernote/docs/utils/git/lazygit',
                component: ComponentCreator('/jaspernote/docs/utils/git/lazygit', '664'),
                exact: true,
                sidebar: "git"
              },
              {
                path: '/jaspernote/docs/utils/git/normal/demo1',
                component: ComponentCreator('/jaspernote/docs/utils/git/normal/demo1', '8f1'),
                exact: true,
                sidebar: "git"
              },
              {
                path: '/jaspernote/docs/utils/git/normal/merge和rebase的区别',
                component: ComponentCreator('/jaspernote/docs/utils/git/normal/merge和rebase的区别', 'ab6'),
                exact: true,
                sidebar: "git"
              },
              {
                path: '/jaspernote/docs/utils/git/other',
                component: ComponentCreator('/jaspernote/docs/utils/git/other', 'bf1'),
                exact: true,
                sidebar: "git"
              },
              {
                path: '/jaspernote/docs/utils/git/problem',
                component: ComponentCreator('/jaspernote/docs/utils/git/problem', '240'),
                exact: true,
                sidebar: "git"
              },
              {
                path: '/jaspernote/docs/utils/git/proxy',
                component: ComponentCreator('/jaspernote/docs/utils/git/proxy', '672'),
                exact: true,
                sidebar: "git"
              },
              {
                path: '/jaspernote/docs/utils/jmeter/',
                component: ComponentCreator('/jaspernote/docs/utils/jmeter/', '80d'),
                exact: true,
                sidebar: "jmeter"
              },
              {
                path: '/jaspernote/docs/utils/jmeter/basic',
                component: ComponentCreator('/jaspernote/docs/utils/jmeter/basic', '229'),
                exact: true,
                sidebar: "jmeter"
              },
              {
                path: '/jaspernote/docs/utils/jmeter/configElement',
                component: ComponentCreator('/jaspernote/docs/utils/jmeter/configElement', 'c35'),
                exact: true,
                sidebar: "jmeter"
              },
              {
                path: '/jaspernote/docs/utils/jmeter/database',
                component: ComponentCreator('/jaspernote/docs/utils/jmeter/database', 'ff1'),
                exact: true,
                sidebar: "jmeter"
              },
              {
                path: '/jaspernote/docs/utils/jmeter/function',
                component: ComponentCreator('/jaspernote/docs/utils/jmeter/function', '525'),
                exact: true,
                sidebar: "jmeter"
              },
              {
                path: '/jaspernote/docs/utils/jmeter/groovy/',
                component: ComponentCreator('/jaspernote/docs/utils/jmeter/groovy/', 'df1'),
                exact: true,
                sidebar: "jmeter"
              },
              {
                path: '/jaspernote/docs/utils/jmeter/java',
                component: ComponentCreator('/jaspernote/docs/utils/jmeter/java', '7a1'),
                exact: true,
                sidebar: "jmeter"
              },
              {
                path: '/jaspernote/docs/utils/jmeter/postProcessor',
                component: ComponentCreator('/jaspernote/docs/utils/jmeter/postProcessor', 'fdd'),
                exact: true,
                sidebar: "jmeter"
              },
              {
                path: '/jaspernote/docs/utils/jmeter/preProcessor',
                component: ComponentCreator('/jaspernote/docs/utils/jmeter/preProcessor', '4f9'),
                exact: true,
                sidebar: "jmeter"
              },
              {
                path: '/jaspernote/docs/utils/jmeter/sampler',
                component: ComponentCreator('/jaspernote/docs/utils/jmeter/sampler', '3a8'),
                exact: true,
                sidebar: "jmeter"
              },
              {
                path: '/jaspernote/docs/utils/mermaid/',
                component: ComponentCreator('/jaspernote/docs/utils/mermaid/', '69d'),
                exact: true
              },
              {
                path: '/jaspernote/docs/utils/neovim/',
                component: ComponentCreator('/jaspernote/docs/utils/neovim/', '249'),
                exact: true,
                sidebar: "neovim"
              },
              {
                path: '/jaspernote/docs/utils/neovim/lazyvim/',
                component: ComponentCreator('/jaspernote/docs/utils/neovim/lazyvim/', 'e3e'),
                exact: true,
                sidebar: "neovim"
              },
              {
                path: '/jaspernote/docs/utils/neovim/lazyvim/env/cpp',
                component: ComponentCreator('/jaspernote/docs/utils/neovim/lazyvim/env/cpp', '51a'),
                exact: true,
                sidebar: "neovim"
              },
              {
                path: '/jaspernote/docs/utils/neovim/lazyvim/env/java',
                component: ComponentCreator('/jaspernote/docs/utils/neovim/lazyvim/env/java', '1c2'),
                exact: true,
                sidebar: "neovim"
              },
              {
                path: '/jaspernote/docs/utils/neovim/lazyvim/env/markdown',
                component: ComponentCreator('/jaspernote/docs/utils/neovim/lazyvim/env/markdown', '12d'),
                exact: true,
                sidebar: "neovim"
              },
              {
                path: '/jaspernote/docs/utils/neovim/lazyvim/env/python',
                component: ComponentCreator('/jaspernote/docs/utils/neovim/lazyvim/env/python', 'd7e'),
                exact: true,
                sidebar: "neovim"
              },
              {
                path: '/jaspernote/docs/utils/neovim/lazyvim/env/ruff',
                component: ComponentCreator('/jaspernote/docs/utils/neovim/lazyvim/env/ruff', 'dfc'),
                exact: true,
                sidebar: "neovim"
              },
              {
                path: '/jaspernote/docs/utils/neovim/lazyvim/install',
                component: ComponentCreator('/jaspernote/docs/utils/neovim/lazyvim/install', 'dc8'),
                exact: true,
                sidebar: "neovim"
              },
              {
                path: '/jaspernote/docs/utils/neovim/lazyvim/keymap',
                component: ComponentCreator('/jaspernote/docs/utils/neovim/lazyvim/keymap', '7cb'),
                exact: true,
                sidebar: "neovim"
              },
              {
                path: '/jaspernote/docs/utils/neovim/lazyvim/plugins/flash.nvim',
                component: ComponentCreator('/jaspernote/docs/utils/neovim/lazyvim/plugins/flash.nvim', 'c5e'),
                exact: true,
                sidebar: "neovim"
              },
              {
                path: '/jaspernote/docs/utils/neovim/lazyvim/plugins/gitsigns.nvim',
                component: ComponentCreator('/jaspernote/docs/utils/neovim/lazyvim/plugins/gitsigns.nvim', '54e'),
                exact: true,
                sidebar: "neovim"
              },
              {
                path: '/jaspernote/docs/utils/neovim/lazyvim/plugins/init',
                component: ComponentCreator('/jaspernote/docs/utils/neovim/lazyvim/plugins/init', '6cf'),
                exact: true,
                sidebar: "neovim"
              },
              {
                path: '/jaspernote/docs/utils/neovim/lazyvim/plugins/mini.ai',
                component: ComponentCreator('/jaspernote/docs/utils/neovim/lazyvim/plugins/mini.ai', '0a8'),
                exact: true,
                sidebar: "neovim"
              },
              {
                path: '/jaspernote/docs/utils/neovim/quickfix',
                component: ComponentCreator('/jaspernote/docs/utils/neovim/quickfix', '9e5'),
                exact: true,
                sidebar: "neovim"
              },
              {
                path: '/jaspernote/docs/utils/svn/',
                component: ComponentCreator('/jaspernote/docs/utils/svn/', 'b06'),
                exact: true,
                sidebar: "svn"
              },
              {
                path: '/jaspernote/docs/utils/vim/',
                component: ComponentCreator('/jaspernote/docs/utils/vim/', '58d'),
                exact: true,
                sidebar: "vim"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/jaspernote/',
    component: ComponentCreator('/jaspernote/', '155'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
