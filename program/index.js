// function parse(number) {
//     const [int, dot] = String(number).split(".");
//     return int.replace(/(?!^)(?=((\d{3})+$))/g, ",") + (dot ? "." + Number(dot).toFixed(2) : '');
// }

// console.log(parse(`12345678`))

// console.log('12345678'.replace(/(?!^)(?=((\d{3})+$))/g, ","))

// let now = Date.now(),
//   cur = Date.now();
// function setinterval1(func, t) {
//   let timer = setTimeout(() => {
//     clearTimeout(timer);
//     func();
//     setinterval1(func, t);
//   }, t);
// }
// setinterval1(() => {
//   console.log(Date.now() - now, "start");
//   while (Date.now() - cur < 2000) {}
//   cur = Date.now();
//   console.log(Date.now() - now, "end");
// }, 200);

/**
 * LazyMan(“Hank”)输出:
Hi! This is Hank!

LazyMan(“Hank”).sleep(10).eat(“dinner”)输出
Hi! This is Hank!
//等待10秒..
Wake up after 10
Eat dinner~

LazyMan(“Hank”).eat(“dinner”).eat(“supper”)输出
Hi This is Hank!
Eat dinner~
Eat supper~

LazyMan(“Hank”).eat(“supper”).sleepFirst(5)输出
//等待5秒
Wake up after 5
Hi This is Hank!
Eat supper
 * 
 * 
 * 
 */

// class LazyManC {
//   constructor(str) {
//     this.task = [
//       () => {
//         console.log(`Hi! This is ${str}!\r\n`);
//         this.next()
//       },
//     ];
//     setTimeout(() => {
//        this.next()
//     });

//   }
//   next() {
//     const task = this.task.shift(); // 取第一个任务执行
//     task && task();
//   }
//   eat(str = "") {
//     this.task.push(() => {
//       console.log(`Eat ${str}~\r\n`);
//       this.next()
//     });
//     return this;
//   }
//   sleep(time) {
//     this.task.push(() => {
//       setTimeout(() => {
//         console.log(`Wake up after ${time}\r\n`);
//         this.next()
//       }, time*1000);
//     });
//     return this;
//   }
//   sleepFirst(time){
//     this.task.unshift(() => {
//         setTimeout(() => {
//           console.log(`Wake up after ${time}\r\n`);
//           this.next()
//         }, time*1000);
//       });
//       return this;
//   }
// }

// function LazyMan(str){
//     return new LazyManC(str)
// }
// LazyMan('Hank').eat('dinner').eat('supper').sleepFirst(5)

//1. promise是一个类,new这个类 传入一个exector执行器
//2. promise 有三种状态 pending fulfilled rejected
//3. exector 有两个参数 resolve reject, 当调用resolve 会变成FULFILLED 状态，当调用reject 会变成rejected,但是只能从pending 变成改状态
//4. exector 执行如果报错 会变成rejected状态
//5. promise 的实例上有一个then的方法，方法有2个参数onFulFilled onRejected ,onFulFilled onRejected 会有值的穿透
//6. 如果then是成功态 value 会作为onFulFilled的参数
// const PENDING = "PENDING";
// const FULFILLED = "FULFILLED";
// const REJECTED = "REJECTED";

// function resolvePromise(x, p, resolve, reject) {
//   if (x === p) {
//     return reject(new TypeError("循环引用"));
//   }
//   let called = false;
//   if ((typeof x === "object" && x != null) || typeof x === "function") {
//     try {
//       let then = x.then;
//       if (typeof then === "function") {
//         then.call(
//           x,
//           (y) => {
//             if (called) return;
//             called = true;
//             resolvePromise(y, p, resolve, reject);
//           },
//           (err) => {

//             reject(err);
//           }
//         );
//       } else {
//         //普通值

//         resolve(x);
//       }
//     } catch (error) {
//       if (called) return;
//       called = true;
//       reject(error);
//     }
//   } else {

//     // 普通值
//     resolve(x);
//   }
// }
// class Promise1 {
//   constructor(executor) {
//     this.status = PENDING;
//     this.value = undefined;
//     this.reason = undefined;
//     this.onFulFilledCallbacks = [];
//     this.onRejectedCallbacks = [];
//     const resolve = (value) => {
//       if (this.status === PENDING) {
//         this.value = value;
//         this.status = FULFILLED;
//         this.onFulFilledCallbacks.forEach((l) => l());
//       }
//     };
//     const reject = (reason) => {
//       if (this.status === PENDING) {
//         this.reason = reason;
//         this.status = REJECTED;
//         this.onRejectedCallbacks.forEach((l) => l());
//       }
//     };
//     try {
//       executor(resolve, reject);
//     } catch (error) {
//       reject(error);
//     }
//   }
//   then(onFulFilled, onRejected) {
//     onFulFilled =
//       typeof onFulFilled === "function" ? onFulFilled : (val) => val;
//     onRejected =
//       typeof onRejected === "function"
//         ? onRejected
//         : (err) => {
//             throw err;
//           };
//     let p1 = new Promise1((resolve, reject) => {
//       if (this.status === FULFILLED) {
//         setTimeout(() => {
//           try {
//             let x = onFulFilled(this.value);
//             resolvePromise(x,p1, resolve, reject);
//           } catch (error) {
//             reject(error);
//           }
//         });
//       }
//       if (this.status === REJECTED) {
//         setTimeout(() => {
//           try {
//             let x = onRejected(this.reason);
//             resolvePromise( x,p1, resolve, reject);
//           } catch (error) {
//             reject(error);
//           }
//         });
//       }
//       if (this.status === PENDING) {
//         this.onFulFilledCallbacks.push(() => {
//           setTimeout(() => {
//             try {
//               let x = onRejected(this.reason);
//               resolvePromise(x,p1, resolve, reject);
//             } catch (error) {
//               reject(error);
//             }
//           });
//         });
//         this.onRejectedCallbacks.push(() => {
//           setTimeout(() => {
//             try {
//               let x = onRejected(this.reason);
//               resolvePromise( x,p1, resolve, reject);
//             } catch (error) {
//               reject(error);
//             }
//           });
//         });
//       }
//     });
//     return p1;
//   }
// }

// Promise1.deferred = function () {
//   let dfd = {};
//   dfd.Promise = new Promise1((resolve, reject) => {
//     dfd.resolve = resolve;
//     dfd.reject = reject;
//   });
//   return dfd;
// };
// module.exports = Promise1;

// 提取中域名'http://www.baidu.com/a'

function match(url) {
  return url.match(/https?\:\/\/([^/]+)/)[1];
}

console.log(match("https://www.baidu.com/sda/sada"));
// match('http://www.baidu.com/a')

const getJSON = function (url) {
  return new Promise((resolve, reject) => {
    // 实例化xhr
    const xhr = new XMLHttpRequest();

    // xhrReq.open(method, url, async, user, password);
    xhr.open("GET", url, true);
    xhr.setRequestHeader("content-type", "application/json");
    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) return;
      if (xhr.status === 200 || xhr.status === 304) {
        resolve(xhr.responseText);
      } else {
        reject(new Error(xhr.responseText));
      }
    };
    xhr.send(null);
  });
};
