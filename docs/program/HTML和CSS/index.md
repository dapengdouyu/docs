# 总结一些HTML和CSS的问题
## 1.什么是 BFC
BFC（Block Formatting Context）块级格式化上下文，是 Web 页面中盒模型布局的 `CSS` 渲染模式，指一个独立的渲染区域或者说是一个隔离的独立容器。
### 形成 BFC 的条件
- 浮动元素，float 除 none 以外的值
- 定位元素，position（absolute，fixed）
- display 为以下其中之一的值 `inline-block`，`table-cell`，`table-caption`
- overflow 除了 `visible` 以外的值（hidden，auto，scroll）
- HTML 就是一个 BFC
### BFC 的特性：
- 内部的 Box 会在垂直方向上一个接一个的放置。
- 垂直方向上的距离由 margin 决定
- bfc 的区域不会与 float 的元素区域重叠。
- 计算 bfc 的高度时，浮动元素也参与计算
- bfc 就是页面上的一个独立容器，容器里面的子元素不会影响外面元素。

## 2. 了解盒模型吗？

CSS盒模型本质上是一个盒子，封装周围的HTML元素，它包括：`外边距（margin）`、`边框（border）`、`内边距（padding）`、`实际内容（content）`四个属性。 CSS盒模型：`标准模型 `+ `IE模型`

- 标准盒子模型：宽度=内容的宽度（content）+ border + padding

- 低版本IE盒子模型：宽度=内容宽度（content+border+padding）

```css
box-sizing: border-box;
```

## 3.清除浮动有哪些方法
不清楚浮动会发生高度塌陷：浮动元素父元素高度自适应（父元素不写高度时，子元素写了浮动后，父元素会发生高度塌陷）

- clear清除浮动（添加空div法）在浮动元素下方添加空div,并给该元素写css样式：{clear:both;height:0;overflow:hidden;}
- 给浮动元素父级设置高度
- 父级同时浮动（需要给父级同级元素添加浮动）
- 父级设置成inline-block，其margin: 0 auto居中方式失效
- 给父级添加`overflow:hidden `清除浮动方法
- 万能清除法 after伪类 清浮动（现在主流方法，推荐使用）

```css
.float_div:after{
  content:".";
  clear:both;
  display:block;
  height:0;
  overflow:hidden;
  visibility:hidden;
}
.float_div{
  zoom:1
}

```

## 4.两个div上下排列，都设margin，有什么现象？
- 都正取大
- 一正一负相加

问：为什么会有这种现象？你能解释一下吗
是由块级格式上下文决定的，BFC，元素在 BFC 中会进行上下排列，然后垂直距离由 margin 决定，并且会发生重叠，具体表现为同正取最大的，同负取绝对值最大的，一正一负，相加
BFC 是页面中一个独立的隔离容器，内部的子元素不会影响到外部的元素。
