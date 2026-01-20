# pojo

POJO（Plain 简单的 Old 普遍的 Java Object）是指普通的、简单的Java对象，它不依赖于任何特定的框架或库。POJO通常用于表示数据模型，
可以包含属性和相应的getter/setter方法。POJO的概念比较广泛，它可以用来表示各种类型的对象。

DO（Data Object）、VO（Value Object）、DTO（Data Transfer Object）等都是POJO的具体应用，但它们各自有不同的用途和特点：

1. **DO (Data Object)**: 通常用于表示数据库中的表结构，与数据库表一一对应。DO主要用于持久层，负责与数据库进行交互。

2. **VO (Value Object)**: 通常用于表示业务逻辑中的值对象，主要用于展示层，封装了需要展示的数据。

3. **DTO (Data Transfer Object)**: 用于在不同层之间传输数据，特别是在分布式系统中，DTO可以减少网络传输的数据量，提高性能。

4. **BO (Business Object)**: 用于表示业务对象，通常包含业务逻辑和数据。

5. **PO (Persistent Object)**: 与DO类似，也是用于表示数据库中的表结构，但更强调持久化操作。

6. **AO (Access Object)**: 用于封装对数据库的访问操作，类似于DAO（Data Access Object）。
