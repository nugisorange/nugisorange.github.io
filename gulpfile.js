"use strict";

const sass = require("gulp-sass")(require("sass"));
const gulp = require("gulp");
const postcss = require("gulp-postcss");
const tailwindcss = require("tailwindcss");
const gutil = require("gulp-util");
const jshint = require("gulp-jshint");
const fileinclude = require("gulp-file-include");
const bs = require("browser-sync").create();
const rimraf = require("rimraf");
const wrapper = require("gulp-wrapper");
const comments = require("gulp-header-comment");
const template = require("gulp-template");
const theme = require("./src/theme.json");
const node_env = process.argv.slice(2)[0];
const headerComments = `WEBSITE: https://themefisher.com
                        TWITTER: https://twitter.com/themefisher
                        FACEBOOK: https://facebook.com/themefisher
                        GITHUB: https://github.com/themefisher/`;

var path = {
  // source paths
  src: {
    html: "src/*.html",
    others: "src/*.+(php|icon|png)",
    theme: "src/theme.json",
    pages: "src/pages/*.html",
    partials: "src/partials/**/*.html",
    incdir: "src/partials/",
    styles: "src/styles/*.scss",
    scripts: "src/scripts/*.js",
    js: "js/*.js",
    plugins: "src/plugins/**/*",
    public: "src/public/**/*",
  },

  // build paths
  build: {
    dir: "theme/",
  },
};

// HTML
gulp.task("html:build", function () {
  return gulp
    .src(path.src.html)
    .pipe(
      fileinclude({
        basepath: path.src.incdir,
      })
    )
    .pipe(
      comments(`
    WEBSITE: https://themefisher.com
    TWITTER: https://twitter.com/themefisher
    FACEBOOK: https://www.facebook.com/themefisher
    GITHUB: https://github.com/themefisher/
    `)
    )
    .pipe(gulp.dest(path.build.dir))
    .pipe(
      bs.reload({
        stream: true,
      })
    );
});

// pages
gulp.task("pages:build", function () {
  return gulp
    .src(path.src.pages)
    .pipe(
      wrapper({
        header:
          "<!DOCTYPE html>\n<html lang=\"zxx\">\n@@include('head.html')\n@@include('header.html')\n<body>",
        footer:
          node_env === "dev"
            ? "@@include('components/tw-size-indicator.html')\n @@include('footer.html')\n</body>\n</html>"
            : "@@include('footer.html')\n</body>\n</html>",
      })
    )
    .pipe(
      fileinclude({
        basepath: "src/partials/",
      })
    )
    .pipe(
      template({
        fontPrimary: theme.fonts.font_family.primary,
        fontSecondary: theme.fonts.font_family.secondary,
      })
    )
    .pipe(comments(headerComments))
    .pipe(gulp.dest(path.build.dir))
    .pipe(
      bs.reload({
        stream: true,
      })
    );
});

// styles
gulp.task("styles:build", function () {
  return gulp
    .src(path.src.styles)
    .pipe(
      sass({
        outputStyle: "expanded",
      }).on("error", sass.logError)
    )
    .pipe(
      postcss([tailwindcss("./tailwind.config.js"), require("autoprefixer")])
    )
    .pipe(comments(headerComments))
    .pipe(gulp.dest(path.build.dir + "styles/"))
    .pipe(
      bs.reload({
        stream: true,
      })
    );
});

// scripts
gulp.task("scripts:build", function () {
  return gulp
    .src(path.src.scripts)
    .pipe(jshint("./.jshintrc"))
    .pipe(jshint.reporter("jshint-stylish"))
    .on("error", gutil.log)
    .pipe(comments(headerComments))
    .pipe(gulp.dest(path.build.dir + "scripts/"))
    .pipe(
      bs.reload({
        stream: true,
      })
    );
});

// Javascript
gulp.task("js:build", function () {
  return gulp
    .src(path.src.js)
    .pipe(jshint("./.jshintrc"))
    .pipe(jshint.reporter("jshint-stylish"))
    .on("error", gutil.log)
    .pipe(
      comments(`
  WEBSITE: https://themefisher.com
  TWITTER: https://twitter.com/themefisher
  FACEBOOK: https://www.facebook.com/themefisher
  GITHUB: https://github.com/themefisher/
  `)
    )
    .pipe(gulp.dest(path.build.dir + "js/"))
    .pipe(
      bs.reload({
        stream: true,
      })
    );
});

// Plugins
gulp.task("plugins:build", function () {
  return gulp
    .src(path.src.plugins)
    .pipe(gulp.dest(path.build.dir + "plugins/"))
    .pipe(
      bs.reload({
        stream: true,
      })
    );
});


// Other files like favicon, php, sourcele-icon on root directory
gulp.task("others:build", function () {
  return gulp.src(path.src.others).pipe(gulp.dest(path.build.dir));
});

// public files
gulp.task("public:build", function () {
  return gulp.src(path.src.public).pipe(gulp.dest(path.build.dir));
});

// Clean Theme Folder
gulp.task("clean", function (cb) {
  rimraf("./theme", cb);
});

// Watch Task
gulp.task("watch:build", function () {
  gulp.watch(path.src.html, gulp.parallel("html:build"));
  gulp.watch(path.src.htminc, gulp.parallel("html:build"));
  gulp.watch(path.src.theme, gulp.parallel("styles:build"));
  gulp.watch(path.src.pages, gulp.parallel("pages:build", "styles"));
  gulp.watch(path.src.partials, gulp.parallel("pages:build", "styles"));
  gulp.watch(path.src.scripts, gulp.parallel("scripts:build", "styles"));
  gulp.watch(path.src.js, gulp.parallel("js:build"));
  gulp.watch(path.src.styles, gulp.parallel("styles:build"));
  gulp.watch(path.src.plugins, gulp.parallel("plugins:build", "pages"));
  gulp.watch(path.src.public, gulp.parallel("public:build", "pages"));
});

// dev Task
gulp.task(
  "dev",
  gulp.series(
    "clean",
    "html:build", 
    "js:build",
    "pages:build",
    "styles:build",
    "scripts:build",
    "plugins:build",
    "public:build",
    "others:build",
    gulp.parallel("watch:build", function () {
      bs.init({
        server: {
          baseDir: path.build.dir,
        },
      });
    })
  )
);

// Build Task
gulp.task(
  "build",
  gulp.series(
    "clean",
    "html:build", 
    "js:build",
    "pages:build",
    "styles:build",
    "scripts:build",
    "plugins:build",
    "public:build",
    "others:build",)
);

// Deploy Task
// gulp.task(
//   "deploy",
//   gulp.series("html:build", "js:build","pages", "styles", "scripts", "plugins", "public")
// );
