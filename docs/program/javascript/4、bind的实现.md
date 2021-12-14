# bind 的实现

- 返回一个`函数`
- 可以传入`参数`
- 一个绑定函数也能使用`new` 操作符创建对象
  - 这种行为就像把原函数当成构造器。提供的 `this` 值被`忽略`，同时调用时的参数被提供给`模拟函数`。

## bind 的实现

```js
Function.prototype.bind1 = function(context) {
  // 调用 bind 的不是函数咋办？
  if (typeof this !== "function") {
    throw new Error(
      "Function.prototype.bind - what is trying to be bound is not callable"
    );
  }
  var self = this;
  let args = [].slice.call(arguments, 1);
  function bound() {
    args = args.concat([].slice.call(arguments));
    return self.apply(this instanceof bound ? this : context, args);
  }
  // 修改返回函数的 prototype 为绑定函数的 prototype，实例就可以继承绑定函数的原型中的值
  bound.prototype = Object.create(this.prototype);
  return bound;
};
```

## 参考

- [bind 的实现](https://github.com/mqyqingfeng/Blog/issues/12)
