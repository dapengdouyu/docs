# 原型到原型链

<img src="http://img.zhangyapeng.club/javascript/0.原型到原型链/原型.png" alt="javascript/0.原型到原型链" style="zoom:100%;" />

> 图中相互关联的原型组成的链状结构就是原型链，也就是`蓝色`的这条线

## 重点

- 每个`函数`都有一个 `prototype` 属性,这个属性指向了一个`对象`,这个对象正是`调用`该构造函数而创建的`实例的原型`
  - 每一个 `JavaScript 对象`(null 除外)在`创建`的时候就会与之关联另一个`对象`，这个对象就是我们所说的`原型`，每一个对象都会从原型`"继承"`属性。
- 每一个 `JavaScript 对象`(除了 null)都具有的一个属性，叫`__proto__`,这个属性会指向该对象的`原型`。
- 每个原型都有一个`constructor`属性指向关联的`构造函数`
- 当读取实例的`属性`时，如果找不到，就会查找与对象关联的`原型`中的属性，如果还查不到，就去找`原型的原型`，一直找到`最顶层`为止。
  - `原型的原型`是什么? 原型也是一个对象,这个对象的原型指向构造函数的原型也就是 `Object.prototype`
  - `Object.prototype` 的原型呢?为了不死循环所以指向`null`

## \_\_proto\_\_

\_\_proto\_\_, 绝大部分浏览器都支持这个非标准的方法访问原型，然而它并不存在与 `Person.prototype` 中，实际上，它是来自于 `Object.prototype`，与其说是一个属性，不如说是一个 `getter/setter`，当使用 obj.`__proto__`时，可以理解成返回了 `Object.getPrototypeOf(obj)`

## 继承

前面我们讲到“每一个对象都会从原型`"继承"`属性”,实际上，继承是一个十分具有迷惑性的说法

> 引用《你不知道的 JavaScript》中的话，就是:继承意味着`复制操作`

然而 JavaScript 默认并不会复制对象的属性，相反，JavaScript 只是在两个对象之间创建一个关联，这样，一个对象就可以通过`委托`访问另一个对象的属性和函数，所以与其叫继承，`委托`的说法反而更准确些。

## 面试题

```js
function Fn(num) {
  this.x = this.y = num;
}
Fn.prototype = {
  x: 20,
  sum: function() {
    console.log(this.x + this.y);
  },
};
let f = new Fn(10);
console.log(f.sum === Fn.prototype.sum);
f.sum();
Fn.prototype.sum();

console.log(f.constructor);

// true 20 NaN Object
```

## 参考

- [原型到原型链](https://juejin.cn/post/6844903472836395022)
