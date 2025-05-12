# 简单工厂模式

又叫静态工厂方法模式，不属于 GoF 的23种设计模式之一，但常作为工厂模式的入门。通过一个工厂类，根据提供的参数决定创建哪一个具体类的实例。
•	特点：逻辑集中，新增产品时需要修改工厂类代码（违背开闭原则）。
•	示例：ShapeFactory.createShape("circle")

```java
package com.jasper.creational.factory.simpleFactory;

public interface Shape {
    void draw();
}
```
```java
package com.jasper.creational.factory.simpleFactory;

public class Circle implements Shape{
    @Override
    public void draw() {
        System.out.println("circle");
    }
}
```
```java
package com.jasper.creational.factory.simpleFactory;

public class Square implements Shape {
    @Override
    public void draw() {
        System.out.println("Square");
    }
}

```
```java
package com.jasper.creational.factory.simpleFactory;

/**
 *  根据提供的参数决定创建哪一个类
 *  新增产品时 需要修改产品工厂 违反了开闭原则
 */
public class ShapeFactory {
    public static Shape getShape(String shapeType){
        if(shapeType.equalsIgnoreCase("CIRCLE")){
            return new Circle();
        } else if(shapeType.equalsIgnoreCase("SQUARE")){
            return new Square();
        }
        return null;
    }
}

```
```java
package com.jasper.creational.factory.simpleFactory;

public class SimpleFactoryDemo {
    public static void main(String[] args) {
        Shape circle = ShapeFactory.getShape("CIRCLE");
        assert circle != null;
        circle.draw();
        Shape square = ShapeFactory.getShape("SQUARE");
        assert square != null;
        square.draw();
    }
}

```