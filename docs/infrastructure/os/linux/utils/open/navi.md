# navi

```zsh
# 添加自己的cheat文件
navi repo add <git@github.com>:jaspercliff/configs.git
```

修改环境变量 NAVI_PATH,告诉navi去哪里找cheats文件

```zsh
export NAVI_PATH="$HOME/code/configs/cheats"
```

## 推荐方式

```zsh
########################################################## navi config 
# 将本地仓库路径加入 navi 搜索路径
export NAVI_PATH="$HOME/code/configs/cheats"

# 1. 加载 navi 的基础 widget
eval "$(navi widget zsh)"

# 2. 通过 zsh-vi-mode 的钩子进行绑定
# 这样无论是在 Normal 模式还是 Insert 模式，Ctrl+n 都有效
function zvm_after_init() {
  zvm_bindkey vicmd '^n' _navi_widget
  zvm_bindkey viins '^n' _navi_widget
}

# 3. 这里的 bindkey 也要留着，作为兜底
bindkey '^n' _navi_widget
```
