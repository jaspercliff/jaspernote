# 循环依赖 

通过 setter 方法而非构造函数进行配置。或者，避免使用构造函数注入，而只使用 setter 方法注入。换句话说，虽然不推荐，但可以使用 setter 方法注入来配置循环依赖

Relying upon circular references is discouraged and they are prohibited by default. Update your application to remove the dependency cycle between beans. As a last resort, it may be possible to break the cycle automatically by setting spring.main.allow-circular-references to true.


## 解决方法 

- 使用字段注入 spring.main.allow-circular-references = true
- 使用@lazy 在其中一个构造参数上加上 @Lazy。它会告诉spring：“你先给我弄个假代理占个位，
等我真正用到这个对象时，你再去容器里找


## 三级缓存 

```java
	/** Cache of singleton objects: bean name to bean instance. */
	private final Map<String, Object> singletonObjects = new ConcurrentHashMap<>(256);

	/** Creation-time registry of singleton factories: bean name to ObjectFactory. */
	private final Map<String, ObjectFactory<?>> singletonFactories = new ConcurrentHashMap<>(16);

	/** Cache of early singleton objects: bean name to bean instance. */
	private final Map<String, Object> earlySingletonObjects = new ConcurrentHashMap<>(16);
```

一级缓存 (singletonObjects)：存放完全初始化好的 Bean。可以直接给其它对象使用。
二级缓存 (earlySingletonObjects)：存放半成品（尚未填充属性）的 Bean。主要用于检测循环依赖。
三级缓存 (singletonFactories)：存放 ObjectFactory（Bean 工厂对象）。它是解决问题的关键“钩子”。

如果只是单纯的循环依赖，两层确实够了；但如果涉及 AOP，两层就玩不转了

### 二级缓存 只存原始对象

假设二级缓存 earlySingletonObjects 只存刚 new 出来的 A。

1. A 实例化：把原始对象 A 放入二级缓存。
2. B 初始化：B 注入了二级缓存里的原始对象 A。
3. A 填充属性完毕：开始执行 AOP 逻辑，生成了代理对象 Proxy(A)。
4. 结果：B 持有的是原始对象 A，但容器最终交给用户的是 代理对象 Proxy(A)。

### 二级缓存直接存“代理对象”

A 刚 new 出来时，就直接不管三七二十一，先做个代理放进二级缓存

1. A 实例化：立刻判断 A 是否需要 AOP，创建 Proxy(A) 放入二级缓存。
2. B 初始化：B 注入了 Proxy(A)，没问题。
3. 结果：虽然逻辑通了，但破坏了 Spring 的核心设计原则。

Spring 的设计直觉是：Bean 应该先是一个完整的普通对象（填充属性、执行 init 方法），最后才被包装成代理。如果还没填充属性就变代理，流程就乱了

性能浪费：绝大多数 Bean 是不需要代理的。如果只有两级缓存且要支持代理，Spring 每次创建 Bean 都要在初期去扫描一遍这个 Bean 是否需要代理，这会极大地拖慢启动速度

### 三级缓存有aop 

1. 实例化 A：Spring new 出了 A 的原始对象。
2. 存入三级缓存：把 A 包装进 ObjectFactory。
    此时工厂里的逻辑是：如果有人要 A，我就直接把这个原始对象 A 丢出去。
3. A 填充属性：发现需要 B，去创建 B。

