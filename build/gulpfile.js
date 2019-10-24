const { src, dest, parallel, series } = require('gulp')
const sass = require('gulp-sass')
const rename = require('gulp-rename')
const clean = require('gulp-clean')
const postcss = require('gulp-postcss')
const cssnano = require('gulp-cssnano')
const header = require('gulp-header')
const autoprefixer = require('autoprefixer')
const watch = require('gulp-watch')
const minimist = require('minimist')
const path = require('path')
const package = require('../package.json')

const options = minimist(process.argv.slice(2), {
  string: 'env',
  default: {
    env: process.env.NODE_ENV || 'production'
  }
})

const libDir = path.resolve(__dirname, '../dist/*')
const exampleDist = path.resolve(__dirname, '../example/dist/*')

const clean = function () {
  return src(options.env === 'production' ? '../dist/*' : '../example/dist/*')
    .pipe(clean())
}

const transformScss = function () {
  return src()
}
