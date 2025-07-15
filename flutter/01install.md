# install 


1. 安装xcode的命令行工具
   - 包含了开发flutter的常用工具
   - git、clang、gcc、make、xcodebuild、simctl
   ```shell
   xcode-select --install
   # 如果已经安装了xcode
   sudo xcode-select --switch /Applications/Xcode.app/Contents/Developer 或者
   sudo xcode-select --switch /Applications/Xcode.app
   ```

2. 配置环境变量

```shell
export PATH="$PATH:/Users/jasper/develop/flutter/bin"
```