

## ssh

# macOS 

## HTTPS 

Run the following to use the macOS keychain to store your credentials.

```bash
git config --global credential.helper osxkeychain
```

You have to do one authentication action (clone/pull/push) after setting the helper in the terminal. After that you should be able to clone/pull/push in Obsidian without any issues.