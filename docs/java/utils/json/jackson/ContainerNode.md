# ContainerNode

`ContainerNode` 是 Jackson 提供的一个抽象类，它是用来构建 JSON 树的一部分。
`ContainerNode` 主要用于表示包含其他节点（如对象或数组）的 JSON 节点。
这个类及其子类（如 `ObjectNode` 和 `ArrayNode`）可以用来手动构造 JSON 内容或者修改现有的 JSON 结构。

- **`ObjectNode`**：代表一个 JSON 对象，它可以包含键值对形式的数据。
- **`ArrayNode`**：代表一个 JSON 数组，它可以包含多个值（这些值可以是任何 JSON 类型）。

当你需要创建一个新的 JSON 对象或数组，并且想要手动添加一些字段或元素进去的时候，
`ObjectNode` 和 `ArrayNode` 就会派上用场。例如，如果你想要创建一个 JSON 对象来作为 HTTP 响应的一部分，
你可以使用 `ObjectNode` 来构造这个对象。


这里是一个简单的例子，展示如何使用 `ObjectNode`：

```java
public class ContainerNodeDemo {
    public static void main(String[] args) {
        ObjectMapper mapper = new ObjectMapper();
        ObjectNode objectNode = mapper.createObjectNode();
        objectNode.put("name", "Jasper");
        objectNode.put("age", 18);
        System.out.println(objectNode);
        ArrayNode arrayNode = mapper.createArrayNode();
        arrayNode.add("Java");
        arrayNode.add("Python");
        System.out.println(arrayNode);
    }
}

```
