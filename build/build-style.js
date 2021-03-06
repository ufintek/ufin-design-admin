const gulp = require("gulp");
const cleanCSS = require("gulp-clean-css");
const scss = require("gulp-sass");
const rename = require("gulp-rename");
const autoprefixer = require("gulp-autoprefixer");

// // 编译less
// gulp.task("css", function() {
//     gulp.src("../src/styles/index.scss")
//         .pipe(scss())
//         .pipe(
//             autoprefixer({
//                 browsers: ["last 2 versions", "ie > 8"]
//             })
//         )
//         .pipe(cleanCSS())
//         .pipe(rename("ufin-admin.css"))
//         .pipe(gulp.dest("../dist/styles"));
// });

// 拷贝字体文件
gulp.task("fonts", function() {
    gulp.src("../src/styles/common/iconfont/fonts/*.*").pipe(
        gulp.dest("../dist/styles/fonts")
    );
});

gulp.task("default", "fonts");
