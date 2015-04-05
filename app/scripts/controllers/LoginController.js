define( [
    './controllers'
] , function ( controllers ) {

    // 异步控制器（或指令和服务）需要用 module.register 来注册，否则会报错
    controllers.register
        .controller( 'LoginController' , [
            '$scope' , '$state' , 'UserLogin' ,
            function ( $s , $state , UserLogin ) {
                $s.formData = {
                    username : '' ,
                    password : ''
                };

                $s.login = function () {
                    UserLogin.login( $s.formData ).catch( function () {
                        alert( '用户名或密码错误' );
                        $s.formData.password = '';
                    } );
                };
            }
        ] );
} );

