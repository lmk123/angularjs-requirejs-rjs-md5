var SRC           = 'app' ,
    DIST          = 'build' ,
    REQUIREJS     = 'build-requirejs' ,
    CDN           = 'cdn' ,

    // 如果不是 null，那么这个值会作为 cdn 前缀追加到需要加载的文件里。
    // 这里作为示例使用了 https 的链接
    CDN_PREFIX    = 'https://lmk123.github.io/angularjs-requirejs-rjs-md5/cdn/' ,
    paths         = {
        js : [
            REQUIREJS + '/**/*.js'
        ] ,
        cssFiles : [ REQUIREJS + '/**/*.css' ] ,
        htmlFiles : REQUIREJS + '/**/*.html' ,
        imageFiles : REQUIREJS + '/**/*.{png,jpg,gif}' ,
        copyFiles : [ REQUIREJS + '/**/*' , '!' + REQUIREJS + '/**/*.{js,css,html}' , '!' + REQUIREJS + '/build.txt' ]
    } ,

    fs            = require( 'fs' ) ,
    gulp          = require( 'gulp' ) ,
    minifyJS      = require( 'gulp-uglify' ) ,
    minifyCSS     = require( 'gulp-minify-css' ) ,
    minifyHTML    = require( 'gulp-htmlmin' ) ,

    //changed    = require( 'gulp-changed' ) ,
    concat        = require( 'gulp-concat' ) ,
    deleteFile    = require( 'del' ) ,

    revAllOptions = {
        dontRenameFile : [ /^\/index\.html$/ ] ,
        transformFilename : function ( file , hash ) {
            return hash + file.path.slice( file.path.lastIndexOf( '.' ) );
        }
    };

if ( CDN_PREFIX ) {
    var indexHtmlContent = fs.readFileSync( SRC + '/index.html' , { encoding : 'utf8' } ) ,
        dataMain         = 'data-main=' ,
        dataMainLength   = dataMain.length;

    revAllOptions.transformPath = function ( rev , source , file ) {
        var index = indexHtmlContent.search( '"' + source + '"' );
        //console.log( rev , source );
        // 如果这个文件在 src/index.html 里出现了，就加上 cdn 前缀
        if ( index > 0 && indexHtmlContent.slice( index - dataMainLength , index ) !== dataMain ) {
            return CDN_PREFIX + rev;
        }
        return rev;
    };
}

var revall = new (require( 'gulp-rev-all' ))( revAllOptions );

function addCdnPrefix( done ) {
    if ( CDN_PREFIX ) {
        var bootStrapFilePath = DIST + '/bootstrap.js';

        // var _CDN_PREFIX_ = './';
        fs.writeFileSync(
            bootStrapFilePath ,
            fs.readFileSync( bootStrapFilePath , { encoding : 'utf8' } )
                .replace( /var\s+_CDN_PREFIX_\s*=\s*('|")\.\/\1/ , 'var _CDN_PREFIX_ ="' + CDN_PREFIX + '"' )
                .replace( /baseUrl\s*:\s*('|")\.\/\1/ , 'baseUrl:"' + CDN_PREFIX + '"' ) // require.config 里面的 baseUrl 不能直接写成上面的变量，所以得单独替换
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

gulp.task( 'requirejs' , requirejs );

gulp.task( 'md5' , [ 'requirejs' ] , md5 );

gulp.task( 'clean' , clean );

gulp.task( 'js' , [ 'requirejs' ] , js );

gulp.task( 'css' , [ 'requirejs' ] , css );

gulp.task( 'html' , [ 'requirejs' ] , html );

gulp.task( 'copy' , [ 'requirejs' ] , copy );

gulp.task( 'default' , [ 'js' , 'css' , 'html' , 'copy' ] , function ( done ) {
    addCdnPrefix( function () {
        md5().on( 'finish' , done );
    } );
} );
