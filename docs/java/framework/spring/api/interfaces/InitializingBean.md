# InitializingBean

`InitializingBean` 是 Spring 提供的一个接口，定义如下：

```java
public interface InitializingBean {
    void afterPropertiesSet() throws Exception;
}
```

---

### 作用

如果一个 Bean 实现了 `InitializingBean` 接口，当 Spring 容器完成 **所有属性的注入** 后，会自动调用其
`afterPropertiesSet()` 方法。通常用于执行一些 **初始化逻辑**，比如：

- 检查配置项是否为空
- 加载文件、资源或缓存
- 启动定时任务或线程池

---

### 🧠 使用场景示例

```java

@Component
public class MyService implements InitializingBean {

    @Autowired
    private MyDependency dependency;

    @Override
    public void afterPropertiesSet() throws Exception {
        // 此处 dependency 一定已注入
        System.out.println("所有属性注入完毕，开始初始化！");
    }
}
```

---

### ⚠️ 与 `@PostConstruct` 对比

| 特性          | InitializingBean            | `@PostConstruct` |
|-------------|-----------------------------|------------------|
| 所属          | Spring 接口                   | JSR-250 标准注解     |
| 可用于抽象类或接口实现 | ✅ 是                         | ❌ 不可             |
| 可多个方法       | ❌ 只能一个 `afterPropertiesSet` | ✅ 可注解多个不同方法      |
| 可用性         | Spring 专属                   | 通用，可用于其他容器       |

---

## rocketmq dashboard 源码
```java
package org.apache.rocketmq.dashboard.service.impl;

import org.apache.rocketmq.dashboard.config.RMQConfigure;
import org.apache.rocketmq.dashboard.exception.ServiceException;
import org.apache.rocketmq.dashboard.model.User;
import org.apache.rocketmq.dashboard.service.UserService;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.validation.constraints.NotNull;
import java.io.FileReader;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class UserServiceImpl implements UserService, InitializingBean {
    @Resource
    private RMQConfigure configure;

    private FileBasedUserInfoStore fileBasedUserInfoStore;

    @Override
    public User queryByName(String name) {
        return fileBasedUserInfoStore.queryByName(name);
    }

    @Override
    public User queryByUsernameAndPassword(String username, String password) {
        return fileBasedUserInfoStore.queryByUsernameAndPassword(username, password);
    }

    @Override
    public void afterPropertiesSet() throws Exception {
//        如果需要登录则去加载用户信息等
        if (configure.isLoginRequired()) {
            fileBasedUserInfoStore = new FileBasedUserInfoStore(configure);
        }
    }

    public static class FileBasedUserInfoStore extends AbstractFileStore {
        private static final String FILE_NAME = "users.properties";

        private static Map<String, User> userMap = new ConcurrentHashMap<>();

        public FileBasedUserInfoStore(RMQConfigure configure) {
            super(configure, FILE_NAME);
        }

        @Override
        public void load(InputStream inputStream) {
            Properties prop = new Properties();
            try {
                if (inputStream == null) {
                    prop.load(new FileReader(filePath));
                } else {
                    prop.load(inputStream);
                }
            } catch (Exception e) {
                log.error("load user.properties failed", e);
                throw new ServiceException(0, String.format("Failed to load loginUserInfo property file: %s", filePath));
            }

            Map<String, User> loadUserMap = new HashMap<>();
            String[] arrs;
            int role;
            for (String key : prop.stringPropertyNames()) {
                String v = prop.getProperty(key);
                if (v == null)
                    continue;
                arrs = v.split(",", 2);
                if (arrs.length == 0) {
                    continue;
                } else if (arrs.length == 1) {
                    role = 0;
                } else {
                    role = Integer.parseInt(arrs[1].trim());
                }

                loadUserMap.put(key, new User(key, arrs[0].trim(), role));
            }

            userMap.clear();
            userMap.putAll(loadUserMap);
        }

        public User queryByName(String name) {
            return userMap.get(name);
        }

        public User queryByUsernameAndPassword(@NotNull String username, @NotNull String password) {
            User user = queryByName(username);
            if (user != null && password.equals(user.getPassword())) {
                return user.cloneOne();
            }
            return null;
        }
    }
}

```