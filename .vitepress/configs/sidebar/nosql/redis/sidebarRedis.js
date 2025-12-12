export const sidebarRedis = {
    "/dataLayer/nosql/redis": [
        {
            text: "redis",
            items: [
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
                    ]
                },
                {
                    text: "interact with data",
                    items: [
                        {text: "pubsub",link: "/dataLayer/redis/interactWithData/pubsub.md"}
                    ]
                },
                {
                    text: "java",
                    items: [
                        {text: "jedis",link: "/dataLayer/nosql/redis/java/jedis/index.md"},
                        {
                            text: "springdataredis",
                            items: [
                                     {text: "index",link: "/dataLayer/nosql/redis/java/springdataredis/index.md"},
                                     {text: "serialization",link: "/dataLayer/nosql/redis/java/springdataredis/serialization.md"},
                                  ]
                        }                   ]
                }
            ],
        },
    ]
};
