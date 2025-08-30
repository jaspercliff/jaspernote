export const sidebarJuc = {
    "/java/basic/juc/": [
        {
            text: "juc",
            items: [
                {
                    text: "basic",
                    items: [
                        {
                            text: "basic",
                            link: "/java/basic/juc/index.md",
                        },
                    ],
                },
                {
                    text: "collection",
                    items: [
                        {
                            text: "collection",
                            link: "/java/basic/juc/collections/index.md",
                        },
                        {
                            text: "queue",
                            items: [
                                {
                                    text: "BlockingQueue",
                                    link: "/java/basic/juc/collections/queue/blockingQueue.md",
                                }
                            ]
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
                    text: "future",
                    items: [
                        {
                            text: "FutureTask",
                            link: "/java/basic/juc/future/Future.md",
                        },
                        {
                            text: "completableFuture",
                            link: "/java/basic/juc/future/completableFuture.md",
                        },
                    ],
                },
                {
                    text: "executor",
                    items: [
                        {
                            text: "自定义线程池",
                            link: "/java/basic/juc/executor/customThreadPool.md",
                        },
                        {
                            text: "Executors工具类",
                            link: "/java/basic/juc/executor/executors.md",
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
    ]
};











