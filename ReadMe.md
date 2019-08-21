
### JMD小程序组件库开发手册

1. 文档介绍

   基于微信小程序 开发的小程序端组件库，框架使用原生的小程序框架开发。

2. Build Setup

   ```xml
   # 安装依赖
   npm install
   
   # 运行开发环境(将packages目录下文件打包到/example/dist下的，用于组件库开发)
   npm run dev
   
   # 打包插件库(将packages目录下文件打包到/dist下的，用于外部引用)
   npm run build
   
   ```

3. 使用的技术栈

   sass + 小程序

4. 构建工具

   gulp

5. 开发工具

   VSCode（用于源代码编写） + 微信小程序开发工具（用于页面展现效果查看）

6. 项目架构

   ```html
   .
   ├── ReadMe.md
   ├── dist										packages通过gulp打包生成组件库，用于外部项目引入。
   │   └── button
   ├── example								    小程序开发工具打开的项目目录，用于组件库调用实例以及组件库测试操作
   │   ├── app.js
   │   ├── app.json								 内部的pages属性用于定义页面，开发哪个页面最好将其放在第一位，工具会默认设置第一个为初始化页面
   │   ├── app.wxss
   │   ├── dist									 组件库需要打包到小程序项目内使用。使用npm run dev 生成。
   │   ├── pages						小程序项目页面使用目录
   │   ├── project.config.json
   │   └── sitemap.json
   ├── gulpfile.js					组件gulp打包程序
   ├── package-lock.json
   ├── package.json
   └── packages									    组件库
       ├── button									    button组件
       ├── common									    组件公共样式与方法
       └── wxs										小程序wxs语法公共库
   ```

7. 组件库开发步骤

   - [ ] 新建分支，用于组件开发。

   - [ ] 参照小程序原生框架（ https://developers.weixin.qq.com/miniprogram/dev/component/ ）进行封装，封装为自定义组件（ https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/ ）

   - [ ] 组件库packages下新建组件目录例如radio,下面新建index.js（参照小程序自定义组件库开发帮助说明）,index.scss（用于编写小程序样式，可使用sass语法，打包后会生成小程序样式库wxss）,index.json（用于声明新建的是一个自定义组件）,index.wxml（用于定义组件结构）

   - [ ] 小程序项目example开发：pages下新建目录radio,下面封装radio的radio.js，radio.json，radio.wxml，radio.wxss。

   - [ ] example/app.json   

     ```json
     {
       "pages": [
         "pages/button/button",						//第一个字符串定义为自己要开发的组件，这样可以避免更改源码后热编译，小程序开发工具页面定义到首页。
         "pages/index/index"
       ],
       "usingComponents": {
         "jmd-button": "dist/button/index"			//引入小程序自定义组件库，即打包后开发的工具组件库
       }
     ```
