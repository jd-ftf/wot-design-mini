## JM Design 小程序组件库
### 文档介绍

   注意：京东小程序IDE目前功能暂不完善，此脚手架将京东小程序转换成微信小程序，通过微信小程序IDE进行调试。

### 目录机构
```
.__
├── READMD.md
├── build
│   ├── gulpfile.js                  // 使用gulp构建组件
│   ├── md-loader
│   │   └── index.js                 // 构建docs时将markdown转换为html的webpack loader
│   ├── plugins
│   │   ├── gulp-js-replace.js       // 将js中的字符串jd替换为wx
│   │   └── gulp-replace.js          // 将html中的字符串jd替换为wx
│   ├── utils.js                     // 自定义的webpack helper
│   └── webpack.docs.conf.js         // 构建docs的webpack配置
├── docs                             // 线上组件官方文档目录
├── .eslintrc                        // eslint配置文件
├── example                          // 京东小程序源码
│   └── dist                         // 组件库 copy from packages
├── example-wx                       // 京东小程序转换成的微信小程序
├── lib                              // 打包后的京东小程序组件库
├── lib-wx                           // 打包后的微信小程序组件库
├── package-lock.json
├── package.json
└── packages                         // 组件库源码
    └── common                       // 公共样式、宏
```
### 使用的技术栈

scss + 小程序

### 构建工具

gulp、webpack

### 开发流程

#### 使用京东小程序开发者工具开发，[点击下载](http://doc.jd.com/ares/alldoc/JDmp/download/IDE下载.html)。

  1. 运行 `npm run dev` 命令，构建京东小程序组件。
  
  2. 在京东小程序开发者工具中导入项目，项目地址选择 example 文件夹。

  3. 在京东小程序开发者工具上预览效果。

  4. 创建其它组件。

#### 使用微信开发者工具开发

  1. 运行 `npm run dev:wx` 命令，构建微信小程序组件。
  
  2. 在微信小程序开发者工具中导入项目，项目地址选择 example-wx 文件夹。

  3. 在微信小程序开发者工具上预览效果。

  4. 创建其它组件。

### 命令介绍

```bash
# 安装依赖
npm install

# 运行开发环境(将packages目录下文件复制到/example/dist，用于组件库预览)
npm run dev

# 打包插件库(将packages目录下文件打包到/lib下的，用于在npm发布)
npm run build

# 运行开发环境（npm run dev + example转微信小程序）
npm run dev:wx

# 打包插件库（同时打包生成京东、微信小程序组件库）
npm run build:wx
```
### 组件库开发步骤

1. 新建分支，分支名规范：姓名-组件名，例如xieyu-message

2. 参照[小程序原生框架](https://developers.weixin.qq.com/miniprogram/dev/component/)进行封装，封装为[自定义组件](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/) 

3. 组件库packages下新建以组件命名的目录，例如开发radio组件则建立packages/radio。之后在packages/radio分别新建：  

  + index.js  
  + index.scss(构建时自动转成scss)  
  + index.json  
  + index.jxml  

4. 小程序项目example开发：pages下新建目录如button,在目录中新建index.js，index.json，index.jxml，index.jxss。

5. 在 example/pages/button/index.json 中添加组件引用，即可在页面中使用该组件

```json
{
  "usingComponents": {
    //引入小程序自定义组件库，即打包后开发的工具组件库
    "jm-button": "/dist/button/index"
  }
}
```

可以在微信开发者工具中添加编译模式，将自己开发的组件页面设定为当前编译的页面。

![编译页面](https://img10.360buyimg.com/jmadvertisement/jfs/t1/69211/17/10309/119659/5d7f628fE022d5dcd/9534d56d95f58f5e.png)
