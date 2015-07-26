var gulp = require('gulp')

var browserify = require('browserify')
var watchify = require('watchify')
var babelify = require('babelify')

var merge = require('utils-merge')

var gutil = require('gulp-util')
var chalk = require('chalk')

function map_error(err) {
  if (err.fileName) {
    // regular error
    gutil.log(chalk.red(err.name)
      + ': '
      + chalk.yellow(err.fileName.replace(__dirname + '/src/js/', ''))
      + ': '
      + 'Line '
      + chalk.magenta(err.lineNumber)
      + ' & '
      + 'Column '
      + chalk.magenta(err.columnNumber || err.column)
      + ': '
      + chalk.blue(err.description))
  } else {
    // browserify error..
    gutil.log(chalk.red(err.name)
      + ': '
      + chalk.yellow(err.message))
  }

  this.end()
}
/* */

gulp.task('watchify', function () {
  var args = merge(watchify.args, { debug: true })
  var bundler = watchify(browserify('./src/app.js', args)).transform(babelify, { /* opts */ })
  bundle_js(bundler)

  bundler.on('update', function () {
    bundle_js(bundler)
  })
})

function bundle_js(bundler) {
  return bundler.bundle()
    .on('error', map_error)
    .pipe(gulp.src('src/app.js'))
    .pipe(gulp.dest('app/dist'));
}

// Without watchify
gulp.task('browserify', function () {
  var bundler = browserify('./src/app.js', { debug: true }).transform(babelify, {/* options */ })

  return bundle_js(bundler)
})
