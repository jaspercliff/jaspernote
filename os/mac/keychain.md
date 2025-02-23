# keychain

macOS 自带 Keychain（钥匙串）可以安全存储 SSH 密钥的 Passphrase。

- 添加密钥到 Keychain
```bash
ssh-add --apple-use-keychain ~/.ssh/id_rsa
```
