# index




## 图形化界面安装软件 

qq 和wx安装默认目录在 /opt，移动到/opt/soft下,创建一个符号链接

```shell
mv /opt/qq /opt/soft 
sudo ln -s  /opt/soft/qq/qq  qq
```

移动之后图标消失，解决方法：修改应用启动器中的路径
```shell
cd /usr/shar/application   
vim qq.desktop # 修改其中的路径
```
