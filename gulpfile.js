const{dest , src,series, parallel, watch} = require('gulp');
const del = require('del');
const browserSync = require('browser-sync').create();
var sass = require('gulp-sass')(require('node-sass'));

// tasks
async function clean(cb){
   await del('build');
    cb();
}
//exports.clean = clean;

// html
function html(cb){
    src("src/*.html")
    .pipe(dest("build"))
    cb();
}
exports.html = html;

function my_sass(cb){
    src('src/assets/sass/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('build/assets/css'));
    cb();
}

// server
function server(cb){
    browserSync.init({
        notify: false,
        open: false,
        server: {
            baseDir: "build"
        }
    })
    cb();
}
exports.server = server;

function watcher(cb){
watch("src/*.html").on('change', series(html, browserSync.reload))
watch("src/assets/sass/**/*.scss")
.on('change', series(my_sass, browserSync.reload))
cb();
}

exports.default = series(clean, parallel( html,my_sass,server), watcher);