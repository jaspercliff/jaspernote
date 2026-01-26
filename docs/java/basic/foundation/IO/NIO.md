# NIO

## Channel 通道

通道 Channel 是对原 I/O 包中的流的模拟，可以通过它读取和写入数据

- FileChannel：用于文件的数据读写。不支持非阻塞模式。
- DatagramChannel：可以通过UDP读写网络中的数据。
- SocketChannel：可以通过TCP读写网络中的数据，支持非阻塞模式。
- ServerSocketChannel：可以监听新进来的TCP连接，像Web服务器那样。对每一个新进来的连接都会创建一个SocketChannel。

###  FileChannel.transferTo
将数据从一个文件通道传输到另一个可写入字节通道（WritableByteChannel）,底层也是操作系统的零拷贝

- position: 指定从文件通道的哪个位置开始读取数据。
- count: 指定最多要传输的字节数。
- target: 数据要传输到的目标通道，必须是可写入的字节通道（WritableByteChannel）。
- 返回实际传输的字节数

```java
public class FileChannelDemo {
    static void main(String[] args) throws IOException {
        final RandomAccessFile file = new RandomAccessFile(Constants.NIO_FILE_PATH, "r");

        final SocketChannel clientChannel = SocketChannel.open();
        clientChannel.connect(new InetSocketAddress(Constants.IP, Constants.PORT));
        FileChannel fileChannel = file.getChannel();
        try (file; fileChannel; clientChannel) {
            long position = 0;
            long count = fileChannel.size();
            long transferred;

            while (count >0) {
                transferred  = fileChannel.transferTo(position, count , clientChannel);
                position += transferred;
                count -= transferred;
            }
        }
    }
}
```

## Buffer 缓冲区

给通道发送或者接受数据都得先放到缓冲区中
缓冲区本质是一个数组 提供了对数据的结构化访问，而且还可以跟进系统的读写进程
在Java NIO中，缓冲区（Buffer）是一个对象，用于存储数据。当使用NIO进行I/O操作时，
总是先将数据读入到一个缓冲区，或者从一个缓冲区写出数据。缓冲区实质上是一个可以读写数据的内存块，可以被视为一个容器对象

### 缓冲区的主要特性

- **容量（Capacity）**：缓冲区能够容纳的数据元素的最大数量。在缓冲区创建时被设定且不可改变。
- **限制（Limit）**：缓冲区的第一个不能被读或写的数据的索引。**即位于limit后的数据不能被读写**。Limit可以被设置且小于等于capacity。
- **位置（Position）**：下一个要被读或写的元素的索引。Position会自动由相应的get()和put()函数更新。
- **标记（Mark）**：一个备忘位置。可以通过mark()方法设定mark = position，通过reset()方法设定position = mark。标记在设定前是未定义的(undefined)。

### 缓冲区的类型

Java NIO 提供了以下类型的缓冲区，每种类型的缓冲区都管理着其对应的基本类型元素的固定长度列表：

- **ByteBuffer**：字节缓冲区，最常用的类型。
- **CharBuffer**：字符缓冲区。
- **ShortBuffer**：短整型缓冲区。
- **IntBuffer**：整型缓冲区。
- **LongBuffer**：长整型缓冲区。
- **FloatBuffer**：浮点型缓冲区。
- **DoubleBuffer**：双精度浮点型缓冲区。

### 缓冲区的基本操作

1. **分配（Allocate）**：给缓冲区分配指定容量的空间。
   ```java
   ByteBuffer buffer = ByteBuffer.allocate(10); // 分配一个容量为10的ByteBuffer
   ```

2. **写入数据（Put）**：将数据写入缓冲区。
   ``` java
   buffer.put((byte) 123); // 写入一个字节
   ```

3. **翻转（Flip）**：从写模式切换到读模式。
   ``` java
   buffer.flip(); // 切换模式，准备读取刚刚写入的数据
   ```

4. **读取数据（Get）**：从缓冲区读取数据。
   ``` java
   byte b = buffer.get(); // 读取一个字节
   ```

5. **重绕（Rewind）**：将position设回0，可以重新读取缓冲区中的所有数据。
   ``` java
   buffer.rewind();
   ```

6. **清空（Clear）**：清空缓冲区，为再次写入数据做准备。
   ``` java
   buffer.clear(); // 清空缓冲区。注意：数据并未被清除，只是位置被重置
   ```


``` java
package com.jasper.nio;

import java.io.IOException;
import java.io.RandomAccessFile;
import java.nio.ByteBuffer;
import java.nio.channels.FileChannel;

public class FileChannelExample {
    public static void main(String[] args) throws IOException {
        RandomAccessFile file = new RandomAccessFile("C:\\code\\javaBasic\\IO\\src\\main\\java\\com\\jasper\\nio\\data.txt", "rw");
        FileChannel channel = file.getChannel();
        ByteBuffer buffer = ByteBuffer.allocate(48);
        int read = channel.read(buffer);
        System.out.println("read = " + read);
        while (read != -1){
            buffer.flip();

            while (buffer.hasRemaining()){
                System.out.print((char) buffer.get());
            }
            buffer.clear();
        }
        file.close();
    }
}
```
``` java title="NIO copy file demo" 
package com.jasper.nio;

import java.io.*;
import java.nio.ByteBuffer;
import java.nio.channels.FileChannel;

public class NIOCopyFileDemo {
    public static void main(String[] args) throws IOException {
        FileInputStream fileInputStream = new FileInputStream("C:\\code\\javaBasic\\IO\\src\\main\\java\\com\\jasper\\nio\\data.txt");
        FileChannel fci = fileInputStream.getChannel();
        FileOutputStream fileOutputStream = new FileOutputStream("C:\\code\\javaBasic\\IO\\src\\main\\java\\com\\jasper\\nio\\output.txt");
        FileChannel fco = fileOutputStream.getChannel();

        ByteBuffer buffer = ByteBuffer.allocate(1024);
        //将读取的数据写到缓冲区
        int read = fci.read(buffer); //此时position = read
        while (read != -1) {
            buffer.flip(); // 准备读取数据    limit设置为当前position position = 0
            fco.write(buffer); // 写入数据
            while (buffer.hasRemaining()){
                System.out.print((char) buffer.get());
            }
            buffer.clear();
        }
        fileInputStream.close();
        fileOutputStream.close();

    }
}

```

