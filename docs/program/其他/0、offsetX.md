# offest

<img src="http://img.zhangyapeng.club/其他/0.offsetX/169dd79558ce2af9_看图王.png" alt="其他/0.offsetX" style="zoom:100%;" />

> - clientWidth:`内容的宽度`+`padding`的宽度
> - offsetWidth:`内容的宽度`+`padding`的宽度+`border`的宽度

```js
clientWidth = content - width + padding - left + padding - right;
offsetWidth = clientWidth + border - left + border - right;
```

## scrollWidth

> 元素的`内容区域宽度`或`元素的本身的宽度`中更大的那个值
> <img src="http://img.zhangyapeng.club/其他/0.offsetX/bg20090914.png" alt="其他/0.offsetX" style="zoom:100%;" />

> scrollWidth =当前的元素`padding-left` +子元素的`内容宽度` +`padding的宽度`+`margin的宽度`;

所以判断是否滚动到底部

scrollHeight - scrollTop
=（padding-top + padding-bottom + 子元素的 outerHeight） - （子元素的 outerHeight - content-heigth）
= padding-top + padding-bottom + content-heigth
= clientHeight
clientTop = border-top
clientLeft = border-left;

针对第一个 absolute 父元素
也就是 offsetParent
offsetTop 子元素的边框外上边缘到父元素的边框内下边缘 的距离
offsetLeft 子元素的边框外左边缘到父元素的边框内左边缘 的距离

## getBoundingClientRect

它返回一个对象，其中包含了 `left`、`right`、`top`、`bottom` 四个属性，分别对应了该元素的左上角和右下角相对于浏览器窗口（`viewport`）左上角的距离

- top: 视口最上面，到 border-top 的外上边缘距离（不是 margin-top）
- bottom: border-bottom 的外下边缘（包含 border-bottom 的宽度）到 视口最上面
- left: 同 top
- right: 同 bottom
- height: offsetHeight
- width: offsetWidth

  获取 pageX pageY
  pageX = this.getBoundingClientRect().left + pageXOffset;
  pageY = this.getBoundingClientRect().top + pageYOffset;

window.innerHeight = document.documentElement.clientHeight;
window.outerHeight 整个浏览器的高度，很少用到；

translate 影响 getBoundingClientRect 不影响 offsetLeft 或者 offsetTop
