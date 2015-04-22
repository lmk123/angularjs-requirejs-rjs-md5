describe( '测试应用' , function () {
    it( '随便进入一个地址时应该跳转到登录页面' , function ( done ) {
        browser.get( browser.params.appUrl + '#/some-url' );
        browser.sleep( 1000 ).then( function () { // 等一会儿，让模板加载完，否则测试偶尔会失败
            expect( $( 'button' ).isPresent() ).toEqual( true );
            done();
        } );
    } );
} );
