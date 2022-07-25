const { src, dest, watch, series, parallel } = require("gulp");
const sass = require("gulp-sass");
const minifyCSS = require("gulp-csso");
const concat = require("gulp-concat");
const panini = require("panini");
const browsersync = require("browser-sync").create();

const files = {
   pagesPath: "./src/views/**/*.html",
   scssPath: "./src/assets/scss/**/*.scss",
   jsPath: "./src/assets/js/**/*.js",
   imagesPath: "./src/assets/img/**/*",
   fontsPath: "./src/assets/fonts/**/*",
};

function htmlTask() {
   console.log("---------------COMPILING HTML WITH PANINI---------------");
   panini.refresh();
   return src("src/views/pages/**/*.html")
      .pipe(
         panini({
            root: "src/views/pages/",
            layouts: "src/views/layouts/",
            /* pageLayouts: {
            login: 'login'
        }, */
            partials: "src/views/partials/",
            data: "src/views/data/",
         })
      )
      .pipe(dest("public"))
      .pipe(browsersync.stream());
}

function scssTask() {
   return src(files.scssPath)
      .pipe(sass())
      .pipe(minifyCSS())
      .pipe(dest("public/assets/css"));
}

function jsTask() {
   return (
      src(files.jsPath)
         // .pipe(concat('app.min.js'))
         .pipe(dest("public/assets/js"))
   );
}

function imagesTask() {
   return src(files.imagesPath).pipe(dest("./public/assets/img"));
}

function fontsTask() {
   return src(files.fontsPath).pipe(dest("./public/assets/fonts"));
}

function server(done) {
   browsersync.init({
      server: {
         baseDir: "public",
         port: 3000,
      },
   });
   done();
}

function reload(done) {
   browsersync.reload();
   panini.refresh();
   done();
}

function cleanDist(done) {
   console.log("---------------REMOVING OLD FILES FROM DIST---------------");
   del.sync("public");
   return done();
}

function watchTask() {
   watch(
      [
         files.pagesPath,
         files.scssPath,
         files.jsPath,
         files.imagesPath,
         files.fontsPath,
      ],
      series(
         parallel(scssTask, jsTask, imagesTask, fontsTask, reload),
         htmlTask
      )
   );
}

exports.default = series(
   parallel(scssTask, jsTask, imagesTask, fontsTask, server),
   htmlTask,
   watchTask,
   cleanDist
);
