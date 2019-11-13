import basic from '../mixins/basic';
/**
 * @description 依照map映射表转换key名
 * @param source 源
 * @param target 新
 * @param map -映射表
 */

function mapKeys(source, target, map) {
  Object.keys(map).forEach(key => {
    if (source.hasOwnProperty(key)) {
      target[map[key]] = source[key];
    }
  });
}
/**
 * @description 将mixins和source中的属性组合在一起
 * @param source 源
 * @param target 目标
 * @param {Array<prop>} keys
 */


function mergeData(source, target, keys) {
  keys.forEach(key => {
    if (source.hasOwnProperty(key)) {
      target[key] = { ...source[key],
        ...target[key]
      };
    }
  }); // keys.forEach(key => {
  //   if (!source.hasOwnProperty(key)) return
  //   target[key] = Object.assign({}, source[key], target[key])
  // })
}
/**
 * @description 京东小程序暂时不支持behaviors，因此手动实现生命周期mixin
 * @param {Array<hook>} source 自定义的mixins
 * @param {Option} target 目标配置
 * @param {Array<String>} lifeCycles
 */


function mergeLifeCycle(source, target, lifeCycles) {
  lifeCycles.forEach(key => {
    // key=created
    const handlers = []; // 为每一个类型的hook建立一个dep队列，并将source中的所有此类型的hook按顺序放入dep

    source.forEach(mixinOptions => {
      mixinOptions[key] && handlers.push(mixinOptions[key]);
    }); // 如果实例本身也有此hook，则将其放入队尾

    target[key] && handlers.push(target[key]); // 重写实例的hook，hook被调用时依次执行队列中的此类型hook

    handlers.length && (target[key] = function () {
      handlers.forEach(handler => {
        handler.call(this);
      });
    });
  });
}
/**
 * @description vue写法转小程序
 * @param {Option} vueOptions
 */


function VueComponent(vueOptions) {
  // 传递给原生Component的options
  const options = {}; // mixins存在将basic插入队头，否则构建一个包含basic的mixins。

  if (vueOptions.mixins) {
    vueOptions.mixins.unshift(basic);
  } else {
    vueOptions.mixins = [basic];
  } // 京东小程序暂时不支持behaviors，因此手动实现mixins


  vueOptions.mixins.forEach(mixinOptions => {
    mergeData(mixinOptions, vueOptions, ['data', 'props', 'methods', 'relations']);
  });
  mergeLifeCycle(vueOptions.mixins, vueOptions, ['beforeCreate', 'created', 'mounted', 'destroyed']);
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
  }); // 每一个自定义组件开启一个custom-class

  options.externalClasses = options.externalClasses || [];
  options.externalClasses.push('custom-class'); // 默认开启多插槽

  options.options = {
    multipleSlots: true
  }; // 调用原生api注册自定义组件

  Component(options);
}

export default VueComponent;