# 使用 semantic-release 自动管理发布版本

- `semantic-release`可以更加自动化结合`CI`、自动`管理发布版本`，自动`生成更新日志`
- `semantic-release` 更适合在 CI 环境中运行，它自带支持各种 `git server` 的认证支持，如 `Github`，`Gitlab`，`Bitbucket`等等
- `semantic-release` 还支持插件，以便完成其他后续的流程步骤，比如自动生成 `git tag` 和 `release note` 之后再 `push` 回中央仓库，自动发布`npm`包等等。

## 工作流程

> `semantic-release` 会根据规范化的 `commit` 信息生成发布日志，默认使用 `angular`规则。其他规则可以配置插件完成。

- semantic-release 大致的工作流如下:

  - 提交到`特定的分支`触发 `release` 流程
  - 验证 `commit` 信息，生成 `release note`，打 `git tag`
  - 其他后续流程，如生成 `CHANGELOG.md`，`npm publish` 等等（通过插件完成）

如果启用了[@semantic-release/git](https://github.com/semantic-release/git)插件，还会将生成的`CHANGELOG.md` 反向 `push` 回中央仓库

默认的 [branches](https://semantic-release.gitbook.io/semantic-release/usage/configuration#branches) 配置如下:

```json
[
  "+([0-9])?(.{+([0-9]),x}).x",
  "master",
  "next",
  "next-major",
  { name: "beta", prerelease: true },
  { name: "alpha", prerelease: true },
];
```

代表默认情况下 push 到`X.Y.x`, `master`, `next`, `next-major`, `beta`, `alpha` 这几个分支才会触发`自动发布流程`，并且只有 `feat` 和 `fix` 提交才会触发版本升级，版本号按照语义化版本规则自动生成。即:

- 版本号按照 x.y.z 格式组织（git tag 会加上 v 前缀，如 v1.0.0）
- bug fix 发布会增加修订版本号（如 1.0.0 –> 1.0.1）
- feature 发布会增加次版本号（如 1.0.0 –> 1.1.0）
- `break change feature`发布会增加主版本号（如 1.1.1 –> 2.0.0，官方建议这种不兼容的升级应该推送到 next 分支开发，之后合并到 master）

## .releaserc

```json
{
  "plugins": [
    [
      "@semantic-release/commit-analyzer",
      {
        "preset": "conventionalcommits"
      }
    ],
    [
      "@semantic-release/release-notes-generator",
      {
        "preset": "conventionalcommits"
      }
    ],
    "@semantic-release/changelog",
    "@semantic-release/gitlab",
    "@semantic-release/git"
  ]
}
```

## .gitlab-ci.yml

```yml
# 添加了 lint 过程用于检测 commitlint 结果
# 添加了 release 过程用于自动化产生 git tag 和 CHANGELOG.md
stages:
  - lint
  - build
  - test
  - release
  - deploy

commitlint:
  stage: lint
  image: node:lts
  script: |
    npm install -g @commitlint/cli @commitlint/config-conventional
    if [ "${CI_COMMIT_BEFORE_SHA}" = "0000000000000000000000000000000000000000" ]; then
      echo "commitlint from HEAD^"
      npx commitlint -x @commitlint/config-conventional -f HEAD^
    else
      echo "commitlint from ${CI_COMMIT_BEFORE_SHA}"
      npx commitlint -x @commitlint/config-conventional -f "${CI_COMMIT_BEFORE_SHA}"
    fi
  dependencies: []
  tags:
    - docker

build: ...

test: ...

release:
  stage: release
  image: node:lts
  script:
    - npm install -g semantic-release @semantic-release/gitlab @semantic-release/changelog conventional-changelog-conventionalcommits @semantic-release/git
    - npx semantic-release
  dependencies: []
  # 仅在中央仓库的分支发生提交时才触发 release 流程
  only:
    - branches@upstream_path/upstream_project
  tags:
    - docker

deploy: ...
```

## 小结

至此，我们完成了通过`CI` 自动管理版本号和发布日志的需求，以后面向用户交付的时候，直接根据`CHANGELOG.md` 的内容整理下就可以了，大大节省了人力，同时，还留下了发布痕迹，方便追溯历史版本。

另外，需要注意的是上述的配置并不会修改源码部分的版本号配置内容（如 `build.gradle` 或 `package.json` 等），如果需要自动管理这些地方的版本，与 `git tag` 版本保持一致，可以引入`@semantic-release/exec` 插件，自己写脚本，通过脚本自动化修改这些地方的版本号。

还需要注意的是 `semantic-release` 默认产生的 `commit` 记录为了避免不必要的 CI 流程，会在`commit` 记录加上[skip ci]来跳过 `CI`，如果你的流水线需要由 `git tag`触发，可以配置`@semantic-release/git` 插件，自定义 `commit` 记录，去掉[skip ci]。

## 参考

- [使用 semantic-release 自动管理发布版本](https://blog.dteam.top/posts/2020-05/semantic-release.html?hmsr=codercto.com&utm_medium=codercto.com&utm_source=codercto.com)
- [官网](https://semantic-release.gitbook.io/semantic-release/usage/workflow-configuration)
