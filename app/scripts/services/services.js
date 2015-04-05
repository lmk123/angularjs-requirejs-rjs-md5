// 仅仅是创建了一个模块，
// 其它所有服务都挂载在这个模块下
define( [
    'angular'
] , function ( angular ) {
    var module = angular.module( 'services' , [] );

    module.register = {
        controller : module.controller ,
        directive : module.directive ,
        filter : module.filter ,
        factory : module.factory ,
        service : module.service
    };

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
