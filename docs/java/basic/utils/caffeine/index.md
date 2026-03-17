# caffeine

> [官网链接](https://github.com/ben-manes/caffeine/wiki/Home-zh-CN)

缓存和ConcurrentMap有点相似，但还是有所区别。最根本的区别是ConcurrentMap将会持有所有加入到缓存当中的元素，直到它们被从缓存当中手动移除。
但是，Caffeine的缓存Cache 通常会被配置成自动驱逐缓存中元素，以限制其内存占用

- [population(填充、加载)](popultaion.md)
