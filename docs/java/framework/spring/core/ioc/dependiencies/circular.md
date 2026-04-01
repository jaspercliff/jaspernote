# 循环依赖 

通过 setter 方法而非构造函数进行配置。或者，避免使用构造函数注入，而只使用 setter 方法注入。换句话说，虽然不推荐，但可以使用 setter 方法注入来配置循环依赖

Relying upon circular references is discouraged and they are prohibited by default. Update your application to remove the dependency cycle between beans. As a last resort, it may be possible to break the cycle automatically by setting spring.main.allow-circular-references to true.


## 2种解决方法

- 使用字段注入 spring.main.allow-circular-references = true
- 使用@lazy 在其中一个构造参数上加上 @Lazy。它会告诉spring：“你先给我弄个假代理占个位，
等我真正用到这个对象时，你再去容器里找,相当于绕开循环依赖 


## 三级缓存 

```java
	/** Cache of singleton objects: bean name to bean instance. */
	private final Map<String, Object> singletonObjects = new ConcurrentHashMap<>(256);

	/** Creation-time registry of singleton factories: bean name to ObjectFactory. */
	private final Map<String, ObjectFactory<?>> singletonFactories = new ConcurrentHashMap<>(16);

	/** Cache of early singleton objects: bean name to bean instance. */
	private final Map<String, Object> earlySingletonObjects = new ConcurrentHashMap<>(16);
```

- 一级缓存 (singletonObjects)：存放完全初始化好的 Bean。可以直接给其它对象使用。
- 二级缓存 (earlySingletonObjects)：存放半成品（尚未填充属性）的 Bean。主要用于检测循环依赖。
- 三级缓存 (singletonFactories)：存放 ObjectFactory（Bean 工厂对象）。它是解决问题的关键“钩子”。

如果只是单纯的循环依赖，两层确实够了；但如果涉及 AOP，两层就玩不转了

### ObjectFactory

ObjectFactory 是一个用于延迟获取 Bean 的工厂接口，
在 Spring 三级缓存中用于提前暴露 Bean 的创建能力。

由于 Bean 在初始化完成前，无法确定是否需要 AOP 代理，
因此 Spring 不直接暴露 Bean 实例，而是通过 ObjectFactory，
在依赖注入时调用 getObject() 方法，
动态决定返回原始对象还是代理对象，

ObjectFactory 每次调用可能返回不同对象，因此需要二级缓存来保存第一次生成的早期引用，

保证在循环依赖过程中：
1. 代理对象只创建一次
2. 所有依赖方拿到的是同一个实例



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

在 Bean 提前暴露时，还没执行 BeanPostProcessor，
无法确定是否需要 AOP 代理。

### 三级缓存 

1. A 实例化：

    操作：Spring new 出原始对象 A 后，立刻把一个 ObjectFactory（工厂）放入三级缓存。

    逻辑：这个工厂里存的是一段代码：“如果有人来三级缓存找 A，我就去判断 A 是否需要代理。需要就给代理，不需要就给原始对象。”

    状态：此时 代理对象还不存在，只是存了一个“创建代理”的锦囊妙计。

2. B 初始化：

    操作：B 在填充属性时找 A，一二级缓存都没有，于是触发三级缓存里的工厂。

    逻辑：工厂被执行，内部调用 getEarlyBeanReference。因为 A 满足 AOP 条件，工厂现场生产出一个 Proxy(A) 返回给 B。

    结果：B 成功注入了 Proxy(A)。重点是：这个变身是受 B 逼迫而提前发生的。

3. 升入二级缓存：

    操作：工厂生产出 Proxy(A) 后，Spring 顺手把它存入二级缓存，并删掉三级缓存里的工厂。

    结果：如果后面还有个 C 依赖 A，C 直接从二级缓存拿这个 Proxy(A)。

    意义：保证了 A 在整个容器里的单例性（不会因为 B 和 C 都触发工厂而产生两个代理对象）。

4. A 最终完成：核对“变身记录”

    操作：A 走完自己的生命周期，到了该变身（AOP）的正常时间点。

    逻辑：Spring 检查记录：“A 刚才是不是已经为了 B 提前变身了？”

    结果：发现二级缓存里已经有 Proxy(A) 了。于是 A 不再重复创建代理，直接把二级缓存里的 Proxy(A) 挪到一级缓存（成品池）。
