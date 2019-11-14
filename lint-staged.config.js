module.exports = {
  '*': [
    'cross-env EFF_ABSOLUTE_PATHS=true eslint --format friendly --fix',
    'git add'
  ]
}