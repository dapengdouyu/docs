# 类数组和 arguments

# arguments 和对应参数的绑定

> 传入的参数，`实参`和`arguments`的值会共享，当没有传入时，实参与 `arguments`值`不会`共享

> 除此之外，以上是在非严格模式下，如果是在`严格模式`下，实参和 arguments 是不会共享的。

```js
function foo(name, age, sex, hobbit) {
  console.log(name, arguments[0]); // name name

  // 改变形参
  name = "new name";

  console.log(name, arguments[0]); // new name new name

  // 改变arguments
  arguments[1] = "new age";

  console.log(age, arguments[1]); // new age new age

  // 测试未传入的是否会绑定
  console.log(sex); // undefined

  sex = "new sex";

  console.log(sex, arguments[2]); // new sex undefined

  arguments[3] = "new hobbit";

  console.log(hobbit, arguments[3]); // undefined new hobbit
}

foo("name", "age");
```

## callee 属性

> `Arguments` 对象的 callee 属性，该属性是一个`指针`，指向拥有这个 `arguments 对象`的函数

```js
var data = [];

for (var i = 0; i < 3; i++) {
  (data[i] = function() {
    console.log(arguments.callee.i);
  }).i = i;
}

data[0](); //0
data[1](); //1
data[2](); //2
```
