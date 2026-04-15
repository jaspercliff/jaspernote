# memory barrier 内存屏障

内存屏障是 CPU / 编译器层面的一个指令：
用来 禁止指令重排序 + 保证内存可见性

可以理解成一个“强制规则点”：屏障前后的指令不能乱跑

```text 
A;
B;
[Memory Barrier]
C;
D;
```

- A、B 不会跑到 C、D 后面
- C、D 也不会跑到前面

## common types

- LoadLoad: Load1; LoadLoad; Load2	确保 Load1 的数据装载先于 Load2 及之后所有装载指令。
- StoreStore: Store1; StoreStore; Store2	确保 Store1 的数据对其他处理器可见（刷新到内存）先于 Store2。
- LoadStore: Load1; LoadStore; Store2	确保 Load1 数据装载先于 Store2 及之后所有的存储指令刷新到内存。
- StoreLoad: Store1; StoreLoad; Load2	最全能（也最贵）。确保 Store1 刷新到内存先于 Load2。它能防止 Store 与之后的 Load 重排序。
## volatile 

volatile 底层就用了内存屏障：

1. 在每个 volatile 写操作的前面插入一个 StoreStore 屏障。
2. 在每个 volatile 写操作的后面插入一个 StoreLoad 屏障。
3. 在每个 volatile 读操作的后面插入一个 LoadLoad 屏障。
4. 在每个 volatile 读操作的后面插入一个 LoadStore 屏障。


```java
public class VolatileTest {

    int i = 0;
    volatile boolean flag = false;

    public void write() {
        i = 1;
        //storestore
        flag = true;
        //storeload  flag=true 之后的所有操作，不能跑到 flag=true 之前执行
    }

    public void read() {
        if (flag) {
            //loadload
            //loadstore
            System.out.println("i=" + i);
        }
    }

}
```

```text 

data = 100;
StoreStore Barrier  //防止普通写和volatile写重排序
flag = true;
StoreLoad Barrier  //防止 写 → 后续任何操作（读或写） 的重排序
```

### 读

```java
if (flag) {
    print(data)
}
```

```java
LoadLoad  //LoadLoad屏障  防止读重排
flag读取
LoadStore  // LoadStore屏障  防止后续读乱序 只管读后写
data读取
```
