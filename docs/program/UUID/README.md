# UUID 的五个版本

## 什么是 UUID?

`UUID` 的全称是 `Universally Unique Identifier`，中文为`通用唯一识别码`。

构成：由一组 `32`位数的 `16`进制数字所构成。

格式：以`连字号`分为五段，表现形式为 `8-4-4-4-12` 的 `32`个字符，如下所示：

> xxxxxxxx-xxxx-Mxxx-Nxxx-xxxxxxxxxxxx
>
> 如：30385d15-0a88-`4`2eb-`b`c43-2c000e9f778c

其中 `M` 与 `N` 都有特殊含义：

- M 表示 `UUID` 版本，目前只有五个版本，即只会出现 `1`，`2`，`3`，`4`，`5`（下文会介绍这五个版本）

- 数字 `N` 的一至三个最高有效位表示 UUID `变体`，目前只会出现 `8`，`9`，`a`，`b` 四种情况

## UUID 的版本

### `v1`(timestamp)

原理：timestamp + MAC 地址。

缺点：

- 机器的 `MAC` 地址出厂后`不能`保证完全`唯一`，且之后 `MAC` 地址也可手动修改

- `MAC` 地址的暴露会造成了`隐私与安全`问题

- 若一台机子上的两个进程同时跑，有可能出现`重复`问题

### `v2` (timestamp)

原理：基于 `v1` 的基础上优化了下，更安全。

> 具体优化细节不赘述了。

### v3 (namespace)

原理：基于 `namespace` + `输入内容` 进行 `MD5`。

### v4 (random)

原理：基于`随机数`。

> 这个版本的 `UUID` 是使用`最多`的。

### v5 (namespace)

原理：跟`V3` 差不多，只是把散列算法的 `MD5` 变成 `SHA1`。

## [使用](https://www.npmjs.com/package/uuid)

### 安装

```sh
npm install uuid
```

### 代码使用

```js
const uuidv4 = require("uuid/v4");

uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
```

### CLI 使用

```sh
$ uuid
ddeb27fb-d9a0-4624-be4d-4615062daed4

$ uuid v4
30385d15-0a88-42eb-bc43-2c000e9f778c
```
