# JSBridge

## 什么是 JSBridge

从名字我们就可以看出，`Bridge`是一个桥梁，连接起`JS`和`Native`，使得两个本来互相隔离的“孤岛”能够通信。`H5`可以通过`Bridge`调用`Native`的能力，`Native`也可以调用`JS`执行。
常见的跨平台框架`ReactNative`、`Cordova`都是使用`JSBridge`处理`js`和`native`之间的通信的

## WebView

首先了解下`webView`，`webView`是移动端提供的运行`JavaScript`的环境，是系统渲染 Web 网页的一个控件，可与页面`JavaScript`交互，实现混合开发，其中`Android`和`iOS`又有些不同：

- `Android`的`WebView`采用的是低版本和高版本使用了不同的`webkit内核`，`4.4`后直接使用了`Chrome`。
- `iOS`中`UIWebView`算是自 IOS2 就有，但性能较差，特性支持较差，`WKWebView`是`iOS8`之后的升级版，性能更强特性支持也较好。

WebView控件除了能`加载指定的url`外，还可以对`URL请求`、`JavaScript的对话框`、`加载进度`、`页面交互`进行强大的处理，之后会提到`拦截请求`、`执行JS脚本`都依赖于此。
## JSBridge 的原理

> 常用的实现`JSBridge`方式有两种：

- 拦截`URL请求`
- `MessageHandler`(执行 JS 脚本)

## 实现JSBridge
Web端和Native可以类比于`Client/Server`模式，Web端调用原生接口时就如同`Client`向`Server`端发送一个请求类似，`JSB`在此充当类似于HTTP协议的角色，实现JSBridge主要是两点：
1. 将Native端原生接口封装成`JavaScript接口`
2. 将Web端JavaScript接口封装成原生接口

### 1. Native->Web
首先来说Native端调用Web端，这个比较简单，JavaScript作为解释性语言，最大的一个特性就是可以随时随地地通过解释器执行一段JS代码，所以可以将拼接的JavaScript代码字符串，传入JS解析器执行就可以，JS解析器在这里就是webView。

Android 4.4之前只能用`loadUrl`来实现，并且无法执行回调：

```java
String jsCode = String.format("window.showWebDialog('%s')", text);
webView.loadUrl("javascript: " + jsCode);
```
Android 4.4之后提供了`evaluateJavascript`来执行JS代码，并且可以获取返回值执行回调：
```java
String jsCode = String.format("window.showWebDialog('%s')", text);
webView.evaluateJavascript(jsCode, new ValueCallback<String>() {
  @Override
  public void onReceiveValue(String value) {

  }
});
```
iOS的`UIWebView`使用`stringByEvaluatingJavaScriptFromString：`
```c
NSString *jsStr = @"执行的JS代码";
[webView stringByEvaluatingJavaScriptFromString:jsStr];

```
iOS的WKWebView使用`evaluateJavaScript`：
```c
[webView evaluateJavaScript:@"执行的JS代码" completionHandler:^(id _Nullable response, NSError * _Nullable error) {
  
}];
```
### 2. Web->Native
`Web`调用`Native`端主要有两种方式:

#### 2.1 拦截Webview请求的URL Schema
`URL Schema`是`类URL`的一种请求格式，格式如下：

> `<protocol>://<host>/<path>?<qeury>#fragment`
我们可以自定义`JSBridge`通信的`URL Schema`，比如：`jsbridge://showToast?text=hello`

`Native`加载`WebView`之后，Web发送的`所有请求`都会经过`WebView`组件，所以`Native`可以重写`WebView里的方法`，从来`拦截Web发起的请求`，我们对请求的格式进行判断：
- 如果符合我们自定义的`URL Schema`，对URL进行解析，拿到相关操作、操作，进而调用`原生Native的方法`
- 如果不符合我们自定义的`URL Schema`，我们直接转发，请求真正的服务

![1.png](/img/docs/跨平台/1.png)

#### 2.2 Web发送URL请求的方法有这么几种：
- `a`标签
- `location.href`
- 使用`iframe.src`
- 发送`ajax`请求

这些方法，`a标签`需要用户操作，`location.href`可能会引起页面的跳转丢失调用，`发送ajax`请求Android没有相应的拦截方法，所以使用`iframe.src`是经常会使用的方案：
- 安卓提供了`shouldOverrideUrlLoading`方法拦截
- UIWebView使用`shouldStartLoadWithRequest`，WKWebView则使用`decidePolicyForNavigationAction`

这种方式从早期就存在，兼容性很好，但是由于是基于URL的方式，长度受到限制而且不太直观，数据格式有限制，而且建立请求有时间耗时。

#### 2.3 向Webview中注入JS API
这个方法会通过`webView`提供的接口，`App`将`Native的相关接口`注入到JS的`Context（window）`的对象中，一般来说这个对象内的方法名与Native相关方法名是相同的，Web端就可以直接在全局window下使用这个暴露的全局JS对象，进而调用原生端的方法。

这个过程会更加简单直观，不过有兼容性问题，`大多数情况下`都会使用这种方式:

Android（4.2+）提供了`addJavascriptInterface`注入：
```java
// 注入全局JS对象
webView.addJavascriptInterface(new NativeBridge(this), "NativeBridge");

class NativeBridge {
  private Context ctx;
  NativeBridge(Context ctx) {
    this.ctx = ctx;
  }

  // 增加JS调用接口
  @JavascriptInterface
  public void showNativeDialog(String text) {
    new AlertDialog.Builder(ctx).setMessage(text).create().show();
  }
}

```

