# serializationConfig

## include

1. JsonInclude 注解: 可以在类级别或字段级别应用，以控制该类或字段的序列化行为。
   - JsonInclude(JsonInclude.Include.ALWAYS): 默认行为，总是包括所有字段。
   - JsonInclude(JsonInclude.Include.NON_NULL): 表示只有当字段值不是 null 时才包括在 JSON 输出中。
   - JsonInclude(JsonInclude.Include.NON_EMPTY): 更进一步，除了 null 值外，空集合、空字符串等也被排除。
   - JsonInclude(JsonInclude.Include.CUSTOM): 允许自定义包含逻辑。
2. ObjectMapper 配置: 你也可以通过设置 ObjectMapper 来全局地控制序列化行为。
ObjectMapper mapper = new ObjectMapper();
mapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);

```java
@Data
@JsonInclude(JsonInclude.Include.ALWAYS)
public class Person {
    @JsonInclude(JsonInclude.Include.ALWAYS) //总是包含 默认
    private Integer id;
    @JsonInclude(JsonInclude.Include.NON_NULL) //不为空时
    private String name;
    @JsonInclude(JsonInclude.Include.NON_EMPTY)// 不为null和空时
    private String address;
    /**
     * int/long/short/byte → 0
     * float/double → 0.0
     * boolean → false
     * 引用类型（String, Object 等）→ null
     */
    @JsonInclude(JsonInclude.Include.NON_DEFAULT) //不为默认值时
    private long age;
    /**
     * ObjectMapper mapper = new ObjectMapper();
     * mapper.setSerializationInclusion(JsonInclude.Include.NON_NULL)
     */
    @JsonInclude(JsonInclude.Include.USE_DEFAULTS) //使用类或属性的默认行为 通常是always 但也可能全局配置为别的行为
    private String phone;
    @JsonInclude(value = JsonInclude.Include.CUSTOM,valueFilter = SkipSpecialFilter.class)
    private String description;
    @JsonInclude(value = JsonInclude.Include.NON_ABSENT)//效果和non-null 类似 但是排除 optional.empty() atomicReference null
    private Role role;
}
public class SkipSpecialFilter {

    @Override
    public boolean equals(final Object obj) {
        return obj instanceof String && obj.equals("special");
    }
}
```
