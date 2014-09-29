// gulp
var gulp = require('gulp');

// plugins
var connect = require('gulp-connect');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var rimraf = require('gulp-rimraf')

gulp.task('connect', function () {
  connect.server({
    root: 'app/',
    port: 8000
  });
});

gulp.task('connectDist', function () {
  connect.server({
    root: 'dist/',
    port: 8000
  });
});

// tasks
gulp.task('lint', function() {
  gulp.src(['./app/**/*.js', '!./app/bower_components/**'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('browserify', function() {
  gulp.src(['app/scripts/main.js'])
  .pipe(browserify({
    insertGlobals: true,
    debug: true
  }))
  .pipe(concat('bundled.js'))
  .pipe(gulp.dest('./dist/scripts'))
});

gulp.task('minify-css', function() {
  var opts = {comments:true,spare:true};
  gulp.src(['./app/**/*.css', '!./app/bower_components/**'])
    .pipe(minifyCSS(opts))
    .pipe(gulp.dest('./dist/'))
});

gulp.task('minify-js', function() {
  gulp.src(['./app/**/*.js', '!./app/bower_components/**'])
    .pipe(uglify({
      // inSourceMap:
      // outSourceMap: "app.js.map"
    }))
    .pipe(gulp.dest('./dist/'))
});

gulp.task('clean', function() {
  return gulp.src('./dist/**', { read: false })
    .pipe(rimraf({ force: true }));
});

gulp.task('copy-bower-components', function () {
  gulp.src('./app/bower_components/**')
    .pipe(gulp.dest('dist/bower_components'));
});

gulp.task('copy-html-files', function () {
  gulp.src('./app/**/*.html')
    .pipe(gulp.dest('dist/'));
});

gulp.task('copy-image-files', function () {
  gulp.src('./app/images/**')
    .pipe(gulp.dest('dist/'));
});


// default task
gulp.task('default',
  ['lint', 'connect']
);

// build task
gulp.task('build',
  ['browserify','lint','minify-css', 'minify-js', 'copy-html-files', 'copy-image-files', 'copy-bower-components', 'connectDist']
);
