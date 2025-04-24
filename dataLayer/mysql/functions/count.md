# count

## count(column)

> Returns a count of the number of non-NULL values of expr in the rows retrieved by a SELECT statement. The result is a BIGINT value.



## count(1)

COUNT(1)表示对每一行都计数，因为1总是存在的，所以结果就是表中的行数。和count（*）一样的效果

## count(*)

> COUNT(\*) is somewhat different in that it returns a count of the number of rows retrieved, whether or not they contain NULL values.
