var gulp = require("gulp");
var sass = require("gulp-sass");
var rename = require("gulp-rename");
var postcss = require("gulp-postcss");
var cssnano = require("gulp-cssnano");
var header = require("gulp-header");
var autoprefixer = require("autoprefixer");
var watch = require("gulp-watch");
var pkg = require("./package.json");

gulp.task("watch", function() {
  watch("src/**", gulp.parallel("build:style", "build:example"));
});

gulp.task("build:style", function() {
  var banner = [
    "/*!",
    " * JMUI v<%= pkg.version %> (<%= pkg.homepage %>)",
    " * Copyright <%= new Date().getFullYear() %> JingDong, Inc.",
    " * Licensed under the <%= pkg.license %> license",
    " */",
    ""
  ].join("\n");
  gulp
    .src(["src/style/**/*.scss", "src/example/**/*.wxss"], { base: "src" })
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss([autoprefixer(["iOS >= 8", "Android >= 4.1"])]))
    .pipe(
      cssnano({
        zindex: false,
        autoprefixer: false,
        discardComments: { removeAll: true }
      })
    )
    .pipe(header(banner, { pkg: pkg }))
    .pipe(
      rename(function(path) {
        path.extname = ".wxss";
      })
    )
    .pipe(gulp.dest("dist"));
});
gulp.task("build:example", function() {
  gulp
    .src(
      [
        "src/app.js",
        "src/app.json",
        "src/project.config.json",
        "src/sitemap.json",
        "src/app.wxss",
        "src/example/**",
        "!src/example/**/*.wxss"
      ],
      { base: "src" }
    )
    .pipe(gulp.dest("dist"));
});

gulp.task("default", gulp.parallel("watch", "build:style", "build:example"));
