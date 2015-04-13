var gulp        = require( 'gulp' ) ,
    minifyJS    = require( 'gulp-uglify' ) ,
    minifyCSS   = require( 'gulp-minify-css' ) ,
    minifyHTML  = require( 'gulp-htmlmin' ) ,
    revall      = require( 'gulp-rev-all' ) ,
    changed     = require( 'gulp-changed' ) ,
    concat      = require( 'gulp-concat' ) ,
    deleteFile  = require( 'del' ) ,

    SRC         = 'www' ,
    DIST        = 'build' ,

    paths       = {

        js : [
            SRC + '/**/*.js'
        ] ,

        cssFiles : [ SRC + '/**/*.css' ] ,

        htmlFiles : SRC + '/**/*.html' ,

        imageFiles : SRC + '/**/*.{png,jpg,gif}' ,

        copyFiles : [ SRC + '/**/*' , '!' + SRC + '/**/*.{js,css,html}' ]
    };

function clean( cb ) {
    deleteFile( DIST , cb );
}

function js() {
    return gulp.src( paths.js )
        .pipe( changed( DIST ) )
        .pipe( minifyJS() )
        .pipe( gulp.dest( DIST ) );
}

function css() {
    return gulp.src( paths.cssFiles )
        .pipe( changed( DIST ) )
        .pipe( minifyCSS() )
        .pipe( gulp.dest( DIST ) );
}

function html() {
    return gulp.src( paths.htmlFiles , { base : SRC } )
        .pipe( changed( DIST ) )
        .pipe( minifyHTML( {
            removeComments : true ,
            collapseWhitespace : true
        } ) )
        .pipe( gulp.dest( DIST ) );
}
function copy() {
    return gulp.src( paths.copyFiles )
        .pipe( changed( DIST ) )
        .pipe( gulp.dest( DIST ) );
}

/**
 * 重要的方法：给所有文件的文件名加上 md5 并更新引用
 */
function md5() {
    return gulp.src( DIST + '/**' )
        .pipe( revall( {
            base : DIST + '/common'
        } ) )
        .pipe( gulp.dest( 'cdn' ) )
        .pipe( revall.manifest() )
        .pipe( gulp.dest( 'cdn' ) );
}

gulp.task( 'md5' , md5 );

gulp.task( 'clean' , clean );

gulp.task( 'js' , js );

gulp.task( 'css' , css );

gulp.task( 'html' , html );

gulp.task( 'copy' , copy );

gulp.task( 'default' , [ 'js' , 'css' , 'html' , 'copy' ] , function ( cb ) {
    cb();
} );
