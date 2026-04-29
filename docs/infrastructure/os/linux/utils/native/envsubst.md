# envsubset

从shell环境变量中读取值替换template中的变量，生成新的文件

当有一个模版文件，里面包含类似 `$USER` 或 `${DATABASE_URL}` 这样的变量时，envsubst 会读取这些变量，
并从当前的 Shell 环境中寻找对应的值填进去,找不到变量会替换成空值

```zsh
envsubst < input_file > output_file
```

envsubst 默认会替换掉文本中所有看起来像变量的内容。如果你的配置文件（比如 Nginx 或脚本）中本来就有一些 `$host`这样的内部变量，它们也会被意外替换成空值
只替换 `$DOMAIN_NAME` 和 `$PORT`，忽略其他 `$` 符号

```zsh
envsubst '$DOMAIN_NAME,$PORT' < input.conf > output.conf
```

```shell
for i in {1..6}; do
    export PORT=$((6380 + i - 1))
    export BPORT=$((PORT + 10000))
    mkdir -p node-$i/{conf,data}
    envsubst <valkey.conf.template >node-$i/conf/valkey.conf
    echo "Node-$i: Valkey Port=$PORT, Bus Port=$BPORT"
done
```
