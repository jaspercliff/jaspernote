# springdoc 

> [官网地址](https://springdoc.org)
```
<!-- https://mvnrepository.com/artifact/org.springdoc/springdoc-openapi-starter-webmvc-ui -->
<dependency>
    <groupId>org.springdoc</groupId>
    <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
    <version>2.8.6</version>
</dependency>
```
```yml
# swagger-ui custom path  
springdoc:  
  swagger-ui:  
    path: /swagger.html
```

## @Tag
组织和分类 API 操作，使 API 文档更加清晰和易读
```java
@RestController  
@Tag(name = "User Operations", description = "Endpoints related to user management")  
public class UserController {
}
```
@Operation
用于定义 API 操作（即接口方法），包括描述、标签、响应等信息。
```java
@Operation(summary = "Get user by ID", description = "Get user details by providing user ID")  
@GetMapping("/{id}")  
public String getUserById(@PathVariable Long id) {  
    // method implementation  
    return "asd";  
}
```
@ApiResponses
用于定义 API 操作的响应信息，可以包括多个 `@ApiResponse` 注解
```java
@Operation(summary = "Get user by ID", description = "Get user details by providing user ID")  
@ApiResponses({  
        @ApiResponse(responseCode = "200", description = "Successful operation"),  
        @ApiResponse(responseCode = "401", description = "User has no privilege")  
})  
@GetMapping("/{id}")  
public String getUserById(@PathVariable Long id) {  
    // method implementation  
    return "asd";  
}
})
```
## @Schema
用于定义数据模型（DTO、实体类）的属性信息，包括类型、格式、描述等
```java
public class User {  
    @Schema(description = "User ID", example = "123")  
    private Long id;  
  
    @Schema(description = "User name", example = "jasper")  
    private String name;  
}
```
## How do I add authorization header in requests?  

- You should add the`@SecurityRequirement`tags to your protected APIs.
- For example:
```java
@Operation(security = { @SecurityRequirement(name = "bearer-key") })
```
- And the security definition sample:

```java
@Bean
 public OpenAPI customOpenAPI() {
   return new OpenAPI()
          .components(new Components()
          .addSecuritySchemes("bearer-key",
          new SecurityScheme().
          type(SecurityScheme.Type.HTTP).
          scheme("bearer").bearerFormat("JWT")));
}
```
## config
```

```