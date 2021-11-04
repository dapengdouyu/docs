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



## 5. 让一个元素水平垂直居中，到底有多少种方案?
![css居中方案](/img/css/1.png)
### 5.1 水平居中
- 对于`行内元素`: text-align: center;
- 对于`确定宽度`的块级元素：
  - width和margin实现。`margin: 0 auto`;
  - 绝对定位和`margin-left: -width/2`, 前提是父元素`position: relative`
- 对于`宽度未知`的块级元素
  - table标签配合`margin左右auto`实现水平居中。使用table标签（或直接将块级元素设值为`display:table`），再通过给该标签添加左右`margin为auto`。
  - `inline-block`实现水平居中方法。`display：inline-block`和`text-align:center`实现水平居中。
  - 绝对定位+transform，translateX可以移动本身元素的50%。
  - flex布局使用justify-content:center

### 5.2 垂直居中
- 利用`line-height`实现居中，这种方法适合纯`文字类`
- 通过设置父容器相对定位，子级设置绝对定位，标签通过`margin`实现自适应居中
- 弹性布局flex:父级设置`display: flex`; 子级设置`margin:auto auto`实现自适应居中
- 父级设置`相对定位`，子级设置`绝对定位`，并且通过位移`transform实现`
- `table`布局，父级通过转换成表格形式，然后子级设置`vertical-align`实现。（需要注意的是：vertical-align: middle使用的前提条件是内联元素以及display值为table-cell的元素）。

## 6.浮动布局的优点？有什么缺点？清除浮动有哪些方式？
>浮动布局简介:当元素浮动以后可以向左或向右移动，直到它的外边缘碰到包含它的框或者另外一个浮动元素的边框为止。元素浮动以后会脱离正常的文档流，所以文档的普通流中的框就变的好像浮动元素不存在一样。

### 6.1 优点
这样做的优点就是在图文混排的时候可以很好的使文字环绕在图片周围。另外当元素浮动了起来之后，它有着块级元素的一些性质例如可以设置宽高等，但它与inline-block还是有一些区别的，第一个就是关于横向排序的时候，float可以设置方向而inline-block方向是固定的；还有一个就是inline-block在使用时有时会有空白间隙的问题

### 6.2 缺点
最明显的缺点就是浮动元素一旦脱离了文档流，就无法撑起父元素，会造成父级元素高度塌陷。

### 6.3 清除浮动的方式

#### 6.3.1 添加额外标签
```html
<div class="parent">
    //添加额外标签并且添加clear属性
    <div style="clear:both"></div>
    //也可以加一个br标签
</div>
```

#### 6.3.2 父级添加overflow属性，或者设置高度
```html
<div class="parent" style="overflow:hidden">//auto 也可以
    //将父元素的overflow设置为hidden
    <div class="f"></div>
</div>

```

#### 6.3.3 建立伪类选择器清除浮动（推荐）
```css
//在css中添加:after伪元素
.parent:after{
    /* 设置添加子元素的内容是空 */
      content: '';  
      /* 设置添加子元素为块级元素 */
      display: block;
      /* 设置添加的子元素的高度0 */
      height: 0;
      /* 设置添加子元素看不见 */
      visibility: hidden;
      /* 设置clear：both */
      clear: both;
}
<div class="parent">
    <div class="f"></div>
</div>

```

## 7.  使用display:inline-block会产生什么问题？解决方法？

### 7.1 问题复现
问题: 两个`display：inline-block`元素放到一起会产生一段空白。
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
      .container {
        width: 800px;
        height: 200px;
      }

      .left {
        font-size: 14px;
        background: red;
        display: inline-block;
        width: 100px;
        height: 100px;
      }

      .right {
        font-size: 14px;
        background: blue;
        display: inline-block;
        width: 100px;
        height: 100px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="left">
        左
      </div>
      <div class="right">
        右
      </div>
    </div>
  </body>
</html>
```
效果如下:

![css](/img/css/2.png)

### 7.2 产生空白的原因
元素被当成行内元素排版的时候，元素之间的空白符（空格、回车换行等）都会被浏览器处理，根据CSS中white-space属性的处理方式（默认是normal，合并多余空白），原来`HTML代码中的回车换行被转成一个空白符`，在字体不为0的情况下，空白符占据一定宽度，所以inline-block的元素之间就出现了空隙。

### 7.3 解决办法
#### 7.3.1将子元素标签的结束符和下一个标签的开始符写在同一行或把所有子标签写在同一行
```html
<div class="container">
  <div class="left">
      左
  </div><div class="right">
      右
  </div>
</div>

```

#### 7.3.2 父元素中设置font-size: 0，在子元素上重置正确的font-size
```css
.container{
  width:800px;
  height:200px;
  font-size: 0;
}
```
#### 7.3.3  为子元素设置float:left
```css
.left{
  float: left;
  font-size: 14px;
  background: red;
  display: inline-block;
  width: 100px;
  height: 100px;
}
//right是同理

```

## 8.布局题：div垂直居中，左右10px，高度始终为宽度一半
>问题描述: 实现一个div垂直居中, 其距离屏幕左右两边各10px, 其高度始终是宽度的50%。同时div中有一个文字A，文字需要水平垂直居中。