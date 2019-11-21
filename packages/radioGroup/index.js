import VueComponent from '../common/component'

VueComponent({
  relations: {
    '../radio/index': {
      type: 'child',
      linked (child) {
        this.children = this.children || new Map()
        if (this.children.get(child.nodeName)) {
          throw Error(`The radio's bound value: ${child.nodeName} has been used `)
        }
        this.children.set(child.nodeName, child)
      },
      unlinked (child) {
        this.children = this.children.delete(child.nodeName)
      }
    }
  },
  props: {
    value: {
      type: null,
      observer (value, old) {
        // 类型校验，支持所有值(除null、undefined。undefined建议统一写成void (0)防止全局undefined被覆盖)
        if (value === null || value === undefined) {
          throw Error('value can\'t be null or undefined')
        }
        // prop初始化watch执行时，relations关系还没有建立，所以ready之后手动执行一下
        if (old !== null) {
          this.changeSelect(value)
        }
      }
    },
    shape: {
      type: String,
      value: 'circle',
      observer (value) {
        // type: 'circle', 'dot', 'button'
        const type = ['circle', 'dot', 'button']
        if (type.indexOf(value) === -1) throw Error(`circle must be one of ${type.toString()}`)
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
    }
  },
  data: {
    // 当前选中的节点
    select: null
  },
  methods: {
    /**
     * @description 为child在map的key重命名
     * @param newName
     * @param oldName
     */
    renameChild (newName, oldName) {
      if (!this.children || this.children.size === 0) return
      // 此名已经被其它child占用，说用存在重复的value
      if (this.children.get(newName)) {
        throw Error(`The radio's bound value: ${newName} has been used `)
      }
      // 重命名操作
      const willRenameChild = this.children.get(oldName)
      if (!willRenameChild) return
      this.children.set(newName, willRenameChild)
      this.children.delete(oldName)
      // 同步替换
      if (this.data.select === oldName) {
        this.data.select = newName
      }
    },
    /**
     * 修改select的节点
     * @param value
     */
    changeSelect (value) {
      if (
        !this.children ||
        this.children.size === 0 ||
        value === this.data.select
      ) {
        return
      }
      // 存在两种情况
      // 1.切换选中的节点，关闭老节点的样式
      // 2.初始化匹配group的value，为新节点设置样式
      if (this.data.select) {
        // 老节点关闭
        this.children.get(this.data.select).setData({ isChecked: false })
      }
      // 新节点开启
      const newChild = this.children.get(value)
      // 有可能新节点不存在，这时候啥也不做
      if (newChild) {
        newChild.setData({ isChecked: true })
        this.setData({ select: value })
        this.$emit('change', value)
      } else {
        this.setData({ select: null })
      }
    },
    /**
     * @description 使用父元素的Props覆盖子元素Props中值为null的key
     * @param Props
     */
    updateAllChild (data) {
      const keys = Object.keys(data)
      if (!data || keys.length === 0) return

      this.children && this.children.forEach(child => {
        const will = {}
        keys.forEach(key => {
          if (data[key] !== null && data[key] !== undefined && child.data[key] === null) {
            will[key] = data[key]
          }
        })
        child.setData(will)
      })
    }
  },
  mounted () {
    // 用radioGroup的props覆盖radio中props值为null的key
    const { shape, checkedColor, disabled } = this.data
    this.updateAllChild({
      shape,
      checkedColor,
      disabled
    })
    // ready时，如果 group绑定了value，对单选框进行一次匹配
    this.data.value && this.changeSelect(this.data.value)
  }
})