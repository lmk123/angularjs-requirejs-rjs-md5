var gulp       = require( 'gulp' ) ,
    minifyJS   = require( 'gulp-uglify' ) ,
    minifyCSS  = require( 'gulp-minify-css' ) ,
    minifyHTML = require( 'gulp-htmlmin' ) ,
    revall     = new (require( 'gulp-rev-all' ))( {
        dontRenameFile : [ /^\/index\.html$/ ] ,
        transformFilename : function ( file , hash ) {
            return hash + file.path.slice( file.path.lastIndexOf( '.' ) );
        }
    } ) ,
    changed    = require( 'gulp-changed' ) ,
    concat     = require( 'gulp-concat' ) ,
    deleteFile = require( 'del' ) ,

    SRC        = 'app' ,
    DIST       = 'build' ,
    REQUIREJS  = 'build-requirejs' ,
    CDN        = 'cdn' ,

    paths      = {

        js : [
            REQUIREJS + '/**/*.js'
        ] ,

        cssFiles : [ REQUIREJS + '/**/*.css' ] ,

        htmlFiles : REQUIREJS + '/**/*.html' ,

        imageFiles : REQUIREJS + '/**/*.{png,jpg,gif}' ,

        copyFiles : [ REQUIREJS + '/**/*' , '!' + REQUIREJS + '/**/*.{js,css,html}' , '!' + REQUIREJS + '/build.txt' ]
    };

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
    //requirejs( function () {
    md5().on( 'finish' , done );
    //} );
} );
