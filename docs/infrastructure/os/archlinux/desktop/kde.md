# kde

## 1. 安装显卡驱动

* **NVIDIA 显卡 (新卡):** `sudo pacman -S nvidia nvidia-utils lib32-nvidia-utils`

---

## 2. 安装最精简的 KDE 组件

为了避免安装臃肿的软件包合集（如 `kde-applications`），我们只安装运行桌面环境所**必须**的核心包。

### 核心包说明

* **plasma-desktop**: 最核心的桌面包（包含任务栏、桌面、设置）。
* **sddm**: 登录管理器（显示管理器）。 sddm-kcm
* **konsole**: 终端（虽然是应用，但没有它你进入桌面后很难操作）。
* **dolphin**: 文件管理器（可选，但通常是必需品）。

```bash
sudo pacman -S plasma-desktop sddm konsole dolphin

```

---

## 3. 配置与启动

### 设置服务开机自启

安装完成后，你需要启用 `sddm` 才能看到登录界面。

```bash
sudo systemctl enable sddm

```

### 网络配置 (重要)

KDE 使用 NetworkManager 来管理网络。如果你在基础安装阶段没安装它，现在需要安装并启用，否则桌面环境内无法联网。

networkmanager-qt 开发者使用的api库
plasma-pa 显示图标

```bash
sudo pacman -S networkmanager networkmanager-qt plasma-nm
sudo systemctl enable NetworkManager

```

---

## 4. 补充基础功能 (可选)

最精简的安装不包含以下功能，如果你需要，建议手动添加：

| 功能 | 软件包名 |
| --- | --- |
| **系统设置 (必须)** | 包含在 `plasma-desktop` 中 |
| **音量控制** | `plasma-pa` (用于在任务栏显示音量图标) |
| **电源管理** | `powerdevil` (笔记本建议安装) |
| **显示器配置** | `kscreen` (用于设置分辨率、多屏幕) |
| **其他语言字体** | `noto-fonts` (防止中文乱码) |
| **中文字体** | `noto-fonts-cjk` (防止中文乱码) |
| **表情** | `noto-fonts-emoji` (防止中文乱码) |

**推荐的“最小化补全”命令：**

```bash
sudo pacman -S plasma-pa powerdevil kscreen 
noto-fonts noto-fonts-cjk noto-fonts-emoji

```

---

## 5. 总结与重启

完成上述步骤后，系统将只拥有最基础的 KDE 框架，没有任何多余的扫雷游戏或多媒体播放器。

```bash
reboot

```

工具 右键菜单什么

```bash
sudo pacman -S kde-cli-tools
```
