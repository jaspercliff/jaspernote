--- 
title: stack
--- 
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

栈（stack）是一种遵循先入后出逻辑的线性数据结


<Tabs>
  <TabItem value="java" label="java" default>
    ```java

        /**
        * 比stack和linkedlist更快 <br>
        * 线程不安全
        */
        public class ArrayDequeDemo {
            public static void main(String[] args) {
                Deque<Integer> stack = new ArrayDeque<>();
                stack.push(1);
                stack.push(2);
                Integer peek = stack.peek();
                System.out.println("peek = " + peek);
                while (!stack.isEmpty()) {
                    Integer o = stack.pop();
                    System.out.println(o);
                }
            }
        }

        public class StackDemo {
            public static void main(String[] args) {
                Stack<Integer> stack = new Stack<>();
                stack.push(1);
                stack.push(2);
                stack.push(3);
                if (!stack.isEmpty()) {
                    Integer peek = stack.peek(); // watch and keep
                    System.out.println(peek);
                    int search = stack.search(peek); // return distance from stack peek : 1-based indexing
                    System.out.println(search);
                }
                while (!stack.isEmpty()) {
                    Integer pop = stack.pop();
                    System.out.println(pop);
                }
            }
        }

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
  </TabItem>
  <TabItem value="cpp" label="cpp">
    ```cpp
    ```
  </TabItem>
</Tabs>
