 
## 简介

[vue-admin](https://github.com/ttentau/vue-admin) 是一个前端管理系统的基础布局模板，只包含一个表格和表单示例页面。
基于 [vue](https://github.com/vuejs/vue) 和 [element-ui](https://github.com/ElemeFE/element)实现，
内置vue-router、vuex、axios、mockjs、lodash等库（以上等库均以 cdn 的方式引入，在 vue.config.js 文件有特殊配置）。
全局变量、全局方法、全局api方法、全局filters这些都配置好了。
clone下来，直接复制示例页面，然后添加到路由里面即可。

**做过太多的管理系统了，没什么创意，登录、权限、表格、表单四大金刚。炫点的再来个图表统计**

**项目里面所有的内容，都是经过业务验证之后封装和提炼的。
所以此项目主要的目就是快速开发常见管理系统，无需为各种基础配置浪费时间**

**该项目不支持低版本浏览器(如 ie)，有需求请自行添加 polyfill [详情](https://github.com/PanJiaChen/vue-element-admin/wiki#babel-polyfill)**

**目前版本为 `v4.0+` 基于 `vue-cli` 进行构建，若发现问题，欢迎提issue**

## 前序准备

你需要在本地安装 [node](http://nodejs.org/) 和 [git](https://git-scm.com/)。本项目技术栈基于 [ES2015+](http://es6.ruanyifeng.com/)、[vue](https://cn.vuejs.org/index.html)、[vuex](https://vuex.vuejs.org/zh-cn/)、[vue-router](https://router.vuejs.org/zh-cn/) 、[vue-cli](https://github.com/vuejs/vue-cli) 、[axios](https://github.com/axios/axios) 和 [element-ui](https://github.com/ElemeFE/element)，所有的请求数据都使用[Mock.js](https://github.com/nuysoft/Mock)进行模拟，提前了解和学习这些知识会对使用本项目有很大的帮助。

```
# 克隆项目
git clone https://github.com/ttentau/vue-admin

# 进入项目目录
cd vue-admin

# 安装依赖
npm install

# 建议不要直接使用 cnpm 安装依赖，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run serve
浏览器访问 http://localhost:8863

# 构建生产环境
npm run build-modern


# 预览发布环境效果 + 静态资源分析
npm run build-report

# 代码格式检查
npm run lint

# 代码格式检查并自动修复
npm run lint-fix
```
