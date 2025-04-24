## 条件
https://127.0.0.1:9200/test/_search
```json
{
    "query": {
        "match": {
            "age": 21
        }
    }
}
```
## 多条件
https://127.0.0.1:9200/test/_search
must 必须 should 或者
```json
{
    "query" : {
        "bool":{
            "must": [
                    {
                    "match": {
                        "name": "jasper"
                    }
                    },
                    {
                    "match": {
                        "hobby": "drike"
                    }
                    }
            ]
        }
    }
}
```

## 范围查询
gt lt 
```json
{
    "query" : {
        "bool":{
            "should": [
                    {
                    "match": {
                        "name": "jasper"
                    }
                    },
                    {
                    "match": {
                        "hobby": "drike"
                    }
                    }
            ],
            "filter":{
                "range":{
                    "age": {
                        "lt": 21
                    }
                }
            }
        }
    }
}
```
## 分页
```json
{
  "query": {
    "match_all": {}
  },
  "from": 0,
  "size": 2
}
```
## 查询指定字段
```json
{
  "query": {
    "match_all": {}
  },
  "from": 0,
  "size": 2,
  "_source": ["name","hobby"]
}
```
## 排序
```json
{
  "query": {
    "match_all": {}
  },
  "from": 0,
  "size": 3,
  "_source": ["name","age"],
  "sort": {
    "age": {
        "order": "asc"
    }
  }
}
```
## 全文检索匹配
```json
{
    "query":{
        "match":{
            "hobby": "烟酒"
        }
    }
}
```
result
```json
{
    "took": 1,
    "timed_out": false,
    "_shards": {
        "total": 1,
        "successful": 1,
        "skipped": 0,
        "failed": 0
    },
    "hits": {
        "total": {
            "value": 2,
            "relation": "eq"
        },
        "max_score": 1.0417082,
        "hits": [
            {
                "_index": "test",
                "_id": "1",
                "_score": 1.0417082,
                "_source": {
                    "name": "jasperUpdate",
                    "age": 20,
                    "hobby": "抽烟"
                }
            },
            {
                "_index": "test",
                "_id": "2",
                "_score": 1.0417082,
                "_source": {
                    "name": "jasper",
                    "age": 20,
                    "hobby": "喝酒"
                }
            }
        ]
    }
}
```
## 完全匹配
```json
{
    "query":{
        "match_phrase":{
            "hobby": "喝酒"
        }
    },
    "highlight":{
        "fields":{
            "hobby":{}
        }
    }
}
```
## 聚合操作
```json
{
    "aggs": {
        "age_group":{
            "terms":{
                "field": "age"
            }
        }
    }
}
```
## 平均操作
```json
{
    "aggs": {
        "age_avg":{
            "avg":{
                "field": "age"
            }
        }
    }
}
```
