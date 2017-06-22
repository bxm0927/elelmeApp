http://localhost:9000/?id=123#/goods


## Vue.js 高仿饿了么外卖 APP

👉 [GitHub 开源代码](https://github.com/bxm0927/licaibao-responsive)

👉 [项目演示地址(或扫码)](https://bxm0927.github.io/licaibao-responsive/src/)

![二维码地址]()

**项目简介**

这是一个用 Vue.js 制作的高仿饿了么外卖的单页Web应用。使用 Vue.js + ES6 + webpack + Sass等前端最新最热的技术，采用组件化、模块化的开发方式。提取外卖App最核心的模块（商品、评论、商家），完全高仿饿了么外卖APP。

**如何学习**

请从正规渠道购买本课程的教学视频： http://coding.imooc.com/class/74.html。

本源码基于 GPL 协议，仅仅用于 Vue 实战项目的学习，不可作为商业用途。 我们抵制和鄙视一切盗版侵权行为，请尊重作者的劳动果实！

**技术栈**

- HTML/CSS/JS：使用 HTML 5 localStorage 存储本地数据、使用 Stylus 和 Sass 预编译 CSS、使用了自己编写的 reset.css 来统一页面初始样式、移动端设备像素比、媒体查询、flex弹性布局、CSS Sticky footers、iconFont 图标字体等
- eslint：js代码规范
- better-scroll：js 插件，实现平滑滚动效果
- Vue.js：一个前端 MVVM 框架，主要思想是**双向数据绑定**和**组件化**
- vue-cli：Vue.js 官方提供的一个脚手架工具，里面提供的一些基础的代码结构
- vue-router：用 Vue.js + vue-router 创建单页应用，是将组件(components)映射到路由(routes)，然后告诉 vue-router 在哪里渲染它们
- vue-resource：这是一个 Vue.js 的插件，提供了使用 XMLHttpRequest 或 JSONP 进行Web请求和处理响应的服务
- webpack：打包 Vue.js 项目代码资源文件
- Node.js：使用 express 构建一个本地 HTTP server 来调试 Vue 项目

**收获**

1. 了解了一个项目完整的开发流程
2. 学会了组件化、模块化的开发模式，将多次重复开发的样式抽象成 Vue 组件
3. 学会使用 stylus、sass 预编译模块化的 CSS
4. 学会前后端分离开发，mock 假的 json 后端数据存储在本地
5. 掌握了使用 Vue-cli 脚手架初始化 Vue.js 项目
6. 学会了使用 vue-router 将组件映射到路由，进行页面路由切换
7. 学会了使用 vue-resource 进行 HTTP 请求获取数据
8. 了解 webpack 的打包原理、学会 ES6 + eslint 的开发方式、学会如何在Vue.js框架里和第三方JS插件交互

**TODO**

1. 运用了vue 2.3.x版本后添加.sync语法糖
2. 为商品选项卡中的滚动区添加顶部固定效果,左侧菜单区也能根据用户在内容区的选择滚动相应位置
3. 添加一些较为巧妙的css布局处的注释
4. 将一些还未被单独封装为组建的代码封装成单独的组建

**Build Setup**

```
# clone the repo into your disk.
$ git clone https://github.com/cccyb/vue-eleme-app.git

# install dependencies
$ npm install

# serve with hot reload at localhost:8088
$ npm run dev

# build for production with minification
$ npm run build
```
