# （一）初识

## Electron 是什么?

- Electron 就是使用 JavaScript，HTML 和 CSS 构建跨平台的桌面应用程序.
- Electron 是由 github 开发的开源框架
- 它允许开发者使用 web 技术开发跨平台的桌面应用
- `Electron = Chromium + Node.js + Native API`
  - Chromium：提供了强大的 ui 能力，可以不考虑浏览器兼容情况,利用强大的 web 生态来开发界面。
  - Node.js：让 Electron 有了底层才做能力，比如读写能力，并且可以使用大量的开源包来完成项目的开发。
  - Native API：让 Electron 有了跨平台和桌面端的原生能力，比如有同意的原生界面、窗口、托盘。

## 创建一个 ele 项目

新建 ele 文件夹， `npm init -y`  初始化项目

```javascript
//package.json文件

{
  "name": "ele",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",//主进程文件入口
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}

```

安装 electron: `npm install electron --save-dev` 
如果安装的时候遇到什么问题(大部分报错或太慢)可以看看 npm 是否切换了淘宝镜像:npm config set registry [https://registry.npm.taobao.org](https://registry.npm.taobao.org)

也可以配置一下 electron 镜像:npm config set ELECTRON_MIRROR [http://npm.taobao.org/mirrors/electron/](http://npm.taobao.org/mirrors/electron/)

测试 `electron`  是否安装成功：命令面板输入 `npx electron`  出现 electron 的窗口

查看 `electron`  的版本号：命令面板输入 `npx electron -v`

此时的版本号为： `v10.1.2`

`根目录`  下创建 `main.js`  文件(electron 主进程)

```javascript
const { app, BrowserWindow } = require("electron");
let mainWindow = null;

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    // 创建和控制浏览器窗口
    width: 600, // 窗口宽度
    height: 600, // 窗口高度
    webPreferences: {
      // 网页功能设置
      nodeIntegration: true, // 是否在node工作器中启用工作集成默认false
      enableRemoteModule: true, // 是否启用remote模块默认false
    },
  });
  mainWindow.loadFile("index.html"); // 加载页面
  mainWindow.on("close", () => {
    // 监听窗口关闭
    mainWindow = null; //销毁mainWindow
  });
});
```

新建 index.html 文件

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <h1>hello,sunny!</h1>
  </body>
</html>
```

相应的 package.json 需要进行修改，如下：

```json
{
  "name": "ele",
  "version": "1.0.0",
  "description": "",
  "main": "main.js", //主进程文件入口
  "scripts": {
    "start": "electron ." //执行脚本
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "electron": "^10.1.2"
  }
}
```

在命令行中输入 `npm run start` ，就会出现如下图片：
<img src="http://img.zhangyapeng.club/electron/README/image_看图王.png" alt="electron/README" style="zoom:100%;" />
就是成功啦，这样就是开始 electron 之旅了！

## 小小总结---electron 运行流程

- 读取 package.json 文件中的入口文件，这里就是我们的 main.js
- main.js 中我们引入 electron 创建了渲染进程
- index.html 就是应用页面的布局和样式
- 使用 IPC 在主进程执行任务并获取信息

# （二）fs

### electron 的主进程和渲染进程

`package.json`中定义的入口文件就是`主进程`,那一般一个程序只有一个主进程,而我们可以利用一个主进程,打开多个子窗口.
由于 Electron 使用了 Chromium 来展示 web 页面，所以 Chromium 的多进程架构也被使用到。 每个 Electron 中的 web 页面运行在它自己的渲染进程中,也就是我们说的渲染进程.
换句话说是主进程控制渲染进程,一个主进程可以控制多个渲染进程.
简单理解为: 把 `main.js`看成主进程,html 部分看成渲染进程
了解主进程和渲染进程后,我们来作一个读取小姐姐案例.现在项目根目录下建立一个 `food.txt`   文件

```
美式咖啡
焦糖拿铁
水果萃冰
橙柚果汁
```

修改 index.html 的内容

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <button id="btn">喜爱排行榜</button><br />
    <div id="food"></div>
    <script src="./render/index.js"></script>
  </body>
</html>
```

新建一个 render/index.js 文件，默认是渲染进程的逻辑操作

```javascript
const fs = require("fs");
const btn = this.document.querySelector("#btn");
const food = this.document.querySelector("#food");
window.onload = function() {
  btn.onclick = function() {
    fs.readFile("food.txt", (_err, data) => {
      food.innerHTML = data;
    });
  };
};
```

在控制台输入 `npm run start` ,就可以页面，点击之后就会出现文字了！

# (三)Remote

Electron 有主进程和渲染进程,也就是 Electron 的 API 方法和模块也是分为可以在主进程和渲染进程中使用。想在渲染进程中使用主进程中的模块方法时，可以使用`Remote`解决在渲染和主进程间的通讯。
index.html 文件

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <button id="btn">打开新窗口</button><br />
    <script src="./render/index.js"></script>
  </body>
</html>
```

render/index.js 文件

```javascript
const btn = this.document.querySelector("#btn");
const BrowserWindow = require("electron").remote.BrowserWindow; //remote

window.onload = function() {
  btn.onclick = () => {
    newWin = new BrowserWindow({
      width: 500,
      height: 500,
    });
    newWin.loadFile("red.html"); //后面新建好
    newWin.on("close", () => {
      win = null;
    });
  };
};
```

根目录下新建 red.html 文件

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Red</title>
    <style>
      * {
        margin: 0;
        padding: 0;
      }
      #red {
        height: 300px;
        width: 300px;
        background-color: red;
      }
    </style>
  </head>
  <body>
    <div id="red"></div>
  </body>
</html>
```

在控制台上运行 `npm run start` ，出现如下页面：
<img src="http://img.zhangyapeng.club/electron/README/image%20(2)_看图王.png" alt="electron/README" style="zoom:100%;" />

### 小小提示

这是`Electron`版本更新后修改的，默认不启用 remote 模块需要手动打开
需要在主进程(main.js 文件)中添加上:在`webPreferences`  里写`enableRemoteModule: true`

# （四）Menu

新建一个 menu.js 文件

```javascript
const { Menu } = require("electron");

var template = [
  //模板
  {
    label: "四季",
    submenu: [
      { label: "春天" },
      { label: "夏天" },
      { label: "秋天" },
      { label: "冬天" },
    ],
  },
  {
    label: "两天",
    submenu: [{ label: "白天" }, { label: "黑天" }],
  },
];

var menu = Menu.buildFromTemplate(template);

Menu.setApplicationMenu(menu);
```

`Menu`属于是 `主线程下`  的模块，所以只能在主线程中使用。所以在主线程中引用下，main.js 文件

```javascript
const { app, BrowserWindow } = require("electron");
let mainWindow = null;
app.on("ready", () => {
  mainWindow = new BrowserWindow({
    // 创建和控制浏览器窗口
    width: 600, // 窗口宽度
    height: 600, // 窗口高度
    webPreferences: {
      // 网页功能设置
      nodeIntegration: true, // 是否在node工作器中启用工作集成默认false
      // enableRemoteModule: true,   // 是否启用remote模块默认false
    },
  });
  require("./menu"); //引进menu
  mainWindow.loadFile("index.html"); // 加载页面
  mainWindow.on("close", () => {
    // 监听窗口关闭
    mainWindow = null; //销毁mainWindow
  });
});
```

index.html 文件

```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h3>Menu</h3>
</body>
</html>
```

在控制台上运行 `npm run start` ，出现如下页面：
<img src="http://img.zhangyapeng.club/electron/README/de_2_看图王.png" alt="electron/README" style="zoom:100%;" />

### 菜单打开新窗口

menu.js 文件

```javascript
const { Menu, BrowserWindow } = require("electron");

var template = [
  {
    label: "四季",
    submenu: [
      {
        label: "春天",
        click: () => {
          win = new BrowserWindow({
            width: 500,
            height: 500,
            webPreferences: { nodeIntegration: true },
          });
          win.loadFile("red.html");
          win.on("closed", () => {
            win = null;
          });
        },
      },
      { label: "夏天" },
      { label: "秋天" },
      { label: "冬天" },
    ],
  },
  {
    label: "两天",
    submenu: [{ label: "白天" }, { label: "黑天" }],
  },
];

var menu = Menu.buildFromTemplate(template);

Menu.setApplicationMenu(menu);
```

在控制台上运行 `npm run start` ，出现如下页面：
<img src="http://img.zhangyapeng.club/electron/README/image%20(1)_看图王.png" alt="electron/README" style="zoom:100%;" />
<img src="http://img.zhangyapeng.club/electron/README/de_3_看图王.png" alt="electron/README" style="zoom:100%;" />
这样就算是完成啦！

### 菜单快捷键

绑定快捷键的属性是`accelerator`属性
menu.js 文件

```javascript
const { Menu, BrowserWindow } = require("electron");

var template = [
  {
    label: "四季",
    submenu: [
      {
        label: "春天",
        accelerator: `ctrl+s`, //快捷键是:ctrl+s
        click: () => {
          win = new BrowserWindow({
            width: 500,
            height: 500,
            webPreferences: { nodeIntegration: true },
          });
          win.loadFile("red.html");
          win.on("closed", () => {
            win = null;
          });
        },
      },
      { label: "夏天" },
      { label: "秋天" },
      { label: "冬天" },
    ],
  },
  {
    label: "两天",
    submenu: [{ label: "白天" }, { label: "黑天" }],
  },
];

var menu = Menu.buildFromTemplate(template);

Menu.setApplicationMenu(menu);
```

在控制台上运行 `npm run start`
窗口页面出来后可以使用快捷键 `ctrl+s`  就可以新建一个页面啦~

### 右键菜单

右键是在渲染进程进行点击的，因此写在渲染进程中，且要用到`remote`模块
render/index.js 文件

```javascript
const { remote } = require("electron");
const rightTemplate = [{ label: "粘贴" }, { label: "复制" }];
const menu = remote.Menu.buildFromTemplate(rightTemplate);

window.addEventListener(
  "contextmenu",
  (e) => {
    // 阻止当前窗口默认事件
    e.preventDefault();
    //把菜单模板添加到右键菜单
    menu.popup({ window: remote.getCurrentWindow() });
  },
  false
);
```

index.html 文件

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <h2>Menu</h2>
    <script src="./render/index.js"></script>
  </body>
</html>
```

在控制台上运行 `npm run start` ，出现如下页面：

<img src="http://img.zhangyapeng.club/electron/README/de_5.png" alt="electron/README" style="zoom:100%;" />
### 程序打开调试模式

<img src="http://img.zhangyapeng.club/electron/README/de_6.png" alt="electron/README" style="zoom:100%;" />
<img src="http://img.zhangyapeng.club/electron/README/d7.png" alt="electron/README" style="zoom:100%;" />
另一种控制台打开的方法:在 `主线程`  上输入 mainWindow.webContents.openDevTools()
附上主线程 `main.js`  文件

```javascript
const { app, BrowserWindow } = require("electron");
let mainWindow = null;

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    // 创建和控制浏览器窗口
    width: 600, // 窗口宽度
    height: 600, // 窗口高度
    webPreferences: {
      // 网页功能设置
      nodeIntegration: true, // 是否在node工作器中启用工作集成默认false
      enableRemoteModule: true, // 是否启用remote模块默认false
    },
  });
  require("./menu");
  mainWindow.webContents.openDevTools(); //打开控制台
  process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true"; //消除控制台上报警文字
  mainWindow.loadFile("index.html"); // 加载页面
  mainWindow.on("close", () => {
    // 监听窗口关闭
    mainWindow = null; //销毁mainWindow
  });
});
```

运行 `npm run start`  出现的页面：

<img src="http://img.zhangyapeng.club/electron/README/d8.png" alt="electron/README" style="zoom:100%;" />