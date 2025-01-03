# singleton
单例模式是一种常用的设计模式，它确保一个类只有一个实例，并提供一个全局访问点来获取这个实例。单例模式在很多场景下都非常有用，比如配置管理、线程池、缓存等，因为这些场景下通常只需要一个实例就足够了，无需创建多个实例。

单例模式主要有两种实现方式：懒汉式和饿汉式。

### 饿汉式

饿汉式单例在类加载时就立即初始化，并且创建单例对象。

- **优点**：没有加锁，执行效率会提高。
- **缺点**：类加载时就初始化，没有达到懒加载的效果。如果自始至终从未使用过这个实例，则会造成内存的浪费。

```java
public class Singleton {
    // 在自己内部定义自己一个实例，是不是很奇怪？
    // 注意这是private只供内部调用
    private static Singleton instance = new Singleton();
    
    // 构造器私有化，外部无法直接使用new创建对象
    private Singleton() {}
    
    // 这里提供了一个供外部访问本类实例的静态方法，可以直接访问
    public static Singleton getInstance() {
        return instance;
    }
}
```

### 懒汉式

懒汉式单例在第一次被引用时，才会创建实例。

- **优点**：达到了懒加载的效果，如果没有使用过这个实例，则不会创建实例。
- **缺点**：必须处理好多线程并发访问的问题，特别是在创建单例实例时，需要进行线程同步。

```java
public class Singleton {
    private static Singleton instance;
    
    private Singleton() {}
    
    public static synchronized Singleton getInstance() {
        if (instance == null) {
            instance = new Singleton();
        }
        return instance;
    }
}
```

### 双重检查锁定(Double-Check Locking)

为了解决懒汉式的线程安全问题，同时保证单例对象的唯一性和程序执行效率，可以使用双重检查锁定模式。
(为了避免每次访问实例时都进行同步，双重检查加锁模式首先检查实例是否已经创建，如果尚未创建，才进行同步。这就是“双重检查”的含义：第一次检查是在同步块外部，第二次检查是在同步块内部)

```java
public class Singleton {
    // 使用volatile关键字保其顺序性
    private volatile static Singleton instance;
    
    private Singleton() {}
    
    public static Singleton getInstance() {
        if (instance == null) {
            synchronized (Singleton.class) {
                if (instance == null) {
                    instance = new Singleton();
                }
            }
        }
        return instance;
    }
}
```
[volatile](../java/thread/volatile.md)

### synchronized作用的比较
- 同步方法（第一个示例）的synchronized确保了线程安全，但每次访问getInstance()都需要进行同步，这在实例已经存在之后仍然会导致性能开销。
- 双重检查锁定（第二个示例）中的synchronized仅在实例尚未创建并且有创建实例的需要时才会被执行，减少了获取锁的次数，提高了效率。volatile关键字防止了指令重排序，保证了安全性。
### 枚举方式

Java枚举（Enum）也是实现单例的一种最简洁方法。

```java
public enum Singleton {
    INSTANCE;
    
    public void whateverMethod() {
    }
}
```

每种方式都有其适用的场景。饿汉式和枚举方式简单且线程安全，但可能会导致资源的浪费；懒汉式和双重检查锁定方式实现了懒加载，但实现相对复杂，特别是双重检查锁定方式还需要考虑JVM底层模型。
## 应用场景
单例模式在软件开发中有广泛的应用，尤其是在需要控制资源访问或保持状态一致性的场景中。以下是一些单例模式的实际应用示例：

### 1. 配置管理

在应用程序中，通常会有一份或多份配置文件，包含了数据库连接信息、应用参数等。使用单例模式来管理这些配置信息可以确保整个应用中有一个统一的配置访问点，避免了配置信息的重复加载，同时保证了配置信息的一致性。

### 2. 日志记录

日志记录是几乎每个应用都需要的功能，用于记录应用的运行情况、错误信息等。通过单例模式创建一个日志记录器，可以确保全局只有一个日志记录实例，这样可以统一管理日志的配置和访问，同时也便于实现日志文件的写入控制和性能优化。

### 3. 数据库连接池

数据库连接是一种稀缺资源，创建和销毁数据库连接都是开销较大的操作。通过单例模式实现的数据库连接池可以复用数据库连接，减少数据库连接的创建和销毁次数，提高应用性能，同时保证了数据库连接管理的集中和一致。

### 4. 系统服务对象

在操作系统或框架级别的服务对象，如Windows的剪贴板服务或Android的系统服务（比如位置服务、通知服务等），通常也会采用单例模式实现。这些服务在整个系统或应用中都是唯一的资源，通过单例模式可以方便地在任何地方访问这些服务，而无需重复创建对象或传递引用。

### 5. 硬件接口访问

对于硬件资源的访问，如打印机控制、串口通信等，通常也会使用单例模式来管理，因为这些硬件资源在任何时刻都只能被有限地访问。单例模式可以防止对硬件资源的冲突访问，保证硬件资源的正确管理和使用。

### 注意事项

虽然单例模式有其适用场景，但也存在一些缺点，如可能导致系统内部耦合度增高，难以扩展，以及在多线程环境下可能会遇到线程安全问题。因此，在使用单例模式时需要仔细考虑其适用性，并采取适当的措施（如使用线程安全的实现方式）来避免潜在的问题。

## learn
springboot的bean默认是单例的
https://docs.spring.io/spring-framework/reference/core/beans/factory-scopes.html#beans-factory-scopes-singleton
