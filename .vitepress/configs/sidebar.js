export const sidebar = {
    // 当用户位于 `java` 目录时，会显示此侧边栏
    "/java/": [
        {
            text: "java核心基础",
            items: [
                {
                    text: "java核心基础",
                    collapsed: true,
                    items: [
                        {
                            text: "基础",
                            link: "/java/basic/common/basic.md",
                        },
                        {
                            text: "面向对象",
                            link: "/java/basic/common/object-oriented.md",
                        },
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
    "/java/jvm/": [
        {text: "JMM", link: "/java/jvm/JMM.md"},
        {text: "jvm内存结构", link: "/java/jvm/jvm内存结构.md"},
        {text: "锁的优化和升级", link: "/java/jvm/锁的优化和升级.md"},
        {text: "类加载", link: "/java/jvm/类加载.md"},
        {text: "垃圾回收", link: "/java/jvm/gc.md"},
    ],
    "/java/basic/juc/": [
        {
            text: "juc",
            items: [
                {
                    text: "basic",
                    items: [
                        {
                            text: "basic",
                            link: "/java/basic/juc/basic.md",
                        },
                    ],
                },
                {
                    text: "collection",
                    items: [
                        {
                            text: "collection",
                            link: "/java/basic/juc/collections/basic.md",
                        },
                    ],
                },
                {
                    text: "lock",
                    items: [
                        {
                            text: "ReentrantLock",
                            link: "/java/basic/juc/lock/ReentrantLock.md",
                        },
                        {
                            text: "ReentrantReadWriteLock",
                            link: "/java/basic/juc/lock/ReentrantReadWriteLock.md",
                        },
                        {
                            text: "LockSupport",
                            link: "/java/basic/juc/lock/LockSupport.md",
                        },
                    ],
                },
                {
                    text: "atomic",
                    items: [
                        {
                            text: "Atomic",
                            link: "/java/basic/juc/atomic/atomic.md",
                        },
                    ],
                },
                {
                    text: "executor",
                    items: [
                        {
                            text: "FutureTask",
                            link: "/java/basic/juc/executor/FutureTask.md",
                        },
                        {
                            text: "线程池",
                            link: "/java/basic/juc/executor/线程池.md",
                        },
                        {
                            text: "completableFuture",
                            link: "/java/basic/juc/executor/completableFuture.md",
                        },
                    ],
                },
                {
                    text: "tool",
                    items: [
                        {
                            text: "CountDownLatch",
                            link: "/java/basic/juc/tools/CountDownLatch.md",
                        },
                        {
                            text: "CyclicBarrier",
                            link: "/java/basic/juc/tools/CyclicBarrier.md",
                        },
                        {text: "Semaphore", link: "/java/basic/juc/tools/Semaphore.md"},
                        {text: "Phaser", link: "/java/basic/juc/tools/Phaser.md"},
                        {text: "Exchanger", link: "/java/basic/juc/tools/Exchanger.md"},
                    ],
                },
                {
                    text: "ThreadLocal",
                    link: "/java/basic/juc/ThreadLocal.md",
                },
            ],
        },
    ],
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
        },
        {
            text: "springBoot",
            collapsed: true,
            items: [],
        },
        {
            text: "springSecurity",
            collapsed: true,
            items: [
                {text: "index", link: "/java/framework/springSecurity/dataType.md"},
            ],
        },
    ],
    "/java/designPattern/": [
        {
            text: "创建型",
            collapsed: true,
            items: [
                {
                    text: "单例模式",
                    link: "/java/designPattern/creational/singleton.md",
                },
            ],
        },
        {
            text: "结构型",
            collapsed: true,
            items: [
                {
                    text: "代理模式",
                    link: "/java/designPattern/structural/proxy.md",
                },
            ],
        },
        {
            text: "行为型",
            collapsed: true,
            items: [],
        },
    ],
    "/database/mysql": [
        {
            text: "mysql",
            items: [
                {text: "index", link: "/database/mysql/dataType.md"},
                {text: "数据类型", link: "/database/mysql/数据类型.md"},
                {text: "存储引擎", link: "/database/mysql/存储引擎.md"},
                {text: "索引", link: "/database/mysql/索引.md"},
                {text: "事务隔离级别", link: "/database/mysql/事务隔离级别.md"},
                {text: "log", link: "/database/mysql/log.md"},
                {text: "锁及mvcc", link: "/database/mysql/锁及mvcc.md"},
                {text: "jdbc", link: "/database/mysql/jdbc.md"},
            ],
        },
    ],
    "/database/redis": [
        {
            text: "redis",
            items: [{text: "index", link: "/database/redis/dataType.md"}],
        },
    ],
    "/objectStorage/minio": [
        {
            text: "minio",
            items: [
                {text: "index", link: "/objectStorage/minio/dataType.md"},
                {text: "minio in java", link: "/objectStorage/minio/java.md"},
            ],
        },
    ],
    "/dataStructure": [
        {
            text: "datastructure",
            items: [
                {text: "index", link: "/dataStructure/dataType.md"},
                {text: "stack", link: "/dataStructure/Stack.md"},
                {text: "queue", link: "/dataStructure/Queue.md"},
                {text: "Hash", link: "/dataStructure/Hash.md"},
                {text: "动态规划", link: "/dataStructure/动态规划.md"},
            ],
        },
    ],
}