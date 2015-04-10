require.config( {
    paths : {
        angular : '../vendor/angular/angular' ,
        angularUIRouter : '../vendor/angular/angular-ui-router'
    } ,
    shim : {
        angular : {
            exports : 'angular' ,
            init : function () {
                // ---------------------重要代码段！------------------------------
                // 应用启动后不能直接用 module.controller 等方法，否则会报控制器未定义的错误，
                // 见 http://stackoverflow.com/questions/20909525/load-controller-dynamically-based-on-route-group
                // 代码参考：https://github.com/Treri/angular-require/blob/master/angular-require.js#L44
                var _module = angular.module;
                angular.module = function () {
                    var newModule = _module.apply( angular , arguments );
                    if ( arguments.length >= 2 ) {
                        newModule.config( [
                            '$controllerProvider' ,
                            '$compileProvider' ,
                            '$filterProvider' ,
                            '$provide' ,
                            function ( $controllerProvider , $compileProvider , $filterProvider , $provide ) {
                                newModule.controller = $controllerProvider.register;
                                newModule.directive = $compileProvider.directive;
                                newModule.filter = $filterProvider.register;
                                newModule.factory = $provide.factory;
                                newModule.service = $provide.service;
                                newModule.provider = $provide.provider;
                                newModule.value = $provide.value;
                                newModule.constant = $provide.constant;
                                newModule.decorator = $provide.decorator;
                            }
                        ] );
                    }
                    return newModule;
                };
            }
        } ,
        angularUIRouter : [ 'angular' ]
    } ,
    map : {
        '*' : {
            'css' : '../vendor/require/css'
        }
    }
} );

define( [
    'angular' ,
    'angularUIRouter' ,
    './app' ,

    // 公用的服务和指令列在下面
    'services/UserLoginService' ,
    'directives/focus-me'
] , function ( angular ) {
    angular.module( 'bootstrap' , [ 'ui.router' , 'app' ] );
    angular.bootstrap( document , [ 'bootstrap' ] );
} );


