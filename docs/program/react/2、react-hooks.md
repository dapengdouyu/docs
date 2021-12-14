# React Hooks

- Hook 是 `React 16.8` 的新增特性。它可以让你在不编写 `class`的情况下使用 `state` 以及其他的 `React 特性`
- 如果你在编写`函数组件`并意识到需要向其添加一些`state`，以前的做法是必须将其它转化为 `class`。现在你可以在现有的函数组件中使用`Hook`

## 解决的问题

- 在组件之间`复用状态逻辑`很难,可能要用到 `render props` 和`高阶组件`，React 需要为`共享状态`逻辑提供更好的原生途径，`Hook` 使你在无需修改组件结构的情况下复用状态逻辑
- 复杂组件变得难以理解，Hook 将组件中相互关联的部分拆分成更小的`函数`（比如设置`订阅`或`请求数据`）
- 难以理解的 `class`,包括难以捉摸的 `this`

## 注意事项

- 只能在函数最外层调用 `Hook`。不要在`循环`、`条件判断`或者`子函数`中调用。
- 只能在`React` 的`函数组件`中调用 `Hook`。不要在其他 `JavaScript函数`中调用
- `Hooks` 约定 `Hook` 函数必须以 `"use"` 命名开头

## 为什么要这样设计呢

`React Hooks` 并不是通过`Proxy`或者 `getters` 实现的，而是通过`数组实现`的，每次 `useState`都会改变下标，如果`useState`被包裹在`条件` 中，那每次执行的`下标`就可能对不上，导致 `useState` 导出的 `setter` 更新错数据。

react 也通过 [eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks) 插件保驾护航,防止用 `条件判断`包裹 `useHook` 语句。

```js
// 你的 ESLint 配置
{
  "plugins": [
    // ...
    "react-hooks"
  ],
  "rules": {
    // ...
    "react-hooks/rules-of-hooks": "error", // 检查 Hook 的规则
    "react-hooks/exhaustive-deps": "warn" // 检查 effect 的依赖
  }
}
```

> 具体可以参考[React hooks: not magic, just arrays](https://medium.com/@ryardley/react-hooks-not-magic-just-arrays-cd4f1857236e)

## 参考

- [react 官方文档](https://zh-hans.reactjs.org/docs/hooks-rules.html)
