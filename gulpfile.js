var gulp   = require('gulp');
var del    = require('del');
var rename = require('gulp-rename');
var bump   = require('gulp-bump')
var uglify = require('gulp-uglify')
/**
 * 自动更新版本号
 */
gulp.task('bump', function () {

    gulp.src('./package.json')
        .pipe(bump())
        .pipe(gulp.dest('./'));

});
gulp.task('clean', function (cb) {
    del(['dist'], cb)
});

gulp.task('minifyjs', function () {
    return gulp.src('index.js')
        .pipe(uglify())    //压缩
        .pipe(rename({suffix: '.min'}))   //rename压缩后的文件名
        .pipe(gulp.dest('dist/'));  //输出
});
gulp.task('default',function () {
    gulp.start('bump','minifyjs')
})
