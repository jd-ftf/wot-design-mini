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

const createScssTask = function (srcPath, ext, base) {
  return function () {
    return src(srcPath, { base })
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

const createJsTask = function (srcPath, replaceStr, str) {
  return function () {
    return src(srcPath)
      .pipe(jsReplace(replaceStr, str))
      .pipe(dest(finalPath))
  }
}

const createHtmlTask = function (srcPath, replaceVar, variable, replaceExt, ext) {
  return function () {
    return src(srcPath)
      .pipe(strReplace(replaceVar, variable))
      .pipe(strReplace(replaceExt, ext))
      .pipe(dest(finalPath))
  }
}

const createCopyTask = function (srcPath, toPath) {
  return function () {
    return src(srcPath)
      .pipe(dest(toPath))
  }
}

const sassToJxss = createScssTask([scssDir], 'jxss')
const jsToJdJs = createJsTask([`${packagesPath}/**/*.js`])
const jxmlToJxml = createHtmlTask([`${packagesPath}/**/*.jxml`])
const packagesCopy = createCopyTask([
  `${packagesPath}/**`,
  `!${scssDir}`,
  `!${packagesPath}/**/*.js`,
  `!${packagesPath}/**/*.jxml`
], finalPath)

const watchTask = function () {
  return watch(`${packagesPath}/**`, parallel(sassToJxss, jsToJdJs, jxmlToJxml, packagesCopy))
}

exports.dev = series(cleanTask, parallel(watchTask, sassToJxss, jsToJdJs, jxmlToJxml, packagesCopy))

exports.build = series(cleanTask, parallel(sassToJxss, jsToJdJs, jxmlToJxml, packagesCopy))

exports.clean = cleanTask
