var appUrl = 'http://localhost:61111/demo-angularjs-requirejs/app/';
describe( '测试应用' , function () {
    beforeAll( function () {

        // 将原本的 bootstrap 覆盖掉，其实就是加了一个 ngMockE2E 模块
        browser.addMockModule( 'bootstrap' , function () {
            angular
                .module( 'bootstrap' , [ 'ngMockE2E' , 'ui.router' , 'app' ] )
                .run( [
                    '$httpBackend' ,
                    function ( $httpBackend ) {
                        $httpBackend.whenGET( /.*/ ).passThrough();
                        $httpBackend.whenPOST( /.*/ ).passThrough();
                    }
                ] );
        } );
    } );
    it( '随便进入一个地址时应该跳转到登录页面' , function () {
        browser.get( appUrl + '#/some-url' );
        expect( $( 'button' ).getText() ).toEqual( '登录' );
    } );
} );
