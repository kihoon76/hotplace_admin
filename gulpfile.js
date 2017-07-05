var gulp = require('gulp');
var extjs = require('gulp-uglify');

gulp.task('scripts', function() {
    return gulp.src(['public/core/ver/4.1.1-rc2/js/ext-all.js', 'public/app.js'])
               .pipe(extjs())
               .pipe(gulp.dest('build'));
});