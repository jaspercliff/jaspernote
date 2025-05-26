# 数据类型

![数据类型](assets/01数据类型.png)

## 基本数据类型

| 基本类型    | 位数 | 字节 | 默认值     | 取值范围                                       |
|---------|----|----|---------|--------------------------------------------|
| byte    | 8  | 1  | 0       | -128 ~ 127                                 |
| short   | 16 | 2  | 0       | -32768 ~ 32767                             |
| int     | 32 | 4  | 0       | -2147483648 ~ 2147483647                   |
| long    | 64 | 8  | 0L      | -9223372036854775808 ~ 9223372036854775807 |
| char    | 16 | 2  | 'u0000' | 0 ~ 65535                                  |
| float   | 32 | 4  | 0f      | 1.4E-45 ~ 3.4028235E38                     |
| double  | 64 | 8  | 0d      | 4.9E-324 ~ 1.7976931348623157E308          |
| boolean | 1  |    | false   | true、false                                 |

## 浮点数

### 浮点数得精度运算

无限循环的小数存储在计算机中，多余的只能截断

``` java 
        float a = 2.0f-1.0f;
        float b= 1.8f-1.7f;
        System.out.println(a == b);
   //output:false
```

- 解决精度丢失
- BigDecimal

## BigDecimal
```bash
        BigDecimal c = new BigDecimal("1.0");
        BigDecimal d = new BigDecimal("0.9");
        System.out.println(c.subtract(d));
```

java 中 Long 是最大的正数类型 64 位
超过则使用 BigInteger 内部使用 int[]数组存储任意大小的整形数据


实现对浮点数的运算不会造成精度丢失
优先推荐入参为 String 的构造方法，或者 BigDecimal.valueof(double)，double 的 toString 会按照 double 的实际能表达的精度对尾数截断

``` java
        BigDecimal bigDecimal = new BigDecimal(0.1F);
        System.out.println("bigDecimal = "+bigDecimal);

        BigDecimal bigDecimal1 = new BigDecimal("0.1");
        System.out.println("bigDecimal1 = "+bigDecimal1);

        BigDecimal bigDecimal2 = BigDecimal.valueOf(0.1f);
        System.out.println("bigDecimal2 = "+bigDecimal2);

bigDecimal =0.100000001490116119384765625
bigDecimal1 =0.1
bigDecimal2 =0.10000000149011612
```

```java
    public static BigDecimal valueOf(double val) {
    // Reminder: a zero double returns '0.0', so we cannot fastpath
    // to use the constant ZERO.  This might be important enough to
    // justify a factory approach, a cache, or a few private
    // constants, later.
    return new BigDecimal(Double.toString(val));
}
```

### 大小比较

`a.compareTo(b)`: 返回 -1 表示`a`小于`b`，0 表示`a`等于`b`， 1 表示`a`大于`b`。

`BigDecimal a = new BigDecimal("1.0");
BigDecimal b = new BigDecimal("0.9");
System.out.println(a.compareTo(b));// 1`

### 等值比较

应该使用 compareTo 而不是 equals

```java
public class Demo2 {
    public static void main(String[] args) {
        BigDecimal bigDecimal = new BigDecimal("1");
        BigDecimal bigDecimal1 = new BigDecimal("1.0");
        System.out.println(bigDecimal1.equals(bigDecimal));
        System.out.println(bigDecimal1.compareTo(bigDecimal));
    }
}
//false
//        0
```

```java

@Override
public boolean equals(Object x) {
    if (!(x instanceof BigDecimal))
        return false;
    BigDecimal xDec = (BigDecimal) x;
    if (x == this)
        return true;
    if (scale != xDec.scale)
        return false;
    long s = this.intCompact;
    long xs = xDec.intCompact;
    if (s != INFLATED) {
        if (xs == INFLATED)
            xs = compactValFor(xDec.intVal);
        return xs == s;
    } else if (xs != INFLATED)
        return xs == compactValFor(this.intVal);

    return this.inflated().equals(xDec.inflated());
}
```

## 自动转换

- 由小数据转换为大数据的时候会发生自动转换
  (byte，short，char) < int < long < float < double
- 整型类型和浮点型进行计算后，结果会转为浮点类型

``` java
long x = 30;
float y = 14.3f;
System.out.println("x/y = "+x/y);

//x/y =1.9607843
```

> “大”与“小”，并不是指占用字节的多少，而是指表示值的范围的大小
> 可见 long 虽然精度大于 float 类型，但是结果为浮点数类型

- 转换前后的数据类型要兼容,由于 boolean 类型只能存放 true 或 false，这与整数或字符是不兼容的，因此不可以做类型转换。

## 强制转换

强制转换使用括号 () 。
引用类型也可以使用强制转换

``` java
float f = 25.5f;
int x = (int) f;
System.out.println("x = "+x);
```

## 包装类

基本类型都有对应的包装类型，基本类型与其对应的包装类型之间的赋值使用自动装箱与拆箱完成。

```java
Integer x = 2;     // 装箱
int y = x;         // 拆箱
```

- new Integer(123) 每次都会新建一个对象
- Integer.valueOf(123) 会使用缓存池中的对象，多次调用会取得同一个对象的引用。

``` java
Integer a = new Integer(123);  //since 9 depreacted  推荐使用 Integer.valueOf() 可以利用缓存机制 
Integer b = new Integer(123);
System.out.println(a ==b);    // false

Integer c = Integer.valueOf(123);
Integer d = Integer.valueOf(123);
System.out.println(c ==d);   // true

final Integer a = 128;
final Integer b = 128;
System.out.println(a==b); //false 
```

