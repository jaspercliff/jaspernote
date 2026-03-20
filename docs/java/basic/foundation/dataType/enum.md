# 枚举

是一个特殊的类 一般表示一组常量 比如一年四季
每一个枚举类型都可以看作是一个Enum的实例
Red 和 BLACK都有color属性

```java
 enum Color{
        RED("red"),BLACK("black");
        private final String color;
     // 构造方法必须是私有的
//如果允许外部程序创建新的枚举实例，就可能破坏枚举实例的唯一性和稳定性
        private Color(String color){
            this.color = color;
        }
    }
    public static void main(String[] args){
        System.out.println(Color.RED.color);
    }
// output:red
```

but Enum 里面没有values方法

``` java
public class demo {
    enum Color{
        RED,BLUE,BLACK
    }
    public static void main(String[] args) {
        for (Color value : Color.values()) {
            System.out.println(value);
        }
    }
}

```

javap demo$Color.class

```java
  public static final se.enum_study.demo$Color BLUE;
  public static final se.enum_study.demo$Color BLACK;
  public static se.enum_study.demo$Color[] values();
  public static se.enum_study.demo$Color valueOf(java.lang.String);
  static {};
```

可以看到自动插入了 values方法
The compiler automatically adds some special methods when it creates an enum
枚举常量默认都被public static final 修饰

## methods

values 返回枚举类中所有的值
ordinal  返回枚举常量的“下标（序号）”
vlaueof  返回指定字符串的枚举常量 字符串 → 枚举
**`name()`**方法是`Enum`类的一个内置方法，它返回枚举常量的名称作为一个字符串

``` java
    public static void main(String[] args) {
        for (Color value : Color.values()) {
            System.out.println(value.ordinal()+":"+value);
        }
        System.out.println(Color.valueOf("RED"));
    }
```

枚举类中有抽象方法 则枚举类中的每个对象都对其进行实现

``` java
enum Color {
        RED{
            @Override
            public String getColor() {
                return "RED";
            }
        }
        ,BLUE{
            @Override
            public String getColor() {
                return "BLUE";
            }
        },
        BLACK{
            @Override
            public String getColor() {
                return "black";
            }
        }
}
```

## EnumMap

```java
public class EnumMap<K extends Enum<K>,V>

extends AbstractMap<K,V>

implements Serializable, Cloneable
```

- 必须指定类型：创建时必须传入枚举的 Class 对象（如 new EnumMap(Status.class)），因为底层数组需要知道大小。
- Key 不能为空：EnumMap 不允许使用 null 作为 Key（会抛出 NullPointerException），但 Value 可以为 null。

它拥有数组的极致性能，同时具备 Map 的优雅接口
enummap 有顺序 查找o(1) 占用内存少（数组）

### Example

``` java
public class EnumMapExample {
    public enum Color {
        RED,
        BLACK,
        BLUE;
    }

    public static void main(String[] args) {
        EnumMap<Color, String> enumMap = new EnumMap<>(Color.class);
        enumMap.put(Color.RED, "color is red");
        enumMap.put(Color.BLACK, "color is black");
        enumMap.put(Color.BLUE, "color is blue");
        System.out.println(enumMap.size());
        System.out.println(enumMap);
        System.out.println("key: " + Color.RED + " Value:" + enumMap.get(Color.RED));
        System.out.println("Does enumMap has " + Color.BLUE + " :" + enumMap.containsValue("color is red"));
        System.out.println("-----------------------------------");
        System.out.println("key/value mapping is " + enumMap.entrySet());
        System.out.println("keySet " + enumMap.keySet());
        System.out.println("values "+enumMap.values());
        System.out.println("----------");
        enumMap.replaceAll((key,oldValue) -> oldValue+"  jasper");
        System.out.println(enumMap.entrySet());
    }
}

output:
3
{RED=color is red, BLACK=color is black, BLUE=color is blue}
key: RED Value:color is red
Does enumMap has BLUE :true
-----------------------------------
key/value mapping is [RED=color is red, BLACK=color is black, BLUE=color is blue]
keySet [RED, BLACK, BLUE]
values [color is red, color is black, color is blue]
----------
[RED=color is red  jasper, BLACK=color is black  jasper, BLUE=color is blue  jasper]
```

```java
replaceAll()
default void replaceAll(BiFunction<? super K, ? super V, ? extends V> function)
@FunctionalInterface  函数式编程
public interface BiFunction<T, U, R>
```

## EnumSet

```java
public abstract class EnumSet<E extends Enum<E>>

extends AbstractSet<E>

implements Cloneable, Serializable
```

如果枚举类中的元素少于 64 个（绝大多数业务场景），EnumSet 内部仅使用一个 long 类型的变量来存储,相比于 HashSet 需要计算哈希值、处理碰撞、遍历桶，EnumSet 的操作直接由 CPU 指令完成，速度快到极致
