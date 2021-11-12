# Promise 的优点

## 1. JS 实现一个带并发限制的异步调度器 Scheduler，保证同时运行的任务最多有`两个`。完善下面代码的 Scheduler 类，使以下程序能够正常输出：

```js
class Scheduler {
  constructor() {
    this.listener = [];
    this.max = 3;
    this.timer = null;
  }
  //   收集依赖
  add(promiseCreator) {
    this.listener.push(promiseCreator);
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(() => {
      this.request();
    });
  }
  request(count = 0) {
    const l = this.listener.shift();
    if (typeof l === "function") {
      l().then(() => {
        this.request(count - 1);
      });
    }
    if (count++ < this.max) {
      this.request(count + 1);
    }
  }
}

const timeout = (time) =>
  new Promise((resolve) => {
    setTimeout(resolve, time);
  });

const scheduler = new Scheduler();

const addTask = (time, order) => {
  scheduler.add(() => timeout(time).then(() => console.log(order)));
};

addTask(1000, "1");
addTask(500, "2");
addTask(300, "3");
addTask(400, "4");
addTask(400, "5");

// output: 2 3 1 4
```

## 2. 实现下面的方法,使其结果为 1200

### 2.1 通过 reduce 实现

```js
function p1(a) {
  return new Promise((resolve, reject) => {
    resolve(a * 5);
  });
}
function p2(a) {
  return new Promise((resolve, reject) => {
    resolve(a * 2);
  });
}
function f3(a) {
  return a * 3;
}
function p4(a) {
  return new Promise((resolve, reject) => {
    resolve(a * 4);
  });
}

const promiseArr = [p1, p2, f3, p4];
runPromiseInSequence(promiseArr, 10).then(console.log);

function runPromiseInSequence(arr, init) {
  return arr.reduce((memo, next) => {
    return memo.then(next);
  }, Promise.resolve(init));
}
```

### 2.2 通过 async 和 await 实现

```js
async function runPromiseInSequence(arr, init) {
  for (let item of arr) {
    init = await item(init);
  }
  return init;
}
```

## 3. reducer 的实现

### 3.1 第一版 有问题

```js
Array.prototype.reduce = function (callback, init) {
  const arr = this;
  if (!Array.isArray(arr)) {
    throw new Error("请使用数组");
  }
  init = init != null ? init : arr.shift();
  for (let i = 0; i < arr.length; i++) {
    init = callback(init, arr[i], i, arr);
  }
  return init;
};

let a = [1, 2].reduce((memo, next) => {
  memo += next;
  return memo;
});
```

## 4. call 和 apply 的区别是什么，哪个性能更好一些

