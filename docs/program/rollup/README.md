# rollup 入门

## 什么是 Rollup

- 下一代打包工具
- 与 Webpack 偏向于**应用**打包的定位不同，rollup.js 更专注于**Javascript 类库**打包
- 借助于 Rollup 的**插件体系**, 我们也可以处理 css, images, font 等资源, 但是 Rollup 不支持**代码拆分**(Code Splitting)和运行时态加载(Dynamic Import) 特性, 所以较少的应用于 **Application** 开发.

## rollup.js 的工作原理

rollup.js 可以将我们自己编写的 Javascript 代码（通过插件可以支持更多语言，如 Tyepscript）与第三方模块打包在一起，形成一个文件，该文件可以是一个库（Library）或者一个应用（App），在打包过程中可以应用各类插件实现特定功能。下图揭示了 rollup.js 的运行机制：![v2-91cc68862c6f239725e27bccccdac7d1_b](/img/rollup/v2-91cc68862c6f239725e27bccccdac7d1_b.png)

rollup.js 默认采用 ES 模块标准，我们可以通过**rollup-plugin-commonjs**插件使之支持**CommonJS**标准。

## 安装

首先全局安装`rollup`

```bash
npm i rollup -g
```

### 目录准备（hello world）

接着，我们初始化一个如下所示的项目目录

```bash
├── dist # 编译结果
├── example # HTML引用例子
│   └── index.html
├── package.json
└── src # 源码
    └── index.js
```

首先我们在`src/index.js`中写入如下代码：

```js
console.log("柯森");
```

然后在命令行执行以下命令：

```js
rollup src/index.js -f umd -o dist/bundle.js
```

执行命令，我们即可在`dist`目录下生成`bundle.js`文件:

```js
(function(factory) {
  typeof define === "function" && define.amd ? define(factory) : factory();
})(function() {
  "use strict";

  console.log("柯森");
});
```

- `-f`。`-f`参数是`--format`的缩写，它表示生成代码的格式，`amd`表示采用`AMD`标准，`cjs`为`CommonJS`标准，`esm`（或 es）为`ES`模块标准。`-f`的值可以为`amd`、`cjs`、`system`、`esm`（'es’也可以）、`iife`或`umd`中的任何一个。
- `-o`。`-o`指定了输出的路径，这里我们将打包后的文件输出到`dist`目录下的`bundle.js`

- `-c`。指定`rollup`的配置文件。
- `-w`。监听源文件是否有改动，如果有改动，重新打包。
- [其他命令](https://www.rollupjs.com/guide/command-line-reference/#%E5%91%BD%E4%BB%A4%E8%A1%8C%E7%9A%84%E5%8F%82%E6%95%B0command-line-flags)

### **使用配置文件(`rollup.config.js`)**

在项目根目录下，新建一个 **rollup.config.js**文件

```js
export default {
  input: ["./src/index.js"],
  output: {
    file: "./dist/bundle.js", // 模块化类型
    format: "umd",
    name: "experience", // 打包后的全局变量的名字
  },
};
```

- `input`表示入口文件的路径（老版本为 entry，已经废弃）
- `output`表示输出文件的内容，它允许传入一个对象或一个数组，当为数组时，依次输出多个文件，它包含以下内容：
  - `output.file`：输出文件的路径（老版本为 dest，已经废弃）
  - `output.format`：输出文件的格式
  - `output.banner`：文件头部添加的内容
  - `output.footer`：文件末尾添加的内容
- [其他配置参数](https://www.rollupjs.com/guide/tutorial/#%E4%BD%BF%E7%94%A8%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6using-config-files)

## 进阶

### **`resolve`插件**

`webpack`和`browserify`这样的其他捆绑包不同，`rollup`不知道如何打破常规去处理`npm`下载远程库的依赖

```bash
import _ from 'loadash'
```

所以用**resolve 插件**来解析依赖的模块路径。

```bash
npm i -D @rollup/plugin-node-resolve
```

配置`rollup.config.js`

```js
import resolve from "@rollup/plugin-node-resolve";

export default {
  input: ["./src/index.js"],
  output: {
    file: "./dist/bundle.js",
    format: "umd",
    name: "experience",
  },
  plugins: [resolve()],
};
```

### **external（外联） 属性**

- 外部依赖的名称

- 一个已被找到路径的 ID（像文件的绝对路径）

和**webpack**一样，依赖的第三方库不想打包在**项目**中

```js
import resolve from "@rollup/plugin-node-resolve";

export default {
  input: ["./src/index.js"],
  output: {
    file: "./dist/bundle.js",
    format: "umd",
    name: "experience",
  },
  plugins: [resolve()],
  external: ["lodash"],
};
```

### **`commonjs`插件使用**

- 默认只支持 `ES6+`的模块方式`import/export`。

- 大量的`npm`模块是基于`CommonJS`模块方式

  ```bash
  npm i -D @rollup/plugin-commonjs
  ```

  修改`rollup.config.js`文件

  ```
  import resolve from "@rollup/plugin-node-resolve";
  import commonjs from "@rollup/plugin-commonjs";
  export default {
    input: ["./src/index.js"],
    output: {
      file: "./dist/bundle.js",
      format: "umd",
      name: "experience",
    },
    plugins: [resolve(), commonjs()],
  	external: ["lodash"]
  };
  ```

### **`babel`插件的使用**

es6 编译成 es5

```bash
npm install @babel/preset-env @babel/core  rollup-plugin-babel  -D
```

.babelrc

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "modules": false
        // "useBuiltIns": "usage"
      }
    ]
  ]
}
```

### **`json`插件**

解析 json 文件

```text
npm i -D @rollup/plugin-json
```

```js
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import json from "@rollup/pligin-json";

export default {
  input: ["./src/json.js"],
  output: {
    file: "./dist/jsonBundle.js",
    format: "umd",
    name: "experience",
  },
  plugins: [resolve(), commonjs(), babel(), json()],
  external: ["the-answer"],
};
```

### 编译本地开发服务插件

```bash
npm i --save-dev rollup-plugin-serve
```

配置

```js
// rollup.config.js
import serve from 'rollup-plugin-serve'

export default {
  input: 'src/main.js',
  output: {
    file: 'dist/bundle.js',
    format: ...
  },
  plugins: [
    serve({
      open: true,

  // Page to navigate to when opening the browser.
  // Will not do anything if open=false.
  // Remember to start with a slash.
  openPage: '/different/page',

  // Folder to serve files from
  contentBase: '',
    })
  ]
}
```

### 参考

- [插件](https://zhuanlan.zhihu.com/p/53519766)
- [教程](https://chenshenhai.github.io/rollupjs-note/note/chapter05/01.html)
