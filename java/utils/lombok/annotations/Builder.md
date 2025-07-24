# @Builder

```java

@Builder(toBuilder = true)
@ToString
public class Person {
    String firstName;
    String lastName;
    int age;
    String email;
    String phone;
}

@Builder(toBuilder = true, builderClassName = "ImmutablePersonBuilder", builderMethodName = "personBuilder",
        buildMethodName = "create")
@ToString
@Value
public class ImmutablePerson {
    String firstName;
    String lastName;
    int age;
    String email;
    @Builder.Default
    String phone = "not provided";
}


public class BuilderDemo {
    public static void main(String[] args) {
        Person person = Person.builder().age(1).firstName("jasper").lastName("cliff").email("test@qq.com").build();
        System.out.println("person = " + person);
        Person.PersonBuilder builder = person.toBuilder();
        System.out.println("builder = " + builder);
        Person person1 = builder.phone("1234567890").build();
        System.out.println("person1 = " + person1);


        ImmutablePerson build = ImmutablePerson.personBuilder().age(1).firstName("jasper").lastName("cliff").email("test@qq.com").create();
        System.out.println("build = " + build);
        System.out.println("build.getPhone() = " + build.getPhone());
    }
}
```
toBuilder: 为现有的实例提供一个转换到 builder 的方法，方便修改现有对象。 builderClassName: 允许指定不同的构建器类名。
builderMethodName: 允许指定不同的构建器方法名。 buildMethodName: 允许指定 build 方法的不同名称 。

@Builder.default  当你在一个类的字段上使用 @Builder.Default 注解时，Lombok 会在生成的构建器中为该字段设置一个默认值。

## @Value
@Value 注解被用来创建不可变（immutable）的类。这意味着一旦一个对象被创建，它的状态就不能被改变。
@Value 注解自动为类中的所有字段生成：
私有的最终 (private final) 字段声明。
对应的构造函数，该构造函数接收与类中字段相同类型的参数。
所有字段的公共 getter 方法。
如果类中有任何集合类型（如 List 或 Map），则它们会被初始化为不可变的形式。


## 访问级别
- 访问级别：@Builder 默认会生成一个包级私有的（package-private）或私有的（private）构造函数来防止直接实例化。
这是因为 @Builder 的设计理念是鼓励通过构建器模式来创建对象实例，而不是直接通过构造函数。
- 自定义构造函数可见性：如果你想改变由 @Builder 生成的构造函数的可见性，可以使用 @Builder 的 access 属性来调整。
- 例如，如果你想让构造函数成为公共的，你可以这样使用 @Builder(access = AccessLevel.PUBLIC)。