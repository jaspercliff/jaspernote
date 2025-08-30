// 当用户位于 `java` 目录时，会显示此侧边栏
export const sidebarJavaBasic = {
    "/java/basic": [
        {
            text: "java",
            items: [
                {
                    text: "java核心基础",
                    collapsed: false,
                    items: [
                        {text: "关键字", link: "/java/basic/foundation/01keyword.md"},
                        {text: "数据类型", link: "/java/basic/foundation/02dataType.md"},
                        {text: "运算符", link: "/java/basic/foundation/03operator.md"},
                        {text: "控制和循环", link: "/java/basic/foundation/04control.md"},
                        {text: "面向对象",link: "/java/basic/foundation/object-oriented.md"},
                        {text: "枚举", link: "/java/basic/foundation/enum.md"},
                        {text: "注解", link: "/java/basic/foundation/注解.md"},
                        {text: "异常", link: "/java/basic/foundation/异常.md"},
                        {text: "泛型", link: "/java/basic/foundation/泛型.md"},
                        {text: "反射", link: "/java/basic/foundation/反射.md"},
                        {
                            text: "io",
                            collapsed: false,
                            items: [
                                {text: "BIO",link:"/java/basic/foundation/IO/BIO.md"},
                                {text: "NIO",link:"/java/basic/foundation/IO/NIO.md"},
                                {text: "NIO2",items:[
                                        {text: "AIO",link:"/java/basic/foundation/IO/NIO2/AIO.md"},
                                        {text: "API",link:"/java/basic/foundation/IO/NIO2/API.md"},
                                    ]},
                            ]
                        },
                        {text: "网络编程", link: "/java/basic/foundation/网络编程.md"},
                        {text: "日期相关", link: "/java/basic/foundation/dateRelated.md"},
                        {text: "utils", link: "/java/basic/foundation/utils.md"},
                        {text: "terminology", link: "/java/basic/foundation/terminology.md"},
                    ],
                },
                {
                    text: "collections",
                    collapsed: true,
                    items: [
                        {
                            text: "basic",
                            link: "/java/basic/foundation/collection/dataType.md",
                        },
                        {
                            text: "ArrayList",
                            link: "/java/basic/foundation/collection/ArrayList.md",
                        },
                        {
                            text: "LinkedList",
                            link: "/java/basic/foundation/collection/LinkedList.md",
                        },
                        {
                            text: "HashMap",
                            link: "/java/basic/foundation/collection/HashMap.md",
                        },
                    ],
                },
                {
                    text: "线程",
                    collapsed: true,
                    items: [
                        {
                            text: "basic",
                            link: "/java/basic/thread/basic.md",
                        },
                        {
                            text: "线程基础",
                            link: "/java/basic/thread/线程基础.md",
                        },
                        {
                            text: "锁",
                            link: "/java/basic/thread/锁.md",
                        },
                        {
                            text: "volatile",
                            link: "/java/basic/thread/volatile.md",
                        },
                        {
                            text: "final",
                            link: "/java/basic/thread/final.md",
                        },
                        {
                            text: "unsafe",
                            link: "/java/basic/thread/unsafe.md",
                        },
                    ],
                },

            ],
        },
    ],
}