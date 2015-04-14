var appUrl = 'http://localhost:61111/demo-angularjs-requirejs/app/';
describe( '测试应用' , function () {
    it( '随便进入一个地址时应该跳转到登录页面' , function () {
        browser.get( appUrl + '#/some-url' );
        expect( $( 'button' ).getText() ).toEqual( '登录' );
    } );
} );
