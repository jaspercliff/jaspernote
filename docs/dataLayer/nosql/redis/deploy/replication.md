# replication

- replicaof valkey-primary 6379
- primaryauth passwd 主节点设置了密码

```yaml
services:
  valkey-primary:
    image: docker.io/valkey/valkey:9.0.3
    container_name: valkey-primary
    command: ["valkey-server", "/usr/local/etc/valkey/valkey.conf"]
    volumes:
      - ./conf/valkey-primary.conf:/usr/local/etc/valkey/valkey.conf:ro,Z
      - ./primary/data:/data:Z
    ports:
      - "6380:6379"
    networks:
      - valkey-net

  valkey-replica-1:
    image: docker.io/valkey/valkey:9.0.3
    container_name: valkey-replica-1
    command: ["valkey-server", "/usr/local/etc/valkey/valkey.conf"]
    depends_on:
      - valkey-primary
    volumes:
      - ./conf/valkey-replica.conf:/usr/local/etc/valkey/valkey.conf:ro,Z
      - ./replica1/data:/data:Z
    ports:
      - "6381:6379"
    networks:
      - valkey-net

  valkey-replica-2:
    image: docker.io/valkey/valkey:9.0.3
    container_name: valkey-replica-2
    command: ["valkey-server", "/usr/local/etc/valkey/valkey.conf"]
    depends_on:
      - valkey-primary
    volumes:
      - ./conf/valkey-replica.conf:/usr/local/etc/valkey/valkey.conf:ro,Z
      - ./replica2/data:/data:Z
    ports:
      - "6382:6379"
    networks:
      - valkey-net

networks:
  valkey-net:
    driver: bridge
```
