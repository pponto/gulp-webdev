///////////////////////////////////////////////////
// Required
///////////////////////////////////////////////////
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
	htmlmin = require('gulp-htmlmin')

///////////////////////////////////////////////////
// Styles
///////////////////////////////////////////////////
var processors = [
	autoprefixer({
		browsers: ['defaults', 'last 2 iOS major versions']
	}),
	easinggradient,
	fontmagician,
	fontresponsive
]

gulp.task('sassdev', function () {
	return gulp.src('source/sass/**/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass({
			outputStyle: 'expanded'
		}).on('error', sass.logError))
		.pipe(postcss(processors))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('dist/css'))
})

gulp.task('sassprod', function () {
	return gulp.src('source/sass/**/*.scss')
		.pipe(sass({
			outputStyle: 'compressed'
		}).on('error', sass.logError))
		.pipe(postcss(processors))
		.pipe(gulp.dest('dist/css'))
})

///////////////////////////////////////////////////
// Scripts
///////////////////////////////////////////////////
gulp.task('scripts', function () {
	gulp.src('source/js/**/*.js')
		.pipe(sourcemaps.init())
		.pipe(babel())
		.pipe(concat('all.js'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('dist/js'))
})

gulp.task('scripts-dist', function () {
	gulp.src('source/js/**/*.js')
		.pipe(babel())
		.pipe(concat('all.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'))
})

///////////////////////////////////////////////////
// Copy-HTML
///////////////////////////////////////////////////
gulp.task('copy-html', function () {
	gulp.src('source/*.html')
		.pipe(gulp.dest('dist/'))
})

///////////////////////////////////////////////////
// HTML-Minify
///////////////////////////////////////////////////
gulp.task('minify', function () {
	return gulp.src('source/*.html')
		.pipe(htmlmin({
			collapseWhitespace: true
		}))
		.pipe(gulp.dest('dist'))
})

///////////////////////////////////////////////////
// Copy-IMG
///////////////////////////////////////////////////
gulp.task('copy-img', function () {
	gulp.src('source/img/**/*')
		.pipe(gulp.dest('dist/img'))
})

///////////////////////////////////////////////////
// Image-Min
///////////////////////////////////////////////////
gulp.task('imgrsz', function () {
	return gulp.src('source/img/**/*')
		.pipe(imagemin({
			progressive: true,
			use: [pngquant()]
		}))
		.pipe(gulp.dest('dist/img'))
})

///////////////////////////////////////////////////
// Dist
///////////////////////////////////////////////////
gulp.task('dist', [
	'minify',
	'sassprod',
	'scripts-dist',
	'imgrsz'
])

///////////////////////////////////////////////////
// Watch
///////////////////////////////////////////////////
gulp.task('watch', function () {
	gulp.watch('source/*.html', ['copy-html'])
	gulp.watch('source/img/**/*', ['copy-img'])
	gulp.watch('source/sass/**/*.scss', ['sassdev'])
	gulp.watch('source/js/**/*.js', ['scripts'])
})

///////////////////////////////////////////////////
// Default
///////////////////////////////////////////////////
gulp.task('default', ['copy-html', 'copy-img', 'sassdev', 'scripts', 'watch'])