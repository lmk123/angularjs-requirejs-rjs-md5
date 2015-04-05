// 仅仅是创建了一个模块
// 其它所有控制器都挂载在这个模块下
define( [
    'angular' ,

    // 公用服务和指令会自动加载下面这两项，当然你要加上也无所谓。
    // 'services/services' ,
    // 'directives/directives' ,

    // 公用的服务和指令列在下面
    '../services/UserLoginService' ,
    '../directives/focus-me'
] , function ( angular ) {
    var module = angular.module( 'controllers' , [ 'directives' , 'services' ] );

    // 统一注册接口，这样无论是全局服务还是懒加载的文件都能用一致的方式声明了
    module.register = {
        controller : module.controller ,
        directive : module.directive ,
        filter : module.filter ,
        factory : module.factory ,
        service : module.service
    };

    // 应用启动后不能直接用 module.controller 等方法，否则会报未定义的错误
    // 见 http://stackoverflow.com/questions/20909525/load-controller-dynamically-based-on-route-group
    module.config( [
        '$controllerProvider' , '$compileProvider' , '$filterProvider' , '$provide' ,
        function ( $controllerProvider , $compileProvider , $filterProvider , $provide ) {
            module.register = {
                controller : $controllerProvider.register ,
                directive : $compileProvider.directive ,
                filter : $filterProvider.register ,
                factory : $provide.factory ,
                service : $provide.service
            };
        }
    ] );
    return module;
} );
