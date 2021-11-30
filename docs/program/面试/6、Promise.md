# 实现 Promise

## 用途

- 多个请求之间的依赖关系，上一个人的输出是下一个人的输入
- 异步嵌套怎么变得优雅些(发布订阅)

## 介绍

- 1. `promise`是一个类,在使用的时候需要`new`这个类

- 2. 在`new Promise`的时候需要传入一个`executor` 执行器 默认会立即被调用，而且参数有两个，`resolve`, `reject`

- 3. promise 有三个状态 分别是`pending` 默认等待态 `onfulfilled` 成功态 `onrejected` 失败态

  - 3.1 promise 默认就是 `pending` 当用户调用 `resolve`时 会变成成功态 调用`reject`的时候会标称失败态
  - 3.2 成功可以传入成功的原因 失败可以传入失败的原因

- 4. `new Promise` 会返回一个`Promise实例` 这个实例上有一个`then` 方法,`then`方法中有两个参数一个是成功的回调，一个是失败的回调

- 5. 走想失败有两种情况 `reject()` 用户主动抛出异常

- 6. 一个 promise 中可以`then` 多次（发布订阅模式）
- 7. promise 的状态不能从成功变成失败，也不能从失败变成成功,只有`pending`的时候才能改变状态

## 同步版 Promise

```js
const PENDING="PENDING";
const FULFILLED='FULFILLED';
const REJECTED='REJECTED';
class Promise{
    constructor(executor){
        this.status=PENDING;
        this.value=undefined;//成功的原因
        this.reason=undefined;//失败的原因
        const resolve=(value)=>{
        if(this.status===PENDING){
            this.status=FULFILLED;
            this.value=value;
            }

        };
        const reject=(reason)=>{
        if(this.status===PENDING){
            this.status=REJECTED;
            this.reason=reason;}
        };
        try{
            executor(resolve,reject) //传递给用户两个参数
        }cache(e){
            reject(e) //用户主动抛出异常
        }

    }
    then(onFulfilled,onRejected){
        if(this.status===FULFILLED){
           onFulfilled(this.value)
        }
        if(this.status===REJECTED){
            onRejected(this.reason)
        }
    }
}
```

- 8. 调用 then 的时候可能会出现既没有成功也没有失败的情况，那么我们需要将成功存放起来,把失败存放起来，稍后调用 resolve 在走存放好的成功和存放好的失败

## 异步版 Promise

```js 35
const PENDING="PENDING";
const FULFILLED='FULFILLED';
const REJECTED='REJECTED';
class Promise{
    constructor(executor){
        this.status=PENDING;
        this.value=undefined;//成功的原因
        this.reason=undefined;//失败的原因
        this.onResolvedCallbacks=[]; //存放失败的回调
        this.onRejectedCallbacks=[]; //存放成功的回调
        const resolve=(value)=>{
        if(this.status===PENDING){
            this.status=FULFILLED;
            this.value=value;
            this.onResolvedCallbacks.forEach(fn=>fn());
            }

        };
        const reject=(reason)=>{
        if(this.status===PENDING){
            this.status=REJECTED;
            this.reason=reason;
             this.onRejectedCallbacks.forEach(fn=>fn());
            }
        };
        try{
            executor(resolve,reject) //传递给用户两个参数
        }cache(e){
            reject(e) //用户主动抛出异常
        }

    }
    then(onFulfilled,onRejected){
        if(this.status===FULFILLED){
           onFulfilled(this.value)
        }
        if(this.status===REJECTED){
            onRejected(this.reason)
        }
        if(this.status===PENDING){
            // 稍后成功了除了执行回调外，还有其他操作
            this.onResolvedCallbacks.push(()=>{
                //todo...
                onFulfilled(this.value)
            });
            this.onRejectedCallbacks.push(()=>{
                onRejected(this.reason)
            })
        }

    }
}
```

## Promise 链式调用

- 9. 如果用户在 then 的成功或者失败的回调函数中返回一个 promise,会根据这个 promise 的状态来决定走外层下一个 then 的成功还是失败并且将原因向下传递
- 10. 在 then 的成功和失败的回调中发生了异常了，下一个 then 的失败
- 11. 如果不是 9，10 的情况 则会将返回的值向下传递给下一个 then 的成功

  - 什么时候会走失败
    - 1. 抛错
    - 2. 返回一个失败的 promise
    - 3. 其他都走成功

- 12. x 决定 promise2 的状态

  - 12.1 如果 x 是普通值 直接调用 promise2 的`resolve`即可
  - 12.2 如果 x 是`promise` 需要采用这个`promise`的状态

