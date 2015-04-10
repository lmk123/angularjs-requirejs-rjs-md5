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
    'controllers/controllers'
] , function ( angular ) {
    angular.module( 'app' , [ 'ui.router' , 'controllers' ] )
        .config( [
            '$stateProvider' ,
            //'$urlRouterProvider' ,
            function ( $stateProvider /*, $urlRouterProvider*/ ) {
                //$urlRouterProvider.otherwise( '/index' );

                // 设置路由
                $stateProvider.state( 'login' , {
                    templateUrl : 'views/login.html' ,
                    controller : 'LoginController' ,
                    resolve : {
                        load : loadDeps( [
                            'controllers/LoginController' ,
                            'css!../styles/login' // 依赖的 css 可以写在这里，也可以写在 LoginController.js 里
                        ] )
                    }
                } )
                    .state( 'logged' , {
                        abstract : true ,
                        templateUrl : 'views/header.html' ,
                        resolve : {
                            load : loadDeps( [ 'css!../styles/header' ] )
                        }
                    } )
                    .state( 'logged.index' , {
                        url : '/index' ,
                        templateUrl : 'views/index.html' ,
                        controller : 'IndexController' ,
                        resolve : {
                            load : loadDeps( [
                                'controllers/IndexController' ,
                                'css!../styles/index'
                            ] )
                        }
                    } );

                // 不能使用下面这句代码：
                // $urlRouterProvider.otherwise( '/index' );
                // 见 http://stackoverflow.com/questions/25065699/why-does-angularjs-with-ui-router-keep-firing-the-statechangestart-event
                // 另外，这段代码必须放在最后一个路由，否则直接在链接中到 #/路由 会无效
                $stateProvider.state( 'otherwise' , {
                    url : '*path' ,
                    template : '' ,
                    controller : [
                        '$state' ,
                        function ( $state ) {
                            $state.go( 'logged.index' );
                        }
                    ]
                } );

                /**
                 * 加载依赖的辅助函数
                 * @param deps
                 * @returns {*[]}
                 */
                function loadDeps( deps ) {
                    return [
                        '$q' , function ( $q ) {
                            var def = $q.defer();
                            require( deps , function () {
                                def.resolve();
                            } );
                            return def.promise;
                        }
                    ];
                }

            }
        ] );

    angular.bootstrap( document , [ 'app' ] );
} );

