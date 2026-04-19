# linkedlist

LinkedList 同样实现了 Deque，所以天然也能当「栈」和「队列」用 -> ArrayDeque

liknedlist 底层使用链表实现 arryadeque 使用动态数组实现 性能不如arryaDeque
一般选 ArrayDeque，因为它基于数组实现，缓存友好、内存占用更低、性能更好。

除非频繁在中间插入 删除才使用linkedlist


## stack

```java
public class LinkedListDemo {
    public static void main(String[] args) {
        Deque<Integer> stack = new LinkedList<>();
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
```

## queue

```java 
public class LinkedListDemo {
    public static void main(String[] args) {

        Deque<Integer> queue = new LinkedList<>();
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
```
