# filter 

```java 
@Component
@Slf4j
public class TestFilter implements Filter {
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        log.info("before filter");
        chain.doFilter(request, response);
        log.info("after filter");
    }
}
```

springboot 推荐使用下面的方法 

```java
@Component
@Slf4j
public class TestFilter implements Filter {
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        log.info("before filter");
        chain.doFilter(request, response);
        log.info("after filter");
    }
}

/**
 * 可以精确控制拦截路径（addUrlPatterns）、精确控制执行顺序（setOrder）、支持动态启用/禁用
 */
@Configuration
public class FilterConfig {
    @Bean
    public FilterRegistrationBean<LogFilter> logFilter() {
        FilterRegistrationBean<LogFilter> registration = new FilterRegistrationBean<>();
        registration.setFilter(new LogFilter());
        registration.addUrlPatterns("/*");
        registration.setOrder(1); // 越小优先级越高
        registration.setName("LogFilter");
        registration.setEnabled(true);
        return registration;
    }
}
```
