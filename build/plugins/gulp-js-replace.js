const through = require('through2')
const gutil = require('gulp-util')
const PluginError = gutil.PluginError
const transform = require('@babel/core').transform

const PLUGIN_NAME = 'gulp-replace'

module.exports = (replaceStr, str) => {
  if (!replaceStr || !str) {
    throw new PluginError(PLUGIN_NAME, 'wrong parameter length')
  }

  return through.obj((file, enc, cb) => {
    if (file.isNull()) {
      cb(null, file)
    }

    try {
      let code = file.contents.toString()
      let result = transform(code, {
        plugins: [function () {
          return {
            visitor: {
              Identifier: function (path) {
                if (path.node.name === replaceStr) {
                  path.node.name = str
                }
              }
            }
          }
        }]
      })
      code = result.code
      file.contents = Buffer.from(code)
    } catch (err) {
      throw new PluginError(PLUGIN_NAME, err.message)
    }

    cb(null, file)
  })
}