- 13. 如果实现的链式调用呢？返回 this(为了保证每次 then 之后都能产生一个全新的 promise 我们采用每次调用 then 都返回一个 promise 实例)
- 14. `then`的两个参数 onFulfilled,onRejected 都是可选的
  - `onFulfilled` 如果不是函数 onFulfilled 默认值是`(v)=>v;`
  - `onRejected` 如果不是函数 onRejected 默认值是`(err)=>throw err`

```js 35
const PENDING="PENDING";
const FULFILLED='FULFILLED';
const REJECTED='REJECTED';
const isPromise(x){
    return
}
function resolvePromise(x,promise2,resolve,reject){
    let called; //x可能是别人的Promise 既调用了成功 又调用了失败
    //x 决定promise2的状态 走成功还是失败
    if(x===promise2){
        return reject(new TypeError('循环引用'));//promise2会等待x是否成功还是失败,又因为x===promise2,所以会循环引用
    }
    // 判断x是不是promise 先保证x是一个对象或者函数 如果不是对象或者函数 那么x一定不是promise
    if(typeof x==='object'&&x!=null ||typeof x==='function'){
        // x.then 取值的时候可能还有错误需要try catche
        // x可能是别人写的promise 那么取then有风险
        try{
            let then=x.then;
            if(typeof then==='function'){
                //x.then((y)=>{},r=>{}) 取then可能有风险
                then.call(x,(y)=>{
                    // 在then里面可能调用成功 也可能调用失败
                    if(called) return;
                    called=true;
                    resolvePromise(y,promise2,resolve,reject);//递归解析 只要我们的y值 就是一个普通值 resolve 里面也是一个Promise
                },(r)=>{
                    if(called) return;
                    called=true;
                    reject(r)
                })
            }else{
                // x 不是Promise,这里直接返回了,
                // 只是一个对象而已,就是一个普通值
                resolve(x)
            }
        }catch(e){
            // 错误了 就不能在调用成功了
            if(called) return;
             called=true;
            reject(e)
        }

    }else{
        // x是一个普通值，直接吧x传递给promise2的成功即可
        resolve(x)
    }
}
class Promise{
    constructor(executor){
        this.status=PENDING;
        this.value=undefined;//成功的原因
        this.reason=undefined;//失败的原因
        this.onResolvedCallbacks=[]; //存放失败的回调
        this.onRejectedCallbacks=[]; //存放成功的回调
        const resolve=(value)=>{
        if(this.status===PENDING){
            this.status=FULFILLED;
            this.value=value;
            this.onResolvedCallbacks.forEach(fn=>fn());
            }

        };
        const reject=(reason)=>{
        if(this.status===PENDING){
            this.status=REJECTED;
            this.reason=reason;
             this.onRejectedCallbacks.forEach(fn=>fn());
            }
        };
        try{
            executor(resolve,reject) //传递给用户两个参数
        }cache(e){
            reject(e) //用户主动抛出异常
        }

    }
    then(onFulfilled,onRejected){
        onFulfilled=typeof onFulfilled==='function'?onFulfilled:(v)=>v;
        onRejected=typeof onRejected==='function'?onRejected:err=>{throw err}
        // 参数是可选的  值得穿透
        let promise2=new Promise((resolve,reject)=>{
            if(this.status===FULFILLED){
                 setTimeout(() => {
                try{ // 为啥每次都包一层try catch 因为then是异步的不是马上调用的
                    let x=onFulfilled(this.value);
                    resolvePromise(x,promise2,resolve,reject)
                }catch(e){
                    reject(e)
                }
                 });
                }


                if(this.status===REJECTED){
                    setTimeout(()=>{
                    try{
                        let x=onRejected(this.reason);
                        resolvePromise(x,promise2,resolve,reject)
                    }catch(e){
                        reject(e)
                    }
                    })


                }
                if(this.status===PENDING){
                    // setTimeout(()=>{ //为什么不能把settimeout放到这里,会导致如果new promise中执行异步的时候 resolve时， this.onFulFilledCallbacks为[]
                    // 稍后成功了除了执行回调外，还有其他操作
                    this.onResolvedCallbacks.push(()=>{
                        setTimeout(()=>{
                            try{
                            let x=onFulfilled(this.value);
                            resolvePromise(x,promise2,resolve,reject)
                         }catch(e){
                             reject(e)
                         }
                        })

                    });
                    this.onRejectedCallbacks.push(()=>{
                        setTimeout(()=>{
                        try{
                            let x=onRejected(this.reason);
                            resolvePromise(x,promise2,resolve,reject)
                        }catch(e){
                            reject(e)
                        }
                        })

                    })
            }
        })
        return promise2;

    }
}
```

# 测试 Promise

```js
Promise.deferred = function () {
  let dfd = {};
  dfd.Promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve;
    dfd.reject = reject;
  });
  return dfd;
};
```

npm install 
