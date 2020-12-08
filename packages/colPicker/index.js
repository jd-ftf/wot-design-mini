import VueComponent from '../common/component'
import { getType, debounce } from '../common/util'
import cell from '../mixins/cell'

const $container = '.wd-col-picker__selected-container'
const $item = '.wd-col-picker__selected-item'

VueComponent({
  externalClasses: [
    'custom-view-class',
    'custom-label-class',
    'custom-value-class'
  ],
  behaviors: [cell, 'jd://form-field'],
  relations: {
    '../cellGroup/index': {
      type: 'ancestor',
      linked (target) {
        this.parent = target
      },
      unlinked () {
        this.parent = null
      }
    }
  },
  data: {
    pickerShow: false,
    currentCol: 0,
    selectList: [],
    pickerColSelected: [],
    selectShowList: [],
    loading: false,
    showValue: '',
    isChange: false,
    lastSelectList: [],
    lastPickerColSelected: [],
    lineStyle: {},
    scrollLeft: 0
  },
  props: {
    value: {
      type: Array,
      observer (val) {
        if (val === this.data.pickerColSelected) return

        this.setData({
          pickerColSelected: val,
          selectShowList: val.map((item, colIndex) => {
            return this.getSelectedItem(item, colIndex, this.data.selectList)[this.data.labelKey]
          }),
          lastPickerColSelected: val
        })
        this.setShowValue(val)
      }
    },
    columns: {
      type: Array,
      observer (val) {
        if (val.length && !(val[0] instanceof Array)) {
          console.error('[wot design] error: the columns props of wd-col-picker should be a two-dimensional array')
          return
        }

        const newSelectedList = val.slice(0)
        this.setData({
          selectList: newSelectedList,
          selectShowList: this.data.pickerColSelected.map((item, colIndex) => {
            return this.getSelectedItem(item, colIndex, newSelectedList)[this.data.labelKey]
          }),
          lastSelectList: newSelectedList
        })

        if (newSelectedList.length > 0) {
          this.setData({
            currentCol: newSelectedList.length - 1
          })
          this.setShowValue(this.data.value)
        }
      }
    },
    label: String,
    labelWidth: String,
    useLabelSlot: Boolean,
    useDefaultSlot: Boolean,
    disabled: Boolean,
    readonly: Boolean,
    placeholder: String,
    title: String,
    columnChange: {
      type: null,
      observer (fn) {
        if (getType(fn) !== 'function') {
          throw Error('The type of columnChange must be Function')
        }
      }
    },
    // 外部展示格式化函数
    displayFormat: {
      type: null,
      observer (fn) {
        if (getType(fn) !== 'function') {
          throw Error('The type of displayFormat must be Function')
        }
      }
    },
    beforeConfirm: {
      type: null,
      observer (fn) {
        if (getType(fn) !== 'function') {
          throw Error('The type of beforeConfirm must be Function')
        }
      }
    },
    alignRight: Boolean,
    error: Boolean,
    required: Boolean,
    size: String,
    valueKey: {
      type: String,
      value: 'value'
    },
    labelKey: {
      type: String,
      value: 'label'
    },
    tipKey: {
      type: String,
      value: 'tip'
    },
    loadingColor: {
      type: String,
      value: '#4D80F0'
    }
  },
  methods: {
    // 对外暴露方法，打开弹框
    open () {
      this.showPicker()
    },
    // 对外暴露方法，关闭弹框
    close () {
      this.handlePickerClose()
    },
    handlePickerClose () {
      this.setData({
        pickerShow: false
      })
      const { isChange, lastSelectList, lastPickerColSelected } = this.data
      if (isChange) {
        setTimeout(() => {
          this.setData({
            selectList: lastSelectList,
            pickerColSelected: lastPickerColSelected,
            selectShowList: lastPickerColSelected.map((item, colIndex) => {
              return this.getSelectedItem(item, colIndex, lastSelectList)[this.data.labelKey]
            }),
            currentCol: lastSelectList.length - 1,
            isChange: false
          })
        }, 250)
      }
      this.$emit('close')
    },
    showPicker () {
      const { disabled, readonly } = this.data

      if (disabled || readonly) return

      this.setData({
        pickerShow: true
      }, () => {
        setTimeout(() => {
          this.updateLineAndScroll()
        }, 30)
      })
    },
    getSelectedItem (value, colIndex, selectList) {
      const { valueKey, labelKey } = this.data

      if (selectList[colIndex]) {
        const selecteds = selectList[colIndex].filter(item => {
          return item[valueKey] === value
        })

        if (selecteds.length > 0) {
          return selecteds[0]
        }
      }

      return {
        [valueKey]: value,
        [labelKey]: ''
      }
    },
    chooseItem (event) {
      const { colIndex, index } = event.currentTarget.dataset
      const item = this.data.selectList[colIndex][index]
      if (item.disabled) return

      const { pickerColSelected, valueKey, selectList, columnChange, beforeConfirm } = this.data

      const newPickerColSelected = pickerColSelected.slice(0, colIndex)
      newPickerColSelected.push(item[valueKey])
      this.setData({
        isChange: true,
        pickerColSelected: newPickerColSelected,
        selectShowList: newPickerColSelected.map((item, colIndex) => {
          return this.getSelectedItem(item, colIndex, selectList)[this.data.labelKey]
        }),
        loading: true,
        selectList: selectList.slice(0, colIndex + 1)
      })
      columnChange({
        selectedItem: item,
        index: colIndex,
        rowIndex: index,
        resolve: (nextColumn) => {
          if (!(nextColumn instanceof Array)) {
            console.error('[wot design] error: the data of each column of wd-col-picker should be an array')
            return
          }

          const newSelectList = [...this.data.selectList, nextColumn]
          this.setData({
            selectList: newSelectList,
            loading: false,
            currentCol: colIndex + 1
          }, () => {
            this.updateLineAndScroll(true)
          })
        },
        finish: (isOk) => {
          if (getType(isOk) === 'boolean' && !isOk) {
            this.setData({
              loading: false
            })
            return
          }

          if (beforeConfirm) {
            beforeConfirm(this.data.pickerColSelected, this.data.pickerColSelected.map((item, colIndex) => {
              return this.getSelectedItem(item, colIndex, this.data.selectList)
            }), (isPass) => {
              if (isPass) {
                this.onConfirm()
              } else {
                this.setData({
                  loading: false
                })
              }
            })
          } else {
            this.onConfirm()
          }
        }
      })
    },
    onConfirm () {
      this.setData({
        isChange: false,
        loading: false,
        pickerShow: false,
        lastPickerColSelected: this.data.pickerColSelected,
        lastSelectList: this.data.selectList,
        value: this.data.pickerColSelected
      })
      this.setShowValue(this.data.pickerColSelected)
      this.$emit('confirm', {
        value: this.data.pickerColSelected,
        selectedItems: this.data.pickerColSelected.map((item, colIndex) => {
          return this.getSelectedItem(item, colIndex, this.data.selectList)
        })
      })
    },
    handleColClick ({ target: { dataset: { index } } }) {
      this.setData({
        isChange: true,
        currentCol: index
      }, () => {
        this.updateLineAndScroll(true)
      })
    },
    /**
     * @description 更新navBar underline的偏移量
     * @param {Boolean} animation 是否伴随动画
     */
    setLineStyle (animation = true) {
      if (!this.inited) return
      const { currentCol } = this.data
      this.getRect($item, true).then((rects) => {
        const rect = rects[currentCol]
        // const width = lineWidth || (slidableNum < items.length ? rect.width : (rect.width - 14))
        const width = 16
        let left = rects.slice(0, currentCol).reduce((prev, curr) => prev + curr.width, 0)
        left += (rect.width - width) / 2
        const transition = animation
          ? 'transition: width 300ms ease, transform 300ms ease;'
          : ''

        const lineStyle = `
          transform: translateX(${left}px);
          ${transition}
        `
        // 防止重复绘制
        this.data.lineStyle !== lineStyle && this.setData({ lineStyle })
      })
    },
    /**
     * @description scroll-view滑动到active的tab_nav
     */
    lineScrollIntoView () {
      if (!this.inited) return
      const { currentCol } = this.data
      Promise.all([
        this.getRect($item, true),
        this.getRect($container)
      ]).then(([navItemsRects, navRect]) => {
        if (navItemsRects.length === 0) return
        // 选中元素
        const selectItem = navItemsRects[currentCol]
        // 选中元素之前的节点的宽度总和
        const offsetLeft = navItemsRects.slice(0, currentCol).reduce((prev, curr) => prev + curr.width, 0)
        // scroll-view滑动到selectItem的偏移量
        const scrollLeft = offsetLeft - (navRect.width - selectItem.width) / 2
        this.setData({ scrollLeft })
      })
    },
    setShowValue (value) {
      const selectedItems = value.map((item, colIndex) => {
        return this.getSelectedItem(item, colIndex, this.data.selectList)
      })

      if (this.data.displayFormat) {
        this.setData({
          showValue: this.data.displayFormat(selectedItems)
        })
      } else {
        this.setData({
          showValue: selectedItems.map(item => {
            return item[this.data.labelKey]
          }).join('')
        })
      }
    }
  },
  beforeCreate () {
    this.updateLineAndScroll = debounce(function (animation = true) {
      this.setLineStyle(animation)
      this.lineScrollIntoView()
    }, 50)
  },
  mounted () {
    this.inited = true
  }
})