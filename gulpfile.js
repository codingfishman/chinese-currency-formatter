const gulp = require('gulp')
const babel = require('gulp-babel')

gulp.task('default', function () {
  return gulp.src('./src/**')
    .pipe(babel({
      presets: ['es2015', 'react', 'stage-0']
    }))
    .pipe(gulp.dest('./dist'))
})