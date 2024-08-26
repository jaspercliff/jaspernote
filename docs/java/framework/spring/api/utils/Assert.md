# Assert

[Assert](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/util/Assert.html)

## hasText

**public static** void **hasText**([@Nullable](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/lang/Nullable.html "annotation interface in org.springframework.lang")  [String](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/String.html "class or interface in java.lang") text,  [String](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/String.html "class or interface in java.lang") message)

Assert that the given String contains valid text content; that is, it must not be `null` and must contain at least one non-whitespace character.

```
Assert.hasText(name, "'name' must not be empty");
```

Parameters:

`text` - the String to check

`message` - the exception message to use if the assertion fails

Throws:IllegalArgumentException

如果 `userInput` 为 `null`、为空字符串 (`""`) 或者只包含空白字符（如空格、制表符等），则 `Assert.hasText` 方法将抛出 `IllegalArgumentException`，并附带传递给它的错误消息。
