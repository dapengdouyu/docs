# call & apply

- `call` 改变了 `this` 的指向
- 函数执行了

```js
Function.prototype.call = function(context) {
  // context 可能是基本类型 如果传入context时,this指向时windows
  context = Object(context) || window;
  context.fn = this;
  //   保存参数
  var args = [];
  for (var i = 1; i < arguments.length; i++) {
    args.push(JSON.stringify(arguments[i]));
  }
  var result = eval("context.fn(" + args.join(",") + ")");
  delete context.fn;
  return result;
};
```

> - 将函数设为对象的属性
> - 执行该函数
> - 删除该函数

## apply

```js
Function.prototype.apply = function(context, arr) {
  var context = Object(context) || window;
  context.fn = this;

  var result;
  if (!arr) {
    result = context.fn();
  } else {
    var args = [];
    for (var i = 0, len = arr.length; i < len; i++) {
      args.push("arr[" + i + "]");
    }
    result = eval("context.fn(" + args + ")");
  }

  delete context.fn;
  return result;
};
```
