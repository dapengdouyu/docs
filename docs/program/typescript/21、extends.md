# TypeScript 中的 extends
> 如何一个类型可以赋值给另一个类型,那么`这个类型` extends `另一个类型` 为 `true`

```ts
type A=string|number;
let a:A;
let b:number=1;
a=b; //正确
b=a;//报错

type C=number extends A?true:false //true;
```


extends 关键字在 TS 类型编程中出现的频率非常之高,并且在不同的类型场景下表现出的特性是不一样的，因此在这里总结：

- 继承/扩展
- 约束
- 分配

## 使用场景

### class 类中

```ts
class Animal {
  public kind = "animal";
  constructor(kind) {
    this.kind = kind;
  }
  say() {
    console.log(`I am ${this.kind}`);
  }
}

class Cat extends Animal {
  constructor(kind) {
    super(kind);
  }
  bark() {
    console.log("miao miao ~~~");
  }
}

const cat = new Cat("cat");
cat.kind; // => 'cat'
cat.say(); // I am cat
```

上面的 cat 继承了 Animal 的 say 方法，所以在 Cat 的实例对象上调用 say 方法会去父类 Animal 上调用

### 泛型约束

```ts
function loggingIdentity<Type>(arg: Type): Type {
  console.log(arg.length);
  // Property 'length' does not exist on type 'Type'.
  return arg;
}
```

```ts
interface Lengthwise {
  length: number;
}

function loggingIdentity<Type extends Lengthwise>(arg: Type): Type {
  console.log(arg.length); // Now we know it has a .length property, so no more error
  return arg;
}

// error Argument of type 'number' is not assignable to parameter of type 'Lengthwise'.
loggingIdentity(3);

// ok
loggingIdentity({ length: 10, value: 3 });
```

### 条件类型

```ts
SomeType extends OtherType ? TrueType : FalseType;
```

`当extends左边的类型可分配给右边的类型时`，那么你将在第一个分支(“true”分支)中获得该类型;否则，您将在后面的分支(“false”分支)中获得类型。

```ts
interface Animal {
  live(): void;
}
interface Dog extends Animal {
  woof(): void;
}

type Example1 = Dog extends Animal ? number : string; // number

type Example2 = RegExp extends Animal ? number : string; // string
```

深入理解左边类型可分配给右边类型:

```ts
type Human = {
  name: string;
};
type lookasHuman = {
  name: string;
};
type Bool = lookasHuman extends Human ? "yes" : "no"; // Bool => 'yes'
```

```ts
type Human = {
  name: string;
};
type lookasHuman = {
  name: string;
  age: number;
};
type Bool = lookasHuman extends Human ? "yes" : "no"; // Bool => 'yes'
```

代码运行后为 yes 也就是说 lookasHuman extends Human 为 true，即左侧类型满足可以分配给右侧类型这个条件。换句话说就是 lookasHuman 满足 Human 的一切约束条件。这里的 A extends B 是指类型 A 可以分配给类型 B，而不是说类型 A 是类型 B 的子集

```ts
type Human = {
  name: string;
  age: number;
};
type lookasHuman = {
  name: string;
};
type Bool = lookasHuman extends Human ? "yes" : "no"; // Bool => 'no'
```

上面`lookasHuman` 中没有 age 属性 不满足 Human 的约束条件

## 高阶类型

```ts
type A1 = "x" extends "x" ? string : number; // string
type A2 = "x" | "y" extends "x" ? string : number; // number
type A3 = "y" | "x" extends "x" ? string : number; // number
type A4 = "y" extends "x" | "y" ? string : number; // string
type A5 = "y" | "x" extends "x" | "y" ? string : number; // string

type P<T> = T extends "x" ? string : number;
type B = P<"x" | "y">; // string | number
```

- `A1的extends：` 就是条件类型的普通用法
- `A2~A5的extends：` 如果 extends 前面或者后面或者都是 union 类型 前面的类型为后面类型的子集。这里的 A extends B 是指类型 A 是类型 B 的子集
- 接下来看 B 的 extends：
- `Distributive Conditional Types`（分配条件类型）

> When conditional types act on a generic type, they become distributive when given a union type（当条件类型作用于泛型类型时，当给定联合类型时，它们就变成分布类型）

对于使用 extends 关键字的条件类型（即上面的三元表达式类型），如果 extends 前面的参数是一个泛型类型，当传入该参数的是联合类型，则使用 分配律计算最终的结果。`分配律`是指， 将`联合类型的联合项拆成单项`，分别代入条件类型，然后将每个单项代入得到的结果再联合起来，得到最终的判断结果。

> If we plug a union type into `ToArray`, then the conditional type will be applied to each member of that union.（如果将联合类型插入到 ToArray 中，则条件类型将应用于该联合的每个成员。）

