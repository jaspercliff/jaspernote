# 超卖和一人一单

高并发场景下超卖,库存=1时，多个线程同时判断 stock =1 >0  同时去调用数据库的扣减库存,导致超卖

```java
        // update stock 这样是在内存中扣减在去执行的 就会变成少卖了
        // seckillVoucher.setStock(seckillVoucher.getStock()-1);
        // boolean isSuccess = seckillVoucherService.updateById(seckillVoucher);

        // 数据库原子性扣减，java只是调用，数据库更新时会有行锁(有索引就只锁当前行，没有索引会锁整个表）
        boolean isSuccess = seckillVoucherService.lambdaUpdate()
                .setSql("stock = stock - 1")
                .eq(SeckillVoucher::getVoucherId, voucherId)
                .update();
```

## 超卖

### 悲观锁

- synchronized
- lock

### 乐观锁

判断之前查询的数据有没有被修改过,缺点成功率太低

---

版本号方法

线程1  stock = 1 version = 1
判断stock>0,修改库存

```sql
set stock = stock -1,version = version+1 
    where id = ${id} and version = 1 
```

线程2  stock = 1 version = 1
判断stock>0,修改库存

```sql
set stock = stock -1,version = version+1 
    where id = ${id} and version = 1 
# 此时version已经被更新为2了 所以不会更新
```

---
CAS compare and set 方法
线程1  stock = 1
判断stock>0,修改库存

```sql
set stock = stock -1
    where id = ${id} and stock = 1 
```

线程2  stock = 1
判断stock>0,修改库存

```sql
set stock = stock -1,
where id = ${id} and stock = 1 
# 此时stock已经被更新为0了 所以不会更新
```

```java
        boolean isSuccess = seckillVoucherService.lambdaUpdate()
                .setSql("stock = stock - 1")
                .eq(SeckillVoucher::getVoucherId, voucherId)
                .eq(SeckillVoucher::getStock,seckillVoucher.getStock())
                .update();
```

---

## 一人一单

判读订单表有没有数据，大于0就抛异常，高并发场景下判断大于0的操作可能同时进行，判断的都是没有大于0，最终多单，加分布式锁
