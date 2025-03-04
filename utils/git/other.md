# 乱七八糟

git status  查看文件状态

- amend
  添加被遗忘的更改到上一次提交
  如果你忘记将某些文件包含在最后一次提交中，可以先使用 git add 将这些文件添加到暂存区，然后运行：
``` bash
git add path/to/your/file.txt
git commit --amend
```
在这种情况下，Git会打开默认的文本编辑器让你确认或修改提交信息。如果你不想修改提交信息，只需保存并关闭编辑器即可。



