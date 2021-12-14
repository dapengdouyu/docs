# eventLoop

依据我们多年编写 ajax 的经验：js 应该是按照语句先后顺序执行，在出现异步时，则发起异步请求后，接着往下执行，待异步结果返回后再接着执行。但他内部是怎样管理这些执行任务的呢?

## macroTasks 和 microTasks

event loop 里面有维护了两个不同的异步任务队列 macroTasks(Tasks) 的队列 microTasks 的队列

- 宏任务包括：setTimeout, setInterval, setImmediate, I/O, UI rendering

- 微任务包括： 原生 Promise(有些实现的 Promise 将 then 方法放到了宏任务中), Object.observe(已废弃), MutationObserver（监听 dom 节点更新完毕) MessageChannel

> 微任务 会比宏任务快，js 中会先执行 script 脚本

![eventLoop](eventLoop.jpg)