## 选择器
NIO 实现了 IO 多路复用中的 Reactor 模型，**一个线程 Thread 使用一个选择器 Selector 通过轮询的方式去监听多个通道 Channel 上的事件**，
从而让一个线程就可以处理多个事件。通过配置监听的通道 Channel 为非阻塞，那么当 Channel 上的 IO 事件还未到达时，就不会进入阻塞状态一直等待，
而是继续轮询其它 Channel，找到 IO 事件已经到达的 Channel 执行
一个线程来处理多个事件
``` mermaid
graph TD;
    A[Thread] --> B[Selector]
    B --> C[Channel 1]
    B --> D[Channel 2]
    B --> E[Channel 3]
```
非阻塞模式的适用场景：
网络I/O：在处理网络I/O时，非阻塞模式非常有用，因为网络操作可能会由于各种原因（如网络延迟、对方应用程序处理缓慢等）导致数据不可用。在这种情况下，非阻塞模式允许程序执行其他任务，而不是无休止地等待数据到达。
多路复用I/O：通过使用选择器（Selector）和非阻塞通道（如SocketChannel），一个单独的线程可以管理多个网络连接，这对于需要处理成千上万个网络连接的高性能网络服务器尤其重要。
Java NIO的选择器（Selector）是Java NIO中的一个高级组件，用于检查一个或多个NIO通道（Channel），并确定哪些通道准备好了进行读取、写入或连接。选择器使用单个线程来管理多个通道，这是非阻塞I/O的基础，允许你的程序更加高效地使用系统资源。

### 核心知识点概述：

1. **多路复用**：
   选择器可以同时监控多个通道的I/O状态，这被称为I/O多路复用。这样，单个线程可以管理多个并发的数据传输。

2. **通道注册**：
   通道必须是非阻塞的才能注册到选择器。这通常涉及到`SelectableChannel`的子类，如`SocketChannel`或`ServerSocketChannel`。

3. **选择键**：
   当通道注册到选择器时，选择器会返回一个`SelectionKey`对象。这个对象代表了注册到该选择器的通道。`SelectionKey`包含了兴趣集合，
4. 即当前通道感兴趣的操作集合，如读（OP_READ）、写（OP_WRITE）、连接（OP_CONNECT）和接受（OP_ACCEPT）。

4. **选择操作**：
   选择器通过其`select()`方法检查注册的通道，如果某个通道准备好了进行注册时指定的操作，就会被选择器选中。`select()`方法返回值表示有多少通道已准备好。

5. **选择集**：
   被选中的通道集合可以通过选择键集来访问，有三种类型：
    - **keys()**：所有注册到该选择器的通道的选择键集合。
    - **selectedKeys()**：准备好至少一个注册操作的通道的选择键集合。
    - **cancelledKeys()**：已取消的键，即将被注销的通道的集合。

6. **阻塞与非阻塞模式**：
   `select()`方法有阻塞和非阻塞两种模式。阻塞模式会等待至少一个通道准备好，而非阻塞模式（`selectNow()`）会立即返回，不管是否有通道准备好。

7. **唤醒选择器**：
   可以通过`wakeup()`方法来唤醒阻塞在`select()`方法上的选择器。这是一个线程安全的方法，可以从其他线程中调用。

### 使用选择器的步骤：

1. **打开选择器**：
   ``` java
   Selector selector = Selector.open();
   ```

2. **注册通道**：
   ``` java
   channel.configureBlocking(false);
   SelectionKey key = channel.register(selector, SelectionKey.OP_READ);
   ```

3. **选择就绪的通道**：
   ``` java
   int readyChannels = selector.select();
   if (readyChannels == 0) continue;
   ```

4. **处理就绪的通道**：
   ``` java
   Set<SelectionKey> selectedKeys = selector.selectedKeys();
   Iterator<SelectionKey> keyIterator = selectedKeys.iterator();
   while (keyIterator.hasNext()) {
       SelectionKey key = keyIterator.next();
       if (key.isAcceptable()) {
           // a connection was accepted by a ServerSocketChannel.
       } else if (key.isConnectable()) {
           // a connection was established with a remote server.
       } else if (key.isReadable()) {
           // a channel is ready for reading
       } else if (key.isWritable()) {
           // a channel is ready for writing
       }
       keyIterator.remove();
   }
   ```

5. **关闭选择器**
   关闭选择器同时会关闭所有注册到该选择器的通道。
   ``` java
   selector.close();
   ```

使用选择器时应该注意的是，选择键的`interest set`是动态的，可以随时改变，但是必须在对应的通道注册到某个选择器之后。此外，选择器本身是安全的，但是大量的I/O操作和选择键集的迭代操作并不是线程安全的，因此需要小心同步。

选择器是实现高性能网络服务器的关键，它允许服务器使用较少的线程来处理大量的并发连接。

