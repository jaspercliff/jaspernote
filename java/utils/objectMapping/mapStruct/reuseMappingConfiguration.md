# reusing mapping configuration

方法级的配置注解@Mapping，@BeanMapping 可以继承到一个类似的方法

如果有多个方法可用作继承的源，则必须在注释中指定方法名称： @InheritConfiguration（ name = “carDtoToCar” ）。

```java

```
