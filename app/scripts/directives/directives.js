// 仅仅是创建了一个模块
// 其它所有指令都挂载在这个模块下
define( [
    'angular'
] , function ( angular ) {
    var directives = angular.module( 'directives' , [] );

    directives.config( [
        '$controllerProvider' , '$compileProvider' , '$filterProvider' , '$provide' ,
        function ( $controllerProvider , $compileProvider , $filterProvider , $provide ) {
            directives.register = {
                controller : $controllerProvider.register ,
                directive : $compileProvider.directive ,
                filter : $filterProvider.register ,
                factory : $provide.factory ,
                service : $provide.service
            };
        }
    ] );
    return directives;
} );
