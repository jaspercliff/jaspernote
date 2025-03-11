

## ssh

# macOS 

## HTTPS 

Run the following to use the macOS keychain to store your credentials.

```bash
git config --global credential.helper osxkeychain
```

You have to do one authentication action (clone/pull/push) after setting the helper in the terminal. After that you should be able to clone/pull/push in Obsidian without any issues.


## ssh
启动 `ssh-agent`:

```bash
eval "$(ssh-agent -s)"
```

然后使用 `ssh-add` 命令将你的 SSH 私钥添加进去：
```bash
ssh-add -K ~/.ssh/id_ed25519
# 或者对于 RSA 密钥
ssh-add -K ~/.ssh/id_rsa
```

注意：在 macOS Sierra 10.12.2 及以后版本中，需要使用 `-K` 参数来将密码保存到你的钥匙串中。


可以通过编辑或创建 `~/.ssh/config` 文件来实现：

```
Host *
  AddKeysToAgent yes
  UseKeychain yes
  IdentityFile ~/.ssh/id_ed25519
  # 如果你也使用其他类型的密钥，如 id_rsa，请确保也在这里指明
```

这样做之后，即使不使用 `-K` 参数，macOS 也会将 SSH 密钥和密码保存在钥匙串中。