Guava的`EventBus`是一种发布/订阅的消息传递框架，它简化了应用程序中不同组件之间的通信。它允许解耦的应用程序组件通过发送事件来与其他组件通信，而不需要知道谁或者是否有人会处理这些事件。这有助于提高代码的可维护性和可测试性。

下面是一个简单的使用`EventBus`的例子：

1. **定义事件类** - 首先你需要定义一个事件类，该类通常包含一些数据，这些数据将由监听该事件的订阅者处理。

    ```java
    public static class SimpleEvent {
        private final String message;
        public SimpleEvent(String message) { this.message = message; }
        public String getMessage() { return message; }
    }
    ```

2. **创建EventBus实例** - `EventBus`是单例模式的，你可以直接创建一个新的`EventBus`实例。

    ``` java
    EventBus eventBus = new EventBus();
    ```

3. **注册订阅者** - 接下来需要注册一个或多个订阅者（listener）。订阅者通常实现了一个方法，该方法会在接收到事件时被调用。

    ``` java
    class SimpleEventListener {
        @Subscribe
        public void handleSimpleEvent(SimpleEvent event) {
            System.out.println("Received message: " + event.getMessage());
        }
    }

    SimpleEventListener listener = new SimpleEventListener();
    eventBus.register(listener);
    ```

4. **发布事件** - 当需要通知订阅者时，可以向`EventBus`发布事件。

    ``` java
    eventBus.post(new SimpleEvent("Hello EventBus!"));
    ```

5. **注销订阅者** - 当不再需要接收事件时，可以注销订阅者以避免内存泄漏。

    ``` java
    eventBus.unregister(listener);
    ```
请注意，以上示例仅用于说明目的，并且在实际应用中可能需要根据具体情况进行调整。此外，`EventBus`也支持异步事件处理，允许在一个单独的线程中执行事件处理逻辑，这对于需要长时间运行的任务或者可能导致UI阻塞的任务特别有用。
从Guava 30版本开始，`EventBus`已经被标记为`@DoNotUse`，并且在Guava 31中已被移除，因为其设计存在一些问题，特别是关于异常处理方面的问题。