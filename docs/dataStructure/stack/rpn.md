# reverse polish notation 

逆波兰式：也叫后缀表达式 

- 正常表达式：a+b 
- 前缀表达式：+ a b 
- 后缀表达式：a b +

## 不用括号唯一计算 

```text 
(3+4)*5
```
必须有()和优先级才能计算 

rpn:

```text 
3 4 + 5 *
```

不需要() 没有歧义

## 使用栈特别容易计算 

```text 
3 push 
4 push 
+ pop 3 4 -> 7  push
5 push 
* pop 7  5 -> 3 5 
```

- 不用解析优先级 
- [不用递归和ast（语法树)](../tree/ast.md)

## rpn compare ast 

- AST：用来“看懂代码”
- RPN：用来“算出结果”


## impl 

```java
class Solution {
    public int evalRPN(String[] tokens) {
        int res = 0;
        Stack<Integer> stack = new Stack<>();
        for (int i = 0; i < tokens.length; i++) {
            String s = tokens[i];
            if (!isOper(s)) {
                stack.push(Integer.parseInt(s));
            } else {
                Integer pop;
                Integer pop1;
                pop = stack.pop();
                pop1 = stack.pop();
                switch (s) {
                    case "+":
                        stack.push(pop + pop1);
                        break;
                    case "-":
                        stack.push(pop1 - pop);
                        break;
                    case "*":
                        stack.push(pop * pop1);
                        break;
                    case "/":
                        stack.push(pop1 / pop);
                        break;
                }
            }
        }
        res = Integer.valueOf(stack.pop());
        return res;
    }

    private static boolean isOper(String s) {
        return "+-*/".contains(s);
    }
}
```
