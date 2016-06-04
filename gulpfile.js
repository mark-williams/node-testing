var gulp = require('gulp');
var gutil = require('gulp-util');
var mocha = require('gulp-mocha'); 
var babel = require('babel-core/register');

gulp.task('test', function() {
   return gulp.src('test/**/*.js', {read: false})
        .pipe(mocha({
			reporter: 'list'
		}))
        .on('error', gutil.log); 
});

gulp.task('watch-test', ['test'], function() {
    gulp.watch(['./src/**.js', './test/**/*.spec.js'], ['test']);
});

gulp.task('default', ['test', 'watch-test']);