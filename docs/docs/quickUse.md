## 快速上手

本节介绍如何在小程序中使用 `JM Design`

### 下载组件库项目

通过 git 拉取 git 项目：

```bash
git clone git@git.jd.com:pop-FE/jmd-vapp.git
```

将项目中的 `lib` 文件夹复制到你的小程序工程中，重新命名为 `jm-design` ，如下结构：

```html
.
├── app.js
├── app.json
├── app.wxss
├── jm-design								 jm-design 组件库
|   └── button						   button组件
|       ├── index.js
|       ├── index.json
|       ├── index.jxml
|       └── index.jxss
├── pages						         小程序项目页面使用目录
├── project.config.json
└── sitemap.json
```

在页面的 index.json 文件中引入需要使用的组件：

```json
{
  "usingComponents": {
    "jm-button": "/jm-design/button/index"
  }
}
```

在页面中就可以使用该组件：

```html
<view>
  <jm-button>按钮</jm-button>
</view>
```
