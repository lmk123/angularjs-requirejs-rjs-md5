/**
 * 一个用户登录服务。
 * 每次切换状态（state）时都会检查用户是否已登录，
 * 若没有则跳到登录界面。
 */
define( [ '../app' ] , function ( services ) {
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

                    isLogged = true;
                    $rootScope.username = data.username;
                    def.resolve();
                    onLogin();

                    return def.promise;
                }
            };
        }
    ] ).run( [
        '$rootScope' , '$urlRouter' , 'UserLogin' ,
        function ( $rootScope , $urlRouter , UserLogin ) {
            $rootScope.$on( '$stateChangeStart' , function ( e , toState ) {
                if ( UserLogin.needCheck( toState ) && !UserLogin.logged ) {
                    e.preventDefault();
                    UserLogin.handleLogin().then( function () {
                        $urlRouter.sync();
                    } );
                }
            } );
        }
    ] );
} );


