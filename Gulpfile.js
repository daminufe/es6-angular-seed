'use strict';

var gulp = require('gulp'),
    babel = require('gulp-babel'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    cleanCSS = require('gulp-clean-css'),
    webserver = require('gulp-webserver'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    sourcemaps  = require('gulp-sourcemaps'),
    buffer      = require('vinyl-buffer'),
    argv = require('yargs').argv,
    gulpif = require('gulp-if'),
    importCss = require('gulp-import-css'),
    ngAnnotate = require('gulp-ng-annotate');

gulp.task('js:watch', function () {
    gulp.watch('app/**/*.js', ['js']);
});

gulp.task('js', function() {
    return browserify('./app/app.bootstrap.js')
        .transform("babelify", { presets: ["es2015"] })
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init())
        //.pipe(gulpif(argv.production, ngAnnotate()))
        //.pipe(gulpif(argv.production, uglify()))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./build'));
})

gulp.task('sass', function () {
    return gulp.src('app/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({includePaths: ['./node_modules']}).on('error', sass.logError))
        .pipe(importCss())
        .pipe(gulpif(argv.production, cleanCSS()))
        .pipe(concat('bundle.css'))

        .pipe(gulp.dest('build'));
});

gulp.task('sass:watch', function () {
    gulp.watch('app/**/*.scss', ['sass']);
});

gulp.task('html:watch', function () {
    gulp.watch('app/**/*.html', function () {
        return gulp.src(['app/**/*.html'])
            .pipe(gulp.dest('build'))
    });
});

gulp.task('watch', ['sass:watch', 'js:watch', 'html:watch']);

gulp.task('fonts', function() {
  return gulp.src('node_modules/font-awesome/fonts/*')
    .pipe(gulp.dest('build/fonts'));
})

gulp.task('build', ['js', 'sass', 'fonts'], function () {
    return gulp.src(['app/**/*.html'])
        .pipe(gulp.dest('build'));
});

gulp.task('serve', ['build', 'watch'], function () {
    gulp.src('build')
        .pipe(webserver({
            open: true,
            host: process.env.HOST || 'localhost',
            port: 8000,
            livereload: true,
            fallback: 'index.html'
        }));
});
