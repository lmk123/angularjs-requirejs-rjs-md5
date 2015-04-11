# AngularJS-all-lazyload

这是一个 AngularJS 项目脚手架，做到了完全按需加载控制器、指令、服务和样式（模板本身就是按需加载的）。[在线示例请戳我](http://lmk123.github.io/angularjs-all-lazyload/app/index.html)，也非常欢迎你在[这篇博文](https://github.com/lmk123/blog/issues/9)里与我讨论这样做是否合适。

### 什么是按需加载

以 AngularJS 里面的模板为例，如果你在路由中定义了 `templateUrl` 属性，那么只有当你第一次访问该路由时，AngularJS 才会去加载这个模板。此项目更进一步，做到了控制器、服务、指令与样式的按需加载。

### 如何开始

代码里有详细的注释，先阅读 [app/scripts/bootstrap.js](https://github.com/lmk123/angularjs-all-lazyload/tree/gh-pages/app/scripts/bootstrap.js)，然后阅读 [app/scripts/app.js](https://github.com/lmk123/angularjs-all-lazyload/tree/gh-pages/app/scripts/app.js) ，最后阅读 [app/scripts/controllers/IndexController.js](https://github.com/lmk123/angularjs-all-lazyload/tree/gh-pages/app/scripts/controllers/IndexController.js)，你就明白了 :)

### Todos

+ 添加单元测试与端到端测试
+ 使用 r.js 将文件合理的合并在一起

### 许可
MIT
