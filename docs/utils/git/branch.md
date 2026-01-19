# branch

## 1. 查看本地分支

运行以下命令可以列出所有的本地分支：

```bash
git branch
```

- 默认情况下，当前所在的分支会用 `*` 标记。

例如：

```
* main
  develop
  feature-x
```

---

### 2. 查看远程分支

如果你还想查看远程仓库中的分支，可以使用以下命令：

```bash
git branch -r
```

这将列出所有远程分支，通常以 `origin/branch-name` 的形式显示。

---

### 3. 查看所有分支（包括本地和远程）

如果你想同时查看本地分支和远程分支，可以运行：

```bash
git branch -a
```

---

### 4. 查看更详细的信息

如果你需要查看每个分支的最新提交信息，可以使用：

```bash
git branch -v
```

---

### 5. 结合过滤条件

如果分支很多，可以结合 `grep` 进行过滤。例如，查找包含 "feature" 的分支：

```bash
git branch -a | grep.md "feature"
```

---

### 注意事项

- 如果你的本地分支与远程分支有对应关系，可能会看到类似 `remotes/origin/branch-name` 的条目。
- 使用 `git fetch` 可以更新远程分支的最新状态后再查看。
