var appUrl = 'http://localhost:61111/demo-angularjs-requirejs/app/';
describe( '测试应用' , function () {

    // 测试偶尔会失败，原因可能是当测试执行到 $('button') 的时候，
    // 页面还没来得及跳转到 #login ，因为模板文件是异步加载的
   it( '随便进入一个地址时应该跳转到登录页面' , function () {
        browser.get( appUrl + '#/some-url' );
        expect( $( 'button' ).getText() ).toEqual( '登录' );
    } );
} );
