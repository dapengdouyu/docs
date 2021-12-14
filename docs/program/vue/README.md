## 什么是库？什么是框架?

- 库是将代码集合成一个产品,库是我们`调用`库中的方法`实现`自己的功能。
- 框架则是为解决一类问题而开发的产品,框架是我们在`指定的位置`编写好代码，框架帮我们`调用`

## MVC 和 MVVM 区别

- 传统的`MVC` 指的是,用户操作会请求`服务端路由`，路由会调用对应的`控制器来处理`,控制器会获取数 据。将结果返回给前端,页面重新渲染
- MVVM :传统的前端会将数据`手动`渲染到页面上, MVVM 模式不需要用户收到操作 `dom` 元素,将数据绑 定到 `viewModel` 层上，会自动将数据渲染到页面中，视图变化会通知 viewModel 层 更新数据。 `ViewModel` 就是我们 MVVM 模式中的桥梁.

> Vue 并没有完全遵循 MVVM 模型，严格的 MVVM 模式中,View 层`不能`直接和 Model 层通信,只能通过 `ViewModel` 来进行通信。但是 vue 中的 ref 可以 获取`组件实例` ,直接更新数据

## Vue 的基本使用

### 快速安装

```sh
$ npm init -y
$ npm install vue
```

### Vue 中的模板

```html
<script src="node_modules/vue/dist/vue.js"></script>
<!-- 3.外部模板 -->
<div id="app">{{name}}</div>
<script>
  const vm = new Vue({
    el: "#app",
    data: {
      name: "jw",
      age: 22,
    },
    // 2.内部模板
    template: "<div>{{age}}</div>",
    // 1.render函数
    render(h) {
      return h("h1", ["hello,", this.name, this.age]);
    },
  });
</script>
```

> 我们默认使用的是 `runtime-with-compiler` 版本的 `vue`,带 `compiler` 的版本才能使用 `template` 属性，内部会将 `template` 编译成 `render` 函数

### vue 的渲染流程

- 会先查找用户传入的 `render`
- 如果没有传入`render` 则查找 `template` 属性
- 如果没有传入 `template` 则查找 `el` 属性，如果有 `el`，则采用 `el` 的模板

> 注意：template 和 render 的模板会替换掉 el 整个标签

### 模板语法

我们可以在 `vue` 中使用`表达式语法`，表达式会在所属 Vue 实例的数据作用域下作为 `JavaScript`被解析。

```html
<div id="app">
  <!-- 可以放入运算的结果 -->
  {{ 1+ 1 }}
  <!-- 当前这个表达式 最后会被编译成函数 _v(msg === 'hello'? true:false) -->
  {{msg === 'hello'? true:false}}
  <!-- 取值操作，函数返回结果 -->
  {{obj.a}} {{fn()}}
</div>
```

> 这里不能使用 js 语句`(var a = 1)`，带有`返回值`的都可以应用在模板语法中

### 响应式原则

- Vue 内部会递归的去循环 `vue` 中的 `data` 属性,会给每个属性都增加 `getter` 和 `setter`，当属性值变化时会`更新视图`。
- 重写了数组中的`方法`，当调用数组方法时会触发更新,也会对数组中的数据(对象类型)进行了监控
- **通过以上两点可以发现 Vue 中的缺陷:**
  - 对象默认只监控自带的属性，`新增`的属性响应式不生效 (层级过深，性能差)
  - 数组通过`索引`进行修改 或者 修改数组的`长度`，响应式不生效

Vue 额外提供的 API:

```js
vm.$set(vm.arr, 0, 100); // 修改数组内部使用的是splice方法
vm.$set(vm.address, "number", "6-301"); // 新增属性通过内部会将属性定义成响应式数据
vm.$delete(vm.arr, 0); // 删除索引，属性
```

为了解决以上问题,`Vue3.0` 使用 `Proxy` 来解决

```js
let obj = {
  name: { name: "jw" },
  arr: ["吃", "喝", "玩"],
};
let handler = {
  get(target, key) {
    if (typeof target[key] === "object" && target[key] !== null) {
      return new Proxy(target[key], handler);
    }
    return Reflect.get(target, key);
  },
  set(target, key, value) {
    let oldValue = target[key];
    if (!oldValue) {
      console.log("新增属性");
    } else if (oldValue !== value) {
      console.log("修改属性");
    }
    return Reflect.set(target, key, value);
  },
};
let proxy = new Proxy(obj, handler);
```

> 代理 `get、set` 方法,可以实现懒代理。并且兼容数组索引和长度变化

### 实例方法

- vm.\_uid (每个实例的唯一标识)
- vm.\$data === vm.\_data (实例的数据源)
- vm.\$options (用户传入的属性)
- vm.\$el (当前组件的真实 dom)
- vm.\$nextTick (等待同步代码执行完毕)
- vm.\$mount (手动挂载实例)
- vm.\$watch (监控数据变化)

> 这些属性后续都会经常被应用，当然还有一些其他比较重要的属性，后续会在详细介绍。

### 指令的使用 (操作 dom 的)

vue 中的指令,vue 中都是以 v-开头 (一般用来操作 dom)

# 常见指令

- `v-once` 渲染一次 (可用作优化，但是使用频率极少)
- `v-html` 将字符串转化成 dom 插入到标签中 (会导致 xss 攻击问题,并且覆盖子元素)
- `v-if/v-else/v-else-if` 不满足时 dom 不存在(可以使用 template 标签)
- `v-show` 不满足时 dom 隐藏 (不能使用 template 标签)
- `v-for` 循环字符串、对象、数字、数组 (循环时必须加 key，尽量不采用索引)
- `v-bind` 可以简写成: 属性(style、class...)绑定
- `v-on` 可以简写成@ 给元素绑定事件 (常用修饰符 .stop、.prevent、.self、.once、.passive)
- `v-model` 双向绑定 (支持.trim、.number 修饰符)
