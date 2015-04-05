// 仅仅是创建了一个模块
// 其它所有服务都挂载在这个模块下
define( [
    'angular'
] , function ( angular ) {
    var services = angular.module( 'services' , [] );

    services.config( [
        '$controllerProvider' , '$compileProvider' , '$filterProvider' , '$provide' ,
        function ( $controllerProvider , $compileProvider , $filterProvider , $provide ) {
            services.register = {
                controller : $controllerProvider.register ,
                directive : $compileProvider.directive ,
                filter : $filterProvider.register ,
                factory : $provide.factory ,
                service : $provide.service
            };
        }
    ] );
    return services;
} );
