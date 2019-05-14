var gulp = require('gulp'),
sass = require('gulp-sass'),
autoprefixer = require('gulp-autoprefixer'),
cleanCSS = require('gulp-clean-css'),
uglify = require('gulp-uglify'),
del = require('del'),
browserSync = require('browser-sync').create(),
image = require('gulp-imagemin');
//sass
function sassCompile(){
	return gulp.src('dist/sass/*.+(sass|scss)')
	.pipe(sass())
	.pipe(autoprefixer({
		browsers: ['last 2 versions'],
		cascade: false
	}))
	.pipe(cleanCSS({
		level: 2
	}))
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.stream());
}
//clean scripts js
function scripts(){
	return gulp.src('dist/js/*.js')
	.pipe(uglify({
		toplevel: true
	}))
	.pipe(gulp.dest('app/js'))
	.pipe(browserSync.stream());
}
function watch(){
	browserSync.init({
		server: {
			baseDir: "./"
		}
	});
	gulp.watch('./dist/sass/*.+(sass|scss)', sassCompile)
	gulp.watch('./dist/js/*.js', scripts)
	gulp.watch('./*.html').on('change', browserSync.reload);
}
function clean(){
	return del(['app/*'])
}
//tasks
gulp.task('images', () =>
gulp.src('dist/img/*')
.pipe(image())
.pipe(gulp.dest('app/img'))
);
gulp.task('sass', sassCompile);
gulp.task('js', scripts);
gulp.task('watch', watch);
gulp.task('del', clean);
gulp.task('build', gulp.series(clean, gulp.parallel(sassCompile,scripts)));