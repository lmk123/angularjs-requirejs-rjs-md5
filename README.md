# AngularJS-all-lazyload

这是一个 AngularJS 项目脚手架，做到了完全按需加载控制器、指令、服务和样式（模板本身就是按需加载的）；另外，还附带 md5 签名工具（[这是什么？](https://github.com/smysnk/gulp-rev-all#purpose)）与端到端测试工具（使用 AngularJS 官方推出的 [Protractor](https://github.com/angular/protractor)）。[在线示例请戳我](http://lmk123.github.io/angularjs-all-lazyload/cdn/)，也非常欢迎你在[这篇博文](https://github.com/lmk123/blog/issues/9)里与我讨论这样做是否合适。

### 什么是按需加载

以 AngularJS 里面的模板为例，如果你在路由中定义了 `templateUrl` 属性，那么只有当你第一次访问该路由时，AngularJS 才会去加载这个模板。此项目更进一步，做到了控制器、服务、指令与样式的按需加载。

### 如何将它用到自己的项目里
先将代码库下载到本地，然后依次阅读 [app/scripts/bootstrap.js](https://github.com/lmk123/angularjs-all-lazyload/tree/master/app/scripts/bootstrap.js)、 [app/scripts/app.js](https://github.com/lmk123/angularjs-all-lazyload/tree/master/app/scripts/app.js) 与 [app/scripts/controllers/IndexController.js](https://github.com/lmk123/angularjs-all-lazyload/tree/master/app/scripts/controllers/IndexController.js)，你就明白了 :)

### 如何使用 md5 签名工具
> 先确保你全局安装了 [gulp](https://github.com/gulpjs/gulp)

运行 `npm install`，然后运行 `gulp`。完成之后，会多出 `build` 与 `cdn` 文件夹。其中 `build` 是把 `app` 里面的所有文件精简后的输出目录，而 `cdn` 是把 `build` 里的文件全都使用 md5 重命名之后的输出目录。
> 虽然 `build` 是一个“中间目录”，但我仍然建议保留它，因为 [gulp-changed](https://github.com/sindresorhus/gulp-changed) 会根据此文件夹过滤掉没有修改过的文件，从而缩短构建时间。

### 如何使用端到端测试
> 先确保你全局安装了 [Protractor](https://github.com/angular/protractor)

修改 [test/protractor.conf.js](https://github.com/lmk123/angularjs-all-lazyload/tree/master/test/protractor.conf.js) 里的 `params.appUrl` 变量，然后运行 `npm test`
### Todos
+ 使用 r.js 将文件合理的合并在一起

### 许可
MIT
