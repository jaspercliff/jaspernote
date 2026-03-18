# pillars 

## encapsulation

利用抽象数据类型将数据和对数据的操作封装在一起，用户不需要知道对象内部的操作，但是可以通过对象提供的对外接口访问该对象
- advantage
- 减少耦合 独立的开发 测试 使用
- 提高软件的可重用性

## extends

cat extends Animal 可以获得animal的非private属性和方法

``` java
Animal animal = new Dog()
```

遵循里氏代换原则，子类对象可以替换掉所有父类对象

## polymorphism

不同的对象对同一消息作出不同的响应

- 编译时多态
    - overloading
    - 方法的重载
- 运行时多态(父类引用指向子类对象)
    - extends override 向上转型
    - 定义的对象引用 在运行期间才能确定具体的类型
