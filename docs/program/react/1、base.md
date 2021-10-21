# react 基础知识

## 1.JSX 渲染

### 1.1 什么是 JSX

是一种`JS`和`HTML混合`的语法,将组件的结构、数据甚至样式都聚合在一起的写法

### 1.2 什么是元素

- JSX 其实只是一种语法糖,最终会通过[babeljs](https://www.babeljs.cn/repl#?browsers=defaults%2C%20not%20ie%2011%2C%20not%20ie_mob%2011&build=&builtIns=false&corejs=3.6&spec=false&loose=false&code_lz=DwCwjAfCCmA2sHtgHpwSA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=env%2Creact%2Cstage-2&prettier=false&targets=&version=7.15.8&externalPlugins=)转译成`React.createElement`语法
- `React.createElement`执行会返回一个`React元素`
- React 元素事实上是普通的`JS对象`，用来描述你在屏幕上看到的内容,其实就是`虚拟 dom`
- ReactDOM 来确保浏览器中的`真实DOM数据`和`React元素`保持一致

### 1.3 代码

jsx

```jsx
<h1 className="title" style={{ color: "red" }}>
  hello
</h1>
```

转译后的代码

```js
React.createElement(
  "h1",
  {
    className: "title",
    style: {
      color: "red",
    },
  },
  "hello"
);
```

执行后的结果

```js
{
  type:'h1',
  props:{
    className: "title",
    style: {
      color: 'red'
    }
  },
  children:"hello"
}
```


### 1.4 实现JSX
#### 1.4.1 package.json
> 禁用新的JSX转化,在react17 之前`JSX`解析为`React.createElement`,`react17`之后解析为
```js
let {jsx:_jsx} = require("react/jsx-runtime");
//import { jsx as _jsx } from "react/jsx-runtime";
let element = _jsx("h1", {id: "title",key:"title",ref:"title",children: "hello"}, "title");
```

```diff
{
  "name": "1.base",
  "version": "0.1.0",
  "scripts": {
+   "start": "cross-env DISABLE_NEW_JSX_TRANSFORM=true react-scripts start",
+   "build": "cross-env DISABLE_NEW_JSX_TRANSFORM=true react-scripts build",
+   "test": "cross-env DISABLE_NEW_JSX_TRANSFORM=true react-scripts test",
+   "eject": "cross-env DISABLE_NEW_JSX_TRANSFORM=true react-scripts eject"
  },
}
```
#### 1.4.2 src\react.js
```js
function createElement(type,config,children){
  let ref,key;
}
```