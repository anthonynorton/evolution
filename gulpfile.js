// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var babel = require("gulp-babel");
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var jsdoc = require("gulp-jsdoc");
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

// Lint Task
gulp.task('lint', function() {
  return gulp.src('src/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Compile Our Sass
gulp.task('sass', function() {
  return gulp.src('scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('css'));
});

gulp.task('document', function () {
  return gulp.src('src/*.js')
    .pipe(jsdoc.parser())
    .pipe(jsdoc.generator('./documentation'));
    // .pipe(gulp.dest(''));
})

// Concatenate & Minify JS
gulp.task('scripts', function() {
  return gulp.src('src/*.js')
    .pipe(babel())
    .pipe(concat('all.js'))
    .pipe(gulp.dest('dist'))
    .pipe(rename('all.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

// Watch Files For Changes
gulp.task('watch', function() {
  gulp.watch('src/*.js', ['lint', 'scripts', 'document']);
  gulp.watch('scss/*.scss', ['sass']);
});

// Default Task
gulp.task('default', ['lint', 'sass', 'scripts', 'document', 'watch']);
