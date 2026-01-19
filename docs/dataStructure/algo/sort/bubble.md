# bubble

时间复杂度：O(n^2)
空间复杂度：O(1) 仅需一个临时变量用于交换 不需要额外数组或递归栈
最好情况：O(n)  数组已经有序，且实现提前终止优化
最坏情况：O(n^2) 数组完全逆序
稳定性：稳定
排序方式：in-space

小气泡轻，每次会慢慢往上浮，大气泡重，会沉在下面
冒泡排序：让大的元素浮在数组的末尾（升序），从第一个元素开始，俩俩比较相邻元素，如果前面的大于后面的，就交换他们，这样每次最大的元素都会冒泡到末尾

```java
final Random random = new Random();
final int[] array = random.ints(10, 0, 100).toArray();
for (int i = 0; i < array.length; i++) {
    boolean swap = false; //本轮是否发生交换
    // 每一次都会将最大值冒泡到最后面 所以-i
    for (int j = 0; j < array.length-1-i; j++) {
        int temp = array[j];
        if (array[j]>array[j+1]) {
            array[j] = array[j+1];
            array[j+1] = temp;
            swap = true;
        }
    }
    if (!swap) {
        System.out.println("在"+(i+1)+"轮后提前终止");
        break;
    }
}
Arrays.stream(array).forEach(System.out::println);
```
