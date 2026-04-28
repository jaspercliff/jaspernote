# impl 

## java

堆和优先队列是一样的
```java
package com.jasper;

import java.util.Arrays;
import java.util.PriorityQueue;

/**
* 小顶堆（min heap）：任意节点的值`<=`其子节点的值。
* 大顶堆（max heap）：任意节点的值`>=`其子节点的值。
 *
 */
public class PriorityQueueDemo {
    public static void main(String[] args) {
        final PriorityQueue<Integer> minHeap = new PriorityQueue<>(Arrays.asList(1,3,2,4,5));
        final PriorityQueue<Integer> maxHeap = new PriorityQueue<>((a, b) 
      -> b - a);
        maxHeap.offer(1);
        maxHeap.offer(3);
        maxHeap.offer(2);
        maxHeap.offer(5);
        maxHeap.offer(4);

        final Integer peek = maxHeap.peek();
        System.out.println("max peek = " + peek);
        final Integer peek1 = minHeap.peek();
        System.out.println("min peek = " + peek1);

        final int size = maxHeap.size();
        System.out.println("max size = " + size);

        while (!maxHeap.isEmpty()){
            final Integer poll = maxHeap.poll();
            System.out.println("poll = " + poll);
        }
        while (!minHeap.isEmpty()){
            final Integer poll = minHeap.poll();
            System.out.println("poll = " + poll);
        }
    }
}
```

