# start 

## config 


```properties
# 服务器身份识别键值对”。它是 Nacos 集群里节点与节点之间相互认亲的“暗号”
nacos.core.auth.server.identity.key=PaHR3gY5O5HddNn+Tz9hkUjxXNvpLr2Xvdjj8EYRQ/Y=
nacos.core.auth.server.identity.value=PaHR3gY5O5HddNn+Tz9hkUjxXNvpLr2Xvdjj8EYRQ/Y=

# 用来 加密和签名 JWT Token 的 密钥（Secret Key）
nacos.core.auth.plugin.nacos.token.secret.key=PaHR3gY5O5HddNn+Tz9hkUjxXNvpLr2Xvdjj8EYRQ/Y=

##### 使用mysql数据库
### nacos.plugin.datasource.log.enabled=true
spring.sql.init.platform=mysql
### Count of DB:
db.num=1

### Connect URL of DB:
db.url.0=jdbc:mysql://127.0.0.1:3307/nacos?characterEncoding=utf8&connectTimeout=1000&socketTimeout=3000&autoReconnect=true&useUnicode=true&useSSL=false&serverTimezone=UTC
db.user=root
db.password=passwd
```
