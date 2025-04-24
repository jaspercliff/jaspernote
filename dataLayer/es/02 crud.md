![[Pasted image 20240124143215.png]]

```
# 删除索引
DELETE test
# 创建索引
PUT test 
{
  "settings": {
    "number_of_shards": 1,
    "number_of_replicas": 1
  },
# 映射（Mappings）定义了索引中的字段的数据类型及其属性
  "mappings": {
    "properties": {
      "userId":{
        "type": "integer",
        "ignore_malformed": true
      },
      "username":{
        "type": "text"
      }
    }
  }
}
# 查看索引
get test/_mapping

# 插入值
put test/_doc/2
{
  "userId": "1asd1",
  "username": "cliff"
}
# 查看值
get test/_search
```

## restful
![[Pasted image 20240125104225.png]]
put 添加索引
https://127.0.0.1:9200/test1
```json
{

  "settings": {
    "number_of_shards": 1,
    "number_of_replicas": 1
  },
  "mappings": {
    "properties": {
      "userId":{
        "type": "integer",
        "ignore_malformed": true
      },
      "username":{
        "type": "text"
      }
    }
  }
}
```
查询一条数据
https://127.0.0.1:9200/test/_doc/1
查询index下的全部数据
https://127.0.0.1:9200/test/_search
局部更新
https://127.0.0.1:9200/test/_update/1
```json
{
    "doc":{
         "name": "jasperUpdate"
    }
}
```
