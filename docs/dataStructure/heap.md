---
title: heap 
--- 
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

堆（heap）是一种满足特定条件的完全二叉树，主要可分为两种类型:

- 小顶堆（min heap）：任意节点的值`<=`其子节点的值。
- 大顶堆（max heap）：任意节点的值`>=`其子节点的值。

堆的常用操作包括插入、删除和堆化等。堆通常用于实现优先队列（priority queue），
在图论中的Dijkstra算法和贪心算法中的Huffman编码等场景中也有广泛应用。

堆和优先队列是一样的
<Tabs>
  <TabItem value="java" label="java" default>

```java
package com.jasper;

import java.util.Arrays;
import java.util.PriorityQueue;

/**
 * 小顶堆：任意一个字节点的值<=其父节点的值 <br/>
 * 大顶堆：任意一个字节点的值>=其父节点的值
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

  </TabItem>
  <TabItem value="python" label="python">
    ```python
    ```

  </TabItem>
</Tabs>

## heapify 堆化

堆化操作是指将一个无序的数组构造成一个堆的过程。堆化可以分为自顶向下堆化和自底向上堆化两种方法。

堆是特别的完全二叉树，树的高度是logN，所以堆的入堆操作时间复杂度也是O(logN)
