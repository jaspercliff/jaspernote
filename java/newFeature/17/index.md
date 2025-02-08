# jdk17

## path variable
``` java
if(body instanceof Page){  
    HashMap<Object, Object> map = new HashMap<>();  
    Page<?> page = (Page<?>) body;  
    map.put("total",page.getTotal());  
    map.put("records",page.getRecords());  
    map.put("current",page.getCurrent());  
    map.put("size",page.getSize());  
    return R.success(map);  
}


if(body instanceof Page<?> page){  
    HashMap<Object, Object> map = new HashMap<>();  
    map.put("total",page.getTotal());  
    map.put("records",page.getRecords());  
    map.put("current",page.getCurrent());  
    map.put("size",page.getSize());  
    return ResultVO.success(map);  
}
```
