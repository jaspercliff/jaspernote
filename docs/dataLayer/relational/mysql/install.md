---
sidebar_position: 1
---
# install

## mac 

```shell
brew install mysql@8.0
echo 'export PATH=$PATH:/opt/homebrew/opt/mysql@8.0/bin' >> ~/.zshrc && source ~/.zshrc
brew services start mysql@8.0
# 设置mysql 密码
mysql_secure_installation
```

## docker install 

```yml
version: '3.3'
services:
  mysql:
    container_name: mysql
    image: mysql:latest
    ports:
      - "3307:3306"
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: passwd
    volumes:
      - "./data:/var/lib/mysql"
      - "./config:/etc/mysql/conf.d"
```
