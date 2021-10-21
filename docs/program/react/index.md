# 什么是 react?

[官网](https://zh-hans.reactjs.org/docs/thinking-in-react.html)是这样介绍的

> React 是用 `JavaScript` 构建`快速响应`的大型 `Web` 应用程序的首选方式

如何才能实现`快速响应`。那么制约快速响应的因素是什么呢？

我们日常使用 App，浏览网页时，有两类场景会制约`快速响应`：

- 当遇到`大计算量`的操作或者设备性能不足使页面掉帧，导致卡顿。

- 发送网络请求后，由于需要`等待数据`返回才能进一步操作导致不能快速响应。

这两类场景可以概括为：

- CPU 的瓶颈

- IO 的瓶颈

我们看看 react 是如何解决的

## CPU 的瓶颈

当项目变得庞大、组件数量繁多时，就容易遇到 CPU 的瓶颈。

考虑如下`Demo`，我们向视图中渲染`3000个li`：

```jsx
function App() {
  const len = 3000;
  return (
    <ul>
      {Array(len)
        .fill(0)
        .map((_, i) => (
          <li>{i}</li>
        ))}
    </ul>
  );
}

const rootEl = document.querySelector("#root");
ReactDOM.render(<App />, rootEl);
```

主流浏览器刷新频率为 60Hz，即每（1000ms / 60Hz）`16.6ms`浏览器刷新一次。

JS 可以操作`DOM`，GUI 渲染线程与 JS 线程是互斥的。所以 JS 脚本执行和浏览器布局、绘制不能同时执行。

在每`16.6ms`时间内，需要完成如下工作:

```
JS脚本执行 -----  样式布局 ----- 样式绘制
```

当 JS 执行时间过长，超出了`16.6ms`，这次刷新就没有时间执行`样式布局`和`样式绘制`了

可以从打印的执行堆栈图看到，JS 执行时间为`73.65ms`，远远多于一帧的时间
![1.png](/img/react/1.png)

如何解决这个问题呢？

答案是：在浏览器每一帧的时间中，预留一些时间给`JS线程`，React 利用这部分时间更新组件（可以看到，在[源码](https://github.com/facebook/react/blob/1fb18e22ae66fdb1dc127347e169e73948778e5a/packages/scheduler/src/forks/SchedulerHostConfig.default.js#L119)中，预留的初始时间是 5ms）。

当预留的时间不够用时，React 将线程控制权交还给浏览器使其有时间`渲染UI`，React 则等待下一帧时间到来继续被中断的工作。

> 这种将长任务分拆到每一帧中，像蚂蚁搬家一样一次执行一小段任务的操作，被称为`时间切片`（time slice）

接下来我们[开启`Concurrent Mode`](https://zh-hans.reactjs.org/docs/concurrent-mode-adoption.html#why-so-many-modes)(并行模式)（后续章节会讲到，当前你只需了解开启后会启用时间切片）

```js
// 通过使用ReactDOM.unstable_createRoot开启Concurrent Mode
// ReactDOM.render(<App/>, rootEl);
ReactDOM.unstable_createRoot(rootEl).render(<App />);
```
此时我们的长任务被拆分到每一帧不同的`task`中，JS脚本执行时间大体在`5ms`左右，这样浏览器就有剩余时间执行样式布局和样式绘制，减少掉帧的可能性

![2.png](/img/react/2.png)
所以，解决`CPU瓶颈`的关键是`实现时间切片`，而`时间切片`的关键是：将同步的更新变为`可中断`的异步更新。

## IO的瓶颈
`网络延迟`是前端开发者无法解决的。如何在网络延迟客观存在的情况下，减少用户对网络延迟的感知？

React给出的答案是将[人机交互研究的结果整合到真实的 UI 中](https://zh-hans.reactjs.org/docs/concurrent-mode-intro.html#putting-research-into-production)

这里我们以业界人机交互最顶尖的苹果举例，在IOS系统中：

点击“设置”面板中的“通用”，进入“通用”界面：

![3.gif](/img/react/3.gif)

作为对比，再点击“设置”面板中的“Siri与搜索”，进入“Siri与搜索”界面：

![4.gif](/img/react/4.gif)

你能感受到两者体验上的区别么？

事实上，点击“通用”后的交互是同步的，直接显示后续界面。而点击“Siri与搜索”后的交互是异步的，需要等待请求返回后再显示后续界面。但从用户感知来看，这两者的区别微乎其微。

这里的窍门在于：点击“Siri与搜索”后，先在当前页面停留了一小段时间，这一小段时间被用来请求数据。

当**“这一小段时间”**足够短时，用户是无感知的。如果请求时间超过一个范围，再显示loading的效果。

试想如果我们一点击“Siri与搜索”就显示loading效果，即使数据请求时间很短，loading效果一闪而过。用户也是可以感知到的。

为此，React实现了[Suspense](https://zh-hans.reactjs.org/docs/concurrent-mode-suspense.html) 功能及配套的hook——[useDeferredValue](https://zh-hans.reactjs.org/docs/concurrent-mode-suspense.html)

而在源码内部，为了支持这些特性，同样需要将`同步的更新`变为`可中断的异步更新`