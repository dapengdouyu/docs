## 简介

![](http://img.zhangyapeng.club/typescript/README/F5F7EEC5-E7C6-459f-90EA-F6F280E2390F.png)

## 什么是 TypeScript

![](http://img.zhangyapeng.club/typescript/README/typescript.jpg)

**TypeScript** 是 **JavaScript** 的一个超集，主要提供了**类型系统**和对 **ES6** 的支持，它由 Microsoft 开发，代码开源于 GitHub 上。

- Typescript 更像后端 JAVA,让`JS`可以开发大型企业应用
- TS 提供的**类型系统**可以帮助我们在写代码时提供丰富的语法提示
- 在编写代码时会对代码进行**类型检查**从而避免很多线上错误

> `TypeScript`不会取代`JS`, **尤雨溪：** 我认为将类型添加到`JS`本身是一个漫长的过程 。让委员会设计一个类型系统是（根据`TC39`的经历来判断）不切实际的

## 环境配置

### 1.全局编译 TS 文件

全局安装`typescript`对`TS`进行编译

```sh
npm install typescript -g
tsc --init # 生成tsconfig.json
```

```bash
tsc # 可以将ts文件编译成js文件
tsc --watch # 监控ts文件变化生成js文件
```

### 2.配置`rollup`环境

安装依赖

```bash
npm install rollup typescript rollup-plugin-typescript2 @rollup/plugin-node-resolve rollup-plugin-serve -D
```

初始化`TS`配置文件

```bash
npx tsc --init
```

`rollup`配置操作

```js
// rollup.config.js
import ts from "rollup-plugin-typescript2";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import serve from "rollup-plugin-serve";
import path from "path";
export default {
  input: "src/index.ts",
  output: {
    format: "iife",
    file: path.resolve("dist/bundle.js"),
    sourcemap: true,
  },
  plugins: [
    nodeResolve({
      extensions: [".js", ".ts"],
    }),
    ts({
      tsconfig: path.resolve(__dirname, "tsconfig.json"),
    }),
    serve({
      open: true,
      openPage: "/public/index.html",
      port: 3000,
      contentBase: "",
    }),
  ],
};
```

`package.json`配置

```json
"scripts": {
      "dev": "rollup -c -w"
}
```

我们可以通过`npm run start`启动服务来使用 typescript 啦~

## 基础类型

TS 中`冒号`后面的都为`类型标识`

### 布尔、数字、字符串类型

```js
let bool: boolean = true;
let num: number = 10;
let str: string = "hello wolrd";
```

### 元组类型

- 表示`长度`和`个数`(内容存放`类型`)都限制好了
- 不能通过`索引`添加属性
- 只能增加元组中存放的类型,通过`方法`调用来添加

```ts
let tuple: [string, number, boolean] = ["zf", 10, true];

// tuple[4] = 100; 不能通过索引添加属性

// 像元组中增加数据，只能增加元组中存放的类型  通过方法来调用
tuple.push("回龙观");
```

### 数组

存放`一类类型`的集合

```ts
let arr1: number[] = [1, 2, 3];
let arr2: string[] = ["1", "2", "3"];
let arr3: (number | string)[] = [1, "2", 3]; // 联合类型可以看作并集 既能使用数字也能使用字符串
let arr4: Array<number | string> = [1, "2", 3]; // 泛型方式来声明
```

### 枚举

枚举(Enum)类型用于取值被`限定`在一定范围内的场景，比如一周只能有七天，颜色限定为红绿蓝等。

**普通枚举**

```ts
enum USER_ROLE {
  USER, //默认下标从0开始
  ADMIN,
  MANAGER,
}
```

> 默认可以正向取出,也可以`反举`

```ts
// 编译后的结果
(function(USER_ROLE) {
  USER_ROLE[(USER_ROLE["USER"] = 0)] = "USER";
  USER_ROLE[(USER_ROLE["ADMIN"] = 1)] = "ADMIN";
  USER_ROLE[(USER_ROLE["MANAGER"] = 2)] = "MANAGER";
})(USER_ROLE || (USER_ROLE = {}));
```

**异构枚举**
可以在枚举中放入`不同`的类型

```ts
enum USER_ROLE {
  USER = "user", // 编译后不能反举了
  ADMIN = 10, //后续还可以反举
  MANAGER,
}
```

```js
// 编译后的结果
"use strict";

var USER_ROLE;

(function(USER_ROLE) {
  USER_ROLE["USER"] = "user";
  USER_ROLE[(USER_ROLE["ADMIN"] = 10)] = "ADMIN";
  USER_ROLE[(USER_ROLE["MANAGER"] = 11)] = "MANAGER";
})(USER_ROLE || (USER_ROLE = {}));
```

**常量枚举**

- 常量枚举,只是提供了一个类型
- 假如包含了`计算成员`，则会在编译阶段报错

```ts
const enum USER { //更有语义化
  USER,
  ADMIN,
}
console.log(USER.USER); // console.log(0 /* USER */);
const enum Color {
  Red,
  Yellow,
  Blue = "blue".length, //常量枚举成员初始值设定项只能包含文字值和其他计算的枚举值
}
```

#### 常数枚举与普通枚举的区别

- 它会在编译阶段`被删除`，并且不能包含`计算成员`。
- 更加`简洁`了
- 枚举会生成一个`对象`,常量枚举只有`值`

### any 类型

不能进行`类型检测`的类型,相当于`没有`写类型

```ts
let arr: any = ["aa", 1, "sss"]; // 能不写any,尽量不写 any,会破坏后续的类型校验,后续的全是any
let r = arr1[0]; //r的类型是any
```

### null 和 undefined

任何类型的子类型,如果 `strictNullChecks` 的值为 `true`，则不能把 `null` 和 `undefined` 赋给其他类型,只能赋值给自己这种`类型`或者 `any`

```ts
let str2: number | string;
str2 = undefined; //在严格模式下才会报错
let aa: any;
aa = null; //不会报错
```

### void 类型

只能接受 `null`，`undefined`。一般用于函数的`返回值`

```ts
let a: void;
a = undefined;
```

> 严格模式下不能将 `null` 赋予给 void

### never 类型

**永远不**,是任何类型的子类型(包括 `null` 和 `undefined`) 可以把 `never` 赋予给任何类型

永远达不到的有三种:

1. 错误

```ts
function MyError(): never {
  throw new Error("");
}

let nn: never = MyError();
```

2. 死循环

```ts
function whileTrue(): never {
  while (true) {}
}
```

3. 类型判断时会出现`never`

```ts
// 完整性判断 通过最后一个判断是never 判定判断条件完整
function toType(val: string | number) {
  if (typeof val === "string") {
    val; //string
  } else if (typeof val === "number") {
    val; //number
  } else {
    val; //never
  }
}
```

### never 和 void 的区别

- `void` 可以被赋值为 `null` 和 `undefined` 的类型。 `never` 则是一个不包含值的类型。
- 拥有 `void` 返回值类型的函数能`正常运行`。拥有 `never` 返回值类型的函数无法正常返回，无法终止，或会抛出异常。

### Symbol 类型

`Symbol` 表示独一无二,元编程会用到 `stringToFlag`、`iterator`

```ts
let s = Symbol("123");
let s2 = Symbol("123");

let obj = {
  [s]: "xx",
};
console.log(obj[s as any]);
console.log(s == s2); //false
```

### BigInt 类型

使用 `BigInt` 可以安全地存储和操作`大整数`

```ts
const num1 = Number.MAX_SAFE_INTEGER + 1;
const num2 = Number.MAX_SAFE_INTEGER + 2;
console.log(num1 == num2); // true

let max: bigint = BigInt(Number.MAX_SAFE_INTEGER);
console.log(max + BigInt(1) === max + BigInt(2)); //false
```

> `number` 类型和 `bigInt` 类型是不兼容的

### object 对象类型

`object`表示非原始类型

```ts
let create = (obj: object): void => {};
create({});
create([]);
create(function() {});
create(1); //基本类型
create(null); //基本类型
```

## 类型推论

ts 自带`类型推导`的功能:

- 声明变量`没有`赋予值时`默认`变量是`any`类型

```ts
let name; // 类型为any, 之后不管如何赋值都是any
name = "zyp"; //any
name = 10;
```

- 默认在`初始化`的时候会进行`类型推导`

```ts
let name1 = "zhufeng1";
name1 = 11; //还是string类型
```

## 包装对象

我们在使用基本数据类型时，调用基本数据类型上的`方法`，默认会将原始数据类型包装成`对象类型`

```ts
let n: Number = 11;
(11).toString(); //Number(11).toString()
let number1: number = 11;
let number2: number = Number(11);
let number3: number = new Number(11); // Number 对象不能赋值给基本类型 {} ,错误语法 不能把实例赋值给基本类型
```

> number 是基本数据类型 , Number 是他的封装类

## 联合类型

- 联合类型（Union Types）表示取值可以为多种类型中的一种。

```ts
let myFavoriteNumber: string | number;
myFavoriteNumber = "seven";
myFavoriteNumber = 7;
```

对于接口的`联合`来说，只要满足他们属性中的一个就行,但不能是不属于他们的`属性`

```ts
interface A {
  name1: string;
}
interface B {
  name2: string;
}
type C = A | B;

let c: C = { name1: "1", name2: "1" };
```

- 在使用联合类型时，`没有赋值`只能访问联合类型中共有的`方法`和`属性`

```ts
let str: string | number;
str.toLocaleString;
str.toString;
str.valueOf;

name = 10; //会根据赋值,来推导到后续的方法
console.log(name!.toFixed(2)); // number方法
name = "zf";
console.log(name!.toLowerCase()); // 字符串方法
```

> `!`非空断言,表示一定`有值`,一般用在联合类型

```ts
ele!.style!.color = "red";
ele?.style?.color; // ele&& ele.style && ele.style.color  只能取值不能赋值
```

## 类型断言

- 类型断言

```ts
let name: string | number;
(name! as number).toFixed(2); // 强制
(<number>name!).toFixed(2);
```

> 尽量使用第一种类型断言因为在 `react` 中第二种方式会被认为是 `jsx`语法

- 双重断言

```ts
let name: string | boolean;
(name! as any) as string;
```

> 尽量不要使用`双重断言`，会破坏原有类型关系，断言为 `any`是因为 `any` 类型可以被`赋值`给其他类型

## 字面量类型

```ts
type Direction = "Up" | "Down" | "Left" | "Right";
let direction: Direction = "Down";
```

> 可以用字面量当做类型，同时也表明只能采用这几个值（限定值）。类似枚举。
