# function

```lua
scope function function_name( argument1,  argument3..., argumentn)
    function_body
    return result_params_comma_separated
end

```
```lua 
local myprint = function(param)
	print(param)
end
```

- scope 全局or局部 local局部 不写默认global
- function_name: 指定函数名称。
- argument1, argument2, argument3..., argumentn: 函数参数，多个参数以逗号隔开，函数也可以不带参数。
三个点 ... 表示可变参数
- function_body: 函数体，函数中需要执行的代码语句块。
- result_params_comma_separated: 函数返回值，Lua语言函数可以返回多个值，每个值以逗号隔开。
- 函数可以作为参数传递 匿名函数赋值

## demo

```lua 
local function add(num1, num2)
	return num1 + num2
end

print(add(1, 2))

-- 函数可以作为参数传递 匿名函数赋值
-- 可变参数
local myprint = function(...)
	print(...)
end

local function addAndPrint(func_add, func_print, a, b)
	local sum = func_add(a, b)
	func_print(sum)
end

addAndPrint(add, myprint, 10, 20)

-- lua func can have multiple return value

local function returnMult()
	return 1, 2, 3
end

myprint(returnMult())

-- 可变参数
-- select('#', …) 返回可变参数的长度。
-- select(n, …) 用于返回从起点 n(从1开始没有0) 开始到结束位置的所有参数列表

local function average(...)
	local count = select("#", ...)
	print(count)
	print(select(1, ...))
	local arg = { ... } --> arg 为一个表，局部变量
	local result = 0
	-- _ 表示该变量未使用到
	for _, v in ipairs(arg) do
		result = result + v
	end
	print(result / count)
end

average(1, 2, 3, 4, 5)

```
