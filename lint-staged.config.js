module.exports = {
  'packages/**/*': [
    'cross-env EFF_ABSOLUTE_PATHS=true eslint --fix --format friendly --ext .js,.json packages',
    'git add'
  ]
}