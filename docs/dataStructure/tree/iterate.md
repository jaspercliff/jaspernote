--- 
sidebar_position: 2
--- 

# 遍历

## 广度优先搜索

breadth-first traversal
breadth-first search

### 层序遍历（level-order traversal）

通常借助队列来实现，队列先进先出， bfs 逐层推进

```Java
    /**
     * 层序遍历
     *
     * @param root root node
     */
    public static void levelOrder(Treenode root) {
        if (root == null) {
            return;
        }
        ArrayDeque<Treenode> queue = new ArrayDeque<>();
        queue.offer(root);
        while (!queue.isEmpty()) {
            Treenode node = queue.poll();
            System.out.println(node.getVal());
            if (node.getLeft() != null) queue.offer(node.getLeft());
            if (node.getRight() != null) queue.offer(node.getRight());
        }
    }
```

## 深度优先搜索

depth-first search DFS 先走到尽头 在回溯继续

啥时候遍历根节点就是啥遍历

### preorder 
   根节点 -》左子树 -》右子树
### inOrder 

  左子树 -》根节点 -》右子树

### postOrder

  左子树 -》右子树 -》根节点

## code 

```Java

package com.jasper;

import com.jasper.bst.Treenode;

import java.util.ArrayDeque;

/**
 * @author jasper
 * @since 2026-04-24 17:01:40
 */
public class TreeUtils {

    /**
     * 层序遍历 O(n)
     *
     * @param root root node
     */
    public static void levelOrder(Treenode root) {
        if (root == null) return;
        ArrayDeque<Treenode> queue = new ArrayDeque<>();
        queue.offer(root);
        while (!queue.isEmpty()) {
            Treenode node = queue.poll();
            System.out.print(" " + node.getVal());
            if (node.getLeft() != null) queue.offer(node.getLeft());
            if (node.getRight() != null) queue.offer(node.getRight());
        }
    }

    /**
     * 先序遍历 根-左-右
     *
     * @param root root node
     */
    public static void preOrder(Treenode root) {
        if (root == null) return;
        System.out.print(" " + root.getVal());
        preOrder(root.getLeft());
        preOrder(root.getRight());
    }

    /**
     * 中序遍历 左 根 右
     *
     * @param root root node
     */
    public static void inOrder(Treenode root) {
        if (root == null) return;
        inOrder(root.getLeft());
        System.out.print(" " + root.getVal());
        inOrder(root.getRight());
    }

    /**
     * 后序遍历 左 右 根
     *
     * @param root
     */
    public static void postOrder(Treenode root) {
        if (root == null) return;
        postOrder(root.getLeft());
        postOrder(root.getRight());
        System.out.print(" " + root.getVal());
    }

    /**
     * O(logN) best case <br>
     * O(n) worst case <br>
     * O(hight)
     */
    public static Treenode search(Treenode root, int key) {
        while (root != null) {
            if (root.getVal() == key) {
                return root;
            } else if (key < root.getVal()) {
                root = root.getLeft();
            } else {
                root = root.getRight();
            }
        }
        return null;
    }
}
```
