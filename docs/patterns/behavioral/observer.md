# observer

发布订阅模式
定义一种一对多的对象依赖关系这样当一个对象改变状态时，所有依赖它的对象都将自动通知或更新


- 抽象主题（Subject）： 持有一个观察者列表，提供添加、删除观察者的接口，以及通知所有观察者的抽象方法。
- 具体主题（Concrete Subject）： 被观察的实际对象。当内部状态改变时，会给所有登记过的观察者发出通知。
- 抽象观察者（Observer）： 定义一个更新接口，使得在得到主题更改通知时更新自己。
- 具体观察者（Concrete Observer）： 实现抽象观察者定义的更新接口，以便在主题状态变化时做出反应。

## usage 

当一个对象的改变的同时需要改变其他对象，同时你又不知道有多少对象需要改变时
当一个对象可以通知其他对象而无需假设这些对象是谁时。换句话说，你不想让这些对象紧耦合

## demo 

- [spring的event](/docs/java/framework/spring/core/ioc/applicationContext/event.md)

```java
public enum WeatherType {
    SUNNY,
    RAINY,
    CLOUDY,
    STORMY
}
public interface WeatherObserver {
    void update(WeatherType weatherType);
}

@Slf4j
public class Orcs implements WeatherObserver{

    @Override
    public void update(WeatherType weatherType) {
        log.info("Orcs are in {}", weatherType);
    }
}
@Slf4j
public class Hobbits implements WeatherObserver{

    @Override
    public void update(WeatherType weatherType) {
        log.info("hobbits are face {} weather", weatherType);
    }
}
@Slf4j
public abstract class Subject {
    private final List<WeatherObserver> observers = new ArrayList<>();

    public AutoCloseable register(WeatherObserver observer) {
        if (observer != null && !observers.contains(observer)) {
            observers.add(observer);
        }
        // 返回一个匿名内部类或 Lambda，用于执行取消注册逻辑
        //实际开发中注销 防止list一直持有引用内存泄露
        return () -> {
            unregister(observer);
            assert observer != null;
            log.info("自动注销了:{} ", observer.getClass().getSimpleName());
        };
    }

    public void unregister(WeatherObserver observer) {
        observers.remove(observer);
    }

    // 父类直接实现好通知逻辑，并设为 final 防止子类乱改
    public final void notifyObservers(WeatherType weatherType) {
        for (WeatherObserver observer : observers) {
            observer.update(weatherType);
        }
    }
}

@Slf4j
public class Weather extends Subject {
    private WeatherType currentWeather;

    public Weather(WeatherType currentWeather){
        this.currentWeather = currentWeather;

    }

    public void timePasses() {
        WeatherType[] values = WeatherType.values();
        currentWeather = values[(currentWeather.ordinal() + 1) % values.length];
        log.info("time pass weather is {}",currentWeather);
        notifyObservers(currentWeather);
    }

}
public class App {
    public static void main(String[] args) {
        Weather weather = new Weather(WeatherType.SUNNY);
        try (
                AutoCloseable hobbits = weather.register(new Hobbits());
                AutoCloseable orcs = weather.register(new Orcs())
        ) {
            weather.timePasses();
            weather.timePasses();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
```
