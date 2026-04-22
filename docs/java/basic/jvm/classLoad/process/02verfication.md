# 验证 

1. 文件格式验证 
  - 是否以0xcaffebabe 开头  xxd(binary -> hexadecimal) helloworld.class
  - 主次版本号jvm是否接收 javap -verbose  Helloworld.class   8 ->52
  - ...
2. 元数据验证
  - 是否继承了不存在的类
  - 是否实现了不存在的接口
  - 是否违反 Java 语义规则：
      * final 类不能被继承
      * final 方法不能被重写
      * 抽象类是否实现了所有方法
3. 字节码验证
  - 代码执行过程中 类型安全和栈安全
4. 符号引用验证
  - 方法、字段是否存在
  - ... 

