var gulp = require('gulp');
var less = require('gulp-less');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var cleanCSS = require('gulp-clean-css');
const htmlmin = require('gulp-htmlmin');
var gulpPugBeautify = require('gulp-pug-beautify');
var del = require('del');

var paths = {
  styles: {
    src: 'public/stylesheets/**/*.css',
    dest: 'dist/public/stylesheets/'
  },
  scripts: {
    src: 'routes/**/*.js',
    dest: 'dist/routes/'
  },
  scripts2: {
    src: 'public/javascripts/**/*.js',
    dest: 'dist/public/javascripts/'
  }
};

/* Not all tasks need to use streams, a gulpfile is just another node program
 * and you can use all packages available on npm, but it must return either a
 * Promise, a Stream or take a callback and call it
 */
function clean() {
  // You can use multiple globbing patterns as you would with `gulp.src`,
  // for example if you are using del 2.0 or above, return its promise
  return del([ 'test' ]);
}

/*
 * Define our tasks using plain functions
 */
function styles() {
  return gulp.src(paths.styles.src)
    .pipe(cleanCSS({compatibility: 'ie8'}))
    // pass in options to the stream
    // .pipe(rename({
    //   basename: 'main',
    //   suffix: '.min'
    // }))
    .pipe(gulp.dest(paths.styles.dest));
}

function scripts() {
  return gulp.src(paths.scripts.src, { sourcemaps: true })
    .pipe(babel())
    .pipe(uglify())
    //.pipe(concat('template-build.js'))
    .pipe(gulp.dest(paths.scripts.dest));
}

function scripts2() {
  return gulp.src(paths.scripts2.src, { sourcemaps: true })
    .pipe(babel())
    .pipe(uglify())
    //.pipe(concat('template-build.js'))
    .pipe(gulp.dest(paths.scripts2.dest));
}

function html() {
  return gulp.src('views/**/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist/views/'));
}

function pug() {
  return gulp.src('views/**/*.pug')
    //.pipe(gulpPugBeautify({ omit_empty: true }))
    .pipe(gulp.dest('dist/views/'));
}

function watch() {
  gulp.watch(paths.scripts.src, scripts);
  gulp.watch(paths.scripts2.src, scripts2);
  gulp.watch(paths.styles.src, styles);
  gulp.watch('views/**/*.html', html);
  gulp.watch('views/**/*.pug', pug);
}

/*
 * You can use CommonJS `exports` module notation to declare tasks
 */
exports.clean = clean;
exports.styles = styles;
exports.scripts = scripts;
exports.scripts2 = scripts2;
exports.html = html;
exports.pug = pug;
exports.watch = watch;

/*
 * Specify if tasks run in series or parallel using `gulp.series` and `gulp.parallel`
 */
var build = gulp.series(clean, gulp.parallel(styles, scripts, scripts2, html, pug));

/*
 * You can still use `gulp.task` to expose tasks
 */
gulp.task('build', build);

/*
 * Define default task that can be called by just running `gulp` from cli
 */
gulp.task('default', build);

// var watcher = gulp.watch('/public/javascripts/*.js', ['uglify','reload']);

// watcher.on('change', function(event) {
//   console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
// });