define( [
    'angular'
] , function ( angular ) {
    return angular.module( 'app' , [] )
        .config( [
            '$stateProvider' ,
            //'$urlRouterProvider' ,
            function ( $stateProvider /*, $urlRouterProvider*/ ) {
                //$urlRouterProvider.otherwise( '/index' );

                // 设置路由
                $stateProvider.state( 'login' , {
                    url : '/login' ,
                    templateUrl : 'modules/login/login.html' ,
                    controller : 'LoginController' ,
                    resolve : {
                        load : loadDeps( [
                            'modules/login/module' ,

                            // .css 后缀需要带上，否则 gulp-rev-all 不会更新引用
                            'css!./styles/login.css' // 依赖的 css 可以写在这里，也可以写在 LoginController.js 里
                        ] )
                    }
                } )
                    .state( 'logged' , {
                        abstract : true ,
                        templateUrl : 'views/header.html' ,
                        resolve : {
                            load : loadDeps( [ 'css!styles/header.css' ] )
                        }
                    } )
                    .state( 'logged.index' , {
                        url : '/index' ,
                        templateUrl : 'modules/index/index.html' ,
                        controller : 'IndexController' ,
                        resolve : {
                            load : loadDeps( [
                                'modules/index/module' ,
                                'css!./styles/index.css'
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
} );

