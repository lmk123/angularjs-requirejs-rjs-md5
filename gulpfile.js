var gulp       = require( 'gulp' ) ,
    minifyJS   = require( 'gulp-uglify' ) ,
    minifyCSS  = require( 'gulp-minify-css' ) ,
    minifyHTML = require( 'gulp-htmlmin' ) ,
    //Revall     = require( 'gulp-rev-all' ) ,
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
    CDN        = 'cdn' ,

    paths      = {

        js : [
            SRC + '/**/*.js'
        ] ,

        cssFiles : [ SRC + '/**/*.css' ] ,

        htmlFiles : SRC + '/**/*.html' ,

        imageFiles : SRC + '/**/*.{png,jpg,gif}' ,

        copyFiles : [ SRC + '/**/*' , '!' + SRC + '/**/*.{js,css,html}' ]
    };

function clean( cb ) {
    deleteFile( [ DIST , CDN ] , cb );
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

function md5() {
    return gulp.src( DIST + '/**' )
        .pipe( revall.revision() )
        .pipe( gulp.dest( CDN ) )
        .pipe( revall.manifestFile() )
        .pipe( gulp.dest( CDN ) );
}

gulp.task( 'md5' , md5 );

gulp.task( 'clean' , clean );

gulp.task( 'js' , [ 'clean' ] , js );

gulp.task( 'css' , [ 'clean' ] , css );

gulp.task( 'html' , [ 'clean' ] , html );

gulp.task( 'copy' , [ 'clean' ] , copy );

gulp.task( 'default' , [ 'js' , 'css' , 'html' , 'copy' ] , md5 );
