import VueComponent from '../common/component'

VueComponent({
  relations: {
    '../radio/index': {
      type: 'child',
      linked (child) {
        // 在建立relations时radioGroup保存radio实例中的value，注意value的唯一性。
        const key = child.data.value
        // 此radio绑定的value已经被radio占用
        this.children = this.children || new Map()
        if (this.children.get(key)) {
          throw Error(`The radio's bound value: ${key} has been used `)
        }
        this.children.set(key, child)
      },
      unlinked (child) {
        this.children && this.children.delete(child.data.value)
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
          // radioGroup绑定的value变化，，立即切换到此value对应的radio
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
    // 当前选中的radio绑定的value
    select: null
  },
  methods: {
    /**
     * @description 重命名radio在hash(保存所有radio实例)表中的key，key冲突抛出异常
     * @param newName
     * @param oldName
     */
    renameChild (newName, oldName) {
      if (!this.children || this.children.size === 0) return
      // radio不允许绑定重复的value，否则就不是单选框了。此value已经被其它radio绑定。
      if (this.children.get(newName)) {
        throw Error(`The radio's bound value: ${newName} has been used `)
      }
      // radio更换绑定的value，需要同步修改以value为key的radio实例哈希表
      const willRenameChild = this.children.get(oldName)
      if (!willRenameChild) return
      this.children.set(newName, willRenameChild)
      this.children.delete(oldName)
      /**
       * 如果此radio恰巧被radioGroup选中，那么他重命名相当于取消选择选中状态了。
       * 此时把select置空,并将其关闭
       */
      if (this.data.select === oldName) {
        this.setData({ select: null })
        willRenameChild.setData({ isChecked: false })
      }
    },
    /**
     * 修改选中的radio
     * @param value - radio绑定的value
     */
    changeSelect (value) {
      // 没有radio子元素，不执行任何操作
      if (
        !this.children ||
        this.children.size === 0 ||
        value === null
      ) {
        return
      }
      // 选中新节点之前，关闭老节点
      // 如果之前没有选中
      if (
        this.data.select !== null &&
        this.data.select !== value
      ) {
        /**
         * 如果之前存在选中的值，则把之前的关闭掉
         * 已经被选中的select和即将被选中的radio的value不一致，则把以前radio关闭
         */
        this.children.get(this.data.select).setData({ isChecked: false })
      }
      const newChild = this.children.get(value)
      // 如果radio实例存在,并且此radio没被选中,再去选中radio才有意义
      if (newChild && value !== this.data.select) {
        // 选中此实例
        newChild.setData({ isChecked: true })
        this.setData({ select: value })
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
        keys.forEach(key => {
          if (
            data[key] === null ||
            data[key] === undefined ||
            child.data[key] !== null
          ) {
            delete data[key]
          }
        })
        child.setData(data)
      })
    },
    /**
     * @description 处理radio子节点通知
     */
    handleClick (value) {
      this.$emit('change', value)
    }
  },
  mounted () {
    // 用radioGroup的props覆盖radio中props值为null的属性
    const { shape, checkedColor, disabled } = this.data
    this.updateAllChild({
      shape,
      checkedColor,
      disabled
    })
  }
})