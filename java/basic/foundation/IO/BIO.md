# IO
- InputStream/Reader: 所有的输入流的基类，前者是字节输入流，后者是字符输入流。
- OutputStream/Writer: 所有输出流的基类，前者是字节输出流，后者是字符输出流。
## File
```java
@Slf4j
public class FileByteDemo {
    public static void main(String[] args) {
        try (FileInputStream fileInputStream = new FileInputStream("/Users/jasper/IdeaProjects/person/javaLearn/javaBasic/src/main/java/com/jasper/io/doc/1.jpeg");
             final FileOutputStream fileOutputStream = new FileOutputStream("/Users/jasper/IdeaProjects/person/javaLearn/javaBasic/src/main/java/com/jasper/io/doc/2.jpeg")
        ) {
            int byteRead;
            while ((byteRead = fileInputStream.read()) != -1) {
                fileOutputStream.write(byteRead);
            }
        }catch (IOException e) {
            log.error(e.getMessage());
        }
    }
}
```

```java
@Slf4j
public class FileCharDemo {
    public static void main(String[] args) {
//        是基于字符的，它会尝试用默认编码（通常是 UTF-8）来解释字节
        try (final FileReader fileReader = new FileReader("/Users/jasper/IdeaProjects/person/javaLearn/javaBasic/src/main/java/com/jasper/io/doc/source.txt");
             final FileWriter fileWriter = new FileWriter("/Users/jasper/IdeaProjects/person/javaLearn/javaBasic/src/main/java/com/jasper/io/doc/target.txt")
        ) {
            int byteValue;
            while ((byteValue = fileReader.read()) != -1) {
                fileWriter.write(byteValue);
            }
        } catch (IOException e) {
            log.error(e.getMessage());
        }
    }
}
```

## buffed
java中的缓冲输入输出流主要是通过BufferedInputStream和BufferedOutputStream类来实现的。这些流类包装了其他类型的输入输出流（如文件流FileInputStream和FileOutputStream），
提供了缓冲功能，以增强文件读写操作的效率和性能。缓冲流通过减少实际的物理读写次数来提高IO操作的效率，因为直接对磁盘的读写操作相比内存操作要慢得多
```java
@Slf4j
public class BufferByteDemo {
   public static void main(String[] args) {
      try (FileInputStream fileInputStream = new FileInputStream("/Users/jasper/IdeaProjects/person/javaLearn/javaBasic/src/main/java/com/jasper/io/doc/1.jpeg");
           final FileOutputStream fileOutputStream = new FileOutputStream("/Users/jasper/IdeaProjects/person/javaLearn/javaBasic/src/main/java/com/jasper/io/doc/2.jpeg");
           final BufferedInputStream bufferedInputStream = new BufferedInputStream(fileInputStream);
           final BufferedOutputStream bufferedOutputStream = new BufferedOutputStream(fileOutputStream)
      ) {
         int byteRead;
         while ((byteRead = bufferedInputStream.read()) != -1) {
            bufferedOutputStream.write(byteRead);
            //                数据先写到内存缓冲区 不会立即写到磁盘或者网络上，只有缓冲区慢了或者流关闭的时候才会写入，使用flush可以手动刷新缓冲区，立刻写入文件
            bufferedOutputStream.flush();
         }
      } catch (IOException e) {
         log.error(e.getMessage());
      }
   }
}
```
```java
@Slf4j
public class BufferedCharDemo {
    public static void main(String[] args) {
//        是基于字符的，它会尝试用默认编码（通常是 UTF-8）来解释字节
        try (final FileReader fileReader = new FileReader("/Users/jasper/IdeaProjects/person/javaLearn/javaBasic/src/main/java/com/jasper/io/doc/source.txt");
             final FileWriter fileWriter = new FileWriter("/Users/jasper/IdeaProjects/person/javaLearn/javaBasic/src/main/java/com/jasper/io/doc/target.txt");
             final BufferedReader bufferedReader = new BufferedReader(fileReader);
             final BufferedWriter bufferedWriter = new BufferedWriter(fileWriter)
        ) {
            int byteValue;
            while ((byteValue = bufferedReader.read()) != -1) {
                bufferedWriter.write(byteValue);
               //                数据先写到内存缓冲区 不会立即写到磁盘或者网络上，只有缓冲区慢了或者流关闭的时候才会写入，使用flush可以手动刷新缓冲区，立刻写入文件
               bufferedWriter.flush();
            }
        } catch (IOException e) {
            log.error(e.getMessage());
        }
    }
}
```
### flush
- 数据先写到内存缓冲区 不会立即写到磁盘或者网络上，只有缓冲区慢了或者流关闭的时候才会写入，使用flush可以手动刷新缓冲区，立刻写入文件
- 网络编程中：常常用 flush() 确保立即发送数据，避免通信延迟。
- 写日志、用户输入反馈等实时性要求较高的场景：手动 flush() 可以提高用户体验。


