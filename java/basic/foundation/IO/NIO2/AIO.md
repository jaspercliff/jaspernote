# AIO



## 异步IO
支持同步和异步
在Java中，异步I/O（AIO）是从Java 7开始引入的，作为新的I/O API（也称为NIO 2.0）。这一套API在`java.nio.channels`包下，
通过它，Java程序可以非阻塞地执行I/O操作，同时继续处理其他任务，直到I/O操作完成。Java的异步I/O主要围绕以下几个核心类和接口展开：



### 核心类和接口

- **AsynchronousFileChannel**：用于文件I/O操作的异步通道。
- **AsynchronousSocketChannel**和**AsynchronousServerSocketChannel**：用于网络I/O操作的异步通道。
- **CompletionHandler**接口：当异步操作完成时，由系统回调的处理器。它有两个方法：`completed`（操作成功完成时调用）和`failed`（操作失败时调用）。

### 异步I/O操作的基本流程

1. **打开异步通道**：首先，需要打开一个异步通道（如`AsynchronousFileChannel`或`AsynchronousSocketChannel`）。

2. **发起异步操作**：通过异步通道的方法发起异步I/O操作。这些操作通常会立即返回，不会阻塞调用线程。

3. **处理结果**：异步操作可以通过两种方式处理结果：
    - **回调方式**：传递一个实现了`CompletionHandler`接口的对象。异步操作完成（无论成功还是失败）时，会调用相应的回调方法。
    - **Future方式**：异步操作会返回一个`Future`对象，通过它可以检查操作是否完成，等待操作完成，或者获取操作的结果。

### 示例：使用AsynchronousFileChannel读取文件

``` java
package com.jasper.AIO;

import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.channels.AsynchronousFileChannel;
import java.nio.channels.CompletionHandler;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;

public class AsyncFileReadExample {
    public static void main(String[] args) throws IOException, InterruptedException {
        Path path = Paths.get("C:\\code\\javaBasic\\IO\\src\\main\\java\\com\\jasper\\AIO\\input.txt");
        try(AsynchronousFileChannel asynchronousFileChannel = AsynchronousFileChannel.open(path, StandardOpenOption.READ)){
            ByteBuffer buffer = ByteBuffer.allocate(1024);
            asynchronousFileChannel.read(buffer, 0, buffer, new CompletionHandler<Integer, ByteBuffer>() {
                @Override
                public void completed(Integer result, ByteBuffer attachment) {
                    try {
                        Thread.sleep(1000);
                    } catch (InterruptedException e) {
                        throw new RuntimeException(e);
                    }
                    System.out.println("Read done! Bytes read: " + result);
                    attachment.flip();
                    byte[] data = new byte[attachment.limit()];
                    attachment.get(data);
                    System.out.println(new String(data));
                    attachment.clear();
                }

                @Override
                public void failed(Throwable exc, ByteBuffer attachment) {
                    System.out.println("Read failed!");
                    exc.printStackTrace();
                }
            });
            System.out.println("haha");
            // 模拟其他任务执行
            Thread.sleep(2000); // 等待异步读取完成
            System.out.println("system exit");
        }
    }
}

```

在这个示例中，`AsynchronousFileChannel`用于异步读取文件内容。读取操作立即返回，并通过传入的`CompletionHandler`处理读取完成或失败的情况。

### 注意

- 异步I/O对于提高应用程序的响应性和吞吐量非常有帮助，特别是在处理大量并发I/O操作时。
- 使用异步I/O时，需要考虑回调逻辑的复杂性和错误处理。
- Java的异步I/O提供了与传统同步I/O相比更高级的控制，但实现起来可能更复杂。适当使用异步I/O可以显著提升性能，但也需要仔细设计程序逻辑，以避免常见的并发问题。
