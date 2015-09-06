var gulp = require('gulp');var concat = require('gulp-concat');var uglify = require('gulp-uglify');var less = require('gulp-less');var del = require('del');var htmlmin = require('gulp-htmlmin');var merge = require('merge-stream');var nodemon = require('gulp-nodemon');var cssmin = require('gulp-cssmin');var rename = require('gulp-rename');var libScripts = [    "www/static/bower_components/jquery/dist/jquery.js",    "www/static/bower_components/bootstrap/dist/js/bootstrap.js",    "www/static/bower_components/angular/angular.js",    "www/static/bower_components/google-code-prettify/src/prettify.js"];var paths = {    scripts: libScripts.concat(['www/static/js/*.js']),    less   : ['www/static/css/*.less']};// Not all tasks need to use streams// A gulpfile is just another node program and you can use any package available on npmgulp.task('clean', function (cb) {    // You can use multiple globbing patterns as you would with `gulp.src`    del(['www/static/dist'], cb);});gulp.task('scripts:dev', function () {    return gulp.src(paths.scripts)        .pipe(concat('lc-request.js'))        .pipe(gulp.dest('./www/static/dist'));});gulp.task('scripts:build', function (result) {    return gulp.src(paths.scripts)        .pipe(concat('lc-request.min.js'))        .pipe(uglify())        .pipe(gulp.dest('./www/static/dist'));});// Copy all static imagesgulp.task('lessc:dev', function () {    return gulp.src('./www/static/css/main.less')        .pipe(less())        .pipe(gulp.dest('./www/static/dist'));});gulp.task('lessc:build', function () {    return gulp.src('./www/static/css/main.less')        .pipe(less())        .pipe(cssmin())        .pipe(rename({suffix: '.min'}))        .pipe(gulp.dest('./www/static/dist'));});gulp.task('start', function () {    nodemon({        script: 'app.js',        ext   : 'js',        watch : "server",        env   : {            'NODE_ENV': 'development'            //'DEBUG': 'http express:*'        }    })});// Rerun the task when a file changesgulp.task('watch', function () {    gulp.watch(paths.scripts, ['scripts:dev']);    gulp.watch(paths.less, ['lessc:dev']);});// The default task (called when you run `gulp` from cli)gulp.task('default', ['watch', 'scripts:dev', 'lessc:dev', 'start']);gulp.task('build', ['scripts:build', 'lessc:build']);