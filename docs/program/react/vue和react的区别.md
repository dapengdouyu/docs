# React与Vue特性对比（各自特性，对比优劣，适用场景对比等）

## 概念


<!-- ## 核心思想不同
- Vue早期定位是尽可能的`降低前端开发`的门槛,所以Vue推崇灵活易用（`渐进式开发体验`），`数据可变`，`双向数据绑定`（依赖收集）。 -->


## 1.1 核心思想不同导致了写法有差异
`Vue推崇template（简单易懂，从传统前端转过来易于理解）、单文件vue`。而且虽然Vue2.0以后使用了Virtual DOM，使得Vue也可以使用JSX（bebel工具转换支持），但Vue官方依然首先推荐`template`，这跟Vue的核心思想和定位有一定关系。

`React推崇JSX、HOC、all in js`

## 1.2 核心思想不同导致api差异

`Vue定位简单易上手，基于template模板 + options API`，所以不可避免的有较多的概念和api。比如template模板中需要理解slot、filter、指令等概念和api，options API中需要理解watch、computed（依赖收集）等概念和api。

`React本质上核心只有一个Virtual DOM + Diff算法`，所以API非常少，知道setState就能开始开发了。

## 1.3 核心思想不同导致社区差异
`由于Vue定义简单易上手，能快速解决问题，所以很多常见的解决方案，是Vue官方主导开发和维护`。比如状态管理库Vuex、路由库Vue-Router、脚手架Vue-CLI、Vutur工具等。属于那种大包大揽，遇到某类通用问题，只需要使用官方给出的解决方案即可。

`React只关注底层，上层应用解决方案基本不插手`，连最基础的状态管理早期也只是给出flow单向数据流思想，大部分都丢给社区去解决。比如状态管理库方面，有redux、mobx、redux-sage、dva等一大堆（选择困难症犯了），所以这也造就了React社区非常繁荣。同时由于有社区做上层应用解决方案，所以React团队有更多时间专注于底层升级，比如花了近2年时间把底层架构改为`Fiber架构`，以及创造出`React Hooks`来替换HOC。 

## 1.4 核心思想不同导致未来升级方向不同

核心思想不同，决定了Vue和React未来不管怎么升级变化，Vue和React考虑的基本盘不变。

Vue依然会定位简单易上手（渐进式开发），依然是考虑通过依赖收集来实现数据可变。这点从Vue3核心更新内容可以看到：template语法基本不变、options api只增加了setup选项（composition api）、基于依赖收集（Proxy）的数据可变

React的函数式编程这个基本盘不会变。React核心思想，是把UI作为Basic Type，比如String、Array类型，然后经过render处理，转换为另外一个value（纯函数）。从React Hooks可以看出，React团队致力于组件函数式编程，（纯组件，无class组件），尽量减少副作用（减少this，this会引起副作用）。
