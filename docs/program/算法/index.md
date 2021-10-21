## 1. LRU 算法

![LRU算法](/img/算法/LRU.webp)

> - 一个 Map 对象在迭代时会根据对象中元素的插入顺序来进行

> - 新添加的元素会被插入到 map 的末尾，整个栈倒序查看

```js
class LRUCache {
  constructor(size = 0) {
    this.map = new Map();
    this.size = size;
  }
  get(key) {
    if (this.map.has(key)) {
      const value = this.map.get(key);
      this.map.delete(key);
      this.map.set(key, value);
      return value;
    }
    return -1;
  }
  put(key, value) {
    //  有key
    if (this.map.has(key)) {
      this.map.delete(key);
      this.map.set(key, value);
    } else if (this.map.size() < this.size) {
      // key 不存在，cache未满
      this.map.set(key, value);
    } else {
      //key不存在，cache已满

      // 添加新key，删除旧key
      this.map.set(key, value);
      // 删除map的第一个元素，既为最长未使用
      this.secretKey.delete(this.secretKey.keys().next().value);
    }
  }
}
// let cache = new LRUCache(2);
// cache.put(1, 1);
// cache.put(2, 2);
// console.log("cache.get(1)", cache.get(1))// 返回  1
// cache.put(3, 3);// 该操作会使得密钥 2 作废
// console.log("cache.get(2)", cache.get(2))// 返回 -1 (未找到)
// cache.put(4, 4);// 该操作会使得密钥 1 作废
// console.log("cache.get(1)", cache.get(1))// 返回 -1 (未找到)
// console.log("cache.get(3)", cache.get(3))// 返回  3
// console.log("cache.get(4)", cache.get(4))// 返回  4
```
