import {sidebarShell} from './sidebar/sidebarShell'
import {sidebarJvm} from "./sidebar/sidebarJvm";
import {sidebarRedis} from "./sidebar/sidebarRedis";
import {sidebarJuc} from "./sidebar/sidebarJuc";
import {sidebarJavaBasic} from "./sidebar/sidebarJavaBasic";
export const sidebar = {
    ...sidebarShell,
    ...sidebarJvm,
    ...sidebarRedis,
    ...sidebarJuc,
    ...sidebarJavaBasic,
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