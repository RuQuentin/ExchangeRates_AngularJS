// connect packages from 'node_modules'
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');

gulp.task('sass', function() {
  return gulp.src('src/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('build/css'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('html', function() {
  return gulp.src('src/index.html')
    .pipe(gulp.dest('build/'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: 'build'
    },
    notify: false
  })
})


gulp.task('watch', function() {
  gulp.watch('src/scss/**/*.scss', gulp.parallel('sass'));
  gulp.watch('src/index.html', gulp.parallel('html'));
  // gulp.watch('src/index.html', ['html']);
  // other watchers
})


gulp.task('default', gulp.parallel('watch', 'sass', 'html', 'browser-sync'))