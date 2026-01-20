# btrfs

@ (根目录)：快照的主体。

@home (家目录)：数据保护，回滚系统不丢文档。

@log (日志)：保留事故现场。

@cache (缓存)：节省空间。 浏览器和软件包管理器（pacman）产生的缓存非常大且变动频繁。如果给它们做快照，会占用大量硬盘空间，且毫无意义（缓存丢了可以自动生成）。

@snapshots (快照存储)：如果你想在自己的系统里直接管理快照文件。

分出 @cache：是为了让你的“系统备份”更小、更快，不存垃圾文件。

分出 @snapshots：是为了给你的“备份文件”找个安全的独立保险箱，不跟系统文件搅和在一起

Btrfs（COW):写时复制 = 不覆盖原数据，先复制一份(发生修改的数据)，再写新的copy-on-write

 1. 文件 A 在磁盘块 X
 2. 要修改
 3. 复制块 X → 新块 Y
 4. 在 Y 写入新内容
 5. 更新元数据指向 Y

只有“被修改的那一小部分”才会额外占空间
没改的内容，永远只存一份

```bash
# 列出当前子卷
sudo btrfs subvolume list /mnt
# 删除子卷
sudo btrfs subvolume delete /mnt/@test
```

## 创建快照

1. 查看当前 Btrfs 子卷

sudo btrfs subvolume list /

通常会看到类似：

ID 256 gen 5 top level 5 path @
ID 257 gen 5 top level 5 path @home

 • @ 通常是根子卷 /
 • @home 是用户目录 /home 子卷

记下你要快照的子卷名字。

⸻

2. 创建快照

方案 A：只快照根系统（不包含 home）

sudo btrfs subvolume snapshot -r /@ /@_clean

 • -r 表示只读快照，这样快照是保护状态，无法被意外修改。
 • /_clean 可以自己改名字，例如 @2026-01-07。

方案 B：同时快照 root 和 home

sudo btrfs subvolume snapshot -r /@ /@_clean
sudo btrfs subvolume snapshot -r /@home /@home_clean

这样以后可以随时恢复到安装完的干净状态，包括用户目录。

⸻

3. 查看快照是否成功

sudo btrfs subvolume list /

你应该能看到多出来的 @_clean（或者你起的名字）。

⸻

4. 恢复快照（可选，未来用）

如果系统乱了，想回到初始状态：

 1. 重命名当前子卷（做备份）：

sudo mv /@ /@_current

 2. 将快照复制为新的可写子卷：

sudo btrfs subvolume snapshot /@_clean /@

 3. 重启系统即可回到“干净系统”。

grub-btrfs 是一个专门用于 Btrfs 文件系统 的 GRUB 扩展，它的主要作用是 在启动菜单中自动添加 Btrfs 子卷的内核条目，方便在多子卷或者快照系统中快速启动
pacman -S inotify-tools
grub-mkconfig -o /boot/grub/grub.cfg

# 将默认子卷 ID 设回 5

mv @ @_old
btrfs subvolume snapshot @snapshots/1/snapshot @ # 将快照 1 恢复为官方的 @ 子卷
cat /mnt/btrfsroot/@/etc/fstab
btrfs subvolume delete /mnt/btrfsroot/@_old

sudo mount /dev/nvme1n1p2 /mnt/btrfsroot -o subvolid=5
sudo btrfs subvolume set-default 5 /mnt

ID 5：是 Btrfs 文件系统创建时自带的、不可删除的顶级子卷。你可以把它想象成整个磁盘的“上帝视角”或“物理根目录”。
为什么要显式挂载它？ 现代 Linux 发行版（如 Ubuntu, Fedora, Arch）在安装时，通常不会直接把数据装在 ID 5 下。它们会创建像 @ (用于 /) 和 @home (用于 /home) 这样的子卷。 当你平时进入系统时，系统实际上只挂载了其中一个子卷。如果你想看到所有子卷、管理快照，或者对整个分区进行操作，你就需要挂载 ID 5 那个“最原始的根”

sudo btrfs subvolume snapshot -r / /.snapshots/arch_clean_20241024
sudo btrfs subvolume delete /.snapshots/arch_clean
