const { src, dest, parallel, series } = require('gulp')
const sass = require('gulp-sass')
const rename = require('gulp-rename')
const postcss = require('gulp-postcss')
const cssnano = require('gulp-cssnano')
const autoprefixer = require('autoprefixer')
const watch = require('gulp-watch')
const minimist = require('minimist')
const pipeline = require('readable-stream').pipeline
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

const example = path.resolve(__dirname, '../example')
const libDir = path.resolve(__dirname, '../dist')
const exampleDist = path.resolve(example, './dist')
const packagesPath = path.resolve(__dirname, '../packages')
const finalPath = options.env === 'production' ? libDir : exampleDist
const scssDir = `${packagesPath}/**/*.scss`

const cleanTask = function (filepath) {
  return function () {
    return exec(`npx rimraf ${filepath}`)
  }
}

const createReplaceExtTask = function (srcPath, toPath, ext, base) {
  return function () {
    return src(srcPath)
      .pipe(rename(path => {
        path.extname = `.${ext}`
      }))
      .pipe(dest(toPath))
  }
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

const createJsTask = function (srcPath, toPath, replaceStr, str) {
  return function () {
    return src(srcPath)
      .pipe(jsReplace(replaceStr, str))
      .pipe(dest(toPath))
  }
}

const createHtmlTask = function (srcPath, toPath, replaceArr, ext) {
  let replaceTask = (replaceArr || []).map(item => {
    return strReplace(item.replaceStr, item.str)
  })

  ext && replaceTask.push(rename(path => {
    path.extname = `.${ext}`
  }))

  return function () {
    return pipeline(
      src(srcPath),
      ...replaceTask,
      dest(toPath)
    )
  }
}

const createCopyTask = function (srcPath, toPath) {
  return function () {
    return src(srcPath)
      .pipe(dest(toPath))
  }
}

const sassToJxss = createScssTask([scssDir], 'jxss')
const jsToJdJs = createJsTask([`${packagesPath}/**/*.js`], finalPath)
const jxmlToJxml = createHtmlTask([`${packagesPath}/**/*.jxml`], finalPath)
const packagesCopy = createCopyTask([
  `${packagesPath}/**`,
  `!${scssDir}`,
  `!${packagesPath}/**/*.js`,
  `!${packagesPath}/**/*.jxml`
], finalPath)

const watchTask = function () {
  return watch(`${packagesPath}/**`, parallel(sassToJxss, jsToJdJs, jxmlToJxml, packagesCopy))
}

exports.dev = series(cleanTask(finalPath), parallel(watchTask, sassToJxss, jsToJdJs, jxmlToJxml, packagesCopy))

exports.build = series(cleanTask(finalPath), parallel(sassToJxss, jsToJdJs, jxmlToJxml, packagesCopy))

const exampleWx = path.resolve(__dirname, '../example-wx')

const wxCssExampleTask = createReplaceExtTask([`${example}/**/*.jxss`], exampleWx, 'wxss')
const wxJsExampleTask = createJsTask([`${example}/**/*.js`], exampleWx, 'jd', 'wx')
const wxHtmlExampleTask = createHtmlTask([`${example}/**/*.jxml`], exampleWx, [
  {
    replaceStr: '\\.jxs',
    str: '.wxs'
  }, {
    replaceStr: '<jxs',
    str: '<wxs'
  }, {
    replaceStr: 'jd:',
    str: 'wx:'
  }
], 'wxml')
const wxWxsExampleTask = createReplaceExtTask([`${example}/**/*.jxs`], exampleWx, 'wxs')
const wxExampleCopy = createCopyTask([
  `${example}/**`,
  `!${example}/**/*.jxss`,
  `!${example}/**/*.js`,
  `!${example}/**/*.jxml`,
  `!${example}/**/*.jxs`
], exampleWx)

const watchWx = function () {
  return watch(
    `${packagesPath}/**`,
    series(
      parallel(sassToJxss, jsToJdJs, jxmlToJxml, packagesCopy),
      parallel(wxCssExampleTask, wxJsExampleTask, wxHtmlExampleTask, wxWxsExampleTask, wxExampleCopy)
    )
  )
}

const watchExample = function () {
  return watch([`${example}/**`, `!${example}/dist/**`], parallel(wxCssExampleTask, wxJsExampleTask, wxHtmlExampleTask, wxWxsExampleTask, wxExampleCopy))
}

// exports.devwx = series(cleanTask(exampleWx), parallel(wxCssExampleTask, wxJsExampleTask, wxHtmlExampleTask, wxWxsExampleTask, wxExampleCopy))

exports.devwx = series(
  cleanTask(finalPath),
  cleanTask(exampleWx),
  series(
    sassToJxss,
    jsToJdJs,
    jxmlToJxml,
    packagesCopy,
    wxCssExampleTask,
    wxJsExampleTask,
    wxHtmlExampleTask,
    wxWxsExampleTask,
    wxExampleCopy
  ),
  parallel(
    watchWx,
    watchExample
  )
)