## properties

用于读取和写入 .properties 配置文件的一个类，常用于配置参数、国际化、多环境支持等场景
```java
package com.jasper.io;

import java.io.*;
import java.util.Properties;

public class PropertiesDemo {
   public static void main(String[] args) throws FileNotFoundException {
      final Properties properties = new Properties();
      final File file = new File("/Users/jasper/IdeaProjects/person/javaLearn/javaBasic/src/main/java/com/jasper/io/test.properties");
      try( FileInputStream fileInputStream = new FileInputStream(file);) {
//            用于从输入流中加载属性配置
         properties.load(fileInputStream);
         final String property = properties.getProperty("name");
         System.out.println("property = " + property);

         for (final String key : properties.stringPropertyNames()) {
            final String property1 = properties.getProperty(key);
            System.out.println("property1 = " + property1);
         }
      } catch (IOException e) {
         throw new RuntimeException(e);
      }
   }
}

```



## 基本数据类型
`DataInputStream` 和 `DataOutputStream` 是 Java I/O 库中用于读写基本数据类型（如 `int`、`long`、`float`、`double`、`String` 等）的两个类。
它们提供了一种便捷的方式来处理数据流中的基本数据类型和字符串，而无需手动将这些类型转换为字节或从字节转换回来。

### DataInputStream
`DataInputStream` 允许应用程序以便携方式从底层输入流中读取基本 Java 数据类型。
它通常与 `FileInputStream` 配合使用，但也可以用于任何类型的输入流，如 `ByteArrayInputStream`。

#### 基本使用
``` java
package com.jasper.data;

import java.io.*;

public class Demo {
    public static void main(String[] args) throws Exception {
        FileOutputStream fileOutputStream = new FileOutputStream("C:\\code\\javaBasic\\IO\\src\\main\\java\\com\\jasper\\data\\input.txt");
        DataInputStream dataInputStream = getDataInputStream(fileOutputStream);
        System.out.println(dataInputStream.readInt());
        System.out.println(dataInputStream.readInt());
        System.out.println(dataInputStream.readDouble());
        System.out.println(dataInputStream.readBoolean());

    }

    private static DataInputStream getDataInputStream(FileOutputStream fileOutputStream) throws IOException {
        DataOutputStream dataOutputStream = new DataOutputStream(fileOutputStream);
        dataOutputStream.writeInt(2);
        dataOutputStream.writeInt(3);
        dataOutputStream.writeDouble(2.0);
        dataOutputStream.writeBoolean(false);
        dataOutputStream.flush();
        dataOutputStream.close();
        FileInputStream fileInputStream = new FileInputStream("C:\\code\\javaBasic\\IO\\src\\main\\java\\com\\jasper\\data\\input.txt");
        DataInputStream dataInputStream = new DataInputStream(fileInputStream);
        return dataInputStream;
    }
}

```

### 注意事项
- 当使用 `DataOutputStream` 写入数据时，应确保使用与之兼容的 `DataInputStream` 进行读取，以保证数据的正确性和类型匹配。
- `DataInputStream` 和 `DataOutputStream` 操作的是二进制数据，因此写入的数据不是人类可读的文本格式。如果需要查看或编辑生成的文件，需要使用专门的工具或程序进行解析。
- 这些类非常适合于数据序列化的简单场景。然而，对于复杂的对象图或需要跨不同 Java 虚拟机实例交换的数据，考虑使用 Java 的对象序列化机制可能更为合适。

## 序列化
Java中的序列化是一种将对象的状态保存为一系列字节的过程，这些字节可以被存储到磁盘上或通过网络传输到另一个系统。反序列化是序列化的逆过程，它将这些字节转换回原来的对象。Java序列化对于对象的持久化存储和远程方法调用（如在RMI中）尤其重要。

### 实现序列化

要使Java中的一个对象可序列化，其类必须实现`java.io.Serializable`接口。`Serializable`是一个标记接口，不包含方法，其唯一的作用是允许类的对象被序列化。

