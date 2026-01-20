# keychain

第一次打开终端时，它会提示你输入一次密码，之后所有的终端窗口和重启后的会话（配合配置）都能共享这个解锁状态

- [github](https://github.com/danielrobbins/keychain)

```zsh
sudo pacman -S keychain
```

在配置文件中添加

```zsh
eval $(keychain --eval --agents ssh id_rsa)
```

## 如果你有多个密钥，可以同时列出

eval $(keychain --eval --agents ssh id_rsa id_ed25519)
