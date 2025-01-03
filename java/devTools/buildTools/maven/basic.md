# basic

构建：编译、运行单元测试、生成文档、打包、部署的过程
构建的步骤：
● 清理 clean：将以前编译得到的旧文件 class 字节码文件删除。
● 编译 compile：将 java 源程序编译成 class 字节码文件。
● 测试 test：自动测试，自动调用 junit 程序。
● 报告 report：测试程序执行的结果。
● 打包 package：动态 Web 工程打 War 包，java 工程打 jar 包。
● 安装 install：将打包得到的文件复制到 “仓库” 中的指定位置（Maven特定的概念）。
● 部署 deploy：将动态 Web 工程生成的 war 包复制到 Servlet 容器下，使其可以运行。


- mvn archetype:generate 使用预定义的模板（称为 archetypes）来生成项目的基本目录结构和必要的配置文件



