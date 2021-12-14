# new 的实现

- 访问到 `构造函数`里的属性
- 访问到 `构造函数.prototype` 中的属性

## 实现

> 因为 `new`是关键字，所以无法像 `bind`函数一样`直接覆盖`，所以我们写一个函数，命名为 `objectFactory`，来模拟 new 的效果

- 用 `new Object()` 的方式新建了一个对象 obj
- 取出`第一个参数`，就是我们要传入的构造函数。此外因为 shift 会修改原数组，所以 arguments 会被去除第一个参数
- 将 `obj`的原型指向构造函数，这样 obj 就可以访问到构造函数原型中的属性
- 使用 `apply`，改变构造函数 this 的指向到新建的对象，这样 obj 就可以访问到构造函数中的属性
- 返回 `obj`

```js
function objectFactory() {
  var obj = new Object();
  const Constructor = [].shift.call(arguments);
  obj.__proto__ = Constructor.prototype;
  Constructor.apply(obj, arguments);
  return obj;
}
```

## 问题

如果构造函数返回了一个`对象`，在实例 `person`中只能访问`返回的对象`中的属性。

```js
function objectFactory() {
  var obj = new Object();
  const Constructor = [].shift.call(arguments);
  obj.__proto__ = Constructor.prototype;
  const ret = Constructor.apply(obj, arguments);
  //   规避null和对象的情况
  return typeof ret === "object" ? ret || obj : obj;
}
```
