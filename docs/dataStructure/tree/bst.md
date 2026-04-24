# 二叉搜索树 

binary search tree , BST 
常用于快速查找，插入，删除数据

对于任意一个借点满足：
1. 左子树的所有节点小于右子树
2. 右子树的所有节点大于左子树
3. 左右子树也是bst（递归）

```text 
        8
       / \
      3   10
     / \    \
    1   6    14
       / \   /
      4   7 13
```



## 🔍 三、基本操作

### 1. 查找（Search）

从根开始：

- 如果目标值 == 当前节点 → 找到  
- 如果目标值 < 当前节点 → 去左子树  
- 如果目标值 > 当前节点 → 去右子树  

时间复杂度：
- 平均：O(log n)
- 最坏（退化成链表）：O(n)

---

### 2. 插入（Insert）

步骤：

1. 从根开始比较  
2. 小 → 左走，大 → 右走  
3. 找到空位置插入  

---

### 3. 删除（Delete）

删除比较复杂，有三种情况：

#### ✔ 情况1：叶子节点
直接删除

```text
原：   3
     /
    1

删后： 3
```

#### ✔ 情况2：只有一个子节点
用子节点替代父节点 删除子节点

```text
原：   3
       \
        6

删后： 6
```

#### ✔ 情况3：有两个子节点

```text
        8
       / \
      3   10
         /
        9

用9替换8 删除9
```

常用方法：
- 找 **右子树最小值**（或左子树最大值）
- 替换当前节点
- 再删除那个替代节点

刚好比当前节点大（合法放右边）又不会比右子树其他节点大（不会乱）

---

## 🔁 四、遍历方式

### 1. 中序遍历（最重要）

```
左 → 根 → 右
```

👉 得到 **有序序列（从小到大）**

---

### 2. 其他遍历

- 前序：根 → 左 → 右  
- 后序：左 → 右 → 根  
- 层序：一层一层遍历  

---

## ⚠️ 五、问题：退化

如果插入顺序是：

```
1, 2, 3, 4, 5
```

树会变成：

```
1
 \
  2
   \
    3
     \
      4
       \
        5
```

👉 变成链表，效率变差

---

## 改进结构


- AVL 树（严格平衡）
- 红黑树（工程常用，如 Java TreeMap）
- B 树 / B+ 树（数据库用）

## code 

```java 

package com.jasper.bst;

import lombok.Data;

/**
 * @author jasper
 * @since 2026-04-24 22:09:11
 */
@Data
public class Treenode {

    int val;
    Treenode left, right;

    public Treenode(int val) {
        this.val = val;
    }
}

package com.jasper.bst;

/**
 * @author jasper
 * @since 2026-04-23 17:41:01
 */
public class BST {

    public Treenode insert(Treenode root, int val) {
        if (root == null) return new Treenode(val);
        Treenode current = root;
        while (true) {
            if (val < current.val) {
                if (current.left == null) {
                    current.left = new Treenode(val);
                    break;
                }
                //  一直往下走
                current = current.left;
            } else {
                if (current.right == null) {
                    current.right = new Treenode(val);
                    break;
                }
                current = current.right;
            }
        }
        return root;
    }

    public Treenode delete(Treenode root, int key) {
        if (root == null) {
            return null;
        }
        if (key < root.val) {
            root.left = delete(root.left, key);
        } else if (key > root.val) {
            root.right = delete(root.right, key);
        } else {
            // 找到要删除的节点

            // 返回的是新子树根  叶子节点 || 单子节点
            if (root.left == null) return root.right;
            if (root.right == null) return root.left;

            // 俩个子节点 找右子树最小
            Treenode success = root.right;
            while (success.left != null) success = success.left;
            // root和右子树最小节点替换
            root.val = success.val;
            // 删除替换节点
            root.right = delete(root.right, success.val);
        }
        return root;
    }
}
```
