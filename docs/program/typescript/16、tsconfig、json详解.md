# tsconfig.json 配置介绍

## `compileOnSave`

`compileOnSave` 属性作用是设置保存文件的时候自动编译，但需要编译器支持。

```ts
{
	// ...
  "compileOnSave": false,
}
```

## `compilerOptions`

`compilerOptions` 属性作用是配置编译选项。
若 `compilerOptions` 属性被忽略，则编译器会使用默认值，可以查看![官方完整的编译选项列表](https://www.typescriptlang.org/docs/handbook/compiler-options.html)
编译选项配置非常繁杂，有很多配置，这里只列出常用的配置。

## exclude

`exclude` 属性作用是指定编译器需要排除的`文件`或`文件夹`。
默认排除 `node_modules`文件夹下文件。

```json
{
  // ...
  "exclude": [
    "src/lib" // 排除 src 目录下的 lib 文件夹下的文件不会编译
  ]
}
```

和 `include` 属性一样，支持 `glob` 通配符
和 include 属性一样，支持 glob 通配符：

- `*`匹配 0 或多个字符（不包括目录分隔符）
- `?` 匹配一个任意字符（不包括目录分隔符）
- `**/` 递归匹配任意子目录

## extends

`extends` 属性作用是引入其他配置文件，继承配置。
默认包含当前目录和子目录下所有`TypeScript` 文件。

```ts
{
	// ...
  // 把基础配置抽离成tsconfig.base.json文件，然后引入
	"extends": "./tsconfig.base.json"
}

```

## files

`files` 属性作用是指定需要编译的单个文件列表。
默认包含当前目录和子目录下所有 TypeScript 文件

```ts
{
	// ...
  "files": [
    // 指定编译文件是src目录下的leo.ts文件
    "scr/leo.ts"
  ]
}
```

## include

`include`属性作用是指定编译需要编译的文件或目录。

```ts

{
// ...
"include": [
// "scr" // 会编译 src 目录下的所有文件，包括子目录
// "scr/*" // 只会编译 scr 一级目录下的文件
"scr/*/*" // 只会编译 scr 二级目录下的文件
]
}

```

## references

`references` 属性作用是指定工程引用依赖。
在项目开发中，有时候我们为了方便将前端项目和后端 node 项目放在同一个目录下开发，两个项目依赖同一个配置文件和通用文件，但我们希望前后端项目进行灵活的分别打包，那么我们可以进行如下配置：

```json
{
  // ...
  "references": [
    // 指定依赖的工程
    { "path": "./common" }
  ]
}
```

## typeAcquisition

`typeAcquisition` 属性作用是设置自动引入库类型定义文件(.d.ts)相关。
包含 3 个子属性：

`enable` : 布尔类型，是否开启自动引入库类型定义文件(.d.ts)，默认为 false；
`include` : 数组类型，允许自动引入的库名，如：[“jquery”, “lodash”]；
`exculde` : 数组类型，排除的库名。

```json
{
  // ...
  "typeAcquisition": {
    "enable": false,
    "exclude": ["jquery"],
    "include": ["jest"]
  }
}
```
