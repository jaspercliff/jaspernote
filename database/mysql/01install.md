# install

## docker 

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