编译器会**在缓冲池范围内的基本类型**自动装箱过程调用 valueOf() 方法，因此多个 Integer 实例使用自动装箱来创建并且值相同，那么就会引用相同的对象

``` java
public static Integer valueOf(int i) {
    if (i >= IntegerCache.low && i <= IntegerCache.high)
        return IntegerCache.cache[i + (-IntegerCache.low)];
    return new Integer(i);
}

private static class IntegerCache {
    static final int low = -128;
    static final int high;
    static final Integer cache[];

    static {
        // high value may be configured by property
        int h = 127;
        String integerCacheHighPropValue =
                sun.misc.VM.getSavedProperty("java.lang.Integer.IntegerCache.high");
        if (integerCacheHighPropValue != null) {
            try {
                int i = parseInt(integerCacheHighPropValue);
                i = Math.max(i, 127);
                // Maximum array size is Integer.MAX_VALUE
                h = Math.min(i, Integer.MAX_VALUE - (-low) - 1);
            } catch (NumberFormatException nfe) {
                // If the property cannot be parsed into an int, ignore it.
            }
        }
        high = h;
        cache = new Integer[(high - low) + 1];
        int j = low;
        for (int k = 0; k < cache.length; k++)
            cache[k] = new Integer(j++);

        // range [-128, 127] must be interned (JLS7 5.1.7)
        assert IntegerCache.high >= 127;
    }

    private IntegerCache() {
    }
}
```

基本类型对应的缓冲池如下:

- boolean values true and false
- all byte values
- short values between -128 and 127
- int values between -128 and 127
- char in the range \u0000 to \u007F

### 基本数据和包装类

- 基本类型占用的空间更小
- 基本类型不赋值有默认值，而包装类型不赋值默认为 null
- 基本类型存储在栈中，包装类型存储在堆中
    - Java 中的基本类型（如**`int`**、**`float`**、**`double`**、**`boolean`**
      等）通常存储在栈内存中。这是因为基本类型的值直接存储在使用它们的方法的栈帧中。基本类型的值是直接按值传递的，它们的生命周期通常随着方法的调用而开始，随着方法的返回而结束
    - 另一方面，包装类型（如**`Integer`**、**`Float`**、**`Double`**、**`Boolean`**等）是基本类型的对象表示形式，它们用于 Java
      集合框架中，以及在需要对象而非基本类型的其他情况下。由于包装类型是对象，它们的实例存储在堆内存中。当创建一个包装类型的实例时（例如通过
      ** `new Integer(5)`**），就会在堆内存中分配空间来存储这个对象，而对象的引用则可以存储在栈内存中（如果它是一个局部变量）。
- 无论是基本类型还是引用类型的成员变量，如果它们是对象的非**`static`**成员，那么这些成员变量的数据都存储在堆内存中的。
    - static 变量是存储在方法区的

## 自动装箱和拆箱

基本数据类型与包装类的转换被称为装箱和拆箱。
装箱（boxing）是将值类型转换为引用类型。例如：int 转 Integer。
拆箱（unboxing）是将引用类型转换为值类型。例如：Integer 转 int

```java
        Integer c1 = 33;//装箱
int c2 = c1;//拆箱
```

![unboxing](assets/02unboxing.png)

从字节码中，我们发现装箱其实就是调用了 包装类的 `valueOf()`方法，拆箱其实就是调用了 `xxxValue()`方法。

### scene

- **场景一、将基本数据类型放入集合类**

Java 中的集合类只能接收对象类型

``` java
List<Integer> li = new ArrayList<>();
 for(int i = 1;i< 50;i ++){
        li.add(i);
    }

//反编译
List<Integer> li = new ArrayList<>();
        for(int i = 1;i< 50;i++){
        li.add(Integer.valueOf(i));
        }
```

- **场景二、包装类型和基本类型的大小比较**

对 Integer 对象与基本类型

``` java
        Integer a = 1;
        System.out.println(a==1?"等于":"不等于");

Boolean bool = false;
        System.out.println(bool?"真":"假");
 ----------------------------------------------------
Integer a = 1;
        System.out.println(a.intValue() ==1?"等于":"不等于");
Boolean bool = false;
        System.out.println(bool.booleanValue() ?"真":"假");
```

包装类与基本数据类型进行比较运算，是先将包装类进行拆箱成基本数据类型，然后进行比较的。

- **场景三、包装类型的运算**

对 Integer 对象进行四则运算

``` java
Integer i = 10;
Integer j = 20; 
System.out.println(i+j);
--------------------------------------------------------
Integer i2 = 10;
Integer j = 20;
System.out.println(i2.intValue() +j.intValue());
```

两个包装类型之间的运算，会被自动拆箱成基本类型进行。

- **场景四、三目运算符的使用**

``` java
boolean flag = true;
Integer i = 0;
int j = 1;
int k = flag ? i : j;
--------------------------------------------------------
Integer i = 0;
int k = 1 != 0 ? i.intValue() : 1;
System.out.println(k);
```

这是三目运算符的语法规范：当第二，第三位操作数分别为基本类型和对象时，其中的对象就会拆箱为基本类型进行操作。

因为例子中，flag ? i : j;片段中，第二段的 i 是一个包装类型的对象，而第三段的 j 是一个基本类型，所以会对包装类进行自动拆箱。如果这个时候 i 的值为 null，那么就会发生 NPE。

![npe](assets/03unboxingscene.png)

## 引用类型

- class
- enum
- interface
- array

## String

- [String详解](String.md)
