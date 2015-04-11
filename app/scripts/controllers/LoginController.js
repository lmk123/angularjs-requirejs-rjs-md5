define( [
    '../app'
] , function ( controllers ) {
    controllers.controller( 'LoginController' , [
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

