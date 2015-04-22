// conf.js
exports.config = {
    framework : 'jasmine2' ,
    directConnect : true , // 直接通过 chrome driven 开始测试，这样不需要启动 selenium 服务器，比较方便
    //seleniumAddress : 'http://localhost:4444/wd/hub' ,
    specs : [ './e2e/**/*Spec.js' ] ,
    params : {
        // 线上地址用下面的
        appUrl : 'http://lmk123.github.io/angularjs-all-lazyload/cdn/'
        //appUrl : 'http://localhost:61111/demo-angularjs-requirejs/app/'
    } ,

    // 将 $httpBackend 放在 onPrepare 里
    onPrepare : function () {

        // 将原本的 bootstrap 覆盖掉，其实就是加了一个 ngMockE2E 模块
        browser.addMockModule( 'bootstrap' , function () {
            if ( angular.mock ) {
                angular
                    .module( 'bootstrap' , [ 'ngMockE2E' , 'all' ] )
                    .run( [
                        '$httpBackend' ,
                        function ( $httpBackend ) {
                            $httpBackend.whenGET( /.*/ ).passThrough();
                            $httpBackend.whenPOST( /.*/ ).passThrough();
                        }
                    ] );
            }
        } );
    }
};

