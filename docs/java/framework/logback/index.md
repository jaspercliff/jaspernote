# logback


根据不同的环境配置不同的日志记录规则

``` xml
<!-- 根据激活的 Profile 应用不同的配置 -->
<springProfile name="dev">
    <logger name="com.example" level="DEBUG"/>
    <root level="DEBUG">
        <appender-ref ref="CONSOLE" />
    </root>
</springProfile>

<springProfile name="prod">
<logger name="com.example" level="INFO"/>
<root level="INFO">
    <appender-ref ref="CONSOLE" />
</root>
</springProfile>
```

