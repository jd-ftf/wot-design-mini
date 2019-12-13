import VueComponent from '../common/component'
import { checkNumRange } from '../common/util'

VueComponent({
  relations: {
    '../checkbox/index': {
      type: 'child',
      linked (child) {
        this.children = this.children || []
        this.children.push(child)
      },
      unlinked (target) {
        this.children = this.children.filter(child => child !== target)
      }
    }
  },
  props: {
    value: {
      type: Array,
      value: [],
      observer (value) {
        // 传入的value数组中包括重复的元素，这种情况非法。
        if (new Set(value).size !== value.length) {
          throw Error('checkboxGroup\'s bound value includes same value')
        }
        if (value.length < this.data.min) {
          throw Error('checkboxGroup\'s bound value\'s length can\'t be less than min')
        }
        if (this.data.max !== 0 && value.length > this.data.max) {
          throw Error('checkboxGroup\'s bound value\'s length can\'t be large than max')
        }
        // 每次value变化都会触发重新匹配选中项
        this.children && this.children.length > 0 && this.reset()
      }
    },
    shape: {
      type: String,
      value: 'circle',
      observer (value) {
        const type = ['circle', 'square', 'button']
        if (type.indexOf(value) === -1) throw Error(`shape must be one of ${type.toString()}`)
        this.updateAllChild({ shape: value })
      }
    },
    checkedColor: {
      type: String,
      value: '#0083ff',
      observer (value) {
        this.updateAllChild({ checkedColor: value })
      }
    },
    disabled: {
      type: Boolean,
      value: false,
      observer (value) {
        this.updateAllChild({ disabled: value })
      }
    },
    min: {
      type: Number,
      value: 0,
      observer (value) {
        checkNumRange(value, 'min')
      }
    },
    max: {
      type: Number,
      value: 0,
      observer (value) {
        checkNumRange(value, 'max')
      }
    }
  },
  methods: {
    /**
     * @description 匹配选中的checkbox并打开，同时关闭没有选中的checkbox。
     * 会修改child的isChecked
     */
    reset () {
      const value = this.data.value.slice(0)
      this.children && this.children.forEach(child => {
        const index = value.indexOf(child.data.value)
        if (index !== -1) {
          child.data.isChecked || child.setData({ isChecked: true })
          value.splice(index, 1)
        } else {
          child.data.isChecked && child.setData({ isChecked: false })
        }
      })
    },
    /**
     * @description 当和child建立relation后，用checkboxGroup的props覆盖checkbox中props值为null的属性。
     * @param {Object} data 属性键值对
     */
    updateAllChild (data) {
      const keys = Object.keys(data)
      this.children && this.children.forEach(child => {
        const will = {}
        keys.forEach(key => {
          if (
            data[key] !== null &&
            data[key] !== undefined &&
            child.data[key] === null
          ) {
            will[key] = data[key]
          }
        })
        child.setData(will)
      })
    }
  },
  beforeCreate () {

  },
  mounted () {
    const { shape, checkedColor, disabled } = this.data
    this.updateAllChild({
      shape,
      checkedColor,
      disabled
    })
  }
})