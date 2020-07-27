module.exports = {
  '*.js': [
    'cross-env EFF_ABSOLUTE_PATHS=true eslint --fix --format friendly'
  ]
}