import basic from '../mixins/basic'

function mapKeys (source, target, map) {
  Object.keys(map).forEach(key => {
    if (source[key]) {
      target[map[key]] = source[key]
    }
  })
}

function mergeData (source, target, keys) {
  keys.forEach(key => {
    if (source[key]) {
      target[key] = {
        ...source[key],
        ...target[key]
      }
    }
  })
}

/**
 * 京东小程序暂时不支持behaviors，因此手动实现生命周期mixin
 * @param {*} source 源参数
 * @param {*} target 目标配置
 * @param {*} lifeCycles
 */
function mergeLifeCycle (source, target, lifeCycles) {
  lifeCycles.forEach(key => {
    const handlers = []
    source.forEach(mixinOptions => {
      mixinOptions[key] && handlers.push(mixinOptions[key])
    })
    target[key] && handlers.push(target[key])

    handlers.length && (target[key] = function () {
      handlers.forEach(handler => {
        handler.call(this)
      })
    })
  })
}

function VueComponent (vueOptions) {
  const options = {}

  if (vueOptions.mixins) {
    vueOptions.mixins.unshift(basic)
  } else {
    vueOptions.mixins = [basic]
  }

  // 京东小程序暂时不支持behaviors，因此手动实现mixins
  vueOptions.mixins.forEach(mixinOptions => {
    mergeData(mixinOptions, vueOptions, ['data', 'props', 'methods', 'relations'])
  })
  mergeLifeCycle(vueOptions.mixins, vueOptions, ['beforeCreate', 'created', 'mounted', 'destroyed'])

  mapKeys(vueOptions, options, {
    data: 'data',
    props: 'properties',
    methods: 'methods',
    beforeCreate: 'created',
    created: 'attached',
    mounted: 'ready',
    relations: 'relations',
    destroyed: 'detached',
    externalClasses: 'externalClasses'
  })

  options.externalClasses = options.externalClasses || []
  options.externalClasses.push('custom-class')

  options.options = {
    multipleSlots: true
  }

  Component(options)
}

export default VueComponent