# 前端的请求方式

- `form` 表单、`ifream`、`刷新页面`
- `Ajax` - 异步网络请求的开山鼻祖
- `jQuery` - 一个时代
- `fetch` - Ajax 的替代者
- `axios`、`request` 等众多开源库

# Ajax

## Ajax 的出现解决了什么问题

在`Ajax` 出现之前，`web`程序是这样工作的：
<img src="http://img.zhangyapeng.club/network/README/wlqq_1.png" alt="network/README" style="zoom:100%;" />

这种交互的的缺陷是显而易见的，任何和`服务器`的交互都需要`刷新页面`，用户体验非常差，Ajax 的出现解决了这个问题。Ajax 全称 `Asynchronous JavaScript` + `XML`（异步 JavaScript 和 XML）

使用`Ajax`，网页应用能够快速地将增量更新呈现在用户界面上，而不需要`重载（刷新）`整个页面。

`Ajax`本身不是一种新技术，而是用来描述一种使用现有`技术集合`实现的一个技术方案，浏览器的`XMLHttpRequest`是实现`Ajax`最重要的对象（IE6 以下使用 ActiveXObject）。

尽管 X 在 Ajax 中代表`XML`, 但由于`JSON`的许多优势，比如更加轻量以及作为`Javascript`的一部分，目前 JSON 的使用比`XML`更加普遍。

## 原生 Ajax 的用法

这里主要分析 `XMLHttpRequest`对象，下面是它的一段基础使用：

```js
var xhr = new XMLHttpRequest();
// 初始化服务
xhr.open("post", "www.xxx.com", true);
 // 接收返回值
xhr.onreadystatechange = function(){
    if(xhr.readyState === 4 ){
        if(xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
            console.log(xhr.responseText);
        }
    }
}
// 处理请求参数
postData = {"name1":"value1","name2":"value2"};
postData = (function(value){
var dataString = "";
for(var key in value){
        dataString += key+"="+value[key]+"&";
};
return dataString;
}(postData));
// 设置请求头
xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
 // 异常处理
xhr.onerror = function() {
    console.log('Network request failed')
}
xhr.onprogress = function(event) {
  console.log(event.loaded / event.total);
};
// 跨域携带cookie
xhr.withCredentials = true;
// 发出请求
xhr.send(postData);
```

下面分别对`XMLHttpRequest` 对象常用的的函数、属性、事件进行分析。
<img src="http://img.zhangyapeng.club/network/README/wlqq_2.png" alt="network/README" style="zoom:100%;" />

# 函数

## open

用于初始化一个请求，用法：

```js
xhr.open(method, url, async);
```

- method：请求方式，如 get、post
- url：请求的 url
- async：是否为异步请求

## send

用于发送 `HTTP` 请求，即调用该方法后 `HTTP` 请求才会被真正发出，用法：

```js
xhr.send(param);
```

- param：http 请求的参数，可以为 `string`、`Blob` 等类型

## abort

用于终止一个`ajax` 请求，调用此方法后 `readyState` 将被设置为 `0`，用法：

```js
xhr.abort();
```

## setRequestHeader

用于设置 `HTTP` 请求头，此方法必须在 `open()`方法和 `send()`之间调用，用法：

```js
xhr.setRequestHeader(header, value);
```

## getResponseHeader

用于获取 `http` 返回头，如果在返回头中有多个一样的名称，那么返回的值就会是用`逗号`和`空格`将值分隔的字符串，用法：

```js
var header = xhr.getResponseHeader(name);
```

# 属性

## readyState

用来标识当前`XMLHttpRequest`对象所处的状态，`XMLHttpRequest` 对象总是位于下列状态中的一个：

| 值  |        状态        |                        描述                        |
| :-: | :----------------: | :------------------------------------------------: |
|  0  |      `UNSENT`      |       代理被创建，但尚未调用 `open()` 方法。       |
|  1  |      `OPENED`      |             `open()` 方法已经被调用。              |
|  2  | `HEADERS_RECEIVED` | `send()`方法已经被调用，并且头部和状态已经可获得。 |
|  3  |     `LOADING`      |   下载中； `responseText` 属性已经包含部分数据。   |
|  4  |       `DONE`       |                  下载操作已完成。                  |

## status

表示 `http` 请求的状态, 初始值为 `0`。如果服务器没有显式地指定状态码, 那么`status`将被设置为默认值, 即`200`。

## responseType

表示`响应`的数据类型，并允许我们手动设置，如果为空，默认为 `text`类型，可以有下面的取值：

|       值        |                                           描述                                            |
| :-------------: | :---------------------------------------------------------------------------------------: |
|      `""`       | 将 `responseType`设为空字符串与设置为`"text"`相同， 是默认类型 （实际上是 `DOMString`）。 |
| `"arraybuffer"` |               `response` 是一个包含二进制数据的`JavaScript ArrayBuffer` 。                |
|    `"blob"`     |                      `response`是一个包含二进制数据的 `Blob` 对象 。                      |
|  `"document"`   |   response 是一个`HTML Document`或`XML XMLDocument`，这取决于接收到的数据的 MIME 类型。   |
|    `"json"`     | `response` 是一个 JavaScript 对象。这个对象是通过将接收到的数据类型视为`JSON`解析得到的。 |
|    `"text"`     |                        `response`是包含在`DOMString`对象中的文本。                        |

## response

返回响应的正文，返回的类型由上面的 `responseType` 决定。

## withCredentials

`ajax` 请求默认会携带同源请求的`cookie`，而`跨域请求`则不会携带 `cookie`，设置 `xhr` 的 `withCredentials` 的属性为`true`将允许携带跨域 `cookie`。

# 事件回调

## onreadystatechange

```js
xhr.onreadystatechange = callback;
```

当`readyState`属性发生变化时，callback 会被触发。

## onloadstart

```js
xhr.onloadstart = callback;
```

在`ajax`请求发送之前（`readyState==1`后, `readyState==2`前），`callback`会被触发。

## onprogress

```js
xhr.onprogress = function(event) {
  console.log(event.loaded / event.total);
};
```

回调函数可以获取资源总大小`total`，已经加载的资源大小`loaded`，用这两个值可以计算加载进度。

## onload

```js
xhr.onload = callback;
```

当一个资源及其依赖资源已完成加载时，将触发`callback`，通常我们会在`onload`事件中处理返回值。

# 异常处理

## onerror

```js
xhr.onerror = callback;
```

当`ajax`资源加载失败时会触发`callback`。

## ontimeout

```js
xhr.ontimeout = callback;
```

当进度由于预定时间到期而终止时，会触发`callback`，超时时间可使用`timeout`属性进行设置。