在Web端直接调用这个方法即可：
```js
window.NativeBridge.showNativeDialog('hello');

```
- iOS的UIWebView提供了`JavaSciptCore`

- iOS的WKWebView提供了`WKScriptMessageHandler`

####  2.4 带回调的调用
上面已经说到了Native、Web间双向通信的两种方法，但站在一端而言还是一个单向通信的过程 ，比如站在Web的角度：Web调用Native的方法，Native直接相关操作但无法将结果返回给Web，但实际使用中会经常需要将操作的结果返回，也就是JS回调。

所以在对端操作并返回结果，有输入有输出才是完整的调用，那如何实现呢？

其实基于之前的单向通信就可以实现，我们在一端调用的时候在参数中加一个`callbackId`标记对应的回调，对端接收到调用请求后，进行实际操作，如果带有`callbackId`，对端再进行一次调用，将结果、callbackId回传回来，这端根据callbackId匹配相应的回调，将结果传入执行就可以了。

![2.png](/img/docs/跨平台/2.png)

可以看到实际上还是通过两次单项通信实现的。

以`Android`，在Web端实现带有回调的JSB调用为例：
```html
// Web端代码：
<body>
  <div>
    <button id="showBtn">获取Native输入，以Web弹窗展现</button>
  </div>
</body>
<script>
  let id = 1;
  // 根据id保存callback
  const callbackMap = {};
  // 使用JSSDK封装调用与Native通信的事件，避免过多的污染全局环境
  window.JSSDK = {
    // 获取Native端输入框value，带有回调
    getNativeEditTextValue(callback) {
      const callbackId = id++;
      callbackMap[callbackId] = callback;
      // 调用JSB方法，并将callbackId传入
      window.NativeBridge.getNativeEditTextValue(callbackId);
    },
    // 接收Native端传来的callbackId
    receiveMessage(callbackId, value) {
      if (callbackMap[callbackId]) {
        // 根据ID匹配callback，并执行
        callbackMap[callbackId](value);
      }
    }
  };

	const showBtn = document.querySelector('#showBtn');
  // 绑定按钮事件
  showBtn.addEventListener('click', e => {
    // 通过JSSDK调用，将回调函数传入
    window.JSSDK.getNativeEditTextValue(value => window.alert('Natvie输入值：' + value));
  });
</script>

```

```java
// Android端代码
webView.addJavascriptInterface(new NativeBridge(this), "NativeBridge");

class NativeBridge {
  private Context ctx;
  NativeBridge(Context ctx) {
    this.ctx = ctx;
  }

  // 获取Native端输入值
  @JavascriptInterface
  public void getNativeEditTextValue(int callbackId) {
    MainActivity mainActivity = (MainActivity)ctx;
    // 获取Native端输入框的value
    String value = mainActivity.editText.getText().toString();
    // 需要注入在Web执行的JS代码
    String jsCode = String.format("window.JSSDK.receiveMessage(%s, '%s')", callbackId, value);
    // 在UI线程中执行
    mainActivity.runOnUiThread(new Runnable() {
      @Override
      public void run() {
        mainActivity.webView.evaluateJavascript(jsCode, null);
      }
    });
  }
}

```

以上代码简单实现了一个demo，在Web端点击按钮，会获取Native端输入框的值，并将值以Web端弹窗展现，这样就实现了Web->Native带有回调的JSB调用，同理Native->Web也是同样的逻辑，不同的只是将`callback`保存在`Native端`罢了，在此就不详细论述了。
## 开源的JSBridge
可以看到，实现一个完整的`JSBridge`还是挺麻烦的，还需要考虑低端机型的兼容问题、同步异步调用问题，好在已经有开源的JSBridge供我们直接使用了：

- `DSBridge`，主要通过注入API的形式，[DSBridge for Android](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fwendux%2FDSBridge-Android)、[DSBridge for IOS](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fwendux%2FDSBridge-IOS)
- `JsBridge`，主要通过拦截URL Schema，[JsBridge](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Flzyzsd%2FJsBridge)

以`DSBridge-Android`为例：

```html
// Web端代码
<body>
  <div>
    <button id="showBtn">获取Native输入，以Web弹窗展现</button>
  </div>
</body>
// 引入SDK
<script src="https://unpkg.com/dsbridge@3.1.3/dist/dsbridge.js"></script>
<script>
  const showBtn = document.querySelector('#showBtn');
  showBtn.addEventListener('click', e => {
    // 注意，这里代码不同：SDK在全局注册了dsBridge，通过call调用Native方法
    dsBridge.call('getNativeEditTextValue', '', value => {
      window.alert('Native输入值' + value);
    })
  });
</script>

```
```java
// Android代码
// 使用dwebView替换原生webView
dwebView.addJavascriptObject(new JsApi(), null);

class JSApi {
  private Context ctx;
  public JSApi (Context ctx) {
    this.ctx = ctx;
  }

  @JavascriptInterface
  public void getNativeEditTextValue(Object msg, CompletionHandler<String> handler) {
    String value = ((MainActivity)ctx).editText.getText().toString();
    // 通过handler将value传给Web端，实现回调的JSB调用
    handler.completed(value);
  }
}

```
可以看到，代码被精简了很多，其它更多使用直接看文档就可以
## 参考

[万字长文 写给前端工程师的 JSBridge 原理](https://juejin.cn/post/6847902218763534349)

[深入浅出 JSBridge：从原理到使用](https://juejin.cn/post/6936814903021797389)
