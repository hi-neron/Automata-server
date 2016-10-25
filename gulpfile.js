var gulp = require('gulp')
var browserSync = require('browser-sync').create()
var sass = require('gulp-sass')
var babel = require('gulp-babel')
var browserify = require('gulp-browserify')
var newer = require('gulp-newer')
// Static server

gulp.task('server', function () {
  browserSync.init({
    proxy: 'localhost:9050'
  })
  gulp.watch('src/*.html', ['html'])
  gulp.watch('src/scss/**/*.scss', ['sass'])
  gulp.watch('src/**/*.js', ['babel'])
  gulp.watch('src/img/*', ['images'])
})

gulp.task('html', function () {
  return gulp.src('./src/*.html')
    .pipe(gulp.dest('./public'))
    .pipe(browserSync.stream())
})

gulp.task('images', function () {
  return gulp.src('./src/img/*.*')
    .pipe(newer('./public/img'))
    .pipe(gulp.dest('./public/img'))
    .pipe(browserSync.stream())
})

gulp.task('babel', function () {
  return gulp.src('./src/*.js')
    .pipe(babel({
      presets: ['es2015'],
      plugins: ['syntax-async-functions', 'transform-regenerator']
    }))
    .pipe(browserify())
    .pipe(gulp.dest('./public'))
    .pipe(browserSync.stream())
})

gulp.task('sass', function () {
  return gulp.src('./src/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/css'))
    .pipe(browserSync.stream())
})

gulp.task('default', ['server', 'sass', 'babel', 'html', 'images'])
