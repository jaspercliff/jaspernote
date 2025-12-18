# 事务失效的场景

- 非public方法  事务管理基于aop动态代理，只能拦截public的方法
- 异常被内部catch spring只有捕获到异常，才会回滚
- 传播行为设置不对 never not_support
- 多线程调用 事务是与线程绑定的，使用threadlocal存储事务上下文
- 类的内部方法自调用：非事务方法调用事务方法，a method invoke b method

```java
    public void deleteUserNoTransaction() {
        removeById(1);
        this.addUserTransaction(); //spring是以代理处理事务的，这里调用相当于使用this调用了
    }

    @Transactional
    public void addUserTransaction(){
        Users users = new Users();
        users.setId(1);
        users.setUsername("jasper");
        users.setPassword("111111");
        save(users);
        int a = 3/0; //这里事务不会回滚
    }


```

外部调用： 当你在 Controller 中调用deleteUserNoTransaction时，拿到的是 Spring 提供的代理对象。
代理对象会先开启事务，然后再去调用原始对象的 deleteUserNoTransaction。

内部自调用： 当你调用 deleteUserNoTransaction() 时，由于 deleteUserNoTransaction 没加事务，你进入了原始对象。
在 deleteUserNoTransaction 内部调用 addUserTransaction() 时，JVM 使用的是 this.addUserTransaction()。

结果： this 指向的是原始对象本身，而不是 Spring 代理。它直接跳过了“开启事务”的切面逻辑，所以 @Transactional 就成了摆设。

---
解决方案

1. 移到别的service
2. 自注入 需要开启循环依赖 或者使用@Lazy注解延迟加载，防止循环依赖
3. 使用AopContext.currentProxy() 强行找回代理
4. 使用编程式事务

## 类的内部自调用

### 自注入

```java
    @Lazy // 延迟加载，防止循环依赖
    @Resource
    private  UsersServiceImpl self;

    public void deleteUserNoTransaction1() {
        removeById(1);
        // // 使用注入的 self（它是代理对象）来调用  使用lazy来解决循环依赖，
        self.addUserTransaction();
    }

    @Transactional
    public void addUserTransaction(){
        Users users = new Users();
        users.setId(1);
        users.setUsername("jasper");
        users.setPassword("111111");
        save(users);
        int a = 3/0; //这里事务不会回滚
    }
```

### AopContext

引入依赖

```xml
        <dependency>
            <groupId>org.aspectj</groupId>
            <artifactId>aspectjweaver</artifactId>
        </dependency>
```

```java
@SpringBootApplication
@MapperScan("com.jasper.springDemo.mapper")
@EnableAspectJAutoProxy(exposeProxy = true) //必须开启
public class SpringDemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(SpringDemoApplication.class, args);
    }

}
```

```java
    public void deleteUserNoTransaction2() {
        removeById(1);
        // 使用AopContext强行找回代理
        UsersServiceImpl usersService = (UsersServiceImpl)AopContext.currentProxy();
        usersService.addUserTransaction();
    }
```

### 使用编程式事务

```java
    public void deleteUserNoTransaction3() {
        removeById(1);
        Boolean flag = transactionTemplate.execute(status -> {
            try {
                addUserTransaction();
                return true; // 这里只是一个返回，不会影响事务的提交和回滚
            } catch (ArithmeticException e) {
                // 当你的代码块（Lambda 表达式）执行完毕返回时，Spring 的事务管理器会检查这个 status。
                // 如果发现被标记了 RollbackOnly，它才会真正去调用数据库的回滚指令,推荐使用，让spring去手动管理这个事务
                status.setRollbackOnly();
                return false;
            }
        });
        if (Boolean.FALSE.equals(flag)) {
            System.out.println("delete is done,but cat't add");

        }
    }
```
