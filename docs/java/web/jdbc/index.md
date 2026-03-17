# jdbc

JDBC提供了以下几种接口和类来访问数据库：

DriverManager：管理JDBC驱动程序的基本服务。
Connection：与特定数据库的连接。
ResultSet：表示SQL查询的结果集。

STATEMENT：使用普通的 Statement 对象执行 SQL。这种方式不支持预编译（PreparedStatement），因此不适合处理包含参数的查询。
PREPARED：使用 PreparedStatement 对象执行 SQL。这是最常用的方式，因为它支持预编译 SQL 语句，并且可以防止 SQL 注入攻击，同时也能提高性能，特别是在需要多次执行相同 SQL 语句的情况下。
CALLABLE：使用 CallableStatement 对象执行存储过程。当你需要调用数据库中的存储过程时，就需要使用这种类型

```java
package com.jasper;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

public class JdbcExample {
    public static void main(String[] args) {
        Connection conn = null;
        Statement stmt = null;
        ResultSet rs = null;

        try {
            // 注册JDBC驱动
            Class.forName("com.mysql.cj.jdbc.Driver");

            // 打开连接
            String url = "jdbc:mysql://localhost:3306/learn?useSSL=false&serverTimezone=UTC";
            String user = "root";
            String password = "1q2w3e4r";
            conn = DriverManager.getConnection(url, user, password);

            // 执行查询
            stmt = conn.createStatement();
            String sql = "SELECT id, title FROM system_notice";
            rs = stmt.executeQuery(sql);

            // 展开结果集
            while (rs.next()) {
                int id = rs.getInt("id");
                String name = rs.getString("title");
                System.out.println("ID: " + id + ", title: " + name);
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            // 关闭资源
            try {
                if (rs != null) rs.close();
            } catch (Exception e) {
            };
            try {
                if (stmt != null) stmt.close();
            } catch (Exception e) {
            };
            try {
                if (conn != null) conn.close();
            } catch (Exception e) {
            };
        }
    }
}
```