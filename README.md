# AngularJS-all-lazyload

这是一个 AngularJS 项目脚手架，做到了完全按需加载控制器、指令、服务和样式（模板本身就是按需加载的）。[在线示例请戳我](http://lmk123.github.io/angularjs-all-lazyload/app/index.html)，也非常欢迎你在[这篇博文](https://github.com/lmk123/blog/issues/9)里与我讨论这样做是否合适。

### 什么是按需加载

以 AngularJS 里面的模板为例，如果你在路由中定义了 `templateUrl` 属性，那么只有当你第一次访问该路由时，AngularJS 才会去加载这个模板。此项目更近一步，做到了控制器、服务、指令与样式的按需加载。

### 项目结构

下面以 [app/scripts](https://github.com/lmk123/angularjs-all-lazyload/tree/gh-pages/app/scripts) 作为根目录进行说明。

[app.js](https://github.com/lmk123/angularjs-all-lazyload/tree/gh-pages/app/scripts/app.js) 是项目入口，里面仅依赖了 [controllers/controllers.js](https://github.com/lmk123/angularjs-all-lazyload/tree/gh-pages/app/scripts/controllers/controllers.js)；

[controllers/controllers.js](https://github.com/lmk123/angularjs-all-lazyload/tree/gh-pages/app/scripts/controllers/controllers.js) 仅依赖了_全局服务和指令_，在本例中是_检查用户登录状态的服务_与一个_让输入框获得焦点的指令_；

[app.js](https://github.com/lmk123/angularjs-all-lazyload/tree/gh-pages/app/scripts/app.js) 里面定义了路由，使用路由的 `resolve` 属性（见 [$stateProvider](http://angular-ui.github.io/ui-router/site/#/api/ui.router.state.$stateProvider) 里的 `.state()` 方法）依赖每个路由需要的控制器和样式，例如 [index 路由](https://github.com/lmk123/angularjs-all-lazyload/blob/gh-pages/app/scripts/app.js#L48)依赖 [controllers/IndexController.js](https://github.com/lmk123/angularjs-all-lazyload/tree/gh-pages/app/scripts/controllers/IndexController.js) 与 [styles/index.css](https://github.com/lmk123/angularjs-all-lazyload/tree/gh-pages/app/styles/index.css)；

最后，控制器会依赖用得到的指令和服务，例如  [controllers/IndexController.js](https://github.com/lmk123/angularjs-all-lazyload/tree/gh-pages/app/scripts/controllers/IndexController.js) 会依赖 [directives/index-des.js](https://github.com/lmk123/angularjs-all-lazyload/tree/gh-pages/app/scripts/directives/index-des.js)。

### Todos

+ 添加单元测试与端到端测试
+ 使用 r.js 将文件合理的合并在一起

### 许可
MIT
