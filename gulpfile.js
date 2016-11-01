var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var babelify = require('babelify');
var browserSync = require('browser-sync');
var cp = require('child_process');

// TODO: set up minification and sourcemaps for production only builds

gulp.task('jekyll-build', function(done) {
  return cp.spawn('jekyll', ['build'], {
    stdio: 'inherit'
  }).on('close', done);
});

gulp.task('jekyll-rebuild', ['jekyll-build'], function() {
  browserSync.reload();
});

gulp.task('browser-sync', function() {
  browserSync({
    open: false,
    server: {
      baseDir: '_site',
    }
  });
});

gulp.task('scripts', function() {
  var b = browserify({
    entries: './_js/main.js',
    debug: true,
    transform: [[babelify, { presets: ['es2015']}]]
  });

  return b.bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify())
    .on('error', gutil.log)
    .pipe(sourcemaps.write('./'))
    .pipe(browserSync.reload({stream:true}))
    .pipe(gulp.dest('./_site/js'));
});

gulp.task('styles', function() {
  return gulp.src('_scss/main.scss')
    .pipe(sass({
      includePaths: ['scss'],
      onError: browserSync.notify
    }))
    .pipe(autoprefixer(['last 2 versions'], { cascade: true }))
    .pipe(gulp.dest('_site/css'))
    .pipe(browserSync.reload({stream:true}))
    .pipe(gulp.dest('./css'));
});

gulp.task('watch', function() {
  gulp.watch('_js/*.js', ['scripts']);
  gulp.watch('_scss/*.scss', ['styles']);
  gulp.watch(['*.html', '_layouts/*.html', '_posts/*', '_data/*', '_includes/*.html'], ['jekyll-rebuild']);
});

gulp.task('build', ['jekyll-build', 'scripts', 'styles']);

gulp.task('default', ['build', 'browser-sync', 'watch']);
