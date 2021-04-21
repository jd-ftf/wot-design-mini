const program = require('commander')
const { dev, build } = require('@ftf/pisces')
const path = require('path')
const pkg = require('../package.json')

program
  .version(require('../package.json').version)
  .option('-p, --platform <platform>', 'which platform to transform')
  .action(() => {
    build({
      entry: 'packages',
      source: 'jd',
      precss: 'scss',
      output: path.resolve(__dirname, `../lib/${program.platform}/`),
      platform: program.platform,
      env: {
        VERSION: JSON.stringify(pkg.version)
      }
    })
  })

program
  .command('dev')
  .option('-p, --platform <platform>', 'which platform to transform')
  .action(() => {
    dev({
      entry: 'example',
      source: 'jd',
      output: path.resolve(__dirname, `../example-dist/${program.platform}/`),
      platform: program.platform
    })
    dev({
      entry: 'packages',
      source: 'jd',
      precss: 'scss',
      output: path.resolve(__dirname, `../example-dist/${program.platform}/wot-design/`),
      platform: program.platform,
      env: {
        VERSION: JSON.stringify(pkg.version)
      }
    })
  })

program.parse(process.argv)