--- 
title: prototype
--- 
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

通过“复制”一个现有的对象来创建新对象，而不是通过标准的 new 操作符从头开始初始化。
这种模式在需要创建大量相同或相似对象，且初始化过程非常耗时或复杂的场景下非常有效

- [github](https://github.com/jaspercliff/designPattern/tree/master/java/src/main/java/com/jasper/creational/prototype)

<Tabs>
  <TabItem value="java" label="java" default>

```java
@Slf4j
public abstract class Prototype<T> implements Cloneable {
  @SneakyThrows
  @SuppressWarnings("unchecked")
  public T copy() {
    return (T) super.clone();
  }
}
/**
 * 野兽/坐骑
 */
@NoArgsConstructor
@EqualsAndHashCode(callSuper = false)
public abstract class Beast extends Prototype<Beast> {
  public Beast(Beast source) {
  }

}
@RequiredArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class ElfBeast extends Beast {
  private final String helpType;

  @Override
  public String toString() {
    return "eleven eagle helps in " + helpType;
  }

}
public class HeroFactoryImpl implements HeroFactory {

  private final Beast beast;
  private final Mage mage;
  private final Warlord warlord;

  @Override
  public Beast createBeast() {
    return beast.copy();
  }

  @Override
  public Mage createMage() {
    return mage.copy();
  }

  @Override
  public Warlord createWarlord() {
    return warlord.copy();
  }

}
@Slf4j
public class App {
  public static void main(String[] args) {
    // cooking 冥想 准备中 cleaning 净化
    var factory = new HeroFactoryImpl(new ElfBeast("protecting"),
        new ElfMage("cooking"), new ElfWarlord("cleaning"));
    Beast beast = factory.createBeast();
    Mage mage = factory.createMage();
    var warlord = factory.createWarlord();
    log.info(beast.toString());
    log.info(mage.toString());
    log.info(warlord.toString());
    factory = new HeroFactoryImpl(new OrcBeast("axe"), new OrcMage("sword"), new OrcWarlord("laser"));
    mage = factory.createMage();
    warlord = factory.createWarlord();
    beast = factory.createBeast();
    log.info(mage.toString());
    log.info(warlord.toString());
    log.info(beast.toString());
  }
}
```

</TabItem>

  <TabItem value="python" label="python">
  </TabItem>
</Tabs>
