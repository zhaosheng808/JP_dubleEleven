/**
 * Created by DELL on 2017/10/26.
 */

// npm install --save-dev gulp browser-sync
const gulp = require('gulp');
const browserSync = require('browser-sync');

const reload = browserSync.reload;

gulp.task('devServer', () => {
    browserSync({
        notify: false,  // 是否开启浏览器提示
        port: 9000,    // 端口
        server: {
            baseDir: ['./']
        }
    });
    gulp.watch('./js/*.js').on('change', reload);
    gulp.watch('./*.html').on('change', reload);
});