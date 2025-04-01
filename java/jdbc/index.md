# jdbc

JDBC提供了以下几种接口和类来访问数据库：

DriverManager：管理JDBC驱动程序的基本服务。
Connection：与特定数据库的连接。
Statement：用于发送SQL语句到数据库。
PreparedStatement：继承自Statement接口，用于执行预编译的SQL语句。
CallableStatement：用于调用数据库中的存储过程。
ResultSet：表示SQL查询的结果集。

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