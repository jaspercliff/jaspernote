---
sidebar_position: 1
---

# designPattern

## SOLID 五大设计原则

- [solid](./SOLID.md)

## 创建型 Creational

- [单例模式](./creational/singleton.md)
- [建造者模式](./creational/builder.md)
- [简单工厂(不属于Gof)](./creational/simpleFactory.md)     根据参数决定创建返回的类
- [工厂方法](./creational/factoryMethod.md)。             将创建类延迟到子类工厂
- [抽象工厂模式](./creational/abstractFactory.md)。        工厂创建一系列对象 abstract 创建 按钮 文本 创建类还是延迟到子类

## 结构型 Structural

该模式涉及到如何组合类和对象以获得更大的结构。

- [代理模式](./structural/proxy.md)

## 行为型 Behavioral

- [观察者模式](./behavioral/observer.md)
- [模版方法模式](./behavioral/templateMethod.md)
- [策略模式](./behavioral/strategy.md)

设计模式通常分为三大类。

简单工厂模式

1. 创建型模式（Creational Patterns）：
   这类模式与对象的创建机制有关，试图根据实际情况使用合适的方式创建对象。

   具体模式包括：
   - 工厂方法模式（Factory Method）
   - 抽象工厂模式（Abstract Factory）
   - 建造者模式（Builder）
   - 原型模式（Prototype）

2. 结构型模式（Structural Patterns）：
   - 适配器模式（Adapter）
   - 桥接模式（Bridge）
   - 组合模式（Composite）
   - 装饰器模式（Decorator）
   - 外观模式（Facade）
   - 享元模式（Flyweight）

3. 行为型模式（Behavioral Patterns）：
   这类模式涉及到对象之间的通信，以及算法和职责的分配。

   具体模式包括：
   - 观察者模式（Observer）
   - 策略模式（Strategy）
   - 命令模式（Command）
   - 状态模式（State）
   - 责任链模式（Chain of Responsibility）
   - 解释器模式（Interpreter）
   - 迭代器模式（Iterator）
   - 中介者模式（Mediator）
   - 备忘录模式（Memento）
   - 模板方法模式（Template Method）
   - 访问者模式（Visitor）

每种模式都有其特定的使用场景和优势：

- 创建型模式主要解决对象的创建问题，将对象的创建与使用分离。
- 结构型模式主要解决类或对象的组合或组装问题。
- 行为型模式主要解决类或对象之间的交互问题以及职责分配问题。

了解这些模式可以帮助开发者更好地设计软件，提高代码的可维护性、可扩展性和重用性。但需要注意的是，设计模式不是银弹，应该根据具体情况合理使用，避免过度设计。
