/**
 * 一个用户登录服务。
 * 每次切换状态（state）时都会检查用户是否已登录，
 * 若没有则跳到登录界面。
 */
define( [ './services' ] , function ( services ) {
    services.factory( 'UserLogin' , [
        '$q' , '$state' , '$http' , '$rootScope' , function ( $q , $state , $http , $rootScope ) {
            var loginDef ,
                isLogged = false ,

                onLogin = function () {
                    loginDef.resolve();
                };

            return {
                get logged() { return isLogged; } ,
                handleLogin : function () {
                    loginDef = $q.defer();
                    $state.go( 'login' , {} , { location : false } );
                    return loginDef.promise;
                } ,
                needCheck : function ( state ) {
                    return state.name.indexOf( 'logged.' ) >= 0;
                } ,
                login : function ( data ) {
                    var def = $q.defer();

                    // 验证是否正确
                    $http( {
                        url : './' ,
                        method : 'GET'
                    } )
                        .success( function ( response ) {
                            isLogged = true;
                            $rootScope.username = data.username;
                            def.resolve();
                            onLogin();
                        } ).error( function ( data , status ) {
                            if ( 401 === status ) {
                                def.reject();
                            }
                        } );
                    return def.promise;
                }
            };
        }
    ] ).config( [
        '$urlRouterProvider' , function ( $urlRouterProvider ) {
            $urlRouterProvider.deferIntercept();
        }
    ] ).run( [
        '$rootScope' , '$urlRouter' , '$state' , 'UserLogin' ,
        function ( $rootScope , $urlRouter , $state , UserLogin ) {
            $rootScope.$on( '$stateChangeSuccess' , function ( e ) {
                if ( UserLogin.needCheck( $state.current ) && !UserLogin.logged ) {
                    e.preventDefault();
                    UserLogin.handleLogin().then( function () {
                        $urlRouter.sync();
                    } );
                }
            } );
            $urlRouter.listen();
        }
    ] );
} );


