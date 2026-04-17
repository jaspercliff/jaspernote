# module


```lua 
--从 Lua 5.1 开始，Lua 加入了标准的模块管理机制，可以把一些公用的代码放在一个文件里，以 API 接口的形式在其他地方调用
module = {}

module.constant = "this is a constant"

local function func1()
	print("this is a private function")
end

function module.func2()
	print("this is a public function")
	func1() -- call private func
end

return module
```


Lua提供了一个名为require的函数用来加载模块
执行 require 后会返回一个由模块常量或函数组成的 table，并且还会定义一个包含该 table 的全局变量

```lua 
require("module")

print(module.constant)

module.func2()
```
可以给加载的模块定义别名 

```lua
local m = require("module")
print(m.constant)
m.func2()
```


## lua load c package 

todo
