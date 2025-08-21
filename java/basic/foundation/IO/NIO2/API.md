# API

## Files.copy

Files.copy() 并不是简单地读写字节流，它的实现会根据平台和文件系统 自动选择最优的复制策略，包括：

1. 使用系统级零拷贝（Zero-Copy）技术
   在支持的操作系统上（如 Linux、macOS），Files.copy() 可能使用底层系统调用，例如：

- sendfile()（Linux）
- copyfile()（macOS）
- TransmitFile()（Windows）

这些系统调用允许 数据直接在内核空间从源文件传输到目标文件，无需经过用户空间缓冲区，从而极大提升性能，尤其对大文件。
减少 CPU 拷贝、减少上下文切换、减少内存占用。

如果系统不支持零拷贝，Files.copy() 内部仍会使用高效的缓冲机制(如 FileChannel.transferTo() 或 MappedByteBuffer），
由 JVM 和平台自动优化
### demo
```java
public class FileCopyDemo {
    static void main(String[] args) throws IOException {
        String srcPath = "/Users/jasper/IdeaProjects/person/javaLearn/javaBasic/src/main/java/com/jasper/io/AIO/files/a.txt";
        String destPath = "/Users/jasper/IdeaProjects/person/javaLearn/javaBasic/src/main/java/com/jasper/io/AIO/fileCopy/";
        copyFile(srcPath,destPath);

        String sourceDir = "/Users/jasper/IdeaProjects/person/javaLearn/javaBasic/src/main/java/com/jasper/io/AIO/files";
        String targetDir = "/Users/jasper/IdeaProjects/person/javaLearn/javaBasic/src/main/java/com/jasper/io/AIO/fileCopy1";

        // Files.copy() 不会递归复制目录中的内容。要复制整个目录树，你需要手动遍历目录结构或使用递归方法。
        Files.copy(Paths.get(sourceDir),Paths.get(targetDir) , StandardCopyOption.REPLACE_EXISTING);

    }

    public static void copyFile(String srcPath, String desPath) {
        if (srcPath == null || srcPath.trim().isEmpty()) {
            throw new IllegalArgumentException("Source path cannot be null or empty");
        }
        if (desPath == null || desPath.trim().isEmpty()) {
            throw new IllegalArgumentException("Destination path cannot be null or empty");
        }
        Path src = Paths.get(srcPath.trim());
        Path destDir = Paths.get(desPath.trim());
        Path destFile = destDir.resolve(src.getFileName());
        // 创建目标目录（如果不存在）
        try {
            Files.createDirectories(destDir);
        } catch (IOException e) {
            throw new RuntimeException("Failed to create destination directory: ".concat(destDir.toString()), e);
        }
        // 执行复制
        try {
            Files.copy(src, destFile, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            throw new RuntimeException("Failed to copy file from ".concat(src.toString()).concat(" to ").concat(destFile.toString()), e);
        }
    }
}

```
