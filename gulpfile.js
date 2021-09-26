const{dest , src,series, parallel, watch} = require('gulp');
const del = require('del');
const browserSync = require('browser-sync').create();


// tasks
function clean(cb){
   del('build');
    cb();
}
//exports.clean = clean;

// html
function html(cb){
    src("src/*.html")
    .pipe(dest("build"))
    cb();
}
//exports.html = html;

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
//exports.server = server;

function watcher(cb){
watch("src/*.html").on('change', series(html, browserSync.reload))
cb();
}

exports.default = series(clean, html,server, watcher);