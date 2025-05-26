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
                        {text: "关键字", link: "/java/basic/common/01keyword.md"},
                        {text: "数据类型", link: "/java/basic/common/02dataclearType.md"},
                        {text: "运算符", link: "/java/basic/common/03operator.md"},
                        {text: "控制和循环", link: "/java/basic/common/04control.md"},
                        {text: "面向对象",link: "/java/basic/common/object-oriented.md"},
                        {text: "枚举", link: "/java/basic/common/enum.md"},
                        {text: "注解", link: "/java/basic/common/注解.md"},
                        {text: "异常", link: "/java/basic/common/异常.md"},
                        {text: "泛型", link: "/java/basic/common/泛型.md"},
                        {text: "反射", link: "/java/basic/common/反射.md"},
                        {text: "io", link: "/java/basic/common/io.md"},
                        {text: "网络编程", link: "/java/basic/common/网络编程.md"},
                        {text: "日期相关", link: "/java/basic/common/dateRelated.md"},
                        {text: "utils", link: "/java/basic/common/utils.md"},
                        {text: "terminology", link: "/java/basic/common/terminology.md"},
                    ],
                },
                {
                    text: "collections",
                    collapsed: true,
                    items: [
                        {
                            text: "basic",
                            link: "/java/basic/collection/dataType.md",
                        },
                        {
                            text: "ArrayList",
                            link: "/java/basic/collection/ArrayList.md",
                        },
                        {
                            text: "LinkedList",
                            link: "/java/basic/collection/LinkedList.md",
                        },
                        {
                            text: "HashMap",
                            link: "/java/basic/collection/HashMap.md",
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