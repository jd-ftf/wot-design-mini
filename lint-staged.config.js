module.exports = {
  'packages/**/*.(js|json)': [
    'cross-env EFF_ABSOLUTE_PATHS=true eslint --fix --format friendly',
    'git add'
  ]
}