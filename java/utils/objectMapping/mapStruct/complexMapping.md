# complex mapping

## nested mapping 嵌套映射

```java
public class Order {
    private Long id;
    private Customer customer;
    private List<Product> product;
}

public class OrderDTO {
    private int id;
    private Customer customer;
    private List<ProductDTO> product;
}

public class Product {
    private long id;
    private String name;
    private String desc;
}
public class ProductDTO {
    private long id;
    private String name;
    private String des;
}

@Mapper
public interface OrderConvert {
    OrderConvert INSTANCE = Mappers.getMapper(OrderConvert.class);
    // orderDTO.product(productDTO)   ORDER.product(product)
    // 这里会自己调用下面的productDTOToProduct
    Order OrderDTOToOrder(OrderDTO orderDTO);
    // 这里写了之后 上面的 product的desc 也能赋值上
    @Mapping(target = "desc", source = "des")
    Product productDTOToProduct(ProductDTO productDTO);
}
```
