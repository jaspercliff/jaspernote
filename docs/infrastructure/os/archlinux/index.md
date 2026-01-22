# archlinux

- [desktop-shell](./desktop/desktopShell.md)

efi system 存放启动加载器（GRUB、systemd-boot 等）和内核启动文件

nmcli dev wifi connect wifi password 123456 l=连接wifi

 gnome-desktop gdm ghostty gnome-control-center gnome-software faltpak

EDITOR=vim visudo

systemctl enable gdm 桌面环境自启

sudo pacman -S noto-fonts-cjk noto-fonts-emoji 中文 日文 韩文  表情
fc-cache -fv 刷新字体缓存sfasf
sudo pacman -S fcitx5 fcitx5-chinese-addons  输入法框架本体 拼音（pinyin）/双拼/五笔 等

extension manager

- input method panel
- appindicator and kstatusnotifieritemsupport 右上角显示后台应用
- caffeine 保持屏幕常亮
- lockkeys 显示大写锁定情况和数字锁定情况
- clipboard indicator 剪贴板历史情况 设置快捷键 super+v
- tiling shell 窗口平铺
- vitals 显示系统资源

Swap（交换空间）就是硬盘上的一块“虚拟内存”。
当你的物理内存（RAM）不够用时，操作系统会把内存中那些“暂时没人在用”的数据挪到硬盘的 Swap 空间里，把宝贵的物理内存腾出来给当前正在运行的程序
内存大时，不建议使用swap分区，而是使用swapfile

- cfdisk  建立物理分区
  /dev/nvme0n1p1 (EFI 分区)
  /dev/nvme0n1p2 (Btrfs 分区)

- 格式化物理分区

  ```bash
  # 1. 格式化 EFI 分区
  mkfs.fat -F 32 /dev/nvmen1p1

  # 2. 格式化 Btrfs 分区 (加上 -L 参数可以给磁盘起个标签，方便识别) -f 强制清除，如果之前有btrfs 会报错已经是该文件系统了
  mkfs.btrfs -f -L ARCH_SYSTEM /dev/nvme0n1p2
  ```

- 创建btrfs子卷

```bash
# 1. 临时挂载
mount /dev/nvme0n1p2 /mnt

# 2. 创建 5 个子卷
btrfs subvolume create /mnt/@
btrfs subvolume create /mnt/@home
btrfs subvolume create /mnt/@cache
btrfs subvolume create /mnt/@log
btrfs subvolume create /mnt/@snapshots

# 3. 卸载临时挂载点
umount /mnt
```

- 挂载子卷并建立目录结构: 将物理硬盘分区接到linux文件树上

```bash
# 1. 挂载根目录子卷 @
mount -o compress=zstd,subvol=@ /dev/nvme1n1p2 /mnt

# 2. 创建其余挂载点
mkdir -p /mnt/{home,var/cache,var/log,.snapshots,boot}

# 3. 挂载剩余子卷
mount -o compress=zstd,subvol=@home /dev/nvme1n1p2 /mnt/home
mount -o compress=zstd,subvol=@cache /dev/nvme1n1p2 /mnt/var/cache
mount -o compress=zstd,subvol=@log /dev/nvme1n1p2 /mnt/var/log
mount -o compress=zstd,subvol=@snapshots /dev/nvme1n1p2 /mnt/.snapshots

# 4. 挂载 EFI 分区
mount /dev/nvme0n1p1 /mnt/boot
```

- 安装系统核心包

```bash
# 安装基础系统、内核、固件以及必要的工具
pacstrap -K /mnt base linux linux-headers linux-firmware btrfs-progs
```

- 生成交换文件

```bash
# 1. 进入新安装的系统（或者直接在 /mnt 下操作）
# 我们直接在 /mnt 下创建，它会自动继承 @ 子卷的路径
btrfs filesystem mkswapfile --size 8G /mnt/swapfile

# 2. 启用它
swapon /mnt/swapfile
```

- 配置系统挂载表

```bash
# 生成 fstab 文件 在开机时，应该自动把哪些硬盘分区（或子卷）挂载到哪些文件夹下
genfstab -U /mnt >> /mnt/etc/fstab
```

执行 cat /mnt/etc/fstab，你应该能看到 5 个子卷的挂载信息，以及一条 /swapfile 的记录。

你在命令行输入的 mount 命令是临时的，关机就没了。

所以安装最后一步要执行 genfstab。这个命令会把你现在的挂载状态写成一个“账本”（/etc/fstab）。下次开机时，系统会照着账本自动把分区挂载好

## wifi

```bash
# 列出wifi
nmcli device wifi list
# 保存配置并自动开机连接
nmcli device wifi connect "SSID名" password "你的密码" name "home_wifi"

systemctl enable NetworkManager

```

useradd -m -G wheel -s /bin/bash jasper
passwd jasper
EDITOR=vim visudo   # 取消 %wheel ALL=(ALL:ALL) ALL 前的注释

中文字体
sudo pacman -S noto-fonts noto-fonts-cjk noto-fonts-emoji
fc-cache -fv

## blueteeth

```bash
sudo pacman -S bluez bluez-utils
```
