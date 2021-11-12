---
title: javascript基础
author: dapeng
author_title: 前端开发者
---
## 1.栈
>`栈`者,存储货物或供旅客住宿的地方,可引申为`仓库`

### 1.1 数据结构中的栈
- 栈是一组数据存放的方式，特点是`先进后出,后进先出`
![入栈](/img/面试/base/1.png)
![出栈](/img/面试/base/2.png)

| 方法名 |                 操作                 |
| :----- | :----------------------------------: |
| push() |           添加新元素到栈顶           |
| pop()  | 移除栈顶的元素，同时返回被移除的元素 |


```js
class Stack{
    private items:number[]=[];
    // 添加元素到栈顶，也就是栈的末尾
    push(element:number){
        this.items.push(element)
    }
    // 栈的后进先出的原则，从栈顶出栈
    pop():number{
        return this.items.pop()
    }
}
let stack=new Stack()
stack.push(1);
stach.push(2);
stack.push(3);
console.log(stack.pop())
```
### 1.2 代码的运行方式 
- 表示函数的一层层调用
```js
function one() {
    function two() {
        function three() {
            debugger;
        }
        three();
    }
    two();
}
one();
```
![代码的运行方式](/img/面试/base/3.png)

### 1.3 内存区域
- 栈也是存放数据的一种内存区域
- 程序运行的时候，需要内存空间存放数据。一般来说,系统会划分出两种不同的`内存空间`：一种叫做stack(栈)，另一种叫做heap(堆)
    - `stack`是有结构的，每个区块按照一定次序存放，可以明确知道每个区块的大小
    - `heap`是没有结构的，数据可以任意存放。因此，stack的寻址速度要快于heap
- 只要是局部的、占用空间确定的数据，一般都存放在`stack`里面，否则就放在heap里面,所有的`对象`都存放在`heap`

```js
function task() {
    var a = 1;
    var b = 2;
    var c = {
        name: 'dapeng',
        age: 10
    }
}
task();
```

## 2.队列
- 队列是一种操作受限制的线性表
- 特殊之处在于它只允许在表的前端进行删除操作，而在表的后端进行插入操作
- 进行插入操作的端称为队尾，进行删除操作的端称为队头
- 因为队列只允许在一端插入,在另一端删除，所以只有最早进入队列的元素才能最先从队列中删除,故队列又称为先进先出线性表

![队列入队](/img/面试/base/4.png)
![队列出队](/img/面试/base/5.png)

```js
class Queue {
    private items: number[] = [];
    // 添加元素到栈顶，也就是栈的末尾
    enqueue(element: number) {
        this.items.push(element);
    }
    dequeue() {
        return this.items.shift();
    }
}

let queue = new Queue();
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);
console.log(queue.dequeue());//1
```

## 3. 数据类型
JS中有七种基本数据类型
- 六种基本数据类型: `Boolean`、 `Null`、 `Undefined`、 `Number`、 `String`、 `Symbol` 存储在栈中
- 一种引用类型: `object` ({}、[]、 /^$/、 new Date()、 Math、function) 存储在堆里 
