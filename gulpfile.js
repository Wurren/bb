var gulp           = require('gulp'),
    less           = require('gulp-less'),
    cssmin         = require('gulp-minify-css'),
    notify         = require('gulp-notify'),
    uglify         = require('gulp-uglify'),
    concat         = require('gulp-concat'),
    rename         = require('gulp-rename'),
    plumber        = require('gulp-plumber'),
    webserver      = require('gulp-webserver'),
    babel          = require("gulp-babel"),
    browserify     = require('browserify'),
    babelify       = require('babelify'),
    source         = require('vinyl-source-stream'),
    buffer         = require('vinyl-buffer'),
    hbsfy          = require('hbsfy');



/*
|--------------------------------------------------------------------------
| Error Catching
|--------------------------------------------------------------------------
*/

var onError = (err) => {
    console.log(err);
    this.emit('end');
};


/*
|--------------------------------------------------------------------------
| Compile Less
|--------------------------------------------------------------------------
*/

gulp.task('less', () => {
    return gulp.src('less/style.less')
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(less())
        .pipe(cssmin())
        .pipe(gulp.dest('css'))
        .pipe(notify({ message: 'Less - Done!'}));
});


/*
|--------------------------------------------------------------------------
| Compile Javascript
|--------------------------------------------------------------------------
*/

gulp.task("babel", () => {
    return browserify({ debug: true })
        .transform(babelify)
        .transform(hbsfy)
        .require('./app/src/app.js', { entry: true })
        .bundle()
        .on('error', onError)
        .pipe(source('main.min.js'))
        .pipe(buffer())
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('app'))
        .pipe(notify({ message: 'Babel - Done!'}));
});


/*
|--------------------------------------------------------------------------
| Watch Task
|--------------------------------------------------------------------------
*/

gulp.task('watch', () => {
    gulp.watch('less/*.less', ['less']);
    gulp.watch('app/src/**/*.js', ['babel']);
    gulp.watch('app/src/**/*.hbs', ['babel']);
});


/*
|--------------------------------------------------------------------------
| Server
|--------------------------------------------------------------------------
*/

gulp.task('webserver', () => {
    return gulp.src('.')
        .pipe(webserver({
            livereload: true,
            directoryListing: false,
            open: true
        }));
});


/*
|--------------------------------------------------------------------------
| Register Tasks
|--------------------------------------------------------------------------
*/

gulp.task('run', ['webserver','watch']);
