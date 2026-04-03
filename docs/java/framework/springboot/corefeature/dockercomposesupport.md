# development-time services

当你启动 Spring Boot 应用时，它会自动调用 docker-compose up，并在应用停止时自动关闭容器
自动将 Redis 的随机端口映射到 Spring 的属性中（甚至不需要在 application.properties 里写连接地址）

```xml 
<dependencies>
	<dependency>
		<groupId>org.springframework.boot</groupId>
		<artifactId>spring-boot-docker-compose</artifactId>
		<optional>true</optional>
	</dependency>
</dependencies>
```

```kotlin 
dependencies {
	developmentOnly("org.springframework.boot:spring-boot-docker-compose")
}
```

```yml
docker:
      compose:
#           lifecycle: none start-only
          lifecycle-management: start-and-stop
          start:
              command: up
              arguments:
# 如果你之前在 compose.yml 里定义了 3 个服务，后来删掉了 1 个。
# 当再次运行项目时，那个被删掉的容器（孤儿容器）依然可能在后台占着端口。这个参数会自动把这些“不在名单上”的残留容器清理掉
                        - "--remove-orphans"
          stop:
              command: down
              arguments:
                        - "--remove-orphans"
          arguments:
              - "--project-name=myapp"
          file: "springFramework/spring-compose.yml"
```
```

```yml 
# only for this  app
services:
  mariadb:
    image: 'mariadb:latest' # 建议指定具体版本，生产/开发环境更一致
    container_name: mariadb-dev
    environment:
      # 必填：root 用户的密码
      - 'MARIADB_ROOT_PASSWORD=passwd'
      # 选填：创建一个初始数据库
      - 'MARIADB_DATABASE=my_app_db'
      # 选填：创建一个普通用户（Spring Boot 默认会尝试用这个连接）
      - 'MARIADB_USER=dev'
      - 'MARIADB_PASSWORD=dev'
    ports:
      # 建议宿主机使用随机端口（只写 3306），防止本地 3306 被占用
      # Spring Boot 会自动获取这个随机端口并注入
      - '3306'
    volumes:
      # 数据持久化：将容器内数据映射到当前目录下的 mysql-data 文件夹
      - ./mysql-data:/var/lib/mysql
      # 可选：如果你有初始化 SQL 脚本，可以取消下面这行的注释
      # - ./init.sql:/docker-entrypoint-initdb.d/init.sql:ro
    healthcheck:
      test: ["CMD", "healthcheck.sh", "--connect", "--innodb_initialized"]
      interval: 10s
      timeout: 5s
      retries: 5
```
