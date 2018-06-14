/**
 * Requirements
 */
var gulp = require('gulp'),
	sass = require('gulp-sass'),
	postcss = require('gulp-postcss'),
	autoprefixer = require('autoprefixer'),
	easinggradient = require('postcss-easing-gradients'),
	fontmagician = require('postcss-font-magician'),
	fontresponsive = require('postcss-responsive-type'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	babel = require('gulp-babel'),
	sourcemaps = require('gulp-sourcemaps'),
	imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant'),
	htmlmin = require('gulp-htmlmin');

/**
 * Sass and PostCSS - Required by "gulp" and "gulp dist"
 */
// PostCSS Variables
var processors = [
	autoprefixer({
		browsers: ['defaults', 'last 2 iOS major versions']
	}),
	easinggradient,
	fontmagician,
	fontresponsive
];
// Dev Version - Required by "gulp"
gulp.task('sassdev', function () {
	return gulp.src('src/sass/**/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass({
			outputStyle: 'expanded'
		}).on('error', sass.logError))
		.pipe(postcss(processors))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('dist/css'))
});
// Dist Version - Required by "gulp dist"
// Compressed version without sourcemap
gulp.task('sassprod', function () {
	return gulp.src('src/sass/**/*.scss')
		.pipe(sass({
			outputStyle: 'compressed'
		}).on('error', sass.logError))
		.pipe(postcss(processors))
		.pipe(gulp.dest('dist/css'))
});

/**
 * JavaScripts - Required by "gulp"
 */
// Dev Version - Required by "gulp"
gulp.task('scripts', function () {
	gulp.src('src/js/**/*.js')
		.pipe(sourcemaps.init())
		.pipe(babel())
		.pipe(concat('all.js'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('dist/js'))
});
// Dist Version - Required by "gulp dist"
// Compressed version without sourcemap
gulp.task('scripts-dist', function () {
	gulp.src('src/js/**/*.js')
		.pipe(babel())
		.pipe(concat('all.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'))
});

/**
 * HTML Copy - Required by "gulp"
 */
gulp.task('copy-html', function () {
	gulp.src('src/*.html')
		.pipe(gulp.dest('dist/'))
});

/**
 * Img Copy - Required by "gulp"
 */
gulp.task('copy-img', function () {
	gulp.src('src/img/**/*')
		.pipe(gulp.dest('dist/img'))
});

/**
 * Watch Task - Required by "gulp"
 */
gulp.task('watch', function () {
	gulp.watch('src/*.html', ['copy-html'])
	gulp.watch('src/img/**/*', ['copy-img'])
	gulp.watch('src/sass/**/*.scss', ['sassdev'])
	gulp.watch('src/js/**/*.js', ['scripts'])
});

/**
 * Default Task - "gulp"
 */
gulp.task('default', [
	'copy-html',
	'copy-img',
	'sassdev',
	'scripts',
	'watch'
]);

/**
 * HTML Minify - Required by "gulp dist"
 */
gulp.task('minify', function () {
	return gulp.src('src/*.html')
		.pipe(htmlmin({
			collapseWhitespace: true
		}))
		.pipe(gulp.dest('dist'))
});

/**
 * Image Compress Task - Required by "gulp dist"
 */
gulp.task('imagecomp', function () {
	return gulp.src('src/img/**/*')
		.pipe(imagemin({
			progressive: true,
			use: [pngquant()]
		}))
		.pipe(gulp.dest('dist/img'))
});

/**
 * Dist Task - "gulp dist"
 */
gulp.task('dist', [
	'minify',
	'imagecomp',
	'sassprod',
	'scripts-dist'	
]);