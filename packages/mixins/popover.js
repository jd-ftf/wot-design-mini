/**
 * @param {String} [placement=bottom] - Placement of the popper accepted values: top(-start, -end), right(-start, -end), bottom(-start, -end), left(-start, -end)
 * @param {Number} [offset=5] - Amount of pixels the popper will be shifted (can be negative).
 * @param {Boolean} [visibleArrow=false] Visibility of the arrow
 * @param {Boolean} [value=false] Visibility of the component
 * @param {Boolean} [disabled=false] Disabled to change.
 */

export default function () {
  return {
    externalClasses: [
      'custom-arrow',
      'custom-pop'
    ],

    data: {
      popStyle: {},
      arrowStyle: {},
      showStyle: ''
    },

    props: {
      visibleArrow: {
        type: Boolean,
        value: true
      },
      // 显示内容 String || Array
      content: {
        type: null,
        observer (newVal) {
          const { mode, selector } = this.data
          // 类型校验，支持所有值(除null、undefined。undefined建议统一写成void (0)防止全局undefined被覆盖)
          if (newVal === null || newVal === undefined) {
            throw Error('value can\'t be null or undefined')
          }
          if (selector === 'popover' && mode === 'normal' && typeof newVal !== 'string') {
            throw Error('The value type must be a string type in normal mode')
          } else if (selector === 'popover' && mode === 'menu' && this.checkType(newVal) !== 'Array') {
            throw Error('The value type must be a Array type in menu mode')
          }
        }
      },
      placement: {
        type: String,
        value: 'bottom'
      },
      offset: {
        type: Number,
        value: 5
      },
      useContentSlot: {
        type: Boolean,
        value: false
      },
      disabled: {
        type: Boolean,
        value: false
      },
      showClose: {
        type: Boolean,
        value: false
      },
      show: {
        type: Boolean,
        observer (newValue, oldValue) {
          newValue && this.control()
          this.setData({ showStyle: newValue ? 'display: inline-block;' : 'display: none;' })
          this.$emit(`${newValue ? 'show' : 'hide'}`)
        }
      }
    },

    mounted () {
      this.init()
    },

    created () {
      console.log(this.data.selector)
      this.setData({ showStyle: this.data.show ? 'opacity: 1;' : 'opacity: 0;' })
    },

    methods: {
      init () {
        // 初始化 class
        const { placement, visibleArrow, selector } = this.data
        if (visibleArrow) {
          let arrowClass = [
            `wd-${selector}__arrow`,
            placement === 'bottom' || placement === 'bottom-start' || placement === 'bottom-end' ? `wd-${selector}__arrow-up` : '',
            placement === 'left' || placement === 'left-start' || placement === 'left-end' ? `wd-${selector}__arrow-right` : '',
            placement === 'right' || placement === 'right-start' || placement === 'right-end' ? `wd-${selector}__arrow-left` : '',
            placement === 'top' || placement === 'top-start' || placement === 'top-end' ? `wd-${selector}__arrow-down` : ''
          ]
          arrowClass = arrowClass.join(' ')
          this.setData({ arrowClass })
        }

        // 初始化数据获取
        this.getRect('#target').then(rect => {
          if (!rect) return
          this.left = rect.left
          this.bottom = rect.bottom
          this.width = rect.width
          this.height = rect.height
          this.top = rect.top
        })
        // 用透明度可在初始化时获取到pop尺寸
        this.getRect('#pos').then(rect => {
          if (!rect) return
          this.popWidth = rect.width
          this.popHeight = rect.height
        })
      },

      toggle (event) {
        if (this.data.disabled) return
        const { show } = this.data
        this.setData({ show: !show })
      },

      checkType (value) {
        return Object.prototype.toString.call(value).slice(8, -1)
      },

      control () {
        const { placement, offset } = this.data
        // arrow size
        const arrowSize = 9
        // 上下位（纵轴）对应的距离左边的距离
        const verticalX = this.width / 2
        // 上下位（纵轴）对应的距离底部的距离
        const verticalY = arrowSize + this.height + offset
        // 左右位（横轴）对应的距离左边的距离
        const horizontalX = this.width + arrowSize + offset
        // 左右位（横轴）对应的距离底部的距离
        const horizontalY = this.height / 2
        const placements = new Map([
          // 上
          ['top', [
            `left: ${verticalX}px; bottom: ${verticalY}px; transform: translateX(-50%);`,
            'left: 50%;'
          ]],
          ['top-start', [
            `left:${0}; bottom: ${verticalY}px;`,
            `left: ${this.popWidth >= this.width ? this.width / 2 : this.popWidth - 25}px;`
          ]],
          ['top-end', [
            `right: ${0}; bottom: ${verticalY}px;`,
            `right: ${this.popWidth >= this.width ? this.width / 2 : this.popWidth - 25}px; transform: translateX(50%);`
          ]],
          // 下
          ['bottom', [
            `left: ${verticalX}px; top: ${verticalY}px; transform: translateX(-50%);`,
            'left: 50%;'
          ]],
          ['bottom-start', [
            `left:${0}; top: ${verticalY}px;`,
            `left: ${this.popWidth >= this.width ? this.width / 2 : this.popWidth - 25}px;`
          ]],
          ['bottom-end', [
            `right: ${0}; top: ${verticalY}px;`,
            `right: ${this.popWidth >= this.width ? this.width / 2 : this.popWidth - 25}px; transform: translateX(50%);`
          ]],
          // 左
          ['left', [
            `right: ${horizontalX}px; top: ${horizontalY}px; transform: translateY(-50%);`,
            'top: 50%'
          ]],
          ['left-start', [
            `right: ${horizontalX}px; top: ${0};`,
            `top: ${this.popHeight >= this.height ? this.height / 2 : this.popHeight - 20}px;`
          ]],
          ['left-end', [
            `right: ${horizontalX}px; bottom: ${3}px;`,
            `bottom: ${this.popHeight >= this.height ? this.height / 2 : this.popHeight - 20}px; transform: translateY(50%);`
          ]],
          // 右
          ['right', [
            `left: ${horizontalX}px; top: ${horizontalY}px; transform: translateY(-50%);`,
            'top: 50%'
          ]],
          ['right-start', [
            `left: ${horizontalX}px; top: ${0};`,
            `top: ${this.popHeight >= this.height ? this.height / 2 : this.popHeight - 20}px;`
          ]],
          ['right-end', [
            `left: ${horizontalX}px; bottom: ${3}px;`,
            `bottom: ${this.popHeight >= this.height ? this.height / 2 : this.popHeight - 20}px; transform: translateY(50%);`
          ]]
        ])

        this.setData({
          popStyle: placements.get(placement)[0],
          arrowStyle: placements.get(placement)[1]
        })
      }
    }
  }
}