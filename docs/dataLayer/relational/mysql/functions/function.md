## case
CASE 语句遍历条件并在满足第一个条件时返回一个值（如 IF-THEN-ELSE 语句）。 因此，一旦条件为真，它将停止读取并返回结果。
如果没有条件为真，它将返回 ELSE 子句中的值。
如果没有ELSE部分且没有条件为真，则返回NULL
```SQL
SELECT OrderID, Quantity,  
CASE  
    WHEN Quantity > 30 THEN "The quantity is greater than 30"  
    WHEN Quantity = 30 THEN "The quantity is 30"  
    ELSE "The quantity is under 30"  
END  
FROM OrderDetails;
```

## group_concat
FUNC_ID | FUNC_ACTION_ID
------- | --------------
1      | A
1      | B
1      | C
2      | X
2      | Y
``` sql
SELECT FUNC_ID, GROUP_CONCAT(FUNC_ACTION_ID) AS ACTION_CODE
FROM your_table_name
GROUP BY FUNC_ID;
```
MENU_ID | ACTION_CODE
------- | -----------
1      | A,B,C
2      | X,Y
