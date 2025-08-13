# zsh


Powerlevel10k 是 Oh My Zsh 上最强大的主题之一，功能超强、速度飞快、样式超炫！⚡

🛠️ 一、安装 Powerlevel10k

✅ 步骤 1：克隆主题到 Oh My Zsh 的自定义目录

git clone --depth=1 https://github.com/romkatv/powerlevel10k.git \
${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k

✅ 步骤 2：修改 .zshrc 设置主题为 powerlevel10k

打开配置文件：

nano ~/.zshrc

找到这一行：

ZSH_THEME="robbyrussell"

改成：

ZSH_THEME="powerlevel10k/powerlevel10k"

保存并执行：

source ~/.zshrc

第一次加载会自动弹出配置界面！

⸻

🎨 二、配置 Powerlevel10k（首次加载自动触发）

系统会引导你一步步选择：
•	是否显示 Git 信息
•	是否显示时间、主机名
•	是否用图标、彩色字体等

建议：
•	字体选带图标的（比如 Nerd Font）
•	风格选 Rainbow 或 Lean 都很好看

如果你以后想重新配置，可以执行：

p10k configure



⸻

🔤 三、安装 Nerd Font 字体（显示图标和美化）

Powerlevel10k 推荐搭配 Nerd Font 才能显示图标！

👉 下载地址

推荐字体：
•	MesloLGS NF（最推荐）
•	Hack Nerd Font
•	JetBrainsMono Nerd Font

安装后在终端设置字体：
•	iTerm2 / Windows Terminal / VS Code Terminal
•	设置字体为：MesloLGS NF

⸻

🚀 四、重启终端，享受炫酷体验！

你可以在终端中执行：

p10k configure

来重新进入图形化配置界面，随时调整外观和功能！

export http_proxy="http://127.0.0.1:1087"
export https_proxy="http://127.0.0.1:1087" 
