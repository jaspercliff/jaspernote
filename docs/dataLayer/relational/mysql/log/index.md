# log 



## redo and bin  2 阶段提交

如果 redo log 已经是 commit 状态：说明事务完整，直接恢复/重做（Redo）。
如果 redo log 只是 prepare 状态，则需要去对照 binlog：
  binlog 缺失/不完整：说明还没准备好，回滚（Rollback）。
  binlog 完整存在：说明允许生效，提交（Commit）
