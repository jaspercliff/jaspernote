# git

- [常见问题](./problem.md)

git status  查看文件状态


- amend
添加被遗忘的更改到上一次提交
如果你忘记将某些文件包含在最后一次提交中，可以先使用 git add 将这些文件添加到暂存区，然后运行：
```git
git add path/to/your/file.txt
git commit --amend
```
在这种情况下，Git会打开默认的文本编辑器让你确认或修改提交信息。如果你不想修改提交信息，只需保存并关闭编辑器即可。


## ssh 密钥生成

1. 打开终端。
2. 输入以下命令开始生成SSH密钥对。通常会使用RSA加密方式，并且建议设置密钥长度为至少2048位：
   ```bash
   ssh-keygen -t rsa -b 2048
   ```
   或者为了更高的安全性，可以选择4096位：
   ```bash
   ssh-keygen -t rsa -b 4096  -c "test@qq.com"
   ```
3. 执行上述命令后，系统会提示你输入保存密钥的文件名。按回车键接受默认文件位置和文件名（通常是`~/.ssh/id_rsa`）。
4. 接下来，系统可能会要求你输入一个密码(passphrase)来保护你的私钥。虽然这一步是可选的，但强烈建议设置一个强密码以增加安全性。
5. 完成这些步骤后，系统将会生成一对密钥：一个私钥和一个公钥。

### 在Windows上

1. 打开命令提示符或者PowerShell。
2. 使用与上面相同的命令生成SSH密钥对：
   ```bash
   ssh-keygen -t rsa -b 2048
   ```
   或者对于更高的安全性：
   ```bash
   ssh-keygen -t rsa -b 4096
   ```
3. 后续步骤与在Linux或macOS上的相同。

### 结果

- **私钥**：这是你的秘密密钥，应该被安全地保存并且不要共享给他人。它通常位于`~/.ssh/id_rsa`。
- **公钥**：这个密钥可以安全地分享给任何人。它通常命名为`id_rsa.pub`。你可以将此公钥添加到远程服务器或服务（如GitHub、GitLab等）的SSH keys列表中，以便通过SSH进行安全登录。

生成完成后，你可以使用`cat ~/.ssh/id_rsa.pub`（Linux/macOS）或`type %USERPROFILE%\.ssh\id_rsa.pub`（Windows）查看你的公钥内容。然后就可以将其添加到你需要访问的服务器或在线服务的SSH Keys设置中了。