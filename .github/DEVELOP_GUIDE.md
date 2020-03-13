## 开发指南

### 代码拉取

从[源仓库](https://github.com/jd-ftf/wot-design) `fork` 代码到当前开发者的远程仓库，开发时基于dev分支。

### 项目结构

项目结构部分主要是梳理项目的结构，介绍几个关键模块的作用，方便开发者接入。

    wot-design-mini
    |-- .babelrc
    |-- .editorconfig                      // idea、vscode 编辑器配置文件
    |-- .eslintrc
    |-- .gitignore
    |-- .huskyrc.json                      // git hooks
    |-- .postcssrc.js
    |-- .travis.yml                        // travis 机器人配置
    |-- commitlint.config.js               // commit 配置，pre-commit 检查代码是否符合项目开发规范
    |-- lint-staged.config.js
    |-- package-lock.json
    |-- package.json
    |-- build                              // 构建、配置相关文件夹
    |-- docs                               // 站点相关文件
    |   |-- main.js
    |   |-- pages.config.json                 // 站点左侧目录结构配置
    |   |-- route.js
    |   |-- assets                            // 静态资源文件
    |   |   |-- fonts
    |   |   |-- img
    |   |   |-- style
    |   |-- components
    |   |   |-- scrollTop.vue
    |   |-- docs                              // 站点对应每一页展示的文档
    |   |   |-- button.md
    |   |-- layout                            // 站点布局文件
    |   |   |-- header.vue
    |   |   |-- main.vue
    |   |   |-- pageController.vue
    |   |   |-- search.vue
    |   |   |-- sideTabs.vue
    |   |   |-- sidebar.vue
    |   |   |-- survey.vue
    |   |-- pages
    |   |   |-- changelog.vue
    |   |   |-- index.vue
    |   |-- public                            // 存放生成的 versions 列表
    |   |   |-- versions.json
    |   |-- utils
    |       |-- index.js
    |       |-- pageCache.js
    |-- example                               // 京东(微信)小程序 demo 示例
    |   |-- app.js
    |   |-- app.json                          // 京东(微信)小程序页面配置项
    |   |-- app.jxss
    |   |-- project.config.json
    |   |-- sitemap.json
    |   |-- pages                             // demo 页面
    |       |-- images
    |       |-- index                            // 小程序索引页（首页展示）
    |       |   |-- index.js                        // 索引页页面引入配置
    |       |   |-- index.json
    |       |   |-- index.wxml
    |       |   |-- index.wxss
    |       |-- button                        // 具体的 demo(以button为例) 页面
    |           |-- index.js
    |           |-- index.json
    |           |-- index.wxml
    |           |-- index.wxss
    |-- example-wx                            // npm run dev:wx 后生成的微信小程序运行目录，与example文件夹结构相同
    |-- packages                              // wot-design 组件源码包
        |-- common                               // 公共方法文件夹
        |   |-- component.js                        // 封装 VueComponent
        |   |-- component.md                        // VueComponent 介绍
        |   |-- util.js                             // 开发通用工具
        |   |-- abstracts                        // scss 资源文件
        |   |   |-- _config.scss
        |   |   |-- _function.scss
        |   |   |-- _mixin.scss                     // scss 混入定义
        |   |   |-- _variable.scss                  // scss 通用变量
        |   |-- lodash
        |       |-- debounce.js
        |       |-- isObject.js
        |       |-- internal
        |           |-- freeGlobal.js
        |           |-- root.js
        |-- mixins                           // 定义的 mixins
        |   |-- basic.js                        // 微信节点选择器
        |   |-- cell.js
        |   |-- datetimePickerView.js
        |   |-- touch.js                        // touchMove相关
        |   |-- transition.js
        |-- button                           // 具体的组件源码(以button为例)
            |-- index.js
            |-- index.json
            |-- index.jxml
            |-- index.scss

### 注意事项

* 在项目中所有的微信小程序全局变量使用  `jd` 替代 `wx`。

* `@/packages/common/abstracts` 文件夹中是scss相关配置

  * `_variable.scss` 中存放的是组件的css变量。开发组件的过程中，对于部分css变量(如：font-size、色值、border、重用值等)需要抽取，将抽取的变量提到 `_variable.scss` 中。

  * `_mixins.scss` 中存放的是组件的混合宏，一般定义的是一些通用的样式方法，如：b / e / when 等。

* `@/packages/common/` 文件夹中的 `util.js` 存放的是常用的工具函数。

* `@/packages/mixins/` 文件夹中是定义的 mixins。

### 小程序组件开发流程

以 button 组件为例， 文档用 `@` 表示最顶层文件夹 `wot-design-mini`:

开发流程：

```
1. 创建 button 组件：button 组件的内部逻辑
	---> 2. 创建 button 组件的 demo 页 ：引用写好的 中的 button 应用到当前的项目。
	---> 3. pages 配置添加 button 页：编译模式下可直接跳转进 pages/button/index 获取到页面。
	---> 4. 添加 button 组件在首页的索引
```

#### 1. 创建组件

在`@/package` 文件夹中添加 `button`，文件夹内部包含：**index.js** / **index.jxml** / **index.json** / **index.scss**

创建后的文件夹如下：
```
|-- packages                              // wot-design 组件源码包
	|-- common                               // 公共方法文件夹
	|-- mixins                            // 定义的 mixins
	|-- button                            // 具体的组件源码(以button为例)
		|-- index.js
		|-- index.json
		|-- index.jxml
		|-- index.scss
```

index.js 内容：内部将微信小程序进行了封装，将底层代码二次封装成 `VueComponent` ，关于 `VueComponent` 更多介绍位于 [@/packages/common/component.md]()。

```JavaScript
// index.js
import VueComponent from '../common/component'
VueComponent({
  data () {},
  props: {
    type: String
  },
  created () {},
  mounted () {},
  methods: {}
})
```

index.json 内容：当前组件配置，同微信小程序[自定义组件](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/)

```JavaScript
// index.json
{
  "component": true,
  "usingComponents": {
    "wd-icon": "../icon/index" // 引入其他组件使用
  }
}
```

index.jxml 内容：当前组件的HTML结构，同微信小程序[自定义组件](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/)

```html
<!-- index.jxml -->
<view class="wd-button">button: {{ type }}</view>
```

index.scss 内容：当前组件的 scss 文件。

```JavaScript
/* index.scss  */
@import "./../common/abstracts/_mixin.scss"; /* 引入混入函数 */
@import "./../common/abstracts/variable.scss"; /* 引入全局变量 */
@include b(button){  /* 生成 .wd-button */
  @include e(error){} /* 生成 .wd-button__error */
  @include when(disabled) {} /* 生成 .wd-button.is-disabled */
}
```

#### 2. 创建demo页

`@/example/pages` 文件夹下添加 `button` demo文件夹， 文件夹中包含：**index.js** / **index.jxml** / **index.json** / **index.jxss**

创建后的文件夹如下：

```
|-- example                              // 示例
 	|-- app.json
    |-- pages                               // demo 页面
        |-- index                              // 小程序索引页（首页展示）
        |   |-- index.js                       // 索引页页面引入配置
        |   |-- index.json
        |   |-- index.wxml
        |   |-- index.wxss
	    button                              // 组件示例页(以button为例)
			|-- index.js
			|-- index.json
			|-- index.jxml
			|-- index.scss
```

index.js 内容：示例页面需要的数据和方法。

```JavaScript
// index.js
Page({
  data () {},
  // events
})
```

index.json 内容：添加标题和引入的组件。

```JavaScript
// index.json
{
  "navigationBarTitleText": "Button 按钮",
  "usingComponents": {
    // demo 示例组件
    "demo-block": "../../components/demo-block/index",
    // dist 下的button源码
    "wd-button": "../../dist/button/index"
  }
}
```

index.jxml 内容：与xml用法相同。

```html
<!-- index.jxml -->
<!-- demo-block 另一种用法 <demo-block title="title" transparent>  -->
<demo-block title="title 名字">
  <wd-button type="error">危险按钮</wd-button>
</demo-block>
```

index.jxss 内容：与wxss用法相同。

```css
/* index.jxss */
.test{
  color: red;
}
```

#### 3. pages 配置添加 button 页

`@/example/app.json` 配置 `pages` 属性，添加 button 页索引。

```JavaScript
{
  "pages": [
    "pages/index/index",
    "pages/button/index"
  ]
 }
```

#### 4. 添加组件demo页索引

`@/example/pages/index` 文件夹中的 **index.js** 文件添加，在对应位置添加 `button` 组件的索引。

```JavaScript
// index.js
{
  id: 'button',
  name: 'Button 按钮'
}
```

上述步骤结束后，运行 `npm run dev:wx` 生成 `example-wx` 文件夹，使用微信开发者工具打开 `example-wx` 文件夹，即可看到当前项目。

### 小程序文档添加流程

#### 添加 docs

组件开发完后，在站点上添加 button 的介绍页面。

* `@/docs/docs` 文件夹下添加 `button.md` 文件

* `@/docs/` 文件夹下 `pages.config.json` 中对应位置添加 `button` 索引

```JavaScript
// pages.config.json
"Button": {
  "name": "Button 按钮",
  "path": "/button",
  "demo": "/button"
}
```

### 代码提交及流程

参考 [CONTRIBUTING.md](https://github.com/jd-ftf/wot-design-mini/blob/dev/.github/CONTRIBUTING.md) 文件所定义的规则，进行代码提交。
