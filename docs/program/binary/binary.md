# 二进制的应用

![二进制](/buffer/binary.png)

## ArrayBuffer

- [ArrayBuffer](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) 对象用来表示通用的、固定长度的原始二进制数据缓冲区
- 它是一个字节数组，通常在其他语言中称为 `byte array`
- 你不能直接操作 `ArrayBuffer` 的内容，而是要通过`类型数组对象`或 `DataView` 对象来操作，它们会将缓冲区中的数据表示为特定的格式，并通过这些格式来读写缓冲区的内容。
- 代表内存之中的一段二进制数据，可以通过`视图`进行操作。`视图`部署了`数组`接口，这意味着，可以用数组的方法操作内存。

![](/buffer/bytearray.jpg)

```js
//创建一个长度为 8 个字节的 buffer
const buffer = new ArrayBuffer(8);
console.log(buffer.byteLength);
```

## TypedArray 视图

- 同一段内存，不同数据有不同的解读方式，这就叫做`视图`（view）
- [TypedArray](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) 对象描述了一个底层的二进制数据缓冲区(binary data buffer)的一个类数组`视图`(view)

- 但它本身不可以被实例化，甚至无法访问，你可以把它理解为`接口`,它有很多的实现
- 数组成员都是同一个`数据类型`

TypedArray 视图一共包括 [9](https://es6.ruanyifeng.com/#docs/arraybuffer) 种类型，每一种视图都是一种构造函数。

| 类型        | 单个元素值的范围 | 大小(bytes) | 描述                  |
| ----------- | ---------------- | ----------- | --------------------- |
| Int8Array   | -128 to 127      | 1           | 8 位二进制有符号整数  |
| Uint8Array  | 0 to 255         | 1           | 8 位无符号整数        |
| Int16Array  | -32768 to 32767  | 2           | 16 位二进制有符号整数 |
| Uint16Array | 0 to 65535       | 2           | 16 位无符号整数       |

![TypedArray](/public/buffer/TypedArray.jpg)

```js
const buffer = new ArrayBuffer(8);
console.log(buffer.byteLength); //8
const int8Array = new Int8Array(buffer);
console.log(int8Array.length); //8 视图类型的长度
const int16Array = new Int16Array(buffer);
console.log(int16Array.length); //4
```

### DataView 视图

- 如果一段数据包括`多种类型`（比如服务器传来的 HTTP 数据），这时除了建立 ArrayBuffer 对象的复合视图以外，还可以通过 `DataView 视图`进行操作。
- [DataView](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView) 视图是一个可以从 二进制 ArrayBuffer 对象中读写多种数值类型的底层接口，使用它时，不用考虑不同平台的字节序问题。
- `setInt8()`从 DataView 起始位置以 byte 为计数的指定偏移量(byteOffset)处储存一个 8-bit 数(一个字节)
- `getInt8()`从 DataView 起始位置以 byte 为计数的指定偏移量(byteOffset)处获取一个 8-bit 数(一个字节)

```js
new DataView(buffer [, byteOffset [, byteLength]])
```

```js
const buffer = new ArrayBuffer(16);
const dateView = new DataView(buffer);
dateView.setInt8(0, 1);
dateView.setInt8(1, 3);
console.log(dateView.getInt8(0)); // 0
console.log(dateView.getInt8(1)); // 3
console.log(dateView.getInt16(0)); // 259
```

### Blob

- [Blob](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob) 对象表示一个不可变、原始数据的类文件对象。Blob 表示的不一定是 JavaScript 原生格式的数据。File 接口基于 Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。
- 它与 `ArrayBuffer` 的区别在于，它用于操作`二进制文件`，而 `ArrayBuffer` 用于操作`内存`。
- `Blob` 构造函数返回一个新的 Blob 对象。 blob 的内容由参数数组中给出的值的串联组成。
  - [FileReader](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader) 对象允许 Web 应用程序异步读取存储在用户计算机上的文件（或原始数据缓冲区）的内容，使用 File 或 Blob 对象指定要读取的文件或数据。
    - `readAsText(Blob|File, opt_encoding)`：返回文本字符串。默认情况下，文本编码格式是`UTF-8`，可以通过可选的格式参数，指定其他编码格式的文本。
    - `readAsBinaryString`()：读取任意类型的文件，返回二进制字符串,该字符串每个字节包含一个 0 到 255 之间的整数。这个方法不是用来读取文件展示给客户看，而是储存文件。例如：读取文件的内容，获取二进制数据，传递给后台，后台接收了数据之后，再将数据储存
    - `readAsDataURL`(Blob|File)：读取文件获取一段以 data 开头的字符串，这段字符串的本质就是 DataURL，DataURL 是一种将文件（这个文件一般是指图像或者能够嵌入到文档的文件格式）嵌入到文档的方案。DataURL 是将资源转换为 base64 编码的字符串形式，并且将这些内容直接储存在 url 中 >> 优化网站的加载速度和执行效率
    - `readAsArrayBuffer(Blob|File)`：返回一个 ArrayBuffer 对象。

```js
new Blob(array [, options])
```

- 第一个参数是数组，成员是`字符串`或`二进制对象`，表示新生成的 Blob 实例对象的内容；
- 第二个参数是可选的，是一个配置对象，目前只有一个属性 type，它的值是一个字符串，表示数据的 MIME 类型，默认是空字符串。

```js
let debug = { hello: "world" };
let str = JSON.stringify(debug);
console.log("str", str);
var blob = new Blob([str], { type: "application/json" });
console.log("blob.size", blob.size);

function readBlob(blob, type) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = function(event) {
      resolve(event.target.result);
    };
    switch (type) {
      case "ArrayBuffer":
        reader.readAsArrayBuffer(blob);
        break;
      case "DataURL":
        reader.readAsDataURL(blob);
        break;
      case "Text":
        reader.readAsText(blob);
        break;
      case "BinaryString":
        reader.readAsBinaryString(blob);
        break;
      default:
        break;
    }
  });
}
readBlob(blob, "ArrayBuffer").then((buffer) => {
  console.log("buffer", buffer);
});
readBlob(blob, "DataURL").then((base64String) => {
  console.log("base64String", base64String);
});
readBlob(blob, "Text").then((text) => {
  console.log("text", text);
});
readBlob(blob, "BinaryString").then((string) => {
  console.log("BinaryString", string);
});
```

### Object URL

- 可以使用浏览器新的 `API URL` 对象通过方法生成一个地址来表示 Blob 数据
- [URL.createObjectURL](https://developer.mozilla.org/zh-CN/docs/Web/API/URL/createObjectURL) 静态方法会创建一个 DOMString，其中包含一个表示参数中给出的对象的 URL。这个 URL 的生命周期和创建它的窗口中的 document 绑定。这个新的 URL 对象表示指定的 File 对象或 Blob 对象。

```js
<body>
    <button onclick="download()">下载json</button>
    <script>
     function download () {
        let debug = { hello: "world" };
        let str = JSON.stringify(debug);
        var blob = new Blob([str], { type: 'application/json' });
        let objectURL = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.download = 'hello.json';
        a.rel = 'noopener';
        a.href = objectURL;
        a.dispatchEvent(new MouseEvent('click'));
        URL.revokeObjectURL(objectURL);
     }
    </script>
</body>
```

### 图片预览剪裁

#### image.js

```js
import React from "react";
export default class Image extends React.Component {
  imageRef = React.createRef();
  canvasRef = React.createRef();
  avatarRef = React.createRef();
  state = {
    file: null, //选中的文件
    dataURL: "", //选中的文件的原始的base64字符串
    times: 1, //放大倍数,
    startX: 0, //鼠标按下的开始的X坐标
    startY: 0, //鼠标按下的开始的Y坐标
    startDrag: false,
    lastX: 0,
    lastY: 0,
    avatarDataUrl: "",
  };
  handleChange = (event) => {
    let file = event.target.files[0];
    let fileReader = new FileReader();
    fileReader.onload = (event) => {
      this.setState({
        file,
        dataURL: event.target.result,
      });
      //当图片加载成功后会执行回调
      this.imageRef.current.onload = () => this.drawImage();
    };
    fileReader.readAsDataURL(file);
  };
  bigger = () => {
    this.setState({ times: this.state.times + 0.1 }, () => this.drawImage());
  };
  smaller = () => {
    this.setState({ times: this.state.times - 0.1 }, () => this.drawImage());
  };
  handleMouseDown = (event) => {
    this.setState({
      startX: event.clientX,
      startY: event.clientY,
      startDrag: true,
    });
  };
  handleMouseMove = (event) => {
    //X方向的移动的量 Y方面移动的量
    if (this.state.startDrag)
      this.drawImage(
        event.clientX - this.state.startX + this.state.lastX,
        event.clientY - this.state.startY + this.state.lastY
      );
  };
  handleMouseUp = (event) => {
    this.setState({
      lastX: event.clientX - this.state.startX + this.state.lastX,
      lastY: event.clientY - this.state.startY + this.state.lastY,
      startDrag: false,
    });
  };
  drawImage = (left = this.state.lastX, top = this.state.lastY) => {
    let image = this.imageRef.current; //img dom元素
    let canvas = this.canvasRef.current; //canvas dom元素
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let imageWidth = image.width;
    let imageHeight = image.height;
    if (imageWidth > imageHeight) {
      //如果宽度比高度大 图片的宽度调整为canvas的宽度
      let scale = canvas.width / imageWidth;
      imageWidth = canvas.width * this.state.times;
      imageHeight = imageHeight * scale * this.state.times;
    } else {
      let scale = canvas.height / imageHeight;
      imageHeight = canvas.height * this.state.times;
      imageWidth = imageWidth * scale * this.state.times;
    }
    ctx.drawImage(
      image,
      (canvas.width - imageWidth) / 2 + left,
      (canvas.height - imageHeight) / 2 + top,
      imageWidth,
      imageHeight
    );
  };
  confirm = (event) => {
    let canvas = this.canvasRef.current;
    let ctx = canvas.getContext("2d");
    const imageData = ctx.getImageData(100, 100, 100, 100);
    let avatarCavnas = document.createElement("canvas");
    avatarCavnas.width = 100;
    avatarCavnas.height = 100;
    let avatarCtx = avatarCavnas.getContext("2d");
    avatarCtx.putImageData(imageData, 0, 0);
    let avatarDataUrl = avatarCavnas.toDataURL();
    this.setState({ avatarDataUrl });
    this.avatarRef.current.src = avatarDataUrl;
  };
  download = () => {
    const a = document.createElement("a");
    console.log(this.state.blob);
    a.href = this.state.avatarDataUrl;
    a.rel = "noopener";
    a.download = "a.png";
    a.dispatchEvent(new MouseEvent("click"));
  };
  upload = (event) => {
    //不能直接 上传base64. 同一个图片,base64要比二进制大
    //base64 3个字节变成4个字节
    let bytes = atob(this.state.avatarDataUrl.split(",")[1]);
    console.log("bytes", bytes);
    let arrayBuffer = new ArrayBuffer(bytes.length);
    let uInt8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < bytes.length; i++) {
      uInt8Array[i] = bytes.charCodeAt[i];
    }
    let blob = new Blog([arrayBuffer], { type: "image/png" });
    let xhr = new XMLHttpRequest();
    let formData = new FormData();
    formData.append("avatar", blob);
    xhr.open("POST", "/upload", true);
    xhr.send(formData);
  };
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <input type="file" accept="image/*" onChange={this.handleChange} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            {this.state.file && (
              <img
                className="img-responsive"
                src={this.state.dataURL}
                ref={this.imageRef}
                style={{ border: "2px dashed green" }}
              />
            )}
          </div>
          <div
            className="col-md-4"
            onMouseDown={this.handleMouseDown}
            onMouseMove={this.handleMouseMove}
            onMouseUp={this.handleMouseUp}
          >
            {this.state.file && (
              <>
                <div style={{ position: "relative" }}>
                  <canvas
                    ref={this.canvasRef}
                    width="300px"
                    height="300px"
                    style={{ border: "2px dashed blue" }}
                  />
                  <div
                    style={{
                      width: 100,
                      height: 100,
                      backgroundColor: "yellow",
                      opacity: 0.3,
                      position: "absolute",
                      left: 100,
                      top: 100,
                    }}
                  ></div>
                </div>
                <div className="btn-group">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={this.bigger}
                  >
                    变大
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={this.smaller}
                  >
                    变小
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={this.confirm}
                  >
                    剪切
                  </button>
                </div>
              </>
            )}
          </div>
          <div className="col-md-4">
            {this.state.file && (
              <img ref={this.avatarRef} style={{ border: "2px dashed pink" }} />
            )}
            <button onClick={this.upload}>上传</button>
          </div>
        </div>
      </div>
    );
  }
}
```

### 剪裁声音上传

#### Audio.js

```js
import React from "react";
import axios from "axios";
export default class Audio extends React.Component {
  startRef = React.createRef();
  endRef = React.createRef();
  audioRef = React.createRef();
  audioClipRef = React.createRef();
  clip = async () => {
    this.worker = createWorker("/ffmpeg-worker-mp4.js");
    let response = await axios({
      url: "/song.mp3",
      responseType: "arraybuffer",
    });
    let originBuffer = response.data;
    let start = parseInt(this.startRef.current.value);
    let end = parseInt(this.endRef.current.value);
    let duration = end - start; //持续的时间
    let result = (
      await toPromise(
        this.worker,
        getClipCommand(originBuffer, start, duration)
      )
    ).data.data.MEMFS[0].data;
    let blob = bufferToBlob(result);
    let audioClip = this.audioClipRef.current;
    audioClip.src = URL.createObjectURL(blob);
    audioClip.load();
    audioClip.play();
  };
  render() {
    return (
      <div>
        <input ref={this.startRef} defaultValue={0} />
        <input ref={this.endRef} defaultValue={10} />
        <button type="button" className="primary" onClick={this.clip}>
          clip
        </button>
        <audio ref={this.audioRef} controls src="/song.mp3" />
        <audio ref={this.audioClipRef} controls />
      </div>
    );
  }
}

function getClipCommand(arrayBuffer, start = 0, duration = 10) {
  return {
    type: "run",
    arguments: `-ss ${start} -i input.mp3 ${
      duration ? `-t ${duration} ` : ""
    }-acodec copy output.mp3`.split(" "),
    MEMFS: [
      {
        data: new Uint8Array(arrayBuffer),
        name: "input.mp3",
      },
    ],
  };
}
function toPromise(worker, command) {
  return new Promise((resolve) => {
    const onSuccess = function(event) {
      switch (event.data.type) {
        case "done":
          worker.removeEventListener("message", onSuccess);
          resolve(event);
          break;
        default:
          break;
      }
    };
    worker.addEventListener("message", onSuccess);
    command && worker.postMessage(command);
  });
}
function createWorker(path) {
  return new Worker(path);
}
function bufferToBlob(buffer) {
  return new File([buffer], "clip.mp3", { type: "audio/mpeg" });
}
```

### 合并声音上传

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>music</title>
  </head>
  <body>
    <button onclick="download()">合并下载</button>
    <script>
      function getMusic(url) {
        return new Promise(function(resolve, reject) {
          let xhr = new XMLHttpRequest();
          xhr.open("GET", url, true);
          xhr.responseType = "arraybuffer";
          xhr.onload = function() {
            resolve(xhr.response);
          };
          xhr.send();
        });
      }
      let player = document.getElementById("player");
      function download() {
        Promise.all([getMusic("/song1.mp3"), getMusic("/song2.mp3")]).then(
          function(responses) {
            let buffer = mergeArrayBuffer(responses);
            var file = new File([buffer], "all.mp3", { type: "audio/mp3" });
            let objectURL = URL.createObjectURL(file);
            const a = document.createElement("a");
            a.download = "合并.mp3";
            a.rel = "noopener";
            a.href = objectURL;
            a.dispatchEvent(new MouseEvent("click"));
          }
        );
      }
      //arrays成员类型可以是 ArrayBuffer 或 TypeArray
      function mergeArrayBuffer(arrays) {
        let total = 0;
        for (let i = 0; i < arrays.length; i++) {
          arrays[i] = new Uint8Array(arrays[i]); //全部转成Uint8Array
          total += arrays[i].length;
        }
        let result = new Uint8Array(total);
        let offset = 0;
        for (let item of arrays) {
          result.set(item, offset);
          offset += item.length;
        }
        return result.buffer;
      }
    </script>
  </body>
</html>
```
