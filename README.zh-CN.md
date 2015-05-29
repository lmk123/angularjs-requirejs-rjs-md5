# angularjs-requirejs-rjs-md5

[English README is here.](https://github.com/lmk123/angularjs-requirejs-rjs-md5/blob/master/README.md)

这是一个 [angularjs](https://angularjs.org/) 的示例项目. 它使用 [requirejs](http://requirejs.org/) 按需加载控制器、指令、过滤器等文件，然后使用 [r.js](https://github.com/jrburke/r.js/) 将这些零散的文件按照模块的划分合理的合并在一起，最后使用 [gulp-rev-all](https://github.com/smysnk/gulp-rev-all) 将这些文件全都根据文件内容重命名成 md5 的文件名。

所有这些操作都只需要一个命令: `gulp`. 

[在线预览在这里](http://lmk123.github.io/angularjs-requirejs-rjs-md5/cdn/)。记得打开浏览器的开发人员工具的网络面板来查看文件加载情况。

### 它是怎么做到按需加载控制器、指令、过滤器等文件的？
见 [app/bootstrap.js](https://github.com/lmk123/angularjs-requirejs-rjs-md5/blob/master/app/bootstrap.js)。

### 它是怎么用 gulp 来处理源文件的？
`gulp` 命令执行了下面这些操作：

1. 把 [`app`](https://github.com/lmk123/angularjs-requirejs-rjs-md5/tree/master/app) 文件夹下的所有文件精简之后输出到 `build` 文件夹；
2. 使用 r.js 将 `build` 文件夹下的小文件按照模块的划分合并成一个个单独的文件，然后输出至 `build-requirejs` 文件夹；
3. 最后使用 gulp-rev-all 将 `build-requirejs` 文件夹下的文件全部根据文件内容重命名成 md5 的格式，并输出到 [`cdn`](https://github.com/lmk123/angularjs-requirejs-rjs-md5/tree/master/cdn) 文件夹。

在 [gulpfile.js](https://github.com/lmk123/angularjs-requirejs-rjs-md5/blob/master/gulpfile.js) 可以看到上面的这一过程是怎么实现的。

### 使用端到端测试
先安装 [protractor](http://angular.github.io/protractor)，然后运行 `npm test`。

### License
MIT
