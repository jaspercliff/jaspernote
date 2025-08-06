# qualifiedByName and qualifiedBy

## `qualifiedByName`

- **用途**：`qualifiedByName` 主要用于方法级别的映射，当你有多个具有相同参数类型的映射方法时，可以通过此属性指定使用哪个具体的方法。
  
- **使用场景**：当你定义了多个自定义映射方法，并且这些方法的签名（参数类型和返回类型）相同或兼容时，你可以通过给方法添加 `@Named` 注解并设置名称，然后在 `@Mapping` 中使用 `qualifiedByName` 来明确指出应使用哪一个方法进行映射。

#### 示例：

```java
@Mapper
public interface PersonMapper {
    PersonMapper INSTANCE = Mappers.getMapper(PersonMapper.class);

    @Mapping(source = "hobby",target = "hobbies")
    @Mapping(target = "high", ignore = true)
    @Mapping(target = "name",qualifiedByName = "nameString")
    PersonDTO toPersonDTO(Person person);


    @Named("nameString")
    default String nameString(String input) {
        return input + "test qualifiedByName";
    }
}

```

## `qualifiedBy`


在 MapStruct 中，当你有两个或更多的映射方法具有相同的参数类型和返回类型时，MapStruct 可能会遇到不确定性——不知道应该使用哪一个方法进行映射。为了解决这个问题，你可以使用 `@Qualifier` 注解来创建自定义限定符，并通过 `qualifiedBy` 属性指定使用哪个映射方法。

### 如何使用 `qualifiedBy`

要使用 `qualifiedBy`，你需要执行以下几个步骤：

1. **定义一个限定符**：首先，你需要创建一个自定义注解，并用 `@Qualifier` 来标记它。
2. **应用限定符到映射方法上**：将你刚刚创建的限定符应用于那些需要区分的映射方法上。
3. **在映射配置中使用 `qualifiedBy`**：最后，在你的 `@Mapper` 或 `@Mapping` 配置中，使用 `qualifiedBy` 属性来指定使用哪个被限定的方法。

#### 示例

假设我们有一个场景，我们需要根据某个属性的值来决定如何映射一个字段。比如，如果源对象中的 `type` 字段是 "A" 类型，则使用一种映射方式；如果是 "B" 类型，则使用另一种。

##### 第一步：定义限定符

首先，我们创建一个自定义限定符注解：

```java
import org.mapstruct.Qualifier;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Qualifier
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.SOURCE)
public @interface TypeAQualifier {
}
```

以及另一个限定符用于 "B" 类型：

```java
import org.mapstruct.Qualifier;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Qualifier
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.SOURCE)
public @interface TypeBQualifier {
}
```

##### 第二步：应用限定符到映射方法上

接下来，我们在映射接口或抽象类中定义两个不同的映射方法，并分别应用上述限定符：

```java
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public abstract class MyMapper {

    public static final MyMapper INSTANCE = Mappers.getMapper(MyMapper.class);

    @TypeAQualifier
    protected String mapTypeA(String source) {
        return "Mapped by Type A: " + source;
    }

    @TypeBQualifier
    protected String mapTypeB(String source) {
        return "Mapped by Type B: " + source;
    }

    @Mapping(target = "targetField", source = "sourceField", qualifiedBy = TypeAQualifier.class)
    Target mapSourceTypeAToTarget(Source source);

    @Mapping(target = "targetField", source = "sourceField", qualifiedBy = TypeBQualifier.class)
    Target mapSourceTypeBToTarget(Source source);
}
```

在这个例子中，我们定义了两个映射方法 `mapSourceTypeAToTarget` 和 `mapSourceTypeBToTarget`，它们分别使用了 `TypeAQualifier` 和 `TypeBQualifier` 作为限定符。

##### 第三步：使用 `qualifiedBy` 进行具体映射

然而，上面的例子展示了如何定义限定符和映射方法，但在实际使用中，你可能会想要根据源对象的某些属性值动态选择映射方法。为此，我们可以进一步调整我们的映射逻辑，例如通过条件判断来选择合适的映射方法：

```java
@Mapper
public abstract class MyMapper {

    public static final MyMapper INSTANCE = Mappers.getMapper(MyMapper.class);

    @TypeAQualifier
    protected String mapTypeA(String source) {
        return "Mapped by Type A: " + source;
    }

    @TypeBQualifier
    protected String mapTypeB(String source) {
        return "Mapped by Type B: " + source;
    }

    @Mapping(target = "targetField", expression = "java(source.getType().equals(\"A\") ? mapTypeA(source.getSourceField()) : mapTypeB(source.getSourceField()))")
    Target mapSourceToTarget(Source source);
}
```

在这个例子中，我们通过表达式语言（expression language）实现了基于 `source.getType()` 的值来选择调用哪个映射方法。

### 总结

- **`qualifiedBy`** 提供了一种强大的机制，让你可以根据自定义的限定符来选择具体的映射方法，适用于需要更灵活控制映射过程的场景。
- 它通常与自定义注解（`@Qualifier`）结合使用，以实现对映射方法的选择。
- 在实际开发中，它可以用来解决复杂的映射需求，特别是当存在多个潜在适用的映射方法时。### 总结

- **`qualifiedByName`** 是基于方法名来选择特定的映射方法，适用于简单场景下区分同签名的方法。
- **`qualifiedBy`** 提供了一种更为灵活的方式，通过自定义限定符来选择映射方法，适合于需要更复杂逻辑判断的场景。