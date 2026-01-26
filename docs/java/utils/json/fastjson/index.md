# fastjson

在 `FastJSON` 中，你可以使用 `JSONObject` 类来表示一个 JSON 对象。`JSONObject` 类是 `FastJSON` 提供的一个用于处理
JSON 数据的核心类之一，它允许你通过键值对的方式存储数据，并提供了多种方法来操作这些数据。

下面是一个简单的示例，展示了如何使用 `FastJSON` 创建一个 `JSONObject` 并添加一些字段：

```java
public class JSONObjectDemo {
    public static void main(String[] args) {
        // 创建一个 JSONObjectDemo 对象
        JSONObject jsonObject = new JSONObject();

        // 向 JSONObjectDemo 添加键值对
        jsonObject.put("name", "John Doe");
        jsonObject.put("age", 30);
        jsonObject.put("isStudent", false);

        String name = jsonObject.getString("name");
        System.out.println("name = " + name);
        String jsonString = "{\"name\":\"Jane Doe\",\"age\":25,\"isStudent\":true}";
        JSONObject jsonObject1 = JSONObject.parseObject(jsonString);
        System.out.println("jsonObject1 = " + jsonObject1);
    }
}

```

```java
import com.alibaba.fastjson.JSONObject;

public class FastJsonParseExample {
    public static void main(String[] args) {
        String jsonString = "{\"name\":\"Jane Doe\",\"age\":25,\"isStudent\":true}";

        // 解析 JSON 字符串到 JSONObject
        JSONObject jsonObject = JSONObject.parseObject(jsonString);

        // 输出 JSON 对象
        System.out.println(jsonObject.toJSONString());
    }
}
```

这里，`parseObject` 方法用于解析一个 JSON 格式的字符串并返回一个 `JSONObject` 对象。

```java
public class JSONObjectDemo1 {
    public static void main(String[] args) {
        JSONObject parentJson = new JSONObject();
        JSONObject childJson = new JSONObject();
        childJson.put("name","cliff");


        parentJson.put("name","jasper");
        parentJson.put("childJson",childJson);

        System.out.println("parentJson = " + parentJson.toJSONString());

        JSONObject childJson1 = parentJson.getJSONObject("childJson");
        System.out.println("childJson1 = " + childJson1);
    }
}

```