# arrayDeque 

双端队列（Deque）实现,可以实现栈、队列 

循环数组结构：它内部使用一个可扩容的数组实现，通过头尾指针（head 和 tail）循环移动，
避免了像 ArrayList 删除头部元素时需要移动大量数据的问题

性能优于 LinkedList：在大多数场景下，ArrayDeque 比 LinkedList 更快，因为它的内存布局更紧凑（对 CPU 缓存友好），且没有频繁创建节点对象的开销。

它不是线程安全的，且不允许插入 null 值

add/remove  会抛异常 

## stack 


```java 
/**
 * 比stack和linkedlist更快 <br>
 * 线程不安全
 */
public class Stack1 {
    public static void main(String[] args) {
        Deque<Integer> stack = new ArrayDeque<>();
        stack.push(1);
        stack.push(2);
        stack.push(3);
        Integer peek = stack.peek();
        System.out.println("peek = " + peek);
        while (!stack.isEmpty()) {
            Integer o = stack.pop();
            System.out.println(o); // 3 2 1
        }
    }
}

public class Stack2 {
    public static void main(String[] args) {
        Deque<Integer> stack = new ArrayDeque<>();
        stack.addFirst(1);
        stack.addFirst(2);
        stack.addFirst(3);
        while (!stack.isEmpty()) {
            Integer removeFirst = stack.removeFirst();
            System.out.println(removeFirst);// 3 2 1
        }
    }
}
```

## queue

```java
/** queue impl */
public class Queue1 {
    public static void main(String[] args) {
        Deque<Integer> queue = new ArrayDeque<>();
        queue.offer(1);
        queue.offer(2);
        queue.offer(3);
        Integer peek = queue.peek();
        System.out.println("peek: " + peek);
        while (!queue.isEmpty()) {
            Integer poll = queue.poll();
            System.out.println(poll); // 1 2 3
        }
    }
}

public class Queue2 {
    public static void main(String[] args) {

        Deque<Integer> queue = new ArrayDeque<>();
        queue.addFirst(1);
        queue.addFirst(2);
        queue.addFirst(3);
        while (!queue.isEmpty()) {
            Integer removeLast = queue.removeLast();
            System.out.println(removeLast); // 1 2 3
        }
    }
}
```
