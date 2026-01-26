# BiConsumer

`BiConsumer<T, U>` 接收两个输入参数并不返回结果的操作

`BiConsumer<T, U>` 是 Java 8 中另一个非常有用的函数式接口，它同样位于 `java.util.function` 包中。与 `Consumer<T>` 不同的是，
`BiConsumer<T, U>` 接受两个参数（类型分别为 T 和 U），并且不返回任何结果。

## 主要用途

当你需要对两个输入参数执行某些操作但不需要返回值时，就可以使用 `BiConsumer`。这在遍历 Map 的键值对、处理数据库记录、日志输出等场景中非常常见。

---

## 一、接口定义

```java

@FunctionalInterface
public interface BiConsumer<T, U> {
    void accept(T t, U u);

    default BiConsumer<T, U> andThen(BiConsumer<? super T, ? super U> after) {
        Objects.requireNonNull(after);
        return (t, u) -> {
            accept(t, u);
            after.accept(t, u);
        };
    }
}
```

---

## 二、常用方法说明

### 1. `void accept(T t, U u)`

- **作用**：执行一个操作，接受两个参数。
- **示例**：打印键值对、修改对象状态等。

### 2. `default BiConsumer<T, U> andThen(BiConsumer<? super T, ? super U> after)`

- **作用**：将当前 `BiConsumer` 执行完后，再执行 `after` 指定的 `BiConsumer`。
- **链式调用**：可以串联多个操作。

---

## 三、使用示例

```java
package com.jasper.java8.functionInterface;

import com.jasper.pojo.Person;
import java.util.HashMap;
import java.util.Map;
import java.util.function.BiConsumer;

public class BiConsumerDemo {
    public static void main(String[] args) {
        Map<String, Integer> map = new HashMap<>();
        map.put("Alice", 25);
        map.put("Bob", 30);
        map.put("Charlie", 35);
        map.forEach((s, integer) -> System.out.println(s + "-" + integer));

        BiConsumer<String, Integer> printName = (name, age) -> System.out.println("Name: " + name);
        BiConsumer<String, Integer> printAge = (name, age) -> System.out.println("Age: " + age);
        BiConsumer<String, Integer> printBoth = printName.andThen(printAge);
        printBoth.accept("Tom",28);

        Person p = new Person("John", 20);
        BiConsumer<Person, String> setName = Person::setName;
        BiConsumer<Person, Integer> setAge = Person::setAge;
        setName.accept(p, "Jane");
        setAge.accept(p, 25);
        System.out.println(p);
    }
}

```

---

## 四、总结对比

| 接口                 | 参数个数 | 是否有返回值 | 适用场景                  |
|--------------------|------|--------|-----------------------|
| `Consumer<T>`      | 1    | 否      | 对单个对象进行操作             |
| `BiConsumer<T, U>` | 2    | 否      | 对两个对象进行操作，如 Map Entry |
