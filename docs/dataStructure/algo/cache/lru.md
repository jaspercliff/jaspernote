# lru 

核心思想：如果数据最近被访问过，那么未来被访问的概率也更高。如果数据最久没有被访问过，那么应该最先淘汰掉 

每次访问时就将其移动到链表头部，淘汰时就淘汰链表尾部的元素

使用hash表和双向链表 
hash：o(1) 查找
双向链表：o(1) 移动到头部


## linkedhashmap impl 

```java
public class LruCache {
    private final LinkedHashMap<Integer, Integer> cache;

    public LruCache(int capacity) {
        //true 每次get put都会将该节点移动到尾部 最近使用
        //false 按照插入顺序
        cache = new LinkedHashMap<>(capacity,0.75f,true){
            /**
             * put后自动调用
             */
            @Override
            protected boolean removeEldestEntry(java.util.Map.Entry<Integer, Integer> eldest) {
                return size() > capacity;
            }
        };
    }

    public int get(int key) {
        return cache.getOrDefault(key, -1);
    }

    public void put(int key, int value) {
        cache.put(key, value);
    }

    public void printCache() {
        // 这里的顺序是：Head (最旧) -> Tail (最新)
        System.out.println("当前缓存顺序 (左旧 -> 右新): " + cache.keySet());
    }
}
public class App {
    public static void main(String[] args) {
        LruCache lru = new LruCache(3);
        lru.put(1, 1);
        lru.put(2, 2);
        lru.put(3, 3); // 1 2 3
        lru.printCache();
        System.out.println(lru.get(1)); //2 3 1
        lru.printCache();
        lru.put(4, 4);// 2 淘汰 3 1 4
        lru.printCache();
        System.out.println(lru.get(2));
        lru.put(3, 30);// 1 4 3
        lru.printCache();
    }
}
```

## doublelinkedlist impl 

```java
public class Node {
    public int key,value;
    public Node prev,next;

    public Node(int key,int value){
        this.key = key;
        this.value = value;
    }
}

/**
 * head is old
 * tail is new
 */
public class DoubleList {
    private final Node head;
    private final Node tail; // 头尾节点
    private int size;

    public DoubleList() {
        head = new Node(0, 0);
        tail = new Node(0, 0);
        head.next = tail;
        tail.prev = head;   // head <> tail
        size = 0;
    }

    /**
     * 在尾部添加节点
     *
     * @param node to do add
     */
    public void addLast(Node node) {
        node.prev = tail.prev;
        node.next = tail; //node 前后 指针
        tail.prev.next = node; //node 前的 tail
        tail.prev = node;//tail 的前
        size++;
    }

    /**
     * remove node
     */
    public void remove(Node node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
        size--;
    }

    /**
     * remove first  最久未使用
     */
    public Node removeFirst(){
        if (head.next == tail) return null;
        Node first = head.next;
        remove(first);
        return first; // for hashmap use
    }

    public int getSize(){
        return size;
    }

    public void print() {
        Node p = head.next; // 从第一个真实节点开始
        System.out.print("DoubleList (Head -> Tail): ");
        while (p != tail) {
            System.out.print("[" + p.key + ":" + p.value + "]");
            if (p.next != tail) System.out.print(" <-> ");
            p = p.next;
        }
        System.out.println();
    }
}

public class LruCacheC {
    private HashMap<Integer,Node> map;
    private DoubleList cache;
    private int cap;

    public LruCacheC(int cap){
        this.cap = cap;
        map = new HashMap<>();
        cache = new DoubleList();
    }
    public int get(int key){
        if (!map.containsKey(key)) return -1;
        makeRecently(key);
        return map.get(key).value;
    }

    public void put(int key,int val){
        if (map.containsKey(key)) {
            Node node = map.get(key);
            node.value = val;
            makeRecently(key);
            return;
        }
        if (cap ==cache.getSize()){
            removeLeastRecently();//删除最久未使用的
        }
        addRecently(key,val);
    }

    private void makeRecently(int key){
        Node node = map.get(key);
        cache.remove(node);//已有值 先删除在添加 不然链表结构会乱
        cache.addLast(node);
    }

    private void deleteKey(int key){
        Node node = map.get(key);
        cache.remove(node);
        map.remove(key);
    }
    private void addRecently(int key,int val){
        Node node = new Node(key, val);
        cache.addLast(node);
        map.put(key,node);
    }

    private void removeLeastRecently(){
        Node node = cache.removeFirst();
        map.remove(node.key);
    }

    public void print(){
        cache.print();
    }

}

public class App {
    public static void main(String[] args) {
        LruCacheC lru = new LruCacheC(3);
        lru.put(1, 1);
        lru.put(2, 2);
        lru.put(3, 3); // 1 2 3
        lru.print();
        System.out.println(lru.get(1)); //2 3 1
        lru.print();
        lru.put(4, 4);// 2 淘汰 3 1 4
        lru.print();
        System.out.println(lru.get(2));
        lru.put(3, 30);// 1 4 3
        lru.print();
    }
}


```

