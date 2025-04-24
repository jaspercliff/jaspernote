# 锁及mvcc

## 锁

MySQL的InnoDB存储引擎实现了多种类型的锁定机制，以支持不同级别的事务隔离，并处理并发数据访问。
这些锁主要包括行级锁和表级锁，以及它们的不同工作方式。了解这些锁的工作原理对于优化数据库操作和防止数据竞争至关重要。下面详细介绍InnoDB的锁机制：

### 行级锁 (Row-Level Locks)

InnoDB存储引擎默认使用行级锁，这是其支持高并发操作的关键。行级锁有以下几种类型：

- **共享锁（S Locks）**：允许事务读取一行数据。如果其他事务已经持有对同一数据行的共享锁，那么新事务也可以获得共享锁。如果有其他事务持有排他锁，则共享锁请求将被阻塞。
- **排他锁（X Locks）**：允许事务更新或删除一行数据。如果其他任何事务持有对该数据行的锁（无论是共享锁还是排他锁），排他锁请求都会被阻塞。

共享锁（S Lock）：多个事务可以拥有一个共享锁，共享锁允许事务读取一行数据，但不允许修改。在 InnoDB 中，SELECT ... LOCK IN SHARE
MODE 语句会获取共享锁。
排他锁（X Lock）：一个事务拥有排他锁后，不允许其他事务对同一行数据加任何类型的锁，这样可以保证该事务能够读取和修改数据。在
InnoDB 中，SELECT ... FOR UPDATE 语句会获取排他锁。

### 间隙锁

**间隙锁（Gap Locks）**：锁定一个范围，但不包括记录本身。主要用于防止幻读，以确保范围查询的一致性。
T1 开始事务并锁定区间 [1, 200] 内的记录
```
START TRANSACTION;
SELECT *
FROM accounts
WHERE balance BETWEEN 100 AND 200 FOR
UPDATE;
```

在这个例子中，T1 请求了对 balance 在 100 到 200 之间的记录的排他锁。由于没有记录的 balance 值正好落在 100 到 200 之间，因此
T1 实际上并没有锁定任何具体的记录，但它会锁定这个范围内的所有间隙。
T2 尝试插入一条记录
```
START TRANSACTION;
INSERT INTO accounts (id, balance) VALUES (4, 150);
```
T2 试图插入一条新的记录，其中 balance 值为 150。这条记录位于 T1 已经锁定的区间内。 因为 T1 已经获取了间隙锁，所以 T2
的插入操作会被阻塞，直到 T1 提交或回滚事务。

### 自增锁 (AUTO-INC Locks)

InnoDB在处理自增长字段时，使用特殊的表级锁来管理对自增序列的访问，确保序列号的生成是连续且唯一的。

### 临键锁
- **临键锁（Next-Key Locks）**：是记录锁和间隙锁的组合，锁定一个范围和范围内的行记录。这是InnoDB默认的锁定策略，用于“可重复读”隔离级别下防止幻读。

### 锁的优化与管理

由于InnoDB使用多版本并发控制（MVCC）来管理不同事务的数据版本，所以即使在高并发环境下，读操作通常不需要显式的锁定，这极大地提高了性能。
然而，合理的索引和查询优化仍然是必要的，以避免不必要的锁竞争和提高查询效率。

## mvcc

MySQL的InnoDB存储引擎实现了多版本并发控制（MVCC），以支持高并发操作和事务隔离级别。MVCC通过保存数据在某个时间点的快照，
使得读操作可以访问历史版本的数据，从而实现非锁定读取，提高并发性能。

MySQL的InnoDB存储引擎通过多版本并发控制（MVCC）机制来实现事务的隔离性，尤其在高并发环境下保持了良好的性能和一致性。
InnoDB的MVCC实现是相当独特的，其工作原理涉及几个关键组件和概念，包括隐藏列、撤销日志（undo logs）、读视图（read
view）等。下面详细介绍这些组件和它们的工作方式：

### 隐藏列

InnoDB为每行数据添加了三个隐藏的系统列，这些列不对用户可见，但对MVCC的实现至关重要：

1. **DB_TRX_ID**：最近修改行的事务ID。
2. **DB_ROLL_PTR**：指向这行记录的**撤销日志记录(undo log)**的指针。该撤销日志包含了修改前的行版本，使得旧的事务能够看到一致的历史数据。
3. **DB_ROW_ID**：如果表没有定义主键，InnoDB会自动生成一个隐式的行ID用于行的唯一性标识。

