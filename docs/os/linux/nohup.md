# nohup

no hang up 不挂起,不挂断的运行指定的命令 推出终端不会影响命令的执行,即使用户退出登录，该命令仍然会执行完



- & 当在命令后加上& 表示命令会在后台执行，可以立即得到命令提示符，输入其他命令不需要等待当前命令完成
- 使用jobs命令可以查看当前shell会话中的所有后台命令
- fg 将后台作业移到前台，如果有多个作业，可以指定作业编号

适用于运行一个长时间的任务，比如下载一个大文件或者一个长时间的计算任务

默认输出到nohup.out
```shell
nohup ./runnob.sh > nohup.out 2>&1 & 
```
`>` 用于重定向标准输出，2>&1 表示将标准错误输出重定向到与标准输出相同的地方