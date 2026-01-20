# terminal

## zsh

```zsh
############################################ zsh
sudo pacman -S zsh  # zsh install
chsh -s /usr/bin/zsh # 使用 chsh（change shell）命令将当前用户的默认 Shell 改为 Zsh
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools
/install.sh)" #Oh My Zsh
# 根据历史记录提示后续命令
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
# 语法高亮 (zsh-syntax-highlighting)：命令写对了变绿，写错了变红
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
# vim 模式
git clone https://github.com/jeffreytse/zsh-vi-mode $ZSH_CUSTOM/plugins/zsh-vi-mode
# 编辑你的配置文件：
vim ~/.zshrc
# 找到 plugins=(git) 这一行，修改为：
# plugins=(git zsh-autosuggestions zsh-syntax-highlighting zsh-vi-mode)
#
#
# ########################################## starship
sudo pacman -S starship
echo 'eval "$(starship init zsh)"' >> ~/.zshrc

# ########################################## fonts
sudo pacman -S ttf-jetbrains-mono-nerd
```

## alacritty

```zsh
# ########################################## alacritty
mkdir -p ~/.config/alacritty
vim ~/.config/alacritty/alacritty.toml
```

pacman -S chafa
配置专门优化了 Alacritty 下的图片显示质量

```toml
[font]
size = 12.0

[font.normal]
family = "JetBrainsMono Nerd Font"
style = "Regular"

[font.bold]
family = "JetBrainsMono Nerd Font"
style = "Bold"

[font.italic]
family = "JetBrainsMono Nerd Font"
style = "Italic"

[terminal.shell]
program = "/usr/bin/zsh"
args = ["--login"]
```

## tui

```zsh
sudo pacman -S lazygit
echo "alias lg='lazygit'" >> ~/.zshrc
```
