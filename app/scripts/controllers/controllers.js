// 仅仅是创建了一个模块
// 其它所有控制器都挂载在这个模块下
define( [
    'angular' ,

    // 公用服务和指令会自动加载下面这两项，当然你要加上也无所谓。
    // 'services/services' ,
    // 'directives/directives' ,

    // 公用的服务和指令列在下面。
    // 注意：公用的服务和指令需要直接使用 module.factory 或 module.directive ，
    // 而不是 module.register.factroy
    '../services/UserLoginService' ,
    '../directives/focus-me'
] , function ( angular ) {
    var controllers = angular.module( 'controllers' , [ 'directives' , 'services' ] );

    // 异步加载时不能直接用 controllers.controller 等方法，否则会报找不到的错误
    // 见 http://stackoverflow.com/questions/20909525/load-controller-dynamically-based-on-route-group
    controllers.config( [
        '$controllerProvider' , '$compileProvider' , '$filterProvider' , '$provide' ,
        function ( $controllerProvider , $compileProvider , $filterProvider , $provide ) {
            controllers.register = {
                controller : $controllerProvider.register ,
                directive : $compileProvider.directive ,
                filter : $filterProvider.register ,
                factory : $provide.factory ,
                service : $provide.service
            };
        }
    ] );
    return controllers;
} );
