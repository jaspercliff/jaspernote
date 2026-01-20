# compress

## tar

-z：通过 gzip 压缩或解压
-x：解压归档文件（extract）
-v：显示处理过程中的详细信息（verbose）
-f：指定归档文件名（file）
-c：创建一个新的归档文件（create）
-t：列出归档文件内容（list）
-j：通过 bzip2 压缩或解压

```shell
tar -zxvf xxx.tar.gz # 解压
tar -zcvf file.txt   # 压缩
```
