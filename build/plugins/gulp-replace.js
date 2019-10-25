const through = require('through2')
const gutil = require('gulp-util')
const PluginError = gutil.PluginError

const PLUGIN_NAME = 'gulp-replace'

module.exports = (replaceStr, str) => {
  return through.obj((file, enc, cb) => {
    if (!replaceStr || !str) {
      cb(null, file)
      return
    }

    if (file.isNull()) {
      cb(null, file)
      return
    }

    try {
      let code = file.contents.toString().replace(new RegExp(replaceStr, 'g'), str)
      file.contents = Buffer.from(code)
    } catch (err) {
      throw new PluginError(PLUGIN_NAME, err.message)
    }

    cb(null, file)
  })
}
