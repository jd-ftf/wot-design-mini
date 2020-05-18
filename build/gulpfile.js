const { src, parallel, series, watch } = require('gulp')
const del = require('del')
const eslint = require('gulp-eslint')
const path = require('path')
const util = require('util')
const exec = util.promisify(require('child_process').exec)
const { htmlTransform, jsTransform, styleTransform, copyNoChange } = require('@ftf/gulp-vapp-transform')

const cleanTask = function (filepath) {
  return function () {
    return exec(`npx rimraf ${filepath}`)
  }
}

const createEsLintTask = function (srcPath, ext, base) {
  return function () {
    return src(srcPath, { base })
      .pipe(eslint())
      .pipe(eslint.format(require('eslint-formatter-friendly')))
  }
}

/**
 * watch 不监听删除文件和文件夹事，因此手动处理监听操作
 * @param {String} stats 当前执行的操作
 * @param {String} changePath 修改的路径
 * @param {String} entryName 源地址
 * @param {String} outputName 目标地址
 */
const watchDelTask = (stats, changePath, entryName, outputName) => {
  function filters (ext) {
    if (ext === '.jxml' || ext === '.wxml') {
      return isToWx ? '.wxml' : '.jxml'
    } else if (ext === '.scss' || ext === '.jxss' || ext === '.wxss') {
      return isToWx ? '.wxss' : '.jxss'
    } else {
      return ext
    }
  }

  if (stats === 'unlink' || stats === 'unlinkDir') {
    const file = path.parse(changePath)
    const { name, ext, dir } = file
    // 此处存在一个问题，如果替换文件前方有重名文件夹，可能会造成替换错误，因此建议使用不重名的文件夹名作为入口
    const pre = dir.replace(entryName, outputName)
    const final = pre + '/' + name + filters(ext)
    del.sync(final, { force: true })
  }
}

const options = process.env.NODE_ENV || 'production'

// 1. packages -> example/dist example(dist) 监听 packages（entry）
// 2. example -> example-wx example-wx(wx-dist) 监听 example (entry)
const isToWx = process.env.PLATFORM === 'wx'
const example = path.resolve(__dirname, '../example')
const libDir = path.resolve(__dirname, '../lib')
const exampleDist = path.resolve(example, './dist')
const packagesPath = path.resolve(__dirname, '../packages')
const finalPath = options === 'production' ? libDir : exampleDist

// packages 内部的 jd小程序转成 example 微信小程序
// √ scss -> jxss
const scssTask = () => styleTransform(packagesPath, finalPath, [], 'scss', 'jxss')()
// √ js
const jsTask = () => jsTransform(packagesPath, finalPath)()
// √ jxml -> jxml
const jxmlTask = () => htmlTransform(packagesPath, finalPath, [], 'jxml', 'jxml')()

const packagesCopy = copyNoChange([
  `${packagesPath}/**`,
  `!${packagesPath}/**/*.scss`,
  `!${packagesPath}/**/*.js`,
  `!${packagesPath}/**/*.jxml`
], finalPath)

const esLint = createEsLintTask([
  `${packagesPath}/**/*.js`,
  `${packagesPath}/**/*.json`
], finalPath)

const baseTransTask = [
  parallel(scssTask, jsTask, jxmlTask, packagesCopy, esLint)
]
const watchTask = function () {
  return watch(`${packagesPath}/**`, ...baseTransTask)
    .on('all', (stats, changePath) => {
      watchDelTask(stats, changePath, packagesPath, finalPath)
    })
}

exports.dev = series(cleanTask(finalPath), ...baseTransTask, parallel(watchTask))
exports.build = series(cleanTask(finalPath), ...baseTransTask)

// example -> example-wx
if (isToWx) {
  // wxExample转换 除了转换成demo之外，也需要把小程序打包
  const wxLib = path.resolve(__dirname, '../lib-wx')
  const wxExample = path.resolve(__dirname, '../example-wx')
  const wxExampleDist = path.resolve(__dirname, '../example-wx/dist')
  const wxFinalPath = options === 'production' ? wxLib : wxExample
  const sourceFinal = options === 'production' ? wxLib : wxExampleDist
  // packages (源代码) -> example-wx
  const scssToWxssTask = () => styleTransform(packagesPath, sourceFinal, [], 'scss', 'wxss')()
  const jsSourceTask = () => jsTransform(packagesPath, sourceFinal)()
  const jxmlSourceTask = () => htmlTransform(packagesPath, sourceFinal, [], 'jxml', 'wxml')()
  const sourceCopy = copyNoChange([
    `${packagesPath}/**`,
    `!${packagesPath}/**/*.scss`,
    `!${packagesPath}/**/*.js`,
    `!${packagesPath}/**/*.jxml`
  ], sourceFinal)

  const sourceBaseTask = [
    parallel(scssToWxssTask, jsSourceTask, jxmlSourceTask, sourceCopy)
  ]
  const watchSourceTask = function () {
    return watch(`${packagesPath}/**`, ...sourceBaseTask)
      .on('all', (stats, changePath) => {
        watchDelTask(stats, changePath, packagesPath, sourceFinal)
      })
  }

  // (example) -> (example-wx)
  const ignoreList = [`!${example}/dist/**`] // 屏蔽列表
  const jxssTask = () => styleTransform(example, wxFinalPath, ignoreList, 'jxss')()
  const jsWxTask = () => jsTransform(example, wxFinalPath, ignoreList)()
  const jxmlWxTask = () => htmlTransform(example, wxFinalPath, ignoreList, 'jxml')()

  const wxCopy = copyNoChange([
    `${example}/**`,
    `!${example}/**/*.jxss`,
    `!${example}/**/*.js`,
    `!${example}/**/*.jxml`
  ].concat(ignoreList), wxFinalPath)

  const baseTask = [
    parallel(jxssTask, jsWxTask, jxmlWxTask, wxCopy)
  ]
  const watchWxTask = function () {
    return watch([`${example}/**`].concat(ignoreList), ...baseTask)
  }
  const devwx = series(cleanTask(sourceFinal), cleanTask(wxFinalPath), ...sourceBaseTask, ...baseTask, parallel(watchSourceTask, watchWxTask))
  const buildwx = series(cleanTask(wxFinalPath), ...sourceBaseTask)
  exports.devwx = devwx
  exports.buildwx = buildwx
}