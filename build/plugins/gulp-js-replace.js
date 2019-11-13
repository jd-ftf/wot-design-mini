const through = require('through2')
const PluginError = require('plugin-error');
const transform = require('@babel/core').transform

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
      let code = file.contents.toString()
      const result = transform(code, {
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