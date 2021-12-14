## Redux 应用场景

- 随着 `JavaScript` 单页应用开发日趋复杂,管理不断变化的 `state` 非常困难
- `Redux` 的出现就是为了解决 `state` 里的数据问题
- 在`React` 中，数据在组件中是单向流动的
- 数据从一个方向父组件流向子组件(通过 `props`)，由于这个特征，两个非父子关系的组件（或者称作兄弟组件）之间的通信就比较麻烦

![](/react/redux-wrong.png)

## Redux 设计思想

- `Redux` 是将整个应用状态存储到到一个地方，称为 `store`
- 里面保存一棵状态树 `state tree`
- 组件可以派发 `dispatch` 行为 `action` 给 `store`,而不是直接通知其它组件
- 其它组件可以通过订阅 `store` 中的状态(`state`)来刷新自己的视图

![](/react/redux-flow.png)

## Redux 三大原则

- 整个应用的`state` 被储存在一棵 `object tree` 中，并且这个 `object tree` 只存在于唯一一个 `store` 中
- `State` 是只读的，惟一改变 `state` 的方法就是触发 `action`，`action` 是一个用于描述已发生事件的普通对象 使用纯函数来执行修改，为了描述 `action` 如何改变 `state tree` ，你需要编写 `reducers`
- 单一数据源的设计让`React` 的组件之间的通信更加方便，同时也便于状态的统一管理

## 原生计数器

- [redux](https://github.com/reduxjs/redux)

![](/react/redux.png)

### index.html

```html
<div id="counter">
  <p id="counter-value">0</p>
  <button id="increment-btn">+</button>
  <button id="decrement-btn">-</button>
</div>
```

### index.js

```js
import { createStore } from "redux";
let initState = 0;
const INCREMENT = Symbol.for("increment");
const DECREMENT = Symbol.for("decrement");
/**
 *  在redux中动作有规定的 规定必须有一个不为undefined type属性，用来表示 动作类型
 * @param {*} state
 * @param {*} action
 */
function reducer(state = initState, action) {
  switch (action.type) {
    case INCREMENT:
      return state + 1; //返回一个加1的新状态
    case DECREMENT:
      return state - 1;
    default:
      return state;
  }
}
let store = createStore(reducer, initState);
let state = store.getState(); //获取当前状态
console.log(state);

const counterValue = document.querySelector("#counter-value");
const incrementBtn = document.querySelector("#increment-btn");
const dencrementBtn = document.querySelector("#decrement-btn");

function render() {
  counterValue.innerHTML = store.getState();
}
render();
let unsubscribe = store.subscribe(render); //订阅
setTimeout(() => {
  unsubscribe(); //取消订阅
}, 3000);
incrementBtn.addEventListener("click", () => {
  // 对象
  store.dispatch({ type: INCREMENT });
  // render();
});
dencrementBtn.addEventListener("click", () => {
  // 对象
  store.dispatch({ type: DECREMENT });
  // render();
});
```

### redux 简单实现

#### createStore

```js
import isPlainObject from "./util/isPlainObject";
import ActionTypes from "./util/actionTypes";

/**
 *
 * @param {*} reducer
 * @param {*} preloadedState  初始状态
 */
export default function createStore(reducer, preloadedState) {
  if (typeof reducer !== "function") {
    throw new Error("reducer 必须是一个函数");
  }
  let currentReducer = reducer; //当前处理器
  let currentState = preloadedState; //当前状态
  let currentListeners = []; //定义一个数组保存监听函数
  function getState() {
    //返回当前状态
    return currentState;
  }
  function dispatch(action) {
    //派发动作
    // action 必须是纯对象
    if (!isPlainObject(action)) {
      throw new Error("动作必须是一个纯对象");
    }
    if (typeof action.type === "undefined") {
      throw new Error("action 的type属性不能是undefined");
    }
    currentState = currentReducer(currentState, action);
    for (let listener of currentListeners) {
      listener();
    }
    return action;
  }

  function subscribe(listener) {
    let subscribed = true;
    currentListeners.push(listener);
    return () => {
      if (!subscribed) return; //防止多次触发
      let index = currentListeners.indexOf(listener);
      currentListeners.splice(index, 1);
      subscribed = false;
    };
  }
  dispatch({ type: ActionTypes.ININT }); //reducer 中的初始值 初始化
  return {
    subscribe,
    dispatch,
    getState,
  };
}
```

#### isPlainObject

```js
export default function isPlainObject(obj) {
  if (typeof obj !== "object" || obj === null) {
    return false;
  }
  let proto = obj;
  while (Object.getPrototypeOf(proto)) {
    //===>proto.__proto__
    proto = Object.getPrototypeOf(proto);
  } // proto.__proto__.__proto__===Object.prototype
  return Object.getPrototypeOf(obj) === proto; //测试如果是new实例化的 就返回false，
}
```

#### ActionTypes

```js
const ActionTypes = {
  ININT: "@@redux/ININT",
};

export default ActionTypes;
```

### bind
