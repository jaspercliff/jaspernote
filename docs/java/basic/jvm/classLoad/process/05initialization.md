# initialization




## passive reference 
**被动引用（Passive Reference）**: 当一个类被“引用”但却没有触发其**初始化（Initialization）**阶段时，这种引用方式就称为被动引用。

### 子类引用父类中的静态变量
```java
class SuperClass {
    static { System.out.println("SuperClass init!"); }
    public static int value = 123;
}
class SubClass extends SuperClass {
    static { System.out.println("SubClass init!"); }
}
/**
 * 通过子类引用父类中的静态变量，不会导致子类初始化
 * vm : -Xlog:class+load=info
 * <br/>
 *[0.016s][info][class,load] com.jasper.classload.initialization.passiveReference.SuperClass
 * source: file:/Users/jasper/code/java/person/learnJava/basic/jvm/build/classes/java/main/
 * [0.016s][info][class,load] com.jasper.classload.initialization.passiveReference.SubClass
 * source: file:/Users/jasper/code/java/person/learnJava/basic/jvm/build/classes/java/main/

 */
public class Test {
    public static void main(String[] args) {
        // 输出：SuperClass init! 
        // 注意：并没有输出 SubClass init!
        System.out.println(SubClass.value); 
    }
}
```

### 通过数组定义来引用类

创建一个类型的数组时，不会触发该类型的初始化。JVM 实际上会创建一个由 newarray 指令触发的、专门用于存储该类型的包装类（如 [Lcom.example.User）。
```java
    /**
     * 通过数组定义来引用类 不会触发初始化
     */
    public class NotInitialization {
        public static void main(String[] args) {
            final SuperClass[] superClasses = new SuperClass[10];
            System.out.println("数组的类名: " + superClasses.getClass().getName());
            //数组的类名: [Lcom.jasper.classload.initialization.passiveReference.SuperClass;
        }
    }
```


### 常量

```java
/**
 * 常量在编译阶段会存入调用类的常量池中，本质上已经脱离了原有的类。因此，调用该常量时，不需要初始化定义常量的类
 */
class ConstClass {
    static { System.out.println("ConstClass init!"); }
    public static final String HELLO_WORLD = "hello world";
}

public class Test {
    public static void main(String[] args) {
        // 不会输出 ConstClass init!
        System.out.println(ConstClass.HELLO_WORLD);
    }
}
```
