const through = require('through2')
const PluginError = require('plugin-error')

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
      const code = file.contents.toString().replace(new RegExp(replaceStr, 'g'), str)
      file.contents = Buffer.from(code)
    } catch (err) {
      throw new PluginError(PLUGIN_NAME, err.message)
    }

    cb(null, file)
  })
}