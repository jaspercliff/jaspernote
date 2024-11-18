# file


- [fileDemo](https://github.com/jaspercliff/javaLearn/blob/75bd24b53c08f1a8beaca49d4558677671740b8b/01javaBasic/src/main/java/com/jasper/file/FileDemo.java#L9)
```java
public class FileDemo {
    public static void main(String[] args) throws IOException {
        File directory = new File("C:\\code\\javaLearn\\01javaBasic\\src\\main\\java\\com\\jasper\\file");
        boolean isDirectory = directory.isDirectory();
        System.out.println("isDirectory = " + isDirectory);
        File file = new File(directory, "text1.txt");
        boolean isFile = file.isFile();
        System.out.println("isFile = " + isFile);
        boolean isCreat = file.createNewFile();
        System.out.println("isCreat = " + isCreat);
    }
}
```

``` java
File directory =
        new File("C:\\code\\javaLearn\\01javaBasic\\src\\main\\java\\com\\jasper\\file");
File[] files = directory.listFiles();
    Arrays.stream(files).skip(2).forEach(File::delete);
```