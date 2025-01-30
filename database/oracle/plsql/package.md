# package

在PL/SQL中，包（Package）是一种将相关联的过程、函数、变量、常量、游标以及异常等组织在一起的方式。包有助于提高代码的模块化程度和可维护性，
并且能够隐藏实现细节，只暴露必要的接口给外部使用。一个包由两部分组成：包规范（Package
Specification）和包体（Package Body）。这里主要介绍包规范。

### 包规范

包规范定义了包的公共接口，即可以从包外部访问的内容。它包括了子程序（过程和函数）的声明、游标的声明、类型定义、常量和变量等。
但是，在包规范中不包含具体实现逻辑，这些实现在包体中定义。

#### 包规范的基本结构

```plsql
CREATE OR REPLACE PACKAGE package_name AS
  -- 公共类型的声明
  TYPE type_name IS RECORD (
    field1 datatype,
    field2 datatype,
    ...
  );

  -- 常量声明
  constant_name CONSTANT datatype := value;

  -- 变量声明
  variable_name datatype;

  -- 游标声明
  CURSOR cursor_name (parameter_list) RETURN return_type;

  -- 函数声明
  FUNCTION function_name (parameter_list) RETURN return_type;

  -- 过程声明
  PROCEDURE procedure_name (parameter_list);

END package_name;
/
```

/工具用来识别一个语句块结束的命令