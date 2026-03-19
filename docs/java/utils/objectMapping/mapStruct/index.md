# mapStruct 

## beanUtil.copyProperties会有什么问题

- 使用反射，如果大量属性的复制，会有性能问题
- 类型转换的限制，不能将String转换为Date
- transient字段和静态字段不会被复制
- 执行的是浅拷贝，原对象的某个属性是对象引用或者集合，目标对象会得到该对象或者集合的引用，而不是副本，会导致意外的副作用

mapStruct 用于实现javaBean的转换，只需要创建接口，在编译时会自动生成具体的映射实现





- [复杂映射](complexMapping.md) 
- [reuseMappingConfiguration](reuseMappingConfiguration.md)
- [qualified](qualifiedBy.md) 

# problem 

生成的代码没有新加的某个字段，需要rebuild项目
