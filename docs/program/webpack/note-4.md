# git 规范和 changelog

## 良好的 `git commit` 好处

- 可以加快 `code review` 的流程
- 可以根据 `git commit` 的元数据生成 `changelog`
- 可以让其它开发者知道`修改`的原因

# 良好的 `commit`

- [commitizen](https://www.npmjs.com/package/commitizen) 是一个格式化 `commit message` 的工具
- [validate-commit-msg](https://www.npmjs.com/package/validate-commit-msg) 用于检查项目的 `Commit message`是否符合格式
- [conventional-changelog-cli](https://www.npmjs.com/package/conventional-changelog-cli) 可以从 `git metadata` 生成变更日志

## commitizen

`commitizen` 是一款标准化 git commit 信息的工具。在没有规范的情况下，开发人员的 commit 信息是常常是随意的，这就导致 commit 信息显的很无用。可是当你在做 `git log`、`code review`、编写 `changelog` 等情况时，良好的 commit 规范就显的尤为重要。

### commitizen 安装

```sh
npm i commitizen -D
```

### 安装适配器（Adapter)

因为不同的项目本身的构建方式的不同，`commitizen` 支持不同适配器的扩展，从而去满足不同的构建需求的。本文主要使用 `cz-conventional-changelog` 的构建标准，当然你也可以根据具体的情况选择其他的适配器,[更多](https://github.com/commitizen/cz-cli)。

```sh
npm install  cz-conventional-changelog -D
```

我们需要在项目根目录下添加 `.czrc` 配置文件，文件内容如下：

```json
// path 用来指定适配器
{ "path": "cz-conventional-changelog" }
```

还可以使用 `commitizen` 工具安装

```sh
commitizen init cz-conventional-changelog --save-dev --save-exact
```

上面的命令做了这些

- 通过 npm 安装`cz-conventional-changelog`适配器
- 保存它到 package.json's dependencies or devDependencies 中
- 在 package.json 中添加`config.commitizen`配置

```json
 "config": {
    "commitizen": {
      "path": "cz-conventional-changelog"
    }
  }
```

### 提交的格式

```
<type>(<scope>):<subject/>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

- 代表某次提交的类型，比如是修复 `bug` 还是增加 `feature`
- 表示作用域，比如一个`页面`或一个`组件`
- `主题`,概述本次提交的内容
- `详细`的影响内容
- 修复的 `bug` 和`issue` 链接

| 类型     |                         含义                          |
| :------- | :---------------------------------------------------: |
| feat     |                     新增 feature                      |
| fix      |                       修复 bug                        |
| docs     | 仅仅修改了文档，比如 README、CHANGELOG、CONTRIBUTE 等 |
| style    | 仅仅修改了空格、格式缩进、偏好等信息，不改变代码逻辑  |
| refactor |           代码重构，没有新增功能或修复 bug            |
| perf     |              优化相关，提升了性能和体验               |
| test     |           测试用例，包括单元测试和集成测试            |
| chore    |         改变构建流程，或者添加了依赖库和工具          |
| revert   |                   回滚到上一个版本                    |
| ci       |                CI 配置，脚本文件等更新                |

## husky

`validate-commit-msg`可以来检查我们的 `commit` 规范
`husky` 可以把`validate-commit-msg` 作为一个 `githook` 来验证提交消息

```sh
cnpm i husky validate-commit-msg --save-dev
```

```json
"husky": {
    "hooks": {
        "commit-msg": "validate-commit-msg"
    }
}
```

## 生成 `CHANGELOG.md`

- `conventional-changelog-cli` 默认推荐的 `commit` 标准是来自 `angular` 项目
- 参数`-i CHANGELOG.md` 表示从`CHANGELOG.md`读取`changelog`
- 参数 `-s` 表示读写 `CHANGELOG.md`为同一文件
- 参数 `-r` 表示生成`changelog`所需要使用的 `release` 版本数量，默认为 1，全部则是 0

```sh
  cnpm i conventional-changelog-cli -D
```

```json
"scripts": {
"changelogs": "conventional-changelog -p angular -i CHANGELOG.md -s -r 0"
}
```

## semantic-release

tag

## 参考

- [semantic-release](https://blog.dteam.top/posts/2020-05/semantic-release.html)
