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
    return angular.module( 'controllers' , [ 'directives' , 'services' ] );
} );