### 撤销日志（Undo Logs）

撤销日志记录了事务发生之前的数据版本。当一个事务更新一行数据时，旧的数据版本会被存储在撤销日志中。这样，不同的事务就可以根据自己的隔离级别和开始时间，看到这个数据的适当历史版本。

### 读视图（Read View）

读视图是MVCC的核心组件之一，它定义了事务可以看到哪些版本的行记录。读视图包含以下几个关键元素：

- **活跃事务列表**：在读视图创建时，系统中所有活跃的（未提交的）事务列表。
- **上限和下限事务ID**：定义事务可以“看到”哪些行版本。事务只能看到在读视图创建前已提交的事务所做的更改。

### 数据版本的可见性规则

事务在读取每一行数据时，都会根据以下规则来检查这行数据的可见性：

1. 如果行的版本是由读视图中的活跃事务创建的，则该行对当前事务不可见。
2. 如果行的版本是在读视图创建之前创建的，则该版本对当前事务可见。
3. 如果行的版本在读视图创建后创建（由尚未提交的事务创建），则该版本对当前事务不可见。

### 隔离级别的实现

MVCC使得InnoDB可以在不同的隔离级别上运行，每个级别对数据的可见性有不同的规定：

- **读已提交（Read Committed）**：每次查询都生成新的读视图。
- **可重复读（Repeatable Read）**：事务开始时生成一个读视图，整个事务使用相同的视图。

## mysql查看是否发生死锁

```
SHOW ENGINE INNODB STATUS;
```


```
=====================================
2024-09-03 13:08:56 139991510361856 INNODB MONITOR OUTPUT
=====================================
Per second averages calculated from the last 30 seconds
-----------------
BACKGROUND THREAD
-----------------
srv_master_thread loops: 3 srv_active, 0 srv_shutdown, 770287 srv_idle
srv_master_thread log flush and writes: 0
----------
SEMAPHORES
----------
OS WAIT ARRAY INFO: reservation count 43
OS WAIT ARRAY INFO: signal count 42
RW-shared spins 0, rounds 0, OS waits 0
RW-excl spins 0, rounds 0, OS waits 0
RW-sx spins 0, rounds 0, OS waits 0
Spin rounds per wait: 0.00 RW-shared, 0.00 RW-excl, 0.00 RW-sx
------------
TRANSACTIONS
------------
Trx id counter 10576
Purge done for trx's n:o < 10576 undo n:o < 0 state: running but idle
History list length 0
LIST OF TRANSACTIONS FOR EACH SESSION:
---TRANSACTION 421466664803544, not started
0 lock struct(s), heap size 1128, 0 row lock(s)
---TRANSACTION 421466664802736, not started
0 lock struct(s), heap size 1128, 0 row lock(s)
---TRANSACTION 421466664801928, not started
0 lock struct(s), heap size 1128, 0 row lock(s)
--------
FILE I/O
--------
I/O thread 0 state: waiting for completed aio requests ((null))
I/O thread 1 state: waiting for completed aio requests (insert buffer thread)
I/O thread 2 state: waiting for completed aio requests (read thread)
I/O thread 3 state: waiting for completed aio requests (read thread)
I/O thread 4 state: waiting for completed aio requests (read thread)
I/O thread 5 state: waiting for completed aio requests (read thread)
I/O thread 6 state: waiting for completed aio requests (write thread)
I/O thread 7 state: waiting for completed aio requests (write thread)
I/O thread 8 state: waiting for completed aio requests (write thread)
Pending normal aio reads: [0, 0, 0, 0] , aio writes: [0, 0, 0, 0] ,
 ibuf aio reads:
Pending flushes (fsync) log: 0; buffer pool: 0
1137 OS file reads, 523 OS file writes, 258 OS fsyncs
0.00 reads/s, 0 avg bytes/read, 0.00 writes/s, 0.00 fsyncs/s
-------------------------------------
INSERT BUFFER AND ADAPTIVE HASH INDEX
-------------------------------------
Ibuf: size 1, free list len 0, seg size 2, 0 merges
merged operations:
 insert 0, delete mark 0, delete 0
discarded operations:
 insert 0, delete mark 0, delete 0
Hash table size 34679, node heap has 4 buffer(s)
Hash table size 34679, node heap has 0 buffer(s)
Hash table size 34679, node heap has 0 buffer(s)
Hash table size 34679, node heap has 2 buffer(s)
Hash table size 34679, node heap has 0 buffer(s)
Hash table size 34679, node heap has 2 buffer(s)
Hash table size 34679, node heap has 1 buffer(s)
Hash table size 34679, node heap has 0 buffer(s)
0.00 hash searches/s, 0.00 non-hash searches/s
---
LOG
---
Log sequence number          41600995
Log buffer assigned up to    41600995
Log buffer completed up to   41600995
Log written up to            41600995
Log flushed up to            41600995
Added dirty pages up to      41600995
Pages flushed up to          41600995
Last checkpoint at           41600995
Log minimum file id is       12
Log maximum file id is       12
98 log i/o's done, 0.00 log i/o's/second
----------------------
BUFFER POOL AND MEMORY
----------------------
Total large memory allocated 0
Dictionary memory allocated 554459
Buffer pool size   8192
Free buffers       6929
Database pages     1254
Old database pages 482
Modified db pages  0
Pending reads      0
Pending writes: LRU 0, flush list 0, single page 0
Pages made young 0, not young 0
0.00 youngs/s, 0.00 non-youngs/s
Pages read 1111, created 143, written 341
0.00 reads/s, 0.00 creates/s, 0.00 writes/s
No buffer pool page gets since the last printout
Pages read ahead 0.00/s, evicted without access 0.00/s, Random read ahead 0.00/s
LRU len: 1254, unzip_LRU len: 0
I/O sum[0]:cur[0], unzip sum[0]:cur[0]
--------------
ROW OPERATIONS
--------------
0 queries inside InnoDB, 0 queries in queue
0 read views open inside InnoDB
Process ID=1, Main thread ID=139991192778496 , state=sleeping
Number of rows inserted 0, updated 0, deleted 0, read 12
0.00 inserts/s, 0.00 updates/s, 0.00 deletes/s, 0.00 reads/s
Number of system rows inserted 8, updated 363, deleted 8, read 8169
0.00 inserts/s, 0.00 updates/s, 0.00 deletes/s, 0.00 reads/s
----------------------------
END OF INNODB MONITOR OUTPUT
============================

```

