# control

## control 

```lua
local a = 90

if a < 20 then
	print("less than 20")
elseif a < 40 then
	print("less than 40")
else
	if a > 80 then
		print("more than 80 ")
	end
	print("more than 40")
end
```

## loop 

```lua
-- loop
-- while
local b = 15
while b < 20 do
	print("while loop ", b)
	-- lua 没有b++
	b = b + 1
end

-- for
local function f(x)
	return x * 2
end
-- 默认步长为1，表达式只在循环开始前求值一次
-- for i = 1, f(2),1 do
for i = 1, f(2) do
	print("for loop", i)
end
-- 范型for循环

local days = { "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" }

for i, v in ipairs(days) do
	if i > 4 then
		break
	end
	print(i, v)
end

-- 不用的变量可以使用_replace
for _, v in ipairs(days) do
	print(v)
end

-- repeat 先执行一次 =do while

local c = 10
repeat
	print("repeat loop ", c)
	c = c + 1
until c > 15

-- label  ::label:: continue 跳出多层循环

for i = 1, 5, 1 do
	if i == 3 then
		goto continue
	end
	print("label", i)
	::continue::
end
```