``` java
import java.io.Serializable;

public class User implements Serializable {
    private static final long serialVersionUID = 1L;

    private String name;
    private transient int age; // 使用transient关键字标记的字段不会被序列化

    // 构造函数、getter和setter省略
}
```

### 序列化和反序列化

使用`ObjectOutputStream`类可以将一个实现了`Serializable`接口的对象序列化到文件中。相应地，可以使用`ObjectInputStream`类从文件中反序列化对象。

#### 序列化示例

``` java
User user = new User();
user.setName("Java");
user.setAge(25);

try (FileOutputStream fileOut = new FileOutputStream("/tmp/user.ser");
     ObjectOutputStream out = new ObjectOutputStream(fileOut)) {
    out.writeObject(user);
} catch (IOException i) {
    i.printStackTrace();
}
```

#### 反序列化示例

``` java
User user = null;
try (FileInputStream fileIn = new FileInputStream("/tmp/user.ser");
     ObjectInputStream in = new ObjectInputStream(fileIn)) {
    user = (User) in.readObject();
} catch (IOException i) {
    i.printStackTrace();
    return;
} catch (ClassNotFoundException c) {
    System.out.println("User class not found");
    c.printStackTrace();
    return;
}

System.out.println("Name: " + user.getName());
System.out.println("Age: " + user.getAge());
```

### 注意事项

1. **`serialVersionUID`**：每个可序列化的类都建议显式声明`serialVersionUID`字段。这个字段用于验证序列化对象的发送方和接收方是否加载了与序列化兼容的类。
2. **`transient`关键字**：如果不希望某个字段被序列化，可以使用`transient`关键字标记这个字段。被`transient`修饰的字段在序列化过程中会被忽略。
3. **安全性**：序列化也引入了潜在的安全问题，因为攻击者可能通过篡改序列化的数据来攻击系统。因此，需要谨慎处理反序列化操作，尤其是处理来自不受信任源的数据。

## 打印流
在Java中，打印流提供了一种方便的方式来输出文本数据。这些流主要通过`PrintStream`和`PrintWriter`类实现，它们都继承自`java.io.OutputStream`和`java.io.Writer`类，分别用于字节流和字符流的输出。这两个类提供了一系列的`print()`和`println()`方法，用于输出各种数据类型（如`int`、`long`、`float`、`double`、`char`、`String`等）的值，而不需要转换为字节或字符。

### PrintStream

`PrintStream`是输出流的一种，最典型的用法是`System.out`，它是`PrintStream`的一个实例，用于向标准输出（通常是控制台）写入数据。

``` java
System.out.println("Hello, World!");
int number = 123;
System.out.println(number);
```

`PrintStream`提供了多种构造器，可以包装其他类型的输出流，例如`FileOutputStream`，从而可以很容易地将数据写入文件。

``` java
try (PrintStream out = new PrintStream(new FileOutputStream("output.txt"))) {
    out.println("Hello, file!");
} catch (FileNotFoundException e) {
    e.printStackTrace();
}
```

### PrintWriter

`PrintWriter`与`PrintStream`类似，但`PrintWriter`是基于字符的。它更适合写入文本数据，尤其是当需要考虑到国际化（处理不同的字符集）时。`PrintWriter`也提供了`print()`和`println()`方法。

``` java
try (PrintWriter writer = new PrintWriter(new FileWriter("output.txt"))) {
    writer.println("Hello, PrintWriter!");
} catch (IOException e) {
    e.printStackTrace();
}
```

与`PrintStream`一样，`PrintWriter`可以包装各种输出流和写入器（Writer），包括文件流（`FileOutputStream`、`FileWriter`）和网络流等。

### 区别和选择

- **处理异常**：`PrintStream`方法不抛出`IOException`，而`PrintWriter`的某些构造器允许设置自动刷新功能，在这种模式下，如果发生I/O错误，客户端可以通过检查`checkError()`方法的返回值来响应错误。对于`PrintWriter`，如果使用了不自动刷新的构造器，则需要手动管理异常。
- **字符编码**：`PrintWriter`支持字符编码，而`PrintStream`使用平台默认的字符编码，这在处理需要特定字符集的国际化文本时非常重要。
- **性能**：对于写入字符数据，`PrintWriter`可能比`PrintStream`更高效，因为它直接处理字符，避免了字符到字节的转换开销。