- 都是可以修改 this 的指向，并且执行函数
- call 是参数一个一个的传递
- [apply](https://tc39.es/ecma262/#sec-function.prototype.apply) 是参数是一个数组
- [call](https://jsperf.com/call-apply-segu) 的性能更好,apply 调用的就是`call`

### 4.1 实现 call

- 将函数设为对象的属性
- 执行该函数
- 删除该函数

```js
Function.prototype.call = function (context, ...args) {
  context = context || window;
  const fn = Symbol();
  context[fn] = this;
  const ret = context[fn](...args);
  delete context[fn];
  return ret;
};
```

### 4.2 实现 apply

```js
Function.prototype.apply = function (context, args) {
  context = context || window;
  const fn = Symbol();
  context[fn] = this;
  const ret = context[fn](...args);
  delete context[fn];
  return ret;
};
```

### 4.3 面试题

```js
function fn1() {
  console.log(1);
}
function fn2() {
  console.log(2);
}
fn1.call.call(fn2);
/**
 * 解析：
 * 1、fn1.call=== call函数1
 * 2. call函数1.call执行
 * 3. context[fn]=call函数1 ===> fn2.call函数1执行
 * 4. fn2.call()执行
 * 5. 所以fn2执行
 *
 */
```

## 5. 数组里面有 10w 条数据，取第一个和第 10w 个元素的时间相差多少?

一样的

## 6. 编写 parse 函数，实现访问对象里属性的值

### 6.1 简单一版实现

```js
let obj = { a: 1, b: { c: 2 }, d: [1, 2, 3], e: [{ f: [4, 5, 6] }] };
let r1 = parse(obj, "a"); // = 1;
let r2 = parse(obj, "b.c"); // = 2;
let r3 = parse(obj, "d[2]"); // = 3;
let r4 = parse(obj, "e[0].f[2]"); // = 4;
function parse(obj, str) {
  return new Function("obj", "return obj." + str.replace(/\.(\d+)/g, "[$1]"))(
    obj
  );
}
```

### 6.2 面试版

```js
let obj = { a: 1, b: { c: 2 }, d: [1, 2, 3], e: [{ f: [4, 5, 6] }] };
let r1 = parse(obj, "a"); // = 1;
let r2 = parse(obj, "b.c"); // = 2;
let r3 = parse(obj, "d[2]"); // = 3;
let r4 = parse(obj, "e[0].f[2]"); // = 4;

function parse(obj, str) {
  return str
    .split(/[\.\[\]]/g)
    .filter((l) => l !== "")
    .reduce((memo, next, index, arr) => {
      if (memo == null && arr.length - 1 !== index) {
        memo = {};
      }
      return memo[next];
    }, obj);
}
```

## 7.数组扁平化 flat 方法的多种实现？

### 7.1 es6

```js
let arr = [[1], [2, 3], [4, 5, 6, [7, 8, [9, 10, [11]]]], 12];
let flattedArr = arr.flat(Infinity);
console.log(flattedArr);
```

### 7.2 toString

**缺点**:会改变数组的类型

```js
let arr = [[1], [2, 3], [4, 5, 6, [7, 8, [9, 10, [11]]]], 12];
console.log(
  arr
    .toString()
    .split(",")
    .map((item) => Number(item))
);
```

### 7.3 stringify

```js
JSON.stringify(arr)
  .split(/[\[\],]/g)
  .filter((item) => item !== "")
  .map((item) => Number(item));
```

### 7.4 while

```js
while (arr.some((item) => Array.isArray(item))) {
  arr = [].concat(...arr);
}
```

### 7.5 递归

```js
function flat(arr, r = []) {
  if (!Array.isArray(arr)) {
    return arr;
  }
  for (let item of arr) {
    r = r.concat(flat(item));
  }
  return r;
}
```

## 9. 题目描述:实现一个 `compose` 函数

### 9.1 用法如下:

```js
// 用法如下:
function fn1(x) {
  return x + 1;
}
function fn2(x) {
  return x + 2;
}
function fn3(x) {
  return x + 3;
}
function fn4(x) {
  return x + 4;
}
const a = compose(fn1, fn2, fn3, fn4);
console.log(a(1)); // 1+4+3+2+1=11
```

### 9.2 实现代码如下:

```js
function compose() {}
```

## 10. 实现`12345678.002345 -> 12,345,678.002345`

```js

```

## 11. 下列的结果是

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <button id="btn">btn</button>
    <script>
      const btn = document.getElementById("btn");
      btn.addEventListener("click", () => {
        console.log("c1");
        Promise.resolve().then(() => console.log("p1"));
      });
      btn.addEventListener("click", () => {
        console.log("c2");
        Promise.resolve().then(() => console.log("p2"));
      });
      btn.click();
      console.log(3);
      </script>
  </body>
</html>
```

- 直接调用click是同步的，如果手动点击是宏任务
- 所以首次结果是:`c1 c2 3 p1 p2`
- 手动点击的结果是:`3 c1 p1 c2 p2`

## 12. 下列的结果是
```js
async function f1() {
  return new Promise((resolve) => {
      console.log(4)
      resolve()
  }).then(() => {
      console.log(5)
  })
}
async function run() {
  console.log(1)
  new Promise((resolve) => {
      console.log(2)
      resolve()
  }).then(() => {
      console.log(3)
  })
  await f1()
  setTimeout(() => {
      console.log(6)
  }, 0)
  console.log(7)
}
run()
// 1 2 4 3 5 7 6
```

## 13.把数字"312345678"，变成 "312,345,678"。
```js

```