# 深入浅出 Commonjs 和 Es Module
## 1. 问题
1. `Commonjs` 和 `Es Module` 有什么区别 ？
2. Commonjs 如何解决的循环引用问题 ？
3. 既然有了`exports`，为何又出了 `module.exports` ? 既生瑜，何生亮 ？
4. `require` 模块查找机制 ？
5.  `Es Module` 如何解决循环引用问题 ？
6. `exports = {}` 这种写法为何无效 ？
7. 关于 `import()` 的动态引入 ？
8. `Es Module` 如何改变模块下的私有变量 ？

## 2. `Commonjs` 和 `Es Module` 有什么区别 ？
- CommonJS模块由`JS运行时`实现,ES6模块借助`JS引擎`实现，`ES6模块`是语言层面的底层的实现,CommonJS 模块是之前缺失底层模块机制时在上层做的弥补。
- CommonJS 模块在`执行阶段`分析模块依赖，采用深度优先遍历（depth-first traversal），执行顺序是`父 -> 子 -> 父`；
- ES6 模块在预处理阶段分析模块依赖，在执行阶段执行模块，两个阶段都采用深度优先遍历，执行顺序是子 -> 父。简单点说，CommonJS 模块同步加载并执行模块文件，ES6 模块提前加载并执行模块文件。
- `CommonJS 模块循环引用`使用不当一般`不会`导致 JS 错误；`ES6 模块循环引用`使用不当一般`会导致` JS 错误。
- `CommonJS 模块`的导入导出语句的位置`会`影响模块代码执行结果；ES6 模块的导入导出语句位置`不影响`模块代码语句执行结果。