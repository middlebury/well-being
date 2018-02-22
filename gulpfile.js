var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var babelify = require('babelify');
var ghPages = require('gulp-gh-pages');
var browserSync = require('browser-sync');
var cp = require('child_process');
var beeper = require('beeper');
var args = require('yargs').argv;

// TODO: set up minification and sourcemaps for production only builds

const production = !!args.production;

const jekyllOpts = ['build'];

if(!production) {
  jekyllOpts.push('--baseurl', '');
}

gulp.task('jekyll-build', function(done) {
  return cp.spawn('jekyll', jekyllOpts, {
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
    .on('error', function(err) {
      console.error(err.message);
      beeper();
      this.emit("end");
    })
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./_site/js'))
    .pipe(browserSync.stream())
    .pipe(gulp.dest('./js'));
});

// TODO: get styles to beep on sass error
gulp.task('styles', function() {
  return gulp.src('_scss/main.scss')
    .pipe(sass({
      includePaths: ['scss'],
      onError: browserSync.notify
    })).on('error', sass.logError)
    .pipe(autoprefixer(['> 2%', 'last 2 versions']))
    .pipe(gulp.dest('_site/css'))
    .pipe(browserSync.stream())
    .pipe(gulp.dest('./css'));
});

gulp.task('watch', function() {
  gulp.watch('_js/**/*.js', ['scripts']);
  gulp.watch('_scss/*.scss', ['styles']);
  gulp.watch(['*.html', '_layouts/*.html', '_posts/*', '_data/*', '_includes/*.html'], ['jekyll-rebuild']);
});

gulp.task('build', ['jekyll-build', 'scripts', 'styles']);

gulp.task('deploy', function() {
  return gulp.src('./_site/**/*')
    .pipe(ghPages({
      branch: 'site'
    }));
});

gulp.task('default', ['build', 'browser-sync', 'watch']);
