# privilege

权限,数值,描述
r (Read),4,读取文件内容 / 列出目录清单
w (Write),2,修改文件内容 / 在目录中增删文件
x (Execute),1,执行程序 / 进入目录

第一位 (7)：Owner（所有者）。通常是你自己。
第二位 (5)：Group（用户组）。同组内的其他成员（如 nginx 进程）。
第三位trans :zh "Hello world" (5)：Others（其他人）。系统上除了上面两类之外的所有人。

## chown

修改文件的所有者和用户组
chown $USER /opt/jmeter/  将当前目录的拥有者改为 当前登录用户
chown -R $USER:$USER /opt/jmeter/ -R recursive 递归  同时改变当前目录及子目录的拥有者和所属组

## chmod

修改文件的权限

chmod 777 1.txt
