# templateMethod 模版方法模式

模版方法模式（Template Method Pattern）是一种行为型设计模式，
它定义了一个操作的算法骨架，并允许子类在不改变算法结构的情况下**重新定义算法中的某些步骤**。
这种模式将不变的行为封装在父类中，而将可变的行为留给子类实现。

`带final的模版方法+子类必须实现的抽象方法+钩子方法`
## 一、结构组成

模板方法模式主要包含以下角色：

1. **抽象类（AbstractClass）**
    - 定义了一个模板方法，作为算法的主干，封装了若干步骤。
    - 某些步骤由自身实现，某些步骤延迟到子类实现（抽象方法或钩子方法）。

2. **具体子类（ConcreteClass）**
    - 实现抽象类中定义的抽象方法，完成算法中的具体可变部分。 
3. 钩子方法（Hook Method） 是一种可选的扩展点，允许子类在模板的流程中**“插一脚”，根据需要定制部分行为或控制流程是否继续执行**

## 代码

[代码示例](https://github.com/jaspercliff/javaLearn/blob/7aeef4c4cdded5ccf858007029bf4ee567cdcbde/designPattern/src/main/java/com/jasper/behavioral/templateMethod/TemplateMethodDemo.java)

```java
package com.jasper.behavioral.templateMethod;

public abstract class Beverage {
    public final void BeverageTemplate() {
        boilWater();
        brew();
        pourInCup();
        if (customAddCondiments()){
            addCondiments();
        }
    }

//    公共操作
    private void boilWater() {
        System.out.println("Boiling water");
    }
    private void pourInCup() {
        System.out.println("Pouring into cup");
    }

    /**
     * Determines if custom condiments(调味品) should be added to the beverage(饮料).
     * Hook method ，子类可以选择性覆盖
     * @return true if custom condiments are to be added, false otherwise
     */
    protected boolean customAddCondiments() {
        return true;
    }

    /**
     * 基本操作，子类必须实现的方法
     */
    protected abstract void brew();
    protected abstract void addCondiments();
}
```
```java
package com.jasper.behavioral.templateMethod;

public class Coffee extends Beverage{
    @Override
    protected void brew() {
        System.out.println("用沸水冲泡咖啡粉");
    }

    @Override
    protected void addCondiments() {
        System.out.println("加入sugar和milk");
    }


}
```
```java
package com.jasper.behavioral.templateMethod;

public class Tea extends Beverage{

    private final boolean like;

    public Tea(boolean like){
        this.like = like;
    }
    @Override
    protected void brew() {
        System.out.println("用沸水冲泡茶叶");
    }

    @Override
    protected void addCondiments() {
        System.out.println("加入柠檬");
    }

    @Override
    protected boolean customAddCondiments() {
        return like;
    }

}
```
```java
package com.jasper.behavioral.templateMethod;

public class Tea extends Beverage{

    private final boolean like;

    public Tea(boolean like){
        this.like = like;
    }
    @Override
    protected void brew() {
        System.out.println("用沸水冲泡茶叶");
    }

    @Override
    protected void addCondiments() {
        System.out.println("加入柠檬");
    }

    @Override
    protected boolean customAddCondiments() {
        return like;
    }

}
//制作coffee=========
//Boiling water
//用沸水冲泡咖啡粉
//Pouring into cup
//        加入sugar和milk
//制作tea=========
//Boiling water
//用沸水冲泡茶叶
//Pouring into cup
//制作tea========
//Boiling water
//用沸水冲泡茶叶
//Pouring into cup
//        加入柠檬
```