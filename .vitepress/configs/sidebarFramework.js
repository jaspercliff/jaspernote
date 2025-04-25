export const sidebarRedis = {
    "/java/framework/": [
        {
            text: "spring.md",
            collapsed: true,
            items: [
                {
                    text: "core",
                    collapsed: true,
                    items: [
                        {text: "ioc", link: "/java/framework/spring.md/core/ioc.md"},
                        {text: "aop", link: "/java/framework/spring.md/core/aop.md"},
                        {text: "annotation", link: "/java/framework//spring.md/annotation/annotation.md"},
                    ],
                },
                {
                    text: "dataAccess",
                    items: [
                        {
                            text: "transaction",
                            link: "/java/framework/spring.md/dataAccess/transaction.md",
                        },
                    ],
                },
            ],
        }
]
};