根据需要输出的数据类型（字节或字符）以及是否需要处理国际化文本，可以选择使用`PrintStream`或`PrintWriter`。
## 随机访问流
在Java中，随机访问文件是通过`RandomAccessFile`类实现的。
这个类支持对文件的随机访问，可以在文件中的任何位置读取或写入数据。
这意味着你不需要从文件开始依次读取到特定位置，而是可以直接跳到感兴趣的部分。
这对于需要频繁寻找特定位置的应用来说非常有用，如数据库的实现。

`RandomAccessFile`同时实现了`DataInput`和`DataOutput`接口，这使得它既可以读取也可以写入各种基本类型的数据
（如`int`、`double`、`String`等），并且以机器独立的方式。

### 访问模式

要使用`RandomAccessFile`，你需要指定文件路径和访问模式。
`RandomAccessFile`类在Java中支持四种不同的访问模式，这些模式定义了文件如何被打开以及如何进行读写操作。这些模式对于控制文件数据的一致性和完整性特别重要，
尤其是在面对系统崩溃或电源故障等情况时。以下是四种模式的简要说明：

### 1. "r" - 只读模式
- 在这个模式下，你只能从文件中读取数据，不能写入新数据。
- 尝试进行写操作会抛出`IOException`。

### 2. "rw" - 读写模式
- 允许对文件进行读取和写入操作。
- 文件的内容可以被修改，如果文件不存在，则会创建一个新文件。

### 3. "rws" - 同步读写模式
- 除了提供"rw"模式的所有功能外，"rws"模式确保每个对文件内容或元数据的更新都同步到底层存储设备。
- 这意味着每次写操作都会同步写入存储设备，确保数据的一致性和耐久性，即使在操作系统崩溃或电源故障的情况下。

### 4. "rwd" - 同步读写模式（仅数据）
- 类似于"rws"模式，但"rwd"模式仅确保对文件内容的更新（而不包括元数据）被同步到存储设备。
- 这个模式适用于需要确保数据一致性但不需要元数据（如文件权限或修改时间）同步更新的情况。

### 使用场景
- **"r"模式**适用于只需要从文件中读取数据的场景。
- **"rw"模式**适用于需要读取文件数据并可能更新文件内容的场景。
- **"rws"和"rwd"模式**适用于需要高数据一致性的场景，比如数据库文件操作，这些模式通过确保写操作直接同步到物理存储设备，减少了数据丢失的风险。

选择正确的访问模式对于应用程序的性能和数据完整性至关重要。"rws"和"rwd"模式虽然提供了更高的数据安全性，但由于同步操作的开销，它们可能会比"rw"模式有更低的性能。

### seek 方法

索引：  0   1   2   3   4
字节： 'H' 'e' 'l' 'l' 'o'

- 将文件指针移动到指定的位置   seek(3) read = l

```java
public class RandomAccessFileDemo {
    public static void main(String[] args){
        try (RandomAccessFile randomAccessFile = new RandomAccessFile("/Users/jasper/IdeaProjects/person/javaLearn/javaBasic/src/main/java/com/jasper/io/00doc/source.txt",
                "rws")) {
//            read 读取一个字节的数据从当前位置
            System.out.println(" 读取之前的位置 "+ randomAccessFile.getFilePointer() +
                    " 读取的内容：" + (char)randomAccessFile.read()+ " 读取之后的位置 " + randomAccessFile.getFilePointer());
            randomAccessFile.seek(4);
            System.out.println(" 读取之前的位置 "+ randomAccessFile.getFilePointer() + " 读取的内容：" + (char)randomAccessFile.read()+
                    " 读取之后的位置 " + randomAccessFile.getFilePointer());
            randomAccessFile.write("world".getBytes());
            randomAccessFile.seek(0);
            int content;
            while ((content = randomAccessFile.read()) != -1){

                System.out.println(" 读取之前的位置 "+ randomAccessFile.getFilePointer() + " 读取的内容：" + (char)content+
                        " 读取之后的位置 " + randomAccessFile.getFilePointer());
            }
        }catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }
}
```

### 应用场景

`RandomAccessFile`非常适合于需要随机访问或修改文件的场景，如：

- 文件的内容需要频繁更新或修改。
- 需要读取文件的某个特定部分。
- 实现数据库索引和其他数据结构，这些结构需要在文件中随机存取数据。

尽管`RandomAccessFile`非常强大，但在处理大型文件或需要高效读写操作的应用中，可能需要考虑其他IO选项，如NIO（New IO），它提供了更高效的IO操作方式。
