# jetcache

area 缓存域
default 5 min
shortArea 10 min
middleArea 1 hour
longArea 1 day
cacheType
both redis and local
remote redis
local 本地
name
jetCache 默认将name拼到 缓存key值的前面 建议以:结束

key
不指定
默认情况下 不写key jetCache默认以方法的参数生成key

指定
prefix_key_suffix

```java
@Cached(expire = 59, cacheType = CacheType.LOCAL, key = "'prefix_' + #key + '_suffix'")
public String getData(String key) {
return "Data for " + key;
}
```

SpEl
如果项目基于 Spring，可以利用 SpEL 的强大功能来生成缓存键。

```java
import com.alicp.jetcache.anno.CacheType;
import com.alicp.jetcache.anno.Cached;

public class CacheService {

    @Cached(expire = 60, cacheType = CacheType.LOCAL, key = "#root.methodName + '_' + #key")
    public String getData(String key) {
        return "Data for " + key;
    }
}
在这个例子中，#root.methodName 表示方法名，#key 表示方法参数 key 的值，因此缓存键将被设置为 "getData_someKey"。

使用自定义 KeyGenerator
使用自定义 KeyGenerator 使用自定义 KeyGenerator 除了使用注解属性外，还可以通过实现 KeyGenerator 接口来自定义缓存键的生成逻辑。

import com.alicp.jetcache.anno.CacheType;
import com.alicp.jetcache.anno.Cached;
import com.alicp.jetcache.support.AbstractKeyGenerator;
public class CustomKeyGenerator extends AbstractKeyGenerator {

    @Override
    public String getCacheKey(Object[] params) {
        // 根据参数生成自定义的缓存键
        return "custom_" + params[0];
    }
}
public class CacheService {
@Cached(expire = 60, cacheType = CacheType.LOCAL, keyGenerator = CustomKeyGenerator.class)
public String getData(String key) {
return "Data for " + key;
}
}

```

在这个例子中，CustomKeyGenerator 类实现了 AbstractKeyGenerator 接口，并覆盖了 getCacheKey 方法来生成自定义的缓存键。 缓存键将被设置为 "custom_key"。