```ts
type ToArray<Type> = Type extends string ? string : number;

type StrArrOrNumArr = ToArray<string | number>;
```

上面 extends 前面是泛型变量 Type，给 Type 传入的是 string|number 的联合类型，然后进行分配：

`ToArray<string | number> = ToArray | ToArray`

分别带入：

`ToArray : Type extends string ? string : number; // string`

`ToArray: Type extends string ? string : number; // number`

然后在将每一项得到的结果联合起来，得到`string|number`

`分配条件类型要满足以下两点`:

- 参数是泛型类型
- 代入参数的是联合类型

## never

```ts
// never是所有类型的子类型
type A = never extends "x" ? string : number; // string

type P<T> = T extends "x" ? string : number;
type B = P<never>; // never
```

上面的示例中，B 和 A 的结果竟然不一样，看起来 never 并不是一个联合类型，所以直接代入条件类型的定义即可，获取的结果应该和 A 一直才对啊？

实际上，这里还是条件分配类型在起作用。`never被认为是空的联合类型`，也就是说，没有联合项的联合类型，所以还是满足上面的分配律，然而因为没有联合项可以分配，所以`P<T>`的表达式其实根本就没有执行，所以 B 的定义也就类似于永远没有返回的函数一样，是 never 类型的。

## 防止条件判断中的分配

```ts
// never是所有类型的子类型
type P<T> = [T] extends ["x"] ? string : number;
type A1 = P<"x" | "y">; // number
type A2 = P<never>; // string
```

在条件判断类型的定义中，将泛型参数使用 [] 括起来，即可阻断条件判断类型的分配，此时，传入参数 T 的类型将被当做一个整体，不再分配

## 推迟解析条件类型的额外效果

在得知 `条件类型不确定时会返回所有的值` 的特性情况下，会产生一些额外的效果。
现在我们把传入的`T `类型也一起返回，有趣的事情就发生了。且放置`T`位置不同，产生的效果也不同：

```ts
type Other = "a" | "b";
type Merge<T> = T extends "x" ? T : Other; // T 等于匹配的类型，然后加上 Other 联合类型一起返回

type Values = Merge<"x" | "y">;
// 得到 type Values = "x" | "a" | "b";
```

```ts
type Other = "a" | "b";
type Merge<T> = T extends "x" ? Other : T; // T 等于除匹配类型的额外所有类型（官方叫候选类型）

type Values = Merge<"x" | "y">;
// 得到 type Values = "a" | "b" | 'y';
```

## 在高级类型中的应用

### Omit

Omit 接收两个泛型参数，第一个是目标对象，第二个是需要剔除的属性 key：

```ts
interface Men {
  sex: "male";
  age: number;
  lover: Men;
}

type Boy = Omit<Men, "lover">; // { sex: 'male'; age: number; }
```

### Omit 定义

```ts
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
```

### Exclude

`Exclude`是 TS 中的一个高级类型，其作用是从第一个联合类型参数中，将第二个联合类型中出现的联合项全部排除，只留下没有出现过的参数。

```ts
type A = Exclude<"key1" | "key2", "key2">; // 'key1'
```

### Exclude 的定义

```ts
type Exclude<T, U> = T extends U ? never : T;
```

这个定义就利用了条件类型中的分配原则，来尝试将实例拆开看看发生了什么：

```ts
type A = `Exclude<'key1' | 'key2', 'key2'>`

// 等价于

type A = `Exclude<'key1', 'key2'>` | `Exclude<'key2', 'key2'>`

// =>

type A = ('key1' extends 'key2' ? never : 'key1') | ('key'2 extends 'key2' ? never : 'key2')

// =>

// never是所有类型的子类型
type A = 'key1' | never = 'key1'

```

### Extract

高级类型 Extract 和上面的 Exclude 刚好相反，它是将第二个参数的联合项从第一个参数的联合项中提取出来，当然，第二个参数可以含有第一个参数没有的项。

```ts
type A = Extract<"key1" | "key2", "key1">; // 'key1'
type Extract<T, U> = T extends U ? T : never;
```

### Pick

extends 的条件判断，除了定义条件类型，还能在泛型表达式中用来约束泛型参数

```ts
// 高级类型Pick的定义
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};

interface A {
  name: string;
  age: number;
  sex: number;
}

type A1 = Pick<A, "name" | "age">;
// 报错：类型“"key" | "noSuchKey"”不满足约束“keyof A”
type A2 = Pick<A, "name" | "noSuchKey">;
```

Pick 的意思是，从接口 T 中，将联合类型 K 中涉及到的项挑选出来，形成一个新的接口，其中`K extends keyof T`则是用来约束 K 的条件，即，传入 K 的参数必须使得这个条件为真，否则 ts 就会报错，也就是说，K 的联合项必须来自接口 T 的属性。
