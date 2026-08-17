# install 

- [website](https://seata.apache.org/zh-cn/docs/ops/deploy-guide-beginner/)

1.  [下载 github release 现在没有package](https://seata.apache.org/zh-cn/download/seata-server)
2.  [client script(at undo_log)](https://github.com/apache/incubator-seata/tree/master/script/client)
3.  server script(global_table) 下载的包里面 /script下 也可以在 2 路径/server看
4.  启动包: seata-->conf-->application.yml，修改store.mode="db或者redis" 源码: 根目录-->seata-server-->resources-->application.yml，修改store.mode="db或者redis
5.  启动包: seata-->conf-->application.example.yml中附带额外配置，将其db|redis相关配置复制至application.yml,进行修改store.db或store.redis相关属性。源码: 根目录-->seata-server-->resources-->application.example.yml中附带额外配置，将其db/redis相关配置复制至application.yml,进行修改store.db或store.redis相关属性
6.  cd bin & sh seata-server.sh 

## stop 

```shell 
sh seata-server stop
```
