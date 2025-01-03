# freemarker

要在Spring Boot项目中集成Freemarker模板引擎，你可以按照以下步骤操作：

1. **添加依赖**：在你的`pom.xml`文件中添加Freemarker的依赖：
   ```xml
   <dependency>
       <groupId>org.springframework.boot</groupId>
       <artifactId>spring-boot-starter-freemarker</artifactId>
   </dependency>
   ```
2. **配置Freemarker**：通常，在`application.properties`或`application.yml`文件中配置Freemarker的相关属性，例如模板文件存放路径等。示例配置如下：
   ```properties
   # Freemarker settings
   spring.freemarker.template-loader-path=classpath:/templates/
   spring.freemarker.suffix=.ftl
   ```
   这里配置了模板文件的路径为`classpath:/templates/`，并指定了模板文件的后缀为`.ftl`。
3. **创建Freemarker模板**：在指定的模板路径下创建Freemarker模板文件，例如`index.ftl`，可以在里面编写你的模板内容。
4. **创建Controller**：创建一个Spring MVC的Controller，处理请求并返回Freemarker模板。
   ```java
   import org.springframework.stereotype.Controller;
   import org.springframework.ui.Model;
   import org.springframework.web.bind.annotation.GetMapping;

   @Controller
   public class HelloController {
       
       @GetMapping("/hello")
       public String hello(Model model) {
           model.addAttribute("message", "Hello, World!");
           return "hello"; // 返回模板文件名，不带后缀
       }
   }
   ```
   这个示例中，`hello`方法返回的字符串`"hello"`对应于`templates`目录下的`hello.ftl`模板文件。
5. **编写模板文件**：在`templates`目录下创建对应的模板文件，例如`hello.ftl`，可以使用Freemarker的语法进行动态内容的渲染。
   ```html
   <!DOCTYPE html>
   <html>
   <head>
       <title>Hello</title>
   </head>
   <body>
       <h1>${message}</h1>
   </body>
   </html>
   ```
6. **运行项目**：启动你的Spring Boot应用程序，访问对应的URL（如`http://localhost:8080/hello`），应该能够看到Freemarker模板渲染后的结果。

通过这些步骤，你就可以在你的Spring Boot项目中成功集成和使用Freemarker模板引擎了。