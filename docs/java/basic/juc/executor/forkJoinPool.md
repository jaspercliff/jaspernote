# forkJoinPool

专为并行计算设计的线程池,每个线程都有自己的队列，当线程的任务队列空了，他会去偷取其他队列末尾的任务来执行
最大化cpu利用率

threadpoolexecutor 共用一个任务队列 独立任务 fork可拆分任务

Fork：把一个大任务拆分成多个小任务，分给不同线程并行执行
Join：等待所有小任务完成后，合并结果

主要用于：
	•	大数据量计算（比如排序、统计）
	•	递归拆分任务
	•	并行流（parallelStream() 背后就是它）

子类
1. RecursiveTask`<V>` → 有返回值
2. RecursiveAction → 无返回值

- fork执行方式异步，提交到线程池队列，
- compute立即返回同步，在当前线程直接执行，阻塞等结果

## demo 


```java
public class SumTask extends RecursiveTask<Long> {
    private final long start;
    private final long end;
    private static final long THRESHOLD = 10000;

    public SumTask(long start, long end) {
        this.start = start;
        this.end = end;
    }
    @Override
    protected Long compute() {
        if ((end - start) <= THRESHOLD) {
            long sum = 0;
            for (long i = start; i <= end; i++) {
                sum += i;
            }
            return sum;
        }
        long step = (end-start) / 4;
        long mid1 = start + step;
        long mid2 = start + step*2;
        long mid3 = start + step*3;

        final SumTask task1 = new SumTask(start, mid1);
        final SumTask task2 = new SumTask(mid1,mid2);
        final SumTask task3 = new SumTask(mid2,mid3);
        final SumTask task4 = new SumTask(mid3,end);
        task1.fork();//async
        task2.fork();
        task3.fork();
        final Long result4 = task4.compute();//当前线程同步
        final Long result1 = task1.join();
        final Long result2 = task2.join();
        final Long result3 = task3.join();
        return result1+result2+result3+result4;
    }
}

public class ForkJoinPoolDemo {
    public static void main(String[] args) {
        try (ForkJoinPool forkJoinPool = new ForkJoinPool()) {
            final Long invoke = forkJoinPool.invoke(new SumTask(1, 100000));
            System.out.println("invoke = " + invoke);
        }
    }
}
```


## source code 

