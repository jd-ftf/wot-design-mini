var gulp = require("gulp");
var sass = require("gulp-sass");
var rename = require("gulp-rename");
var clean = require("gulp-clean");
var postcss = require("gulp-postcss");
var cssnano = require("gulp-cssnano");
var header = require("gulp-header");
var autoprefixer = require("autoprefixer");
var watch = require("gulp-watch");
var minimist = require("minimist");
var pkg = require("./package.json");

var knownOptions = {
  string: "env",
  default: { env: process.env.NODE_ENV || "production" }
};

var options = minimist(process.argv.slice(2), knownOptions);

gulp.task("watch", function() {
  watch("packages/**", gulp.parallel("build:style", "build:example"));
});

gulp.task("clean", function() {
  return gulp
    .src(options.env === "production" ? "./dist/*" : "./example/dist/*")
    .pipe(clean());
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
    .src(["packages/**/*.scss"], { base: "packages" })
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
    .pipe(gulp.dest(options.env === "production" ? "dist" : "example/dist"));
});
gulp.task("build:example", function() {
  gulp
    .src(["packages/**", "!packages/**/*.scss"], { base: "packages" })
    .pipe(gulp.dest(options.env === "production" ? "dist" : "example/dist"));
});

gulp.task(
  "dev",
  gulp.series("clean", gulp.parallel("watch", "build:style", "build:example"))
);

gulp.task(
  "build",
  gulp.series("clean", gulp.parallel("build:style", "build:example"))
);
