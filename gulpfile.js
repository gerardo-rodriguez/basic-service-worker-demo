'use strict';

var gulp = require('gulp'),
  babel = require('gulp-babel'),
  connect = require('gulp-connect');

gulp.task('html', function() {
  gulp.src('./src/**/*.html')
    .pipe(gulp.dest('./dist'));
});

gulp.task('js', function() {
  return gulp.src('./src/**/*.js')
    .pipe(babel())
    // .pipe(connect.reload())
    .pipe(gulp.dest('./dist'));
});

gulp.task('img', function() {
  return gulp.src('./src/img/*')
    .pipe(gulp.dest('./dist/img'));
});

gulp.task('css', function() {
  return gulp.src('./src/**/*.css')
    .pipe(gulp.dest('./dist'));
});

gulp.task('connect', function() {
  connect.server({
    root: './dist',
    livereload: false
  });
});

gulp.task('watch', function() {
  gulp.watch(['./src/*.html'], ['html']);
  gulp.watch(['./src/js/*.js'], ['js']);
  gulp.watch(['./src/css/*.css'], ['css']);
});

gulp.task('build', ['html', 'js', 'img', 'css']);

gulp.task('default', [
  'build',
  'connect',
  'watch'
]);
