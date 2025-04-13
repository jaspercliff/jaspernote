# serializationConfig

1. JsonInclude 注解: 可以在类级别或字段级别应用，以控制该类或字段的序列化行为。
   - JsonInclude(JsonInclude.Include.NON_NULL): 表示只有当字段值不是 null 时才包括在 JSON 输出中。
   - JsonInclude(JsonInclude.Include.NON_EMPTY): 更进一步，除了 null 值外，空集合、空字符串等也被排除。
   - JsonInclude(JsonInclude.Include.ALWAYS): 默认行为，总是包括所有字段。
   - JsonInclude(JsonInclude.Include.CUSTOM): 允许自定义包含逻辑。
2. ObjectMapper 配置: 你也可以通过设置 ObjectMapper 来全局地控制序列化行为。
ObjectMapper mapper = new ObjectMapper();
mapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);