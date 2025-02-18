# hello world

```
SET SERVEROUTPUT ON;
```
在sqlplus/sqldeveloper这样的工具打开控制台输出，打开之后才能看到DBMS_OUTPUT.PUT_LINE 语句输出的信息

``` sql
begin
    DBMS_OUTPUT.PUT_LINE('hello world!');
end;
```



