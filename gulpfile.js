var	gulp = require('gulp');
var jshint = require('gulp-jshint');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var pump = require('pump');
var postcss      = require('gulp-postcss');
var sourcemaps   = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var browserSync = require('browser-sync').create();


gulp.task('default', ['watch'], function(){
	browserSync.init({
		server: {
			baseDir: "./"
		}
	});
});

gulp.task('jshint', function() {
	return gulp.src('./sources/js/*.js')
	.pipe(jshint())
	.pipe(jshint.reporter('jshint-stylish'));
});
gulp.task('sass', function () {
	return gulp.src('./sources/sass/**/*.scss')
	.pipe(sourcemaps.init())
	.pipe(sass().on('error', sass.logError))
	.pipe(sourcemaps.write())
	.pipe(autoprefixer({
		browsers: ['last 2 versions'],
		cascade: false
	}))
	.pipe(concat('styles.css'))
	.pipe(gulp.dest('./assets/css/dist/'))
	.pipe(cleanCSS({compatibility: 'ie8'}))
	.pipe(gulp.dest('./assets/css'))
	.pipe(browserSync.stream());;
});

gulp.task('compress', function (cb) {
	pump([
		gulp.src('./sources/js/*.js'),
		gulp.dest('./assets/js/dist/'),
		concat('scripts.js'),
		uglify({mangle:true}),
		rename({
			suffix:'.min',
			extname:'.js'
		}),
		gulp.dest('./assets/js/'),
		browserSync.stream()
	],cb);
});

gulp.task('watch', function() {
	gulp.watch('./sources/js/*.js', ['jshint']),
	gulp.watch('./sources/sass/*.scss',['sass']),
	gulp.watch('./sources/js/*.js', ['compress']);
	gulp.watch("*.html").on("change", browserSync.reload);
});
