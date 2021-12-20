## 五.ES6 中的 Pomise

实现**promise**:

- [PromiseA+英文](https://promisesaplus.com)
- [promiseA+中文参考](https://www.ituring.com.cn/article/66566)

## 掌握知识

- 掌握高阶函数的使用,使用高阶函数解决异步问题
- 掌握发布订阅模式和观察者模式
- 掌握 promise 核心应用,使用 promise 解决异步编程问题
- 实现一个完整的 promise 库
- 扩展 promise 中常见方法,all,race,finally...
- 掌握 generator 的使用以及 co 库的应用
- 异步终极解决方案 async+await

## 关于函数

什么是高阶函数：把函数作为`参数`或者`返回值`的一类函数

### before 函数

```js
//  函数的before
// 希望将核心的逻辑提取出来，在外面增加功能

// 重写原型上的方法
const say = () => {
  console.log("说话");
};

// js的核心 是回调
Function.prototype.before = function(fn) {
  return (...args) => {
    //剩余运算符
    //箭头函数中没有this指向，也没有arguments,所以会向上级作用域中查找
    fn();
    this(...args); //展开运算符
  };
};
//AOP 切片 装饰  把核心抽离出来，在核心的基础上增加功能
let newSay = say.before(() => {
  console.log("你好");
});
let newSay1 = say.before(() => {
  console.log("天气很好");
});
newSay();
newSay1();
```

### react 事务

```js
// 事务 开始的时候 做某件事 结束的时候在做某件事
perform(() => {
  console.log("说话");
}, [
  {
    //wrapper
    initlizae() {
      console.log("你好");
    },
    close() {
      console.log("再见");
    },
  },
  {
    //wrapper
    initlizae() {
      console.log("你好2");
    },
    close() {
      console.log("再见2");
    },
  },
]);
```

实现

```js
function perform(fn, wrappers) {
  wrappers.forEach((wrapper) => {
    wrapper.initialize();
  });
  fn();
  wrappers.forEach((wrapper) => {
    wrapper.close();
  });
}
```

AOP(面向切面编程)的主要作用是把一些跟核心业务逻辑模块无关的功能抽离出来，其实就是给原函数增加一车，不用管原函数内部实现

```js
/**
 * <pre>
 *                       wrappers (injected at creation time)
 *                                      +        +
 *                                      |        |
 *                    +-----------------|--------|--------------+
 *                    |                 v        |              |
 *                    |      +---------------+   |              |
 *                    |   +--|    wrapper1   |---|----+         |
 *                    |   |  +---------------+   v    |         |
 *                    |   |          +-------------+  |         |
 *                    |   |     +----|   wrapper2  |--------+   |
 *                    |   |     |    +-------------+  |     |   |
 *                    |   |     |                     |     |   |
 *                    |   v     v                     v     v   | wrapper
 *                    | +---+ +---+   +---------+   +---+ +---+ | invariants
 * perform(anyMethod) | |   | |   |   |         |   |   | |   | | maintained
 * +----------------->|-|---|-|---|-->|anyMethod|---|---|-|---|-|-------->
 *                    | |   | |   |   |         |   |   | |   | |
 *                    | |   | |   |   |         |   |   | |   | |
 *                    | |   | |   |   |         |   |   | |   | |
 *                    | +---+ +---+   +---------+   +---+ +---+ |
 *                    |  initialize                    close    |
 *                    +-----------------------------------------+
 * </pre>
 */
```

### 类型检测

```js
const checkType = (content, type) => {
  return Object.prototype.toString.call(content) === `[object ${type}]`;
};
const flag = checkType("hello", "String");
//---------------------------------------
const checkType = (type) => {
  return (content) =>
    Object.prototype.toString.call(content) === `[object ${type}]`;
};
const b = checkType(123, "Number");
const types = ["Number", "String", "Boolean"];
let utils = {};
types.forEach((type) => {
  utils["is" + type] = curring(checkType)(type); //先传入一个参数
});
console.log(utils.isString("hello"));
```

函数分步传递参数，将函数拆分成功能更加具体化的函数

### 柯里化函数

```js
const curring = (fn, arr = []) => {
  let len = fn.length; //参数的长度
  return (...args) => {
    arr = arr.concat(args);
    if (arr.length < len) {
      return curring(fn, arr);
    }
    return fn(...arr);
  };
};
let r = curring(add)(1, 2)(3, 4)(5); //[]
console.log(r);
const types = ["Number", "String", "Boolean"];
let utils = {};
types.forEach((type) => {
  utils["is" + type] = curring(checkType)(type); //先传入一个参数
});
console.log(utils.isString("hello"));
```

柯里化 我们可以把一个大函数拆分成具体的功能 将一个函数拆分成多个函数

### after

```js
// after可以生成新的函数 等待函数执行次数达到我的预期时执行
const after = (times, fn) => {
  return () => {
    if (--times === 0) {
      fn();
    }
  };
};
let newAfter = after(3, () => {
  console.log("三次之后调用");
});
newAfter();
newAfter();
newAfter();
```

### 发布订阅模式

- 把订阅的事件存储到数组中可以订阅多个事件,只要发布者触发事件,执行函数,订阅者就会接收到
- 发布和订阅直接是没有`关系`的,订阅将要订阅的事件存储在一个空间中(`数组`),发布者在存储空间中发布事件

### 观察者模式

- 观察者模式 基于 发布订阅 模式
- 例如:我要观察老板的情绪,老板一发生情绪变化就会立即通知给我他有情绪了

```js
class Sbuject {
  // 1.被观察者  老板
  constructor() {
    this.arr = []; // 存储空间  [o1,o2]
    this.state = "我很开心"; // 被观察者的一个状态
  }
  attach(o) {
    // 3.接收观察者,存储在一个数组空间
    this.arr.push(o);
  }
  setState(newState) {
    // 4.修改被观察者状态,通知所有观察者更新状态
    this.state = newState;
    this.arr.forEach((o) => o.updata(newState));
  }
}

class Observer {
  // 1.观察者   我 同事
  constructor(name) {
    this.name = name;
  }
  updata(newState) {
    // 5.观察者订阅更新状态
    console.log(this.name + "老板" + newState);
  }
}

// 2. 实例化
let s = new Sbuject("老板"); //老板
let o1 = new Observer("我");
let o2 = new Observer("同事");

s.attach(o1); // 3.被观察者中添加观察者对象
s.attach(o2);
s.setState("不开心了"); // 4.被观察者修改状态
```

### Promise 的优点

- 解决并发问题 (同步多个异步方法的执行结果)
- 链式调用问题 解决多个回调嵌套的问题

### Promise 的特点

1. promise 是一个类
2. 每次 new 一个 Promise 都需要传递一个`执行器`，执行器是立即执行的
3. 执行器函数中有两个参数 resolve, reject
4. 默认 promise 有三个状态 pending ==> resolve 表示成功 fulfilled reject 表示拒绝===》rejected
5. 如果一旦成功了，不能变成失败了 一旦失败 不能再成功了 只有当前状态是 pending 的时候才能更改状态
6. 每个 promise 都有一个 then 方法

### Promise 的实现

#### promise 只`兼容`同步代码

执行逻辑

```js
const p = new Promise((resolve, reject) => {
  resolve("222");
});
p.then(
  (data) => {
    console.log(data);
  },
  (err) => {}
);
```

实现逻辑

```js
const PENDING = Symbol("PENDING");
const FULFILLED = Symbol("FULFILLED");
const REJECTED = Symbol("REJECTED");
class Prmoise {
  constructor(executor) {
    this.status = PENDING; //状态
    this.value = undefined; //存储成功的值
    this.reason = undefined; //存储失败的原因
    const resolve = (val) => {
      if (this.status === PENDING) {
        this.value = val;
        this.status = FULFILLED;
      }
    }; //成功调用的函数
    const reject = (reason) => {
      if (this.status === REJECTED) {
        this.reason = reason;
        this.status = REJECTED;
      }
    }; //失败调用的函数
    try {
      executor(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }
  then(onFulFilled, onRejected) {
    if (this.status === FULFILLED) {
      onFulFilled(this.value);
    }
    if (this.status === REJECTED) {
      onRejected(this.reason);
    }
  }
}
```

### Promise`兼容`异步代码

- `new Promise` 中如果有异步代码,执行 then 的时候`this.status`的状态为`PENDING`
- 所以需要用一个数组来分别存放`onFulFilled`和`onRejected`,当执行`resolve`或者`reject`方法的时候来遍历这些方法

实现逻辑

```js
const PENDING = Symbol("PENDING");
const FULFILLED = Symbol("FULFILLED");
const REJECTED = Symbol("REJECTED");
class Prmoise {
  constructor(executor) {
    this.status = PENDING; //状态
    this.value = undefined; //存储成功的值
    this.reason = undefined; //存储失败的原因
    this.onFulFilledCallbacks = []; //存放成功的回调
    this.onRejectedCallbacks = []; //存放失败的回调
    const resolve = (val) => {
      if (this.status === PENDING) {
        this.value = val;
        this.status = FULFILLED;
        this.onFulFilledCallbacks.forEach((fn) => fn());
      }
    }; //成功调用的函数
    const reject = (reason) => {
      if (this.status === REJECTED) {
        this.reason = reason;
        this.status = REJECTED;
        this.onRejectedCallbacks.forEach((fn) => fn());
      }
    }; //失败调用的函数
    try {
      executor(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }
  then(onFulFilled, onRejected) {
    if (this.status === FULFILLED) {
      onFulFilled(this.value);
    }
    if (this.status === REJECTED) {
      onRejected(this.reason);
    }
    if (this.status === PENFING) {
      this.onFulFilledCallbacks.push(() => {
        onFulFilled(this.value);
      });

      this.onRejectedCallbacks.push(() => {
        onRejected(this.reason);
      });
    }
  }
}
```

调用逻辑

```js
const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(100);
  });
});
p.then(
  (data) => {
    console.log(data);
  },
  (err) => {}
);
```

### then 的链式调用

- 当 then 中返回 promise 的话,会等待 promise 执行，将 promise 的返回值返回到后续的 then 中
- 因为 promise 如果成功了，就不能在变成失败状态，promise 链式调用的时候后续`成功`，也会变成`失败状态`,所以断定 then 返回的是一个新的`promise`,来实现链式调用
- onFulFilled, onRejected 会继续向下传递

```js
function resolvePromise(p1, x, resolve, reject) {
  if (p1 === x) {
    //根据规则这里如果不处理的话会死循环，报一个类型错误
    reject(new TypeError("Chaining cycle detected for promise #<Promise>"));
  }
  //判断是否是promise
  let called = true; //如果返回的是别人的promise就不能保证promise被调用成功态后就不能在变成失败态，所以要兼容
  if ((typeof x === "object" && x !== null) || typeof x === "function") {
    try {
      // x.then可能是Object.defineProperty模拟的，可能会报错
      let then = x.then;
      if (typeof then === "function") {
        //为啥不then直接调用，如果x.then二次调用后不是函数
        then.call(
          x,
          (y) => {
            //y是resolve中传递的值
            //y可能也是一个promise
            if (called) return;
            called = true;
            resolvePromise(p1, y, resolve, reject);
          },
          (r) => {
            if (called) return;
            called = true;
            reject(r);
          }
        );
      } else {
        resolve(x);
      }
    } catch (error) {
      if (called) return;
      called = true;
      reject(error);
    }
  } else {
    resolve(x);
  }
}
function isPromise(val){
  if(typeof val==='function' || (typeof val==='object' && typeof!==null)){
    return typeof x.then==='function'
  }
  return false
}
const PENDING = Symbol("PENDING");
const FULFILLED = Symbol("FULFILLED");
const REJECTED = Symbol("REJECTED");
class Prmoise {
  constructor(executor) {
    this.status = PENDING; //状态
    this.value = undefined; //存储成功的值
    this.reason = undefined; //存储失败的原因
    this.onFulFilledCallbacks = []; //存放成功的回调
    this.onRejectedCallbacks = []; //存放失败的回调
    const resolve = (val) => {
      if (this.status === PENDING) {
        //如果val还是promise的话，会等待promise执行完毕后将结果返回
        if(isPromise(val)){
          // return val.then((data)=>resolve(data),(err)=>reject(err))
          return val.then(resolve,reject)
        }
        this.value = val;
        this.status = FULFILLED;
        this.onFulFilledCallbacks.forEach((fn) => fn());
      }
    }; //成功调用的函数
    const reject = (reason) => {
      if (this.status === REJECTED) {
        this.reason = reason;
        this.status = REJECTED;
        this.onRejectedCallbacks.forEach((fn) => fn());
      }
    }; //失败调用的函数
    try {
      executor(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }
  then(onFulFilled, onRejected) {
    onFulFilled=typeof onFulFilled==='function'?onFulFilled:(val)=>{return val }
    onRejected=typeof onRejected==='function'?onRejected:(err)=>{throw error }
    let p1 = new Prmoise((resolve, reject) => {
      if (this.status === FULFILLED) {
        setTimeout(() => {
          try {
            let x = onFulFilled(this.value);
            resolvePromise(p1, x, resolve, reject); //这里为了获取p1的值只能异步处理一下，我们可以用settimeout模拟
          } catch (error) {
            reject(error);
          }
        });
      }
      if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason);
            resolvePromise(p1, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      }
      if (this.status === PENFING) {
        // setTimeout(()=>{ //为什么不能把settimeout放到这里,会导致如果new promise中执行异步的时候 resolve时， this.onFulFilledCallbacks为[]
        this.onFulFilledCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onFulFilled(this.value);
              resolvePromise(p1, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          });
        });

        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason);
              resolvePromise(p1, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          });
        });
        // })
      }
    });
    return p1;
  }
}
```

### 测试写的 Promise 是否符合规范

全局安装测试插件

```sh
npm i promises-aplus-tests -g
```

在要测试的代码中加入如下代码:

```js
//! 测试Promise是否符合规范
Promise.deferred = function() {
  let dfd = {};
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve;
    dfd.reject = reject;
  });
  return dfd;
};
```

### catch 实现

```js
Promise.prototype.catch(e){
      return this.then(null,(err)=>{
          throw err
      })
}
```

### resolve 的实现

`Promise.resolve`用来生成一个直接处于`FULFILLED`状态的`Promise`。

```js
Promise.resolve(e){
      return new Promise((resolve,reject)=>{
        resolve(data)
      })
}
```

### reject 的实现

`Promise.reject`用来生成一个直接处于`REJECTED`状态的 Promise。

```js
Promise.reject(e){
      return new Promise((resolve,reject)=>{
        reject(e)
      })
}
```

### finally 方法

- 不管是`resolve`还是`reject`都会调用`finally`。

**用法**

```js
Promise.reject()
  .finally(() => {
    console.log(1);
    return new Promise((resovle, reject) => {
      setTimeout(() => {
        resovle(); //会等待promise执行完执行
      }, 1000);
    });
  })
  .catch((e) => {
    console.log(e);
  });
```

**实现**

```js
// Promise.prototype.finally=function(callback){
//   return this.then((data)=>{callback() return data},(err)=>{callback() throw err})
// }
Promise.prototype.finally = function(callback) {
  // callback 直接放到失败里 会导致无法继承上一次的失败
  // return this.then(callback,callback);
  return this.then(
    (val) => {
      // 等待finally中的函数执行完毕 继续执行 finally函数可能返还一个promise 用Promise.resolve等待返回的promise执行完
      return Promise.resolve(callback()).then(() => val);
      //return val; // 如果上一个then是成功就将这个成功向下传递
    },
    (err) => {
      return Promise.resolve(callback()).then(() => {
        throw err;
      });
      //throw err; // 如果上一个then是失败就将这个失败继续向下抛
    }
  );
};
```

### all

```js
Promise.all = function(promises) {
  return new Promise((resolve, reject) => {
    let index = 0,
      arr = [];
    function resolvePromiseValue(i, val) {
      if (isPromise(val)) {
        val.then(resolvePromiseValue, reject);
      } else {
        processData(i, val);
      }
    }
    function processData(i, val) {
      arr[i] = val;
      if (++index === promises.length) {
        resolve(arr);
      }
    }
    for (let i = 0; i < promises[i]; i++) {
      const item = promises[i];
      resolvePromiseValue(i, item);
    }
  });
};
```

### reject

```js
Promise.reject = function(promises) {
  return new Promise((resolve, reject) => {
    function resolvePromiseValue(val) {
      if (isPromise(val)) {
        val.then(resolvePromiseValue, reject);
      } else {
        processData(val);
      }
    }
    function processData(val) {
      resolve(val);
    }
    for (let i = 0; i < promises[i]; i++) {
      const item = promises[i];
      resolvePromiseValue(item);
    }
  });
};
```

### 中断 promise 链 就是返回一个等待的 promise

```js
let p1 = p
  .then(() => {
    console.log("ok");
    return new Promise(() => {});
  })
  .then(() => {
    console.log(1);
  });
```

### 如何放弃某个 promise 的执行结果

```js
function wrap(p1) {
  let fail = null;
  let p2 = new Promise((resolve, reject) => {
    fail = reject; // 先将p2失败的方法暴露出来
  });
  let p = Promise.race([p2, p1]); // race方法返回的也是一个promise
  p.abort = fail;
  return p;
}
let p = wrap(
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("ok");
    }, 3000);
  })
);
p.abort("error");
p.then((data) => {
  console.log(data);
}).catch((err) => {
  console.log(err);
});
```

### 既能捕获同步有能捕获异步

```js
function fn() {
  //可能函数中抛出了 同步错误 要通过try-catch 捕获异常
  throw new Error("err");
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject("xxx");
    }, 3000);
  });
}
Promise.try(fn).then(
  (data) => {
    console.log(data, "---");
  },
  (err) => {
    console.log("err:" + err);
  }
);
```

实现

```js
Promise.try = function(callback) {
  return new Promise((resolve, reject) => {
    // Promise.resolve 只能返回一个成功的promise
    return Promise.resolve(callback()).then(resolve, reject);
  });
};
```

## generator

- 生成器函数
- 返回值是迭代器

```js
function* read() {
  yield 1; //产出 会中断执行
  yield 2;
  yield 3;
}
// iterator 迭代器
let it = read();
console.log(it.next()); //{ value: 1, done: false }

console.log(it.next()); //{ value: 2, done: false }
console.log(it.next()); //{ value: 3, done: false }
console.log(it.next()); //{ value: undefined, done: true }
```

#### 将类数组转化成数组

- 类数组的定义
  - 索引
  - 长度

```js
function add() {
  //   console.log([...arguments]);
  // 1. ...([Symbol.iterator])  for of 必须给当前对象提供一个 `生成器` 方法
  // 2.Array.from(循环)
  console.log([
    ...{
      0: 1,
      1: 2,
      2: 3,
      3: 4,
      4: 5,
      5: 6,
      length: 6,
      //   [Symbol.iterator]() {
      //     let len = this.length;
      //     let index = 0;
      //     // 迭代器有next方法 而且方法执行后，需要返回value和done
      //     return {
      //       next: () => {
      //         return { value: this[index++], done: index === len + 1 };
      //       },
      //     };
      //   },
      [Symbol.iterator]: function*() {
        let index = 0;
        while (index !== this.length) {
          yield this[index++];
        }
      },
    },
  ]);
}
```

### generator 问题

下面问题的执行结果

```js
function* read() {
  try {
    let a = yield 1;
    console.log(a);
    let b = yield 2;
    console.log(b);
    let c = yield 3;
    console.log(c);
  } catch (e) {
    console.log(error);
  }
}
let it = read();
it.next(100);
it.next(200);
it.next(300);
it.throw("error"); //会执行catch中错误的
```

![generator执行](/img/generator.png)

### co 的实现

用法

```js
const fs = require("fs").promises;
function* read() {
  let content = yield fs.readFile("./name.txt", "utf8"); // age.txt
  let age = yield fs.readFile(content, "utf8"); // 10
  let xx = yield { age: age + 10 };
  return xx;
}
let co = require("co");
co(read()).then((data) => {
  console.log(data);
});
```

实现

```js
function co(it) {
  return new Promise((resolve, reject) => {
    function next(arg) {
      const { value, done } = it.next(arg);
      if (!done) {
        Promise.resolve(value).then(next, reject);
      } else {
        resolve(value);
      }
    }
    next(undefined);
  });
}
```

### async+await

- async 函数的 await 命令后面，可以是 `Promise 对象`和`原始类型的值`（数值、字符串和布尔值，但这时会自动转成立即 `resolved` 的 `Promise 对象`）

```js
const fs = require("fs").promises;
// async + await 其实是 generator + co的语法糖
async function read() {
  // async函数返回的是promise
  let r = await Promise.all([p1, p2]);
  try {
    let content = await fs.readFile("./name1.txt", "utf8"); // age.txt
    let age = await fs.readFile(content, "utf8"); // 10
    let xx = await { age: age + 10 };
    return xx;
  } catch (e) {
    console.log(e);
  }
}
read().then(
  (data) => {
    console.log(data);
  },
  (err) => {
    console.log(err);
  }
);
```

### 返回 Promise 对象

- async 函数返回一个 Promise 对象。

- async 函数内部 return 语句返回的值，会成为 then 方法回调函数的参数。

```js
async function f() {
  return "hello world";
}

f().then((v) => console.log(v));
// "hello world"
```

- 上面代码中，函数 f 内部 return 命令返回的值，会被 then 方法回调函数接收到。

- async 函数内部抛出错误，会导致返回的 Promise 对象变为 reject 状态。抛出的错误对象会被 catch 方法回调函数接收到。

```js
async function f() {
  throw new Error("出错了");
}

f().then(
  (v) => console.log(v),
  (e) => console.log(e)
);
// Error: 出错了
```

## promise 面试题目

### 题目 1

```js
Promise.resolve(1)
  .then(2)
  .then(Promise.resolve(3))
  .then(console.log);
```

then 的如果传入的不是函数就会被函数包裹一下冒泡到之后的 then 中 ,所以答案是 1

### 题目 2

红灯三秒亮一次，绿灯一秒亮一次，黄灯 2 秒亮一次；如何让三个灯不断交替重复亮灯？（用 Promse 实现）三个亮灯函数已经存在：

```js
function red(){
  console.log('red')
}
function yellow(){
  console.log('yellow')
}
function green(){
  console.log('green')
}
var light = function (timmer, cb) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            cb();
            resolve();
        }, timmer);
    });
};

function next(){
  return Promise.resolve(light(3000,red)).then(()=light(1000,green)).then(()=>light(2000,yellow)).then(next)
}
```

### Promise 的优缺点

- 优点:
  - 可以解决异步并发问题 Promise.all
  - 链式调用
- 缺点:
  - 还是基于回调 promise
  - 无法终止 new Promise 只能说抛弃这次的结果而已 fetch 无法中断的 xhr.abort()
