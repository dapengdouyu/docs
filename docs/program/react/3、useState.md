# useState

- `useState` 就是一个 `Hook`
- 通过在函数组件里调用它来给组件添加一些内部`state`,`React` 会在重复渲染时保留这个`state`
- `useState` 会返回一对值：当前状态和一个让你更新它的函数，你可以在事件处理函数中或其他一些地方调用这个函数。它类似 class 组件的 this.setState，但是它不会把新的 state 和旧的 state 进行合并
- `useState` 唯一的参数就是`初始 state`
- 返回一个 `state`，以及更新 `state` 的函数
  - 在初始渲染期间，返回的状态 `(state)` 与传入的第一个参数 `(initialState)`值相同
  - `setState` 函数用于更新 `state`。它接收一个新的 `state` 值并将组件的一次`重新渲染`加入队列

```js
const [state, setState] = useState(initialState);
```

## useState 初试

```js
function Counter() {
  const [number, setNumber] = useState(0);
  return (
    <>
      <h1 onClick={() => setNumber((x) => x + 1)}>{number}</h1>
      <h1 onClick={() => setNumber(number + 1)}>{number}</h1>
    </>
  );
}
```

## 每次渲染都是独立的`闭包`

- 每一次渲染都有它自己的 `Props` and `State`
- 每一次渲染都有它自己的`事件处理函数`
- `alert` 会`“捕获”`我点击按钮时候的`状态`。
- 我们的组件函数每次渲染都会被调用，但是每一次调用中`number`值都是常量，并且它被赋予了当前渲染中的状态值
- 在单次渲染的范围内，`props` 和 `state` 始终保持不变
- [making-setinterval-declarative-with-react-hooks](https://overreacted.io/zh-hans/making-setinterval-declarative-with-react-hooks/)

```js
// 如何再异步中拿到最新的值
function Counter() {
  const [number, setNumber] = useState(0);
  const savedCallback = useRef();
  function alertNumber() {
    setTimeout(() => {
      alert(savedCallback.current);
    }, 3000);
  }
  return (
    <>
      <p>{number}</p>
      <button
        onClick={() => {
          setNumber(number + 1);
          savedCallback.current = number + 1;
        }}
      >
        +
      </button>
      <button onClick={alertNumber}>alertNumber</button>
    </>
  );
}
```

## 惰性初始 `state`

`initialState`参数只会在组件的`初始渲染中`起作用，后续渲染时会被`忽略`。如果初始 `state` 需要通过`复杂计算`获得，则可以传入一个`函数`，在函数中计算并返回初始的 `state`，此函数只在`初始渲染`时`被调用`：

```js
const [state, setState] = useState(() => {
  const initialState = someExpensiveComputation(props);
  return initialState;
});
```

## 性能优化

### 跳过 `state` 更新

- 调用 `State Hook` 的更新函数并传入当前的 `state` 时，`React` 将跳过`子组件`的渲染及 `effect` 的执行。

- React 使用 `[Object.is](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/is)`比较算法,来比较 `state`。

```js
function Counter() {
  const [counter, setCounter] = useState({ name: "计数器", number: 0 });
  console.log("render Counter");
  return (
    <>
      <p>
        {counter.name}:{counter.number}
      </p>
      <button
        onClick={() => setCounter({ ...counter, number: counter.number + 1 })}
      >
        +
      </button>
      <button onClick={() => setCounter(counter)}>-</button>
    </>
  );
}
```

### 减少渲染次数

- 把内联回调函数及依赖项数组作为参数传入 `useCallback`，它将返回该回调函数的 `memoized` 版本，该回调函数仅在`某个依赖项改变`时才会更新
- 把创建函数和依赖项数组作为参数传入 `useMemo`，它仅会在某个依赖项改变时才重新计算 `memoized` 值。这种优化有助于避免在每次渲染时都进行`高开销的计算`
- `React.memo` 等效于`PureComponent`，但它只比较 `props`。（你也可以通过第二个参数指定一个自定义的比较函数来比较新旧 `props`。如果函数返回 `true`，就会跳过更新。

```ts
function Child({ onButtonClick, data }) {
  console.log("Child render");
  return <button onClick={onButtonClick}>{data.number}</button>;
}
Child = memo(Child);
function App() {
  const [number, setNumber] = useState(0);
  const [name, setName] = useState("dapeng");
  const addClick = useCallback(() => setNumber(number + 1), [number]);
  const data = useMemo(() => ({ number }), [number]);
  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Child onButtonClick={addClick} data={data} />
    </div>
  );
}
```

## `PureComponent`的实现

```js
function shallowEqual(obj1, obj2) {
  if (obj1 === obj2) {
    return true;
  }
  if (
    typeof obj1 != "object" ||
    obj1 === null ||
    typeof obj2 != "object" ||
    obj2 === null
  ) {
    return false;
  }
  let keys1 = Object.keys(obj1);
  let keys2 = Object.keys(obj2);
  if (keys1.length !== keys2.length) {
    return false;
  }
  for (let key of keys1) {
    if (!obj2.hasOwnProperty(key) || obj1[key] !== obj2[key]) {
      return false;
    }
  }
  return true;
}
class PureComponent extends React.Component {
  shouldComponentUpdate(newProps, nextState) {
    return (
      !shallowEqual(this.props, newProps) ||
      !shallowEqual(this.state, nextState)
    );
  }
}
```

## `memo` 的实现

```js
function memo(Component, compare) {
  return class extends React.PureCompoent {
    shou;
    render() {
      return <Component />;
    }
  };
}
```

## `useRef`的实现

```js
let lastRef; //这个是全局唯一的
function useRef() {
  lastRef = lastRef || { current: null }; // 实现不完美 会有更优雅的实现
  return lastRef;
}
```

## `render` 的实现

```js
function render() {
  hookIndex = 0;
  ReactDOM.render(<App />, document.getElementById("root"));
}
```

## `useState`的实现

```js
let hookIndex = 0;
let hookState = [];
function useState(initState) {
  initState =
    hookState[hookIndex] != null
      ? hookState[hookIndex]
      : typeof initState === "function"
      ? initState(initState)
      : initState;
  let currentIndex = hookIndex; //为了闭包保存index
  function setState(newState) {
    hookState[currentIndex] = newState;
    render();
  }
  return [hookState[currentIndex++], setState];
}
```

### `useMemo`的实现

> - deps 为空 每次都更新
> - 为空数组 只更新一次
> - 为数组 数组变化了才更新

```js
let hookIndex = 0;
let hookState = [];

function useMemo(factory, deps) {
  if (hookState[hookIndex]) {
    const [lastMemo, lastDeps] = hookState[hookIndex];
    let same =
      deps != null && deps.every((item, index) => item === lastDeps[index]);
    if (same) {
      hookIndex++;
      return lastMemo;
    } else {
      // deps和memo
      let newMome = factory();
      // 保存deps和memo
      hookStates[hookIndex++] = [newMemo, deps];
      return newMemo;
    }
  } else {
    //取不到说明第一次调用
    let newMome = factory();
    // 保存deps和memo
    hookStates[hookIndex++] = [newMemo, deps];
    return newMemo;
  }
}
```

## `useCallback`的实现

```js
let hookIndex = 0;
let hookState = [];
function useCallbak(callback, deps) {
  if (hookState[hookIndex]) {
    const [lastCallback, lastDeps] = hookStates[hookIndex++];
    let same =
      deps != null && deps.every((item, index) => item === lastDeps[index]);
    if (same) {
      hookIndex++;
      return lastCallback;
    } else {
      hookStates[hookIndex++] = [callback, deps];
      return callback;
    }
  } else {
    // 保存deps和callback
    hookStates[hookIndex++] = [callback, deps];
    return callback;
  }
}
```

## useReducer

- `useState` 的替代方案。它接收一个形如 `(state, action) => newState` 的 `reducer`，并返回当前的 `state` 以及与其配套的 `dispatch` 方法
- 在某些场景下，`useReducer` 会比 `useState` 更适用，例如 `state` 逻辑较复杂且包含多个子值，或者下一个`state` 依赖于之前的 state 等

```js
const [state, dispatch] = useReducer(reducer, initialArg, init);
```

示例

```js
const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
    </>
  );
}
```

## useReducer 的实现

```js
let hookStates = [];
let hookIndex = 0;
function useReducer(reducer, initialState, init) {
  hookStates[hookIndex] =
    hookStates[hookIndex] || (init ? init(initialState) : initialState);
  let currentIndex = hookIndex;
  function dispatch(action) {
    hookStates[currentIndex] = reducer
      ? reducer(hookStates[currentIndex], action)
      : action;
    render();
  }
  return [hookStates[hookIndex++], dispatch];
}
```

## useContext
