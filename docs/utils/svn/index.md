---
sidebar_position: 1
---
# svn

SVN（Subversion）是一个版本控制工具，常用于代码管理和协作开发。以下是一些常用的SVN命令：

1. **检出项目**（Checkout）：
    - `svn checkout URL` 或 `svn co URL`
    - 从仓库URL中检出一份工作副本到本地。

2. **更新文件或目录**（Update）：
    - `svn update` 或 `svn up`
    - 将工作副本更新至最新版本，解决冲突。

3. **提交更改**（Commit）：
    - `svn commit -m "commit message"` 或 `svn ci -m "commit message"`
    - 提交更改到SVN仓库，并添加提交信息。

4. **查看状态**（Status）：
    - `svn status` 或 `svn st`
    - 显示工作副本中文件和目录的状态，标识哪些被修改、新增或删除。

5. **添加文件或目录**（Add）：
    - `svn add file_or_directory_name`
    - 标记文件或目录为下次提交做准备。

6. **删除文件或目录**（Delete）：
    - `svn delete file_or_directory_name` 或 `svn del file_or_directory_name`
    - 从工作副本和版本库中删除文件或目录。

7. **重命名文件或目录**（Move/Rename）：
    - `svn move source destination` 或 `svn mv source destination`
    - 重命名或移动文件或目录。

8. **查看日志**（Log）：
    - `svn log`
    - 查看提交历史记录，了解项目的发展过程。

9. **比较差异**（Diff）：
    - `svn diff` 或 `svn di`
    - 显示未提交的本地修改之间的差异。

10. **撤销更改**（Revert）：
    - `svn revert file_or_directory_name`
    - 撤销对文件或目录所做的任何未提交的修改。
