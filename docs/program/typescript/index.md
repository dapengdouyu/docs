# Typescript 4.1 新特性一览

## 1. 模板字符串类型（Template Literal Types）

> 1. 它的语法与 ES6 的模板字符串相似，只是用于`类型`。此外，用在模板字符串类型中的`泛型`或`类型别名`，类型必须满足是`string` | `number `| `bigint` | `boolean` | `null `| `undefined`之一。

```ts
type TestError<T> = `${T}Changed`; // error: Type 'T' is not assignable to type 'string | number | bigint | boolean | null | undefined'.
type EventName<T extends string> = `${T}Changed`;
type T0 = EventName<"foo">; // 'fooChanged'
type T1 = EventName<"foo" | "bar" | "baz">; // 'fooChanged' | 'barChanged' | 'bazChanged'
```

> 2. 字符串模板中的联合类型会进行排列组合（生成每个联合类型成员表示的所有可能的字符串字面量的集合）

```ts
type Color = "red" | "blue";
type Quantity = "one" | "two";

type SeussFish = `${Quantity | Color} fish`;
// "one fish" | "two fish" | "red fish" | "blue fish"
```

为了更方便对字符串字面量进行操作，Typescript4.1 新增了几个预定义的类型别名，分别是`Uppercase` 、`Lowercase`、`Capitalize` 、`Uncapitalize`。 分别是大写、小写，首字母大写，首字母小写。

```ts
type Test<T extends string> =
  `${Uppercase<T>} ${Lowercase<T>} ${Capitalize<T>} ${Uncapitalize<T>}`;

type T = Test<"test">;
// TEST test Test test
```

类比 `Typescript 4.0`推出的`可变元祖类型`，其实模板字符串也可以叫做`“可变字符串类型”`。此特性的推出大大增强了对字符串字面量的操作。

## 2. 映射类型中支持键名重新映射（Key Remapping in Mapped Types）

> 映射类型可以`根据提供的键`生成`新的对象类型`，而要根据输入来创建新键或是过滤键的话，老版本的 Typescript 是无能为力的。

```ts
// 两例都是根据提供的键生成新的对象类型，无法对键做进一步操作
type Options = {
  [K in "noImplicitAny" | "strictNullChecks" | "strictFunctionTypes"]?: boolean;
};

type Partial<T> = {
  [K in keyof T]?: T[K];
};
```

> `TypeScript 4.1` 允许使用 `as` 字句对键名重新映射。
```ts
// 过滤掉传入类型的kind属性
type RemoveKindField<T> = {
    [K in keyof T as Exclude<K, "kind">]: T[K]
};

// 传入类型键名首字母大写，前面加get
type Getters<T> = {
    [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K]
};

interface Person {
    name: string;
    age: number;
    location: string;
}

type LazyPerson = Getters<Person>;
/*
{
    getName: () => string;
    getAge: () => number;
    getLocation: () => string;
}
*/
```

## 3. 条件类型可递归
> `Typescript 4.1` 支持在条件类型的分支中引用自身（`递归`）

```ts
type ElementType<T> =
    T extends ReadonlyArray<infer U> ? ElementType<U> : T;

function deepFlatten<T extends readonly unknown[]>(x: T): ElementType<T>[] {
    // ...
}

// All of these return the type 'number[]':
deepFlatten([1, 2, 3]);
deepFlatten([[1], [2, 3]]);
deepFlatten([[1], [[2]], [[[3]]]]);

```

[typescript基础](https://jkchao.github.io/typescript-book-chinese/project/compilationContext.html)
[4.1](https://juejin.cn/post/6929085414649102343)
