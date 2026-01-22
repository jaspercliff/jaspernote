# desktop shell

## 1. 一体化完整 Shell (Integrated / Full-Featured)
>
> **定义**：这类 Shell 属于“全家桶”方案，开发者在一个框架内集成了状态栏、通知、搜索和设置，视觉高度统一。

| Shell 名称 | 核心技术 | 推荐底座 (WM) | 核心特点 |
| :--- | :--- | :--- | :--- |
| **Noctalia-shell** | Quickshell (QML) | **Niri** / Hyprland | 极简、丝滑的水感动画，目前 Niri 用户的首选。 |
| **COSMIC Shell** | Rust (iced) | cosmic-comp | System76 开发，性能极高，Rust 编写，稳定性极强。 |
| **DMS-shell** | Quickshell (QML) | Hyprland / Niri | 深度集成 Material You 动态调色，插件极其丰富。 |
| **GNOME Shell** | GTK / JS | Mutter | 极其稳定，工作流固定，适合不爱折腾的用户。 |
| **Plasma Shell** | Qt / C++ | KWin | 极致的自定义能力，支持传统的 Windows 式布局。 |

---

## 2. 积木拼凑型 Shell (Modular / DIY Components)
>
> **定义**：这类方案没有统一的 Shell，而是由多个独立的软件组合而成。你需要自己去配置每一个“零件”。

| 组件类别 | 2026 主流选择 | 作用说明 |
| :--- | :--- | :--- |
| **状态栏 (Bar)** | **Waybar**, Eww | 显示系统状态、时间、工作区。 |
| **启动器 (Launcher)** | **Anyrun**, Wofi | 搜索并启动应用程序。 |
| **通知中心 (Notification)** | **Swaync**, Mako | 处理系统弹窗通知。 |
| **壁纸管理 (Wallpaper)** | **Swww**, Hyprpaper | 负责背景渲染及动画切换。 |
| **控制中心 (Control)** | **AGS** (Aylur's Shell) | 提供音量、亮度、Wi-Fi 等快捷控制面板。 |
