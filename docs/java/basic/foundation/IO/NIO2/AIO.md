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
   - Future: 操作返回一个 java.util.concurrent.Future 对象。应用程序可以轮询 Future 的状态或调用 get() 方法来阻塞等待结果。
   - CompletionHandler: 提供一个回调接口 `CompletionHandler<V, A>`。当操作完成时，系统会自动调用 completed(V result, A attachment)或 failed(Throwable exc, A attachment) 方法。### 示例：使用AsynchronousFileChannel读取文件

``` java
    public static final String STRING_TO_WRITE = "THIS IS ASYNCHRONOUS FILE DATA TO WRITE";
    public static void main(String[] args) throws IOException, InterruptedException {
        final Path path = Paths.get(Constants.COMMON_PATH);
        final AsynchronousFileChannel asyncFileChannel = AsynchronousFileChannel.open(path, StandardOpenOption.CREATE,
                StandardOpenOption.WRITE,
                StandardOpenOption.TRUNCATE_EXISTING);
        final ByteBuffer buffer = ByteBuffer.wrap(STRING_TO_WRITE.getBytes(StandardCharsets.UTF_8));
        asyncFileChannel.write(buffer,0,asyncFileChannel,new CompletionHandler<Integer, AsynchronousFileChannel>() {
            @Override
            public void completed(final Integer result, final AsynchronousFileChannel attachment) {
                System.out.println("Writing completed asynchronous file... with result bytes written " + result);
                try {
                    attachment.close();
                    asyncRead(path);
                } catch (IOException e) {
                    log.error(e.getMessage());
                } catch (InterruptedException e) {
                    throw new RuntimeException(e);
                }
            }

            @Override
            public void failed(final Throwable exc, final AsynchronousFileChannel attachment) {
                if (attachment!=null && attachment.isOpen()) {
                    try {
                        attachment.close();
                    } catch (IOException e) {
                        log.info(exc.getMessage());
                    }
                }
            }
        });

        Thread.sleep(2000);
        System.out.println("Writing asynchronous file...");

    }


    public static void asyncRead(Path path) throws IOException, InterruptedException {
        final AsynchronousFileChannel readChannel = AsynchronousFileChannel.open(path, StandardOpenOption.READ);
        final long size = readChannel.size();
        ByteBuffer buffer = ByteBuffer.allocate((int) size);
        readChannel.read(buffer,0,new Object[]{readChannel,buffer},new CompletionHandler<Integer, Object[]>() {

            @Override
            public void completed(final Integer result, final Object[] attachment) {
                ByteBuffer byteBuffer = (ByteBuffer) attachment[1];
                AsynchronousFileChannel readChannel = (AsynchronousFileChannel) attachment[0];
                byteBuffer.flip();
                final String content = StandardCharsets.UTF_8.decode(byteBuffer).toString();
                System.out.println("read date is ".concat(content));
                try {
                    readChannel.close();
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }

            @Override
            public void failed(final Throwable exc, final Object[] attachment) {
                AsynchronousFileChannel writeChannel = (AsynchronousFileChannel) attachment[0];
                try {
                    writeChannel.close();
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }
        });
    }

```

在这个示例中，`AsynchronousFileChannel`用于异步读取文件内容。读取操作立即返回，并通过传入的`CompletionHandler`处理读取完成或失败的情况。

### 注意

- 异步I/O对于提高应用程序的响应性和吞吐量非常有帮助，特别是在处理大量并发I/O操作时。
- 使用异步I/O时，需要考虑回调逻辑的复杂性和错误处理。
- Java的异步I/O提供了与传统同步I/O相比更高级的控制，但实现起来可能更复杂。适当使用异步I/O可以显著提升性能，但也需要仔细设计程序逻辑，以避免常见的并发问题。
