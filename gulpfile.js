const gulp = require('gulp')
gulp.task('copy', () => {//将js、ts以外的文件复制到dist目录下
    return gulp.src(['src/**/*.*', '!src/**/*.ts', '!src/**/*.js']).pipe(gulp.dest('dist'))
})