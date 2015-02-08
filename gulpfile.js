var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    plumber = require('gulp-plumber'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    jpegRecompress = require('imagemin-jpeg-recompress'),
	uglify= require('gulp-uglify'),
	minifyCSS = require('gulp-minify-css'),
	minifyHTML = require('gulp-minify-html'),
    checkCSS = require( 'gulp-check-unused-css'),
    inlineCss = require('gulp-inline-css'),
    inlinesource = require('gulp-inline-source');


var	dest='build';

//jf script jshint

gulp.task('jshint', function() {
    gulp.src(['**/*.js','!node_modules/**/*.js','!gulpfile.js','!build/**'])
	//.pipe(plumber())
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});


//jf  minify javascript
gulp.task('scripts',function(){
	gulp.src(['**/*.js','!node_modules/**/*.js','!gulpfile.js','!build/**'])
		.pipe(plumber())
        .pipe(uglify())
        .pipe(gulp.dest(dest+'/'));

    gulp.src('views/js/*.js')
        .pipe(plumber())
        .pipe(uglify())
        .pipe(gulp.dest(dest+'/views/js'));

});

gulp.task('html',function(){
	var opts = {comments:true,spare:true};

    gulp.src('*.html')
        .pipe(plumber())
		.pipe(minifyHTML(opts))
        .pipe(gulp.dest(dest+'/'));

    gulp.src('views/*.html')
        .pipe(plumber())
        .pipe(minifyHTML(opts))
        .pipe(gulp.dest(dest+'/views'));

});



gulp.task('css',function(){
	gulp.src('css/*.css')
        .pipe(plumber())
        .pipe(minifyCSS({keepBreaks:true}))
        .pipe(gulp.dest(dest+'/css'));

    gulp.src('views/css/*.css')
        .pipe(plumber())
        .pipe(minifyCSS({keepBreaks:true}))
        .pipe(gulp.dest(dest+'/views/css'))
});

gulp.task('checkcss',function(){
    gulp.src([ 'css/*.css', '*.html' ])
    .pipe(plumber())
    .pipe( checkCSS() );
});

gulp.task('inlinecss', function() {

    var htmlopts = {comments:true,spare:true};


    gulp.src(['**/*.html','!build/**','!node_modules/**'])
        .pipe(inlineCss({
                applyLinkTags: true,
                removeStyleTags: true,
                removeLinkTags: true
        }))
        .pipe(gulp.dest(dest+'/'));
});

gulp.task('inlinesource', function () {
    var options = { compress: false };
    var opts = {comments:true,spare:true};

    return gulp.src(['**/*.html','!build/**','!node_modules/**'])
        .pipe(plumber())
        .pipe(inlinesource(options))
        .pipe(minifyCSS({keepBreaks:true}))  // check the css
        .pipe(minifyHTML(opts))
        .pipe(gulp.dest(dest+'/'));
});



gulp.task('gulp-inline-assets', function () {
    return gulp.src('**/*.css')
        .pipe(inlineAssets())
        .pipe(gulp.dest(dest+'/'));
});


gulp.task('images', function () {

    gulp.src(['**/*.gif','**/*.png','!build/**','!node_modules/**'])
        .pipe(imagemin({
            optimizationLevel: 20,
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest(dest));

    gulp.src(['**/*.jpg','!build/**','!node_modules/**'])
        .pipe(jpegRecompress({ loops: 20 , quality: 'low' })())
        .pipe(gulp.dest(dest));
});

//jf watch files
/*gulp.task('watch',function(){
	gulp.watch('*.html',['html']);
	gulp.watch('js/*.js',['scripts']);
	gulp.watch('css/*.css',['css']);
});
*/
//jf default
gulp.task('default',['jshint','scripts','html','css','images','inlinesource']);