假如有死锁
```
------------------------
LATEST DETECTED DEADLOCK
------------------------
2024-09-03 13:08:56 139991510361856
*** (1) TRANSACTION:
TRANSACTION 421466664803544, ACTIVE 2 sec, process no 12345, OS thread id 123456789
MySQL thread id 123456789, query id 123456789 localhost test
*** (1) WAITING FOR THIS LOCK TO BE GRANTED:
RECORD LOCKS space id 30 page no 14 n bits 72 index `PRIMARY` of table `test`.`accounts` trx id 421466664803544 lock_mode X locks rec but not gap
Record lock, heap no 1 PHYSICAL RECORD: n_fields 2; compact format; info bits 0
0: len 4; hex 80000064; asc d; 1: len 4; hex 00000064; asc d;

*** (2) TRANSACTION:
TRANSACTION 421466664802736, ACTIVE 2 sec, process no 54321, OS thread id 543216789
MySQL thread id 543216789, query id 543216789 localhost test
*** (2) HOLDS THE LOCK(S):
RECORD LOCKS space id 30 page no 14 n bits 72 index `PRIMARY` of table `test`.`transactions` trx id 421466664802736 lock_mode X locks rec but not gap
Record lock, heap no 1 PHYSICAL RECORD: n_fields 2; compact format; info bits 0
0: len 4; hex 80000064; asc d; 1: len 4; hex 00000064; asc d;

*** (2) WAITING FOR THIS LOCK TO BE GRANTED:
RECORD LOCKS space id 30 page no 14 n bits 72 index `PRIMARY` of table `test`.`accounts` trx id 421466664802736 lock_mode X waiting
Record lock, heap no 1 PHYSICAL RECORD: n_fields 2; compact format; info bits 0
0: len 4; hex 80000064; asc d; 1: len 4; hex 00000064; asc d;

*** WE ROLL BACK TRANSACTION (2)
```

