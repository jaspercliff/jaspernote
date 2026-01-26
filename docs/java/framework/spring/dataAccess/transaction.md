# transaction

在 Spring 中，事务管理有两种主要方式：**声明式事务（Declarative Transaction Management）
**和**编程式事务（Programmatic Transaction Management）**

---

## 声明式事务（Declarative Transaction）

**定义：** 使用注解或 XML 配置来声明事务边界，无需手动编写事务控制代码。

### 🔧 使用方式（基于注解）

spring项目时需要配置 需要显式加上 @EnableTransactionManagement

```java

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public void createUser(User user) {
        userRepository.save(user);
        // 如果这里抛出异常，事务会自动回滚
    }
}
```

### 1优点

- 简洁、易维护。
- 解耦业务逻辑和事务控制。
- 推荐用于绝大多数业务场景。

### 1缺点

- 无法灵活地控制事务（如动态决定是否提交/回滚）。

---

## 编程式事务（Programmatic Transaction）

**定义：** 在代码中显式地获取 `TransactionStatus` 对象并控制事务的提交和回滚。

### 使用方式（基于 `PlatformTransactionManager`）

```java
package com.jasper.springDemo.service;

import com.jasper.springDemo.mapper.UserMapper;
import com.jasper.springDemo.pojo.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;

@Service
@RequiredArgsConstructor
public class UserService {

    private final PlatformTransactionManager transactionManager;
    private final UserMapper userMapper;

    public void createUser(User user) {
        TransactionStatus status = transactionManager.getTransaction(new DefaultTransactionDefinition());
        try {
            userMapper.save(user);
            int i = 3 / 0;
            transactionManager.commit(status);
        } catch (Exception ex) {
            transactionManager.rollback(status);
            throw ex;
        }
    }
}

```

更推荐下面这种，让spring去手动管理,上面需要手动管理每一个细节，适合需要高度自定义细节时，手动调用这些底层api

```java
        public void deleteUserNoTransaction3(){
            removeById(1);
            Boolean isSuccess = transactionTemplate.execute(status -> {
                try {
                    addUserTransaction();
                    return true; //这里只是一个返回，不会影响事务的提交和回滚
                } catch (ArithmeticException e) {
                    // 当你的代码块（Lambda 表达式）执行完毕返回时，Spring 的事务管理器会检查这个 status。
                    // 如果发现被标记了 RollbackOnly，它才会真正去调用数据库的回滚指令,推荐使用，让spring去手动管理这个事务
                    status.setRollbackOnly();
                    return false;
                }
            });
        }
```

### 优点

- 灵活控制事务行为（如根据条件手动回滚）。
- 适用于复杂事务逻辑（如多个数据源，部分失败重试等）。

### 缺点

- 代码冗长，业务逻辑和事务耦合。
- 容易出错，不易维护。

### DefaultTransactionDefinition

1. 传播行为（Propagation Behavior）：PROPAGATION_REQUIRED
2. 隔离级别（Isolation Level）：ISOLATION_DEFAULT
3. 超时时间（Timeout）：TIMEOUT_DEFAULT（即 -1，表示永不超时）
4. 只读标志（Read-Only）：false

### PlatformTransactionManager

PlatformTransactionManager 是 Spring 框架中用于统一管理事务的核心接口。它是所有事务管理器
（无论是 JDBC、JPA、Hibernate、MongoDB 等）的标准抽象，隐藏了不同数据访问技术的事务处理差异

### TransactionStatus

TransactionStatus 是 Spring 事务管理中的一个接口，用于表示当前事务的运行状态，它配合 PlatformTransactionManager
一起工作

- setRollbackOnly 标记事务为只能回滚，后续即使没有出现异常，事务提交时也会回滚      和直接rollback的区别就是。   该方法不会立刻回滚，事务仍然会继续执行

## 使用 TransactionTemplate

```java
private final TransactionTemplate transactionTemplate;

public void createUserTemplate(User user) {
    // 可以设置事务的属性，例如事务隔离级别，传播行为等
    this.transactionTemplate.setIsolationLevel(TransactionDefinition.ISOLATION_READ_COMMITTED);
    this.transactionTemplate.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
    transactionTemplate.execute(status -> {
        try {
            userMapper.save(user);
            int i = 3/0;
            // 这里可以添加其他的数据库操作
        } catch (Exception e) {
            // 如果发生异常，事务会自动回滚
            throw e;
        }
        return null; // 返回值可以是任何类型，这里返回 null
    });
}
```

transactionTemplate使用了[模板方法设计模式](/docs/patterns/behavioral/templateMethod.md)，自动帮你管理事务的生命周期（开启、提交、异常回滚、资源释放），你只需要关注业务逻辑
