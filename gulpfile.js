var gulp   = require('gulp'),
	uglify = require('gulp-uglify'),
	cssMin =require('gulp-cssmin'),
	gutil  = require('gulp-util'),
	del	   = require('del'),
	stripDebug = require('gulp-strip-debug');

var DIR = {
	SRC  : 'public/src',
	DIST : 'public/dist'
}

var SRC = {
	JS  : DIR.SRC + '/**/*.js',
	CSS : DIR.SRC + '/**/*.css'  
}

gulp.task('js-minify', function() {
	gutil.log('자바스크립트 minify');
	return  gulp.src(SRC.JS)
			.pipe(stripDebug())
			.pipe(uglify())
			.pipe(gulp.dest(DIR.DIST));
});

gulp.task('css-minify', function() {
	gutil.log('스타일시트 minify');
	return  gulp.src(SRC.CSS)
			.pipe(cssMin())
			.pipe(gulp.dest(DIR.DIST));
});

gulp.task('clean', function() {
	gutil.log('dist 디렉토리 내용삭제');
	return del.sync([DIR.DIST + '/*']);
});

gulp.task('default', ['clean', 'js-minify', 'css-minify']);