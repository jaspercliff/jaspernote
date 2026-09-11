# bean lifecycle 

```text 
BeanDefinition
    ↓
实例化 Instantiation
    ↓
属性赋值 Populate
    ↓
Aware 接口回调
    ↓
BeanPostProcessor.before
    ↓
初始化 Initialization
    ├── @PostConstruct
    ├── InitializingBean.afterPropertiesSet()
    └── init-method
    ↓
BeanPostProcessor.after
    ↓
Bean 创建完成
    ↓
使用 Bean
    ↓
容器关闭
    ↓
销毁 Destruction
    ├── @PreDestroy
    ├── DisposableBean.destroy()
    └── destroy-method
```


## 1 BeanDefinition 加载 

读取bean的定义,定义如何创建一个bean

BeanDefinition  -> 注册 BeanDefinitionRegistry 根据定义创建 Bean  ->BeanFactory

Bean 类型
Bean 名称
作用域
构造方法
属性
初始化方法
销毁方法

## 2 实例化 

执行构造方法 

## 3 属性赋值 

对象创建出来以后，Spring 给 Bean 注入依赖  
AutowiredAnnotationBeanPostProcessor

## 4 aware 接口回调 

如果 Bean 实现了某些 Aware 接口，Spring 会把相关容器对象注入进去
让 Bean 主动拿到 Spring 容器内部对象

## 5 BeanPostProcessor.before


BeanPostProcessor 是 Spring 提供的 Bean 生命周期扩展机制，可以在 Bean 初始化前后对 Bean 进行处理，甚至把原 Bean 包装成代理对象后返回

会执行 postProcessBeforeInitialization()

扩展 / 修改 / 包装 Bean  aop transaction

## 6 初始化 

@PostConstruct

InitializingBean  init-method


## 7 BeanPostProcessor.after


## 8 bean 放入容器 

aop 代理也是这里 

## 9 bean 销毁 

@PreDestroy
DisposableBean
destroy-method
