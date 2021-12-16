# unknown
> TypeScript 3.0 引入了新的unknown 类型，它是 any 类型对应的安全类型
> unknown 和 any 的主要区别是 unknown 类型会更加严格：在对 unknown 类型的值执行大多数操作之前，我们必须进行某种形式的检查。而在对 any 类型的值执行操作之前，我们不必进行任何检查
## `unknown`类型

> `unknown` 类型，任何类型都可以赋值为 `unknown` 类型。 它是 `any` 类型对应的`安全类型`

```ts
let unknown: unknown;
unknown = "dapeng";
unknown = 11;
```

> 不能访问 `unknown` 类型上的属性，不能作为`函数`、`类`来使用

> `unknown`类型只能被赋值给`any类型`和`unknown类型`本身

> 如果没有`类型断言`或`类型细化`时，不能在`unknown上`面进行任何操作,`typeof`,`instanceof`,`自定义类型保护函数`,可以对 `unknown`类型使用类型断言
```ts
const value: unknown = "Hello World";
const someString: string = value as string;
```
### 联合类型中的 `unknown`

> 联合类型与 `unknown`都是 `unknown` 类型

```ts
type UnionUnknown = unknown | null | string | number;
```

### 交叉类型中的 `unknown`

> 交叉类型与 `unknown` 都是`其他类型`

```ts
type inter = unknown & null;
```

## `unknown` 特性

### `never`是`unknown`的子类型

```ts
type isNever = never extends unknown ? true : false;
```

### `keyof unknown` 是 `never`

```ts
type key = keyof unknown;
```

## `unknown`类型不能被遍历

```ts
type IMap<T> = {
  [P in keyof T]: number;
};
type t = IMap<unknown>;
```

> unknown 类型不能和 `number`类型进行 `+运算,`可以用于`等`或`不等`操作
