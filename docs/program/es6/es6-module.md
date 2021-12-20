# 深入浅出 Commonjs 和 Es Module
今天我们来深度分析一下 `Commonjs` 和 `Es Module`，希望通过本文的学习，能够让大家彻底明白 `Commonjs` 和 `Es Module`原理，能够一次性搞定面试中遇到的大部分有关 `Commonjs` 和 `Es Module` 的问题。

先上问题:

1. Commonjs 和 Es Module 有什么区别 ？
2. Commonjs 如何解决的循环引用问题 ？
3. 既然有了 exports，为何又出了 module.exports ? 既生瑜，何生亮 ？
4. require 模块查找机制 ？
5. Es Module 如何解决循环引用问题 ？
6. exports = {} 这种写法为何无效 ？
7. 关于 import() 的动态引入 ？
8. Es Module 如何改变模块下的私有变量 ？


## 模块化 
模块化主要就是为了解决**全局污染**和**依赖管理混乱**问题

```html
<body>
  <script src="./index.js"></script>
  <script src="./home.js"></script>
  <script src="./list.js"></script>
</body>
```

### 全局污染

没有模块化，那么 `script` 内部的变量是可以`相互污染`的。比如有一种场景，如上 `./index.js` 文件和 `./list.js` 文件为小 A 开发的，./home.js 为小 B 开发的。