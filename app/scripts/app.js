require.config( {
    paths : {
        angular : '../vendor/angular/angular' ,
        angularUIRouter : '../vendor/angular/angular-ui-router'
    } ,
    shim : {
        angular : {
            exports : 'angular'
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
            '$urlRouterProvider' ,
            function ( $stateProvider , $urlRouterProvider ) {
                $urlRouterProvider.otherwise( '/index' );

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

