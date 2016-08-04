**这个项目已经不再维护了，因为 [Webpack](http://webpack.github.io/) 提供了更好的解决方案。**

# angularjs-requirejs-rjs-md5

这是一个 [AngularJS](https://angularjs.org/) 的示例项目。它使用 [RequireJS](http://requirejs.org/) 按需加载控制器、指令、过滤器等文件，然后使用 [r.js](https://github.com/jrburke/r.js/) 将这些零散的文件按照模块的划分合理的合并在一起，然后使用各种 [gulp](http://gulpjs.com/) 插件精简文件，最后使用 [gulp-rev-all](https://github.com/smysnk/gulp-rev-all) 将这些文件全都根据文件内容重命名成 md5 的文件名。

所有这些操作都只需要一个命令: `gulp`. 

## 运行此项目

 1. 克隆项目到本地
 2. 全局安装 gulp：`npm install gulp -g`
 3. 安装 gulp 插件：`npm install` 
 4. 修改 [gulpfile.js](https://github.com/lmk123/angularjs-requirejs-rjs-md5/blob/master/gulpfile.js) 里的 `CDN_PREFIX` 变量为 `false`
 5. 运行 `gulp`，然后在 web 服务器中打开 [cdn/index.html](https://github.com/lmk123/angularjs-requirejs-rjs-md5/blob/master/cdn/index.html)。双击打开（即以 file:// 协议打开）是无效的。
 
[在线预览在这里](http://arrm.limingkai.cn)，记得打开浏览器的开发人员工具的网络面板来查看文件加载情况。注意，在线预览的所有静态文件都是从 https://dn-lmk123.qbox.me 加载的，这是因为在 gulpfile.js 里指定了 `CDN_PREFIX` 变量。

### 添加 cdn 前缀

在 gulpfile.js 里指定 `CDN_PREFIX` 变量的值，那么 `gulp` 命令会给所有的路径（例如代码里的 `templateUrl` 模板路径、html 文件里引用的图片、脚本、样式表等文件）添加这个前缀；[app/index.html](https://github.com/lmk123/angularjs-requirejs-rjs-md5/blob/master/app/index.html) 里的 [data-main](http://requirejs.org/docs/api.html#data-main) 也会加上这个前缀，所以 [baseUrl](http://requirejs.org/docs/api.html#config-baseUrl) 会被自动设为这个值。

### 它是怎么做到按需加载控制器、指令、过滤器等文件的？
见 [app/bootstrap.js](https://github.com/lmk123/angularjs-requirejs-rjs-md5/blob/master/app/bootstrap.js)。

### 它是怎么用 gulp 来处理源文件的？

`gulp` 命令执行了下面这些操作：

1. 使用 r.js 将 [app](https://github.com/lmk123/angularjs-requirejs-rjs-md5/tree/master/app) 文件夹下的小文件按照模块的划分合并成一个个单独的文件，然后输出至 `build-requirejs` 文件夹；
2. 把 `build-requirejs` 文件夹下的所有文件精简之后输出到 `build` 文件夹；
3. 最后使用 gulp-rev-all 将 `build` 文件夹下的文件全部根据文件内容重命名成 md5 的格式，并输出到 [cdn](https://github.com/lmk123/angularjs-requirejs-rjs-md5/tree/master/cdn) 文件夹。

在 [gulpfile.js](https://github.com/lmk123/angularjs-requirejs-rjs-md5/blob/master/gulpfile.js) 可以看到上面的这一过程是怎么实现的。

### 使用端到端测试
先安装 [protractor](http://angular.github.io/protractor)，然后运行 `npm test`。

### 项目结构

```
app：项目源码。开发的时候代码写在这里。
 |--directives：整个网站公用的指令写在这里面
 |--images：存放图片
 |--modules：用于存放各个模块，例如一个网站可以分成主页、用户中心等模块
 |--services：整个网站公用的服务写在这里面
 |--styles：整个网站公用的样式
 |--vendor：存放第三方代码库
 |--views：存放并不属于某个模块的模板，例如整个网站都会用到的页头和页脚
 |--app.js：路由表、config()、run()等代码块写在这里面
 |--bootstrap.js：程序的启动文件，用于配置 requireJS 的配置及启动应用
 |--index.html：应用入口页面
cdn：经过处理之后的、用于生产环境的代码。不能直接编辑。
docs：用于存放各种文档。
test：自动化测试用例写在这里
gulpfile.js：根据 app 文件夹里的源码生成适合生产环境使用的代码。会精简文件并重命名为 md5 文件名
package.json：用于声明 gulpfile.js 会用到的各种模块
```

[app/modules](https://github.com/lmk123/angularjs-requirejs-rjs-md5/tree/master/app/modules) 里面的子模块包含各自的模板、指令等代码。如果某个指令、服务等会在其他模块里用到，你应该考虑把它加入到 [app/directives](https://github.com/lmk123/angularjs-requirejs-rjs-md5/tree/master/app/directives) 等文件夹中。

若一个子模块也包含子模块，那么也应该根据此规则进行分割。例如项目有 _用户中心_ 模块，但这个模块还包含 _基本信息_、_收货地址_ 、_好友列表_ 等模块，那么就应该是这样的结构：

```
app/modules/customer：用户中心模块
 |--basic：基本信息模块
 |--address：收货地址模块
 |--friends：好友列表模块
 |--common.js：上面这些模块都用得到的代码，比如 API 接口
```

这样的结构易于将项目拆分，但是在声明路由的时候会比较麻烦：因为公用文件必须得先加载。上面的结构可能就需要这样声明路由：

```js
$stateProvider
  .state( 'nav.customer' , { // 一个父状态用来加载公用文件
    abstract : true ,
    template : '<div ui-view></div>' ,
    resolve : {
      loadModule : asyncLoad( [ 'modules/customer/common' ] ) // 公用文件
    }
  } )
  .state( 'nav.customer.basic' , { // 子状态来加载各自的模板与代码
    url : '/customer/basic' ,
    templateUrl : 'modules/customer/basic/index.html' ,
    controller : 'CustomerBasicController' ,
    resolve : {
      loadModule : asyncLoad( [ 'modules/customer/basic/index' ] ) // 子状态自己的代码
    }
  } )
  // ...
```

## 代码注意事项

项目使用 gulp 及其它一些插件来完成源文件的合并、精简及重命名为 md5 hash 的操作，但有一点要特别注意：文件里不要出现与文件名相同的字符串。

例如 `vendor/require/require.js` 里面有一段代码：`this.map.isDefine ? 'define' : 'require'`，_gulp-rev-all_ 在把 require.js 重命名的时候，也会把这段代码里面的 _require_ 给一并重命名掉，这是很多 bug 出现的根源。所以我在 gulpfile.js 中声明 `dontSearchFile : [ /^\/vendor\/.*/ ]` 忽略了 `vendor` 文件夹下的文件。

对于自己写的代码，就要保证代码里出现字符串的地方不要与文件名相同，否则要再三确认即使被重命名了也不会影响逻辑。详情见[这里](https://github.com/smysnk/gulp-rev-all#annotater--replacer)。

### License
MIT
