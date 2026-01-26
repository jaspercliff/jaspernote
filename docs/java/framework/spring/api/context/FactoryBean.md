# FactoryBean

`FactoryBean` 是 Spring 框架中的一个 **特殊 Bean 接口**，它不是用来表示一个普通的 Bean，
而是用来生产Bean的工厂。你可以通过它来自定义创建某个 Bean 的方式。

## 🧠 简单理解

通常我们定义的类（比如 `UserService`）是直接作为 Bean 注入的，但当你实现了 `FactoryBean<T>` 接口，这个类本身不会作为 Bean 注入，
而是用它的 `getObject()` 方法返回的对象才是最终注入容器的 **真正 Bean**。

## 📦 常见场景

| 场景      | 用途                                                           |
|---------|--------------------------------------------------------------|
| 复杂对象的创建 | 如动态代理、反射、第三方库对象等                                             |
| 需要延迟加载  | 控制实例化时机或初始化逻辑                                                |
| 框架级封装   | 比如 MyBatis 的 `MapperFactoryBean`、Spring AOP、Spring Data 等都用它 |

---

## 🧩 接口定义

```java
public interface FactoryBean<T> {
    T getObject() throws Exception;             // 返回实际要注入容器的 Bean 实例
    Class<?> getObjectType();                   // 返回 getObject() 返回对象的类型
    boolean isSingleton();                      // 是否是单例（容器中是否只创建一个 getObject 的实例）
}
```

---

## ✅ 示例

### 👇 假设你有一个特殊的 Bean 想手动控制实例化：

```java
public class MyConnection {
    public MyConnection() {
        System.out.println("MyConnection 初始化");
    }
}
```

### 👇 写一个 `FactoryBean` 来控制它的创建：

```java
public class MyConnectionFactoryBean implements FactoryBean<MyConnection> {
    @Override
    public MyConnection getObject() {
        System.out.println("通过 FactoryBean 创建 MyConnection 实例");
        return new MyConnection();
    }

    @Override
    public Class<?> getObjectType() {
        return MyConnection.class;
    }

    @Override
    public boolean isSingleton() {
        return true;
    }
}
```

### 👇 在配置类中注册：

```java
@Configuration
public class AppConfig {
    @Bean
    public MyConnectionFactoryBean myConnectionFactoryBean() {
        return new MyConnectionFactoryBean();
    }
}
```

---

## ❗️取 Bean 的时候注意：

```java
ApplicationContext ctx = new AnnotationConfigApplicationContext(AppConfig.class);

// 获取工厂创建的 Bean（MyConnection）
MyConnection conn = ctx.getBean("myConnectionFactoryBean", MyConnection.class);

// 如果你想获取工厂本身，要加 "&"
Object factory = ctx.getBean("&myConnectionFactoryBean");
```

---

## 🏗️ Spring 内部常用的 FactoryBean 示例：

| 案例                                       | 用途                               |
|------------------------------------------|----------------------------------|
| `ProxyFactoryBean`                       | 用于 AOP 动态代理                      |
| `SqlSessionFactoryBean`                  | MyBatis 用于创建 `SqlSessionFactory` |
| `MapperFactoryBean`                      | MyBatis 中创建 Mapper 接口代理类         |
| `LocalContainerEntityManagerFactoryBean` | JPA 中 EntityManagerFactory 的创建   |
| `ServiceLocatorFactoryBean`              | 实现服务定位模式的工厂                      |

---

## ✅ 总结

| 特点              | 描述                                        |
|-----------------|-------------------------------------------|
| 是一个工厂           | 实现了 `FactoryBean<T>` 接口的类，其返回的是 `T` 类型的对象 |
| 可以控制 Bean 的创建方式 | 用于创建复杂或第三方组件对象                            |
| 默认是单例           | 可以通过 `isSingleton()` 控制是否每次都创建新对象         |

---
