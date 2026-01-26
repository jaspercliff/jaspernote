# SqlSessionUtils



```java
public static SqlSession getSqlSession(SqlSessionFactory sessionFactory,
                                       ExecutorType executorType,
                                       PersistenceExceptionTranslator exceptionTranslator) {
    // 尝试从 Spring 当前线程的事务中获取一个已存在的 SqlSessionHolder
    SqlSessionHolder holder = (SqlSessionHolder) TransactionSynchronizationManager.getResource(sessionFactory);

    if (holder != null && holder.isSynchronizedWithTransaction()) {
        return holder.getSqlSession();
    }

    // 否则，新建 SqlSession
    SqlSession session = sessionFactory.openSession(executorType);

    if (TransactionSynchronizationManager.isSynchronizationActive()) {
        // 注册同步（即事务同步）
        SqlSessionHolder newHolder = new SqlSessionHolder(session);
        TransactionSynchronizationManager.bindResource(sessionFactory, newHolder);
    }

    return session;
}
```