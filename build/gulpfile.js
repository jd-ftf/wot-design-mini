const { src, dest, parallel, series } = require('gulp')
const sass = require('gulp-sass')
const rename = require('gulp-rename')
const postcss = require('gulp-postcss')
const cssnano = require('gulp-cssnano')
const autoprefixer = require('autoprefixer')
const watch = require('gulp-watch')
const minimist = require('minimist')
const path = require('path')
const util = require('util')
const exec = util.promisify(require('child_process').exec)
const jsReplace = require('./plugins/gulp-js-replace')
const strReplace = require('./plugins/gulp-replace')

const options = minimist(process.argv.slice(2), {
  string: 'env',
  default: {
    env: process.env.NODE_ENV || 'production'
  }
})

const libDir = path.resolve(__dirname, '../dist')
const exampleDist = path.resolve(__dirname, '../example/dist')
const packagesPath = path.resolve(__dirname, '../packages')
const finalPath = options.env === 'production' ? libDir : exampleDist
const scssDir = `${packagesPath}/**/*.scss`

const cleanTask = function () {
  return exec(`rimraf ${finalPath}`)
}

const createScssTask = function (src, ext) {
  return function () {
    return src(src, { base })
      .pipe(sass().on('error', sass.logError))
      .pipe(postcss([autoprefixer(['ios >= 8', 'android >= 4.4'])]))
      .pipe(cssnano({
        discardComments: { removeAll: true }
      }))
      .pipe(rename(path => {
        path.extname = `.${ext}`
      }))
      .pipe(dest(finalPath))
  }
}

const createJsTask = function (src, replaceStr, str) {
  return function () {
    return src(src)
      .pipe(jsReplace(replaceStr, str))
      .pipe(dest(finalPath))
  }
}

const createHtmlTask = function (src, replaceVar, variable, replaceExt, ext) {
  return function () {
    return src(src)
      .pipe(strReplace(replaceVar, variable))
      .pipe(strReplace(replaceExt, ext))
      .pipe(dest(finalPath))
  }
}

const copyPackagesTask = function (src, toPath) {
  return function () {
    return src(src)
      .pipe(dest(toPath))
  }
}

const watchTask = function () {
  return watch(`${packagesPath}/**`, parallel(transformScssTask, copyPackagesTask))
}

exports.dev = series(cleanTask, parallel(watchTask, transformScssTask, copyPackagesTask))

exports.build = series(cleanTask, parallel(transformScssTask, copyPackagesTask))
