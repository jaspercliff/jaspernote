# 工厂方法模式

GoF 23种设计模式之一。将对象的创建延迟到子类，定义一个用于创建对象的接口，由子类决定实例化哪一个类。
•	特点：符合开闭原则，扩展性好，每新增一个产品都需要一个新的工厂类。
•	示例：CircleFactory implements ShapeFactory，调用 circleFactory.createShape() 创建对象。


用户不需要知道类的具体实现细节，直接使用工厂方法创建对象就行



```java
package com.jasper.creational.factory.factoryMethod;

import com.jasper.creational.factory.simpleFactory.Shape;

interface ShapeFactory {
    Shape createShape();
}

```
```java
package com.jasper.creational.factory.factoryMethod;

import com.jasper.creational.factory.simpleFactory.Circle;
import com.jasper.creational.factory.simpleFactory.Shape;

public class CircleFactory implements ShapeFactory {

    @Override
    public Shape createShape() {
        return new Circle();
    }
}

```
```java
package com.jasper.creational.factory.factoryMethod;

import com.jasper.creational.factory.simpleFactory.Shape;
import com.jasper.creational.factory.simpleFactory.Square;

public class SquareFactory implements ShapeFactory{
    @Override
    public Shape createShape() {
        return new Square();
    }
}
```
```java
package com.jasper.creational.factory.factoryMethod;

import com.jasper.creational.factory.simpleFactory.Shape;

public class FactoryMethodDemo {
    public static void main(String[] args) {
        ShapeFactory circleFactory = new CircleFactory();
        Shape circle = circleFactory.createShape();
        circle.draw();

        ShapeFactory squareFactory = new SquareFactory();
        Shape square = squareFactory.createShape();
        square.draw();
    }
}

```