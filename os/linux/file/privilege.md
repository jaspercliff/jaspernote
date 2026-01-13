# privilege

权限,数值,描述
r (Read),4,读取文件内容 / 列出目录清单
w (Write),2,修改文件内容 / 在目录中增删文件
x (Execute),1,执行程序 / 进入目录

第一位 (7)：Owner（所有者）。通常是你自己。
第二位 (5)：Group（用户组）。同组内的其他成员（如 nginx 进程）。
第三位trans :zh "Hello world" (5)：Others（其他人）。系统上除了上面两类之外的所有人。
