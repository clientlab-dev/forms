var gulp = require('gulp'),
	sass = require('gulp-sass'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	cleanCSS = require('gulp-clean-css'),
	rename = require('gulp-rename'),
	autoprefixer = require('gulp-autoprefixer'),
	browserSync = require('browser-sync'),
	jsImport = require('gulp-js-import'),
	htmlToJs = require('gulp-html-to-js'),
	fileinclude = require('gulp-file-include');

var reload = browserSync.reload;

gulp.task('browserSync', function () {
	browserSync.init({
		proxy: "http://renault-promo:8888/",
		files: ["**/*.php"]
	});
});

gulp.task('sass', function () {
	return gulp.src('assets/scss/**/*.scss')
		.pipe(sass()).on('error', sass.logError)
		.pipe(rename({
			suffix: '.min',
			prefix: ''
		}))
		.pipe(autoprefixer(['last 15 versions']))
		.pipe(cleanCSS())
		.pipe(gulp.dest('css'))
		.pipe(reload({
			stream: true
		}));
});

gulp.task('headersass', function () {

	return gulp.src('assets/scss/header.scss')
		.pipe(sass()).on('error', sass.logError)
		.pipe(rename({
			suffix: '.min',
			prefix: ''
		}))
		.pipe(autoprefixer(['last 15 versions']))
		.pipe(cleanCSS())
		.pipe(gulp.dest('css'))
		.pipe(reload({
			stream: true
		}));
});

gulp.task('views:compile', function () {
	return gulp.src('assets/js/templates/**/*')
		.pipe(htmlToJs({
			prefix: 'templates',
			global: 'window.templates',
			concat: 'templates.js'
		}))
		.pipe(gulp.dest('assets/js/'));
});

gulp.task('js', function () {
	return gulp.src([

			'assets/js/jquery.arcticmodal-0.3.min.js',
			'assets/js/vue.js',
			'assets/js/templates.js',
			'assets/js/main.js'
		])
		//.pipe(uglify())
		.pipe(jsImport({
			hideConsole: false
		}))
		.pipe(concat('main.min.js'))
		//.pipe(uglify())
		.pipe(gulp.dest('js'))
		.pipe(reload({
			stream: true
		}));
});



gulp.task('watch', ['sass', 'js', 'browserSync'], function () {
	gulp.watch('assets/scss/header.scss', ['headersass']);
	gulp.watch('assets/scss/**/*.scss', ['sass']);
	gulp.watch('assets/js/templates/**/*', ['views:compile']);
	gulp.watch('assets/js/**/*.js', ['js']);
});

gulp.task('default', ['watch']);