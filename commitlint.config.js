const fs=require('fs')
module.exports = {
  extends: [
    '@commitlint/config-conventional'
  ],
  rules: {
    'type-enum': [2, 'always',
      [
        'release',
        'update',
        'nothing',
        'feat',
        'style',
        'fix',
        'docs',
        'config',
        'demo'
      ].concat(fs.readdirSync('packages'))
    ]
  }
}
