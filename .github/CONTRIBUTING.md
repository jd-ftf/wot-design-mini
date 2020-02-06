# 提交代码

## 获取代码

* 请先 [fork](https://help.github.com/cn/github/getting-started-with-github/fork-a-repo) 一份组件库源码到自己的 github
* 使用 `git clone` 将自己 github 上 fork 得到的源码同步到到你的本地
* 请确保切换到 `dev` 分支进行开发，我们只接受此分支上的代码贡献

## Commit

在 commit 代码时，commit message 请遵循以下格式：

> 如不按照此以下格式，`git commit` 可能无法正常工作。

```
<Commit 类型>(Commit 修改项): <commit 描述>
// 或者
<Commit 类型>: <commit 描述>
```

例如：
```shell script
git commit -m "release: v1.1.0"
# 或者
git commit -m "feat(button): new color"
```
### commit 类型

> 注意 type 大小写务必和本文档保持一次

| TYPE | description |
|------|-------------|
| release | 本次 commit 属于发版行为，同时注意版本格式为：vx.x.x |
| update |  |
| nothing | 本次 commit 无任何有意义的变动，包括但不限于：'去除无用注释'、'删除无用文件'等 |
| feat | 本次 commit 为某个组件添加了 feature，或者为组件库新增加了一个功能 |
| style | 本次 commit 修改了某个组件的样式 |
| test | 本次 commit 和组件库的单元测试行为挂钩 |
| refactor | 本次 commit 重构了某个组件或某一个功能，但此功能的 input/output 无任何变动 |
| chore | 本次 commit 和组件库的构建行为挂钩 |
| docs | 本次 commit 修改了组件库的 markdown 文档 |
| demo | 如果本次 commit 为组件新增了某个 usage |
| 组件名 | 如果本次 commit 是针对某个组件的行为，但在上述列表无法找到符合的 type ，则 commit 类型可以直接为该组件的名称。 |

### commit 修改项

如果我们为组件库的 `button` 组件新增了一个功能/特性，那么我们可以使用以下命令提交：

```shell script
git commit -m "feat(button): add new feature to button"
```

此时 `(button)` 即代表我们的 commit 修改项

### commit 描述

commit 描述说明了我们本次提交的具体描述，具体内容视情况而定，无固定规范。

## 提交 PR

请通过 Pull Request 的方式提交代码，而不是直接运行 `git push` 推送你的 commit。

提交 PR 前请从 upstream 仓库拉取最新代码：

> 此操作确保官方分支上的最新提交能够同步到你的分支

```shell script
git remote add upstream https://github.com/jd-ftf/wot-design-mini.git # 首先把官方源加入到本地源中
git fetch upstream # 将官方源同步下来
git rebase upstream/dev # 将官方源以 `rebase` 的方式合并到本地源
```
> 关于使用 [git rebase](https://git-scm.com/book/zh/v2/Git-分支-变基) 遇到的诸多问题

使用 rebase 你可能面临 "代码冲突" 问题，此时你需要手动解决。

当最新的官方源合并到你开发的本地源后，此时你可以使用 `git push` 将您的本地源提交到你的github上，之后在你的项目页点击 `New pull request` 按即可以发起代码贡献请求。待我们 review 并通过你的 PR 后将你的代码合并到我们的官方分支。

大部分情况下，请将 PR 提交至 `dev` 分支，`dev` 分支仅用于日常开发工作。永远不要将 PR 提交至 `master` 分支。

## CI

> 提交 PR 会触发 CI 构建，构建不通过最终会导致无法合并代码。

CI 构建包括 `travis` 和 `netlify`

### Travis

我们的官方源采用了一系列的[travis](https://travis-ci.com/jd-ftf/wot-design-mini/builds)持续集成，例如：自动发布最新的文档、自动发布最新的源码包，如果某个 PR 错误的修改了这些自动化流程，会造成在灾难性的后果。
为了确保这些自动化流程始终是活跃的，我们会针对每一个 PR 运行自动化流程，如果针对此 PR 的自动化流程运行失败，那么 github 会阻止本 PR 的代码合并。

### Netlify

对文档的修改进行 review 审阅是比较麻烦的，因此我们使用 [netlify](https://app.netlify.com/sites/wot-design-mini/deploys) 针对每一个 PR 进行一次文档的构建，同时将构建后的文档线链发布在 PR 的评论面板上。

## 合并 PR

合并 PR 前，请确认目标分支是否正确。一般采用「Rebase and Merge」的方式进行合并，这样能使 commit 记录保持成一条干净的线性记录。

## Release

### 发版前准备

* 确保 `package.json` 文件的 `version` 的值 为 `x.x.x`,其中 `x.x.x`为你本次发版的[版本号](https://www.npmjs.cn/getting-started/semantic-versioning/)。
* 确保 `changelog.md` 文件已经包含对应此版本的更新日志，编写新的更新日志时应该遵循之前更新日志的格式。

### 发版操作

> 此行为只有仓库管理员有操作权限

* 切换到 `wot-design-mini` 的官方源
* 切换到需要发版的分支，并运行以下代码：
```shell script
git tag v1.2.0 # 注意不要重复发版
```
* 如果想针对某次`commit` 打 `tag`,代码以及格式如下：
```shell script
git tag -a v1.2.0 9fceb02 # 找到对应 commit 的 hash/sha-1
```
* 确认无误后进行发版，代码如下：
```shell script
git push origin v1.2.0 # 注意此处 origin 表示官方源，应据具体情况调整
```
* 打开[构建页](https://travis-ci.com/jd-ftf/wot-design-mini)查看持续集成是否正常，并等待构建完成。
* 打开[源码下载页](https://github.com/jd-ftf/wot-design-mini/releases)查看是否出现对应的新版更新日志和生产源码
* 打开[文档页](http://jdftf.top/wot-design-mini)查看文档是否构建成功

