var SRC              = 'app' ,
    REQUIREJS        = 'build-requirejs' ,
    DIST             = 'build' ,
    CDN              = 'cdn' ,

    // 如果不是 null，那么这个值会作为 cdn 前缀追加到需要加载的文件里。
    CDN_PREFIX       = 'https://dn-lmk123.qbox.me/angularjs-requirejs-rjs-md5/cdn/' ,
    paths            = {
        js : [
            REQUIREJS + '/**/*.js'
        ] ,
        cssFiles : [ REQUIREJS + '/**/*.css' ] ,
        htmlFiles : REQUIREJS + '/**/*.html' ,
        imageFiles : REQUIREJS + '/**/*.{png,jpg,gif}' ,
        copyFiles : [ REQUIREJS + '/**/*' , '!' + REQUIREJS + '/**/*.{js,css,html}' , '!' + REQUIREJS + '/build.txt' ]
    } ,

    fs               = require( 'fs' ) ,
    gulp             = require( 'gulp' ) ,
    minifyJS         = require( 'gulp-uglify' ) ,
    minifyCSS        = require( 'gulp-minify-css' ) ,
    minifyHTML       = require( 'gulp-htmlmin' ) ,

    //changed    = require( 'gulp-changed' ) ,
    concat           = require( 'gulp-concat' ) ,
    deleteFile       = require( 'del' ) ,
    indexHtmlContent = fs.readFileSync( SRC + '/index.html' , { encoding : 'utf8' } ) ,
    revall           = new (require( 'gulp-rev-all' ))( {
        dontRenameFile : [ /^\/index\.html$/ ] ,
        transformFilename : function ( file , hash ) {
            return hash + file.path.slice( file.path.lastIndexOf( '.' ) );
        } ,
        transformPath : function ( rev , source , file ) {
            //console.log( rev , source );
            if ( CDN_PREFIX ) {
                // 如果这个文件在 src/index.html 里出现了，或者是 html 文件（即模板文件），就加上 cdn 前缀
                if ( indexHtmlContent.search( '"' + source + '"' ) > 0 || '.html' === source.slice( -5 ) ) {
                    return CDN_PREFIX + rev;
                }
            }
            return rev;
        }
    } );

gulp.task( 'clean' , clean );

gulp.task( 'requirejs' , requirejs ); //第一步： 从 SRC 把文件合并至 REQUIREJS 文件夹

gulp.task( 'prefix' , [ 'requirejs' ] , prefix ); // 第二步：把 REQUIREJS 文件夹下的 require.config() 里面的 baseUrl 替换成 CDN 地址

// 第三步：下面四个操作是并行的，用于将 REQUIREJS 文件夹下的文件精简至 DIST 文件夹
gulp.task( 'js' , [ 'prefix' ] , js );

gulp.task( 'css' , [ 'prefix' ] , css );

gulp.task( 'html' , [ 'prefix' ] , html );

gulp.task( 'copy' , [ 'prefix' ] , copy );

// 第四步：将 DIST 文件夹下的文件打上 md5 签名并输出到 CDN 文件夹
gulp.task( 'default' , [ 'js' , 'css' , 'html' , 'copy' ] , md5 );

function prefix( done ) {
    if ( CDN_PREFIX ) {
        var bootStrapFilePath = REQUIREJS + '/bootstrap.js';

        fs.writeFileSync(
            bootStrapFilePath ,
            fs.readFileSync( bootStrapFilePath , { encoding : 'utf8' } )
                .replace( /baseUrl\s*:\s*('|")\.\/\1/ , 'baseUrl:"' + CDN_PREFIX + '"' )
        );
    }
    done();
}

function clean( cb ) {
    deleteFile( [ DIST , REQUIREJS , CDN ] , cb );
}

function js() {
    return gulp.src( paths.js )
        //.pipe( changed( DIST ) )
        .pipe( minifyJS() )
        .pipe( gulp.dest( DIST ) );
}

function css() {
    return gulp.src( paths.cssFiles )
        //.pipe( changed( DIST ) )
        .pipe( minifyCSS() )
        .pipe( gulp.dest( DIST ) );
}

function html() {
    return gulp.src( paths.htmlFiles , { base : REQUIREJS } )
        //.pipe( changed( DIST ) )
        .pipe( minifyHTML( {
            removeComments : true ,
            collapseWhitespace : true
        } ) )
        .pipe( gulp.dest( DIST ) );
}
function copy() {
    return gulp.src( paths.copyFiles )
        //.pipe( changed( DIST ) )
        .pipe( gulp.dest( DIST ) );
}

function md5() {
    return gulp.src( DIST + '/**' )
        .pipe( revall.revision() )
        .pipe( gulp.dest( CDN ) );
    //.pipe( revall.manifestFile() )
    //.pipe( gulp.dest( CDN ) );
}

function requirejs( done ) {
    var r = require( 'requirejs' );
    r.optimize( {
        appDir : SRC ,
        baseUrl : './' ,
        dir : REQUIREJS ,
        optimize : 'none' ,
        optimizeCss : 'none' ,
        removeCombined : true ,
        mainConfigFile : SRC + '/bootstrap.js' ,
        modules : [
            {
                name : "bootstrap"
            }
        ] ,
        logLevel : 1
    } , function () {
        done();
    } );
}
