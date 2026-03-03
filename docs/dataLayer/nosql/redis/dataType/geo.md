# Geospatial indexes

编码转换：当用 GEOADD 添加位置时，Redis 会利用 GeoHash 算法 将二维的经纬度 (15, 37) 转换成一个 52 位的整数。
存储结构：这个整数被作为 Score 存入一个 ZSet 中，成员名（如“Palermo”）作为 Member。

- geoadd 添加地理位置信息 经纬度 值
- geodist 俩者之间距离
- georadius

```text
127.0.0.1:6379> GEOADD Sicily 13.361389 38.115556 "Palermo" 15.087269 37.502669 "Catania"
(integer) 2
127.0.0.1:6379> GEODIST Sicily Palermo Catania
"166274.1516"
127.0.0.1:6379> GEORADIUS Sicily 15 37 100 km
1) "Catania"
127.0.0.1:6379> GEORADIUS Sicily 15 37 200 km
1) "Palermo"
2) "Catania"
```
