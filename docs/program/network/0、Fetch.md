# fetch

## 为什么需要 `fetch`

近年来前端 `MV\*`的发展壮大，人们越来越少的使用 jQuery，我们不可能单独为了使用 jQuery 的`Ajax api`来单独引入他，无可避免的，我们需要寻找新的技术方案。

## 什么是 fetch

`Fetch API`是一个用用于访问和操纵`HTTP管道`的强大的原生 API。

> 这种功能以前是使用 XMLHttpRequest 实现的。Fetch 提供了一个更好的替代方法，可以很容易地被其他技术使用，例如 Service Workers。Fetch 还提供了单个逻辑位置来定义其他 HTTP 相关概念，例如 CORS 和 HTTP 的扩展。

可见`fetch`是作为`XMLHttpRequest`的替代品出现的。

使用`fetch`，你不需要再额外加载一个外部资源。但它还没有被浏览器完全支持，所以你仍然需要一个`polyfill`

## fetch 的使用

一个基本的 `fetch` 请求：

```js
const options = {
  method: "POST", // 请求参数
  headers: { "Content-Type": "application/json" }, // 设置请求头
  body: JSON.stringify({ name: "123" }), // 请求参数
  credentials: "same-origin", // cookie设置
  mode: "cors", // 跨域
};
fetch("http://www.xxx.com")
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    console.log(myJson); // 响应数据
  })
  .catch(function(err) {
    console.log(err); // 异常处理
  });
```

`Fetch API` 提供了一个全局的 `fetch()`方法，以及几个辅助对象来发起一个网络请求。
<img src="http://img.zhangyapeng.club/network/0.Fetch/wlqq_4.png" alt="network/0.Fetch" style="zoom:100%;" />

## `Fetch API`基本方法

### `fetch()`

`fetch()`方法用于发起获取资源的请求。它返回一个 `promise`，这个 `promise` 会在请求响应后被`resolve`，并传回`Response` 对象

### `Headers()`

可以通过`Headers()`构造函数来创建一个你自己的`headers`对象，相当于 `response/request` 的头信息，可以使你查询到这些头信息，或者针对不同的结果做不同的操作。

```js
var myHeaders = new Headers();
myHeaders.append("Content-Type", "text/plain");
```

### `Request()`

通过`Request()`构造函数可以创建一个`Request`对象，这个对象可以作为`fetch`函数的第二个参数。

### `Response`

在`fetch()`处理完`promises`之后返回一个`Response`实例，也可以手动创建一个`Response`实例。

## `fetch polyfill` 源码分析

由于 `fetch` 是一个非常底层的 `API`，所以我们无法进一步的探究它的底层，但是我们可以借助它的 `polyfill` 探究它的基本原理，并找出其中的`坑点`。

### 代码结构

<img src="http://img.zhangyapeng.club/network/0.Fetch/wlqq_5.png" alt="network/0.Fetch" style="zoom:100%;" />

由代码可见，`polyfill`主要对`Fetch API`提供的四大对象进行了封装：

### fetch 封装

<img src="http://img.zhangyapeng.club/network/0.Fetch/wlqq_6.png" alt="network/0.Fetch" style="zoom:100%;" />

代码非常清晰：

- 构造一个`Promise`对象并返回
- 创建一个`Request`对象
- 创建一个`XMLHttpRequest`对象
- 取出`Request`对象中的请求`url`，请求方发，`open`一个`xhr`请求，并将`Request`对象中存储的`headers`取出赋给 xhr
- `xhr onload`后取出`response`的`status`、`headers`、`body`封装`Response`对象，调用`resolve`。

### 异常处理

<img src="http://img.zhangyapeng.club/network/0.Fetch/wlqq_7.png" alt="network/0.Fetch" style="zoom:100%;" />
可以发现，调用`reject`有三种可能：

1. 请求超时

2. 请求失败

> 注意：当和服务器建立简介，并收到服务器的异常状态码如 `404`、`500` 等并不能触发 `onerror`。当`网络故障`时或`请求被阻止`时，才会标记为 `reject`，如`跨域`、`url` 不存在，网络异常等会触发`onerror`。

所以使用`fetch`当接收到异常状态码都是会进入 `then` 而不是 `catch`。这些错误请求往往要手动处理。

3. 手动终止

可以在 `request` 参数中传入 `signal`对象，并对 `signal`对象添加 `abort`事件监听，当 `xhr.readyState` 变为 `4`（响应内容解析完成）后将 `signal`对象的 `abort`事件监听移除掉。

这表示，在一个 `fetch` 请求结束之前可以调用`signal.abort`将其终止。在浏览器中可以使用`AbortController()`构造函数创建一个控制器，然后使用 `AbortController.signal` 属性

### Headers 封装

<img src="http://img.zhangyapeng.club/network/0.Fetch/wlqq_8.png" alt="network/0.Fetch" style="zoom:100%;" />

在`header`对象中维护了一个`map`对象，构造函数中可以传入`Header`对象、数组、普通对象类型的`header`，并将所有的值维护到 `map`中。

之前在 `fetch` 函数中看到调用了 `header` 的`forEach` 方法，下面是它的实现：
<img src="http://img.zhangyapeng.club/network/0.Fetch/wlqq_9.png" alt="network/0.Fetch" style="zoom:100%;" />
可见 `header` 的遍历即其内部 `map` 的遍历。

另外 `Header` 还提供了 `append`、`delete`、`get`、`set` 等方法，都是对其内部的 `map` 对象进行操作。

### Request 对象

<img src="http://img.zhangyapeng.club/network/0.Fetch/wlqq_10.png" alt="network/0.Fetch" style="zoom:100%;" />

`Request`对象接收的两个参数即`fetch`函数接收的两个参数，第一个参数可以直接传递`url`，也可以传递一个构造好的`request对象`。第二个参数即控制不同配置的`option对象`。

可以传入 `credentials`、`headers`、`method`、`mode`、`signal`、`referrer` 等属性。

> 这里注意：
> 传入的 `headers` 被当作 `Headers` 构造函数的参数来构造 `header` 对象。
