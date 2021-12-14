# unknown

## `unknown`类型

> `unknown` 类型，任何类型都可以赋值为 `unknown` 类型。 它是 `any` 类型对应的`安全类型`

```ts
let unknown: unknown;
unknown = "dapeng";
unknown = 11;
```

> 不能访问 `unknown` 类型上的属性，不能作为`函数`、`类`来使用

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
