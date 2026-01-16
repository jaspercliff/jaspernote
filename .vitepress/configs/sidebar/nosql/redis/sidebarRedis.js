export const sidebarRedis = {
    "/dataLayer/nosql/redis": [
        {
            text: "redis",
            items: [
                {text: "index",link: '/dataLayer/nosql/redis/index.md'},
                {text: "insatll",link: '/dataLayer/nosql/redis/basic/install.md'},
                {
                    text: "dataType",
                    items: [
                        {text: "index",link: '/dataLayer/nosql/redis/dataType/index.md'},
                        {text: "string",link: '/dataLayer/nosql/redis/dataType/string.md'},
                        {text: "hash",link: '/dataLayer/nosql/redis/dataType/hash.md'},
                        {text: "list",link: '/dataLayer/nosql/redis/dataType/list.md'},
                        {text: "set",link: '/dataLayer/nosql/redis/dataType/set.md'},
                        {text: "sortedSet",link: '/dataLayer/nosql/redis/dataType/sortedSet.md'},
                        {text: "stream",link: '/dataLayer/nosql/redis/dataType/stream.md'},
                    ]
                },
                {
                    text: "pubsub",
                    items: [
                        {text: "pubsub",link: "/dataLayer/redis/pubsub/pubsub.md"}
                    ]
                },
                {
                    text: "java",        
                    collapsed: true,
                    items: [
                        {text: "jedis",link: "/dataLayer/nosql/redis/java/jedis/index.md"},
                        {
                            text: "springdataredis",
                            items: [
                                     {text: "index",link: "/dataLayer/nosql/redis/java/springdataredis/index.md"},
                                     {text: "serialization",link: "/dataLayer/nosql/redis/java/springdataredis/serialization.md"},
                                  ]
                        }                   ]
                },
                {
                    text: "problems",
                    items: [
                        {text: "缓存一致性",link: "/dataLayer/nosql/redis/problem/update.md"},
                        {text: "缓存穿透",link: "/dataLayer/nosql/redis/problem/cachePenetration.md"},
                        {text: "缓存雪崩",link: "/dataLayer/nosql/redis/problem/cacheAvalanche.md"},
                        {text: "缓存击穿",link: "/dataLayer/nosql/redis/problem/cacheBreakdown.md"},
                        {text: "全局唯一id",link: "/dataLayer/nosql/redis/problem/globalId.md"},
                        {text: "分布式锁",link: "/dataLayer/nosql/redis/problem/distributedLock.md"},
                        {text: "oversell",link: "/dataLayer/nosql/redis/problem/oversell.md"},
                        {text: "消息队列",link: "/dataLayer/nosql/redis/problem/mq.md"},
                           ]
                },
            ],
        },
    ]
};
