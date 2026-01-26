# @ConditionalOnProperty 

@ConditionalOnProperty 是 Spring Boot 中的一个注解，它用于基于配置文件中的属性值来决定是否应该创建某个 Bean

```
@ConditionalOnProperty(
value = {"property.name"}, // 配置文件中的属性名
havingValue = "expectedValue", // 属性期望的值，默认为 "true"
matchIfMissing = false // 如果属性不存在时是否匹配，默认为 false
)
```

- value 或 name: 指定要检查的属性名。
- havingValue: 可选参数，指定属性必须具有的值，如果属性值与这个值相等，则条件成立。默认情况下，它会查找值为 "true" 的属性。
- matchIfMissing: 可选参数，如果设置为 true，那么当指定的属性不存在时，条件也会被视为满足。

```properties
feature.enabled=true
```
```java
@Configuration
public class FeatureConfiguration {

    @Bean
    @ConditionalOnProperty(name = "feature.enabled", havingValue = "true", matchIfMissing = false)
    public FeatureService featureService() {
        return new FeatureServiceImpl();
    }
}
```

只有当feature.enabled存在并且值=true时才会创建FeatureConfiguration bean