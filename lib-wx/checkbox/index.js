import VueComponent from '../common/component';
VueComponent({
  relations: {
    '../checkboxGroup/index': {
      type: 'ancestor',

      linked(target) {
        this.parent = target;
        this.checkName(this, this.data.value);
        const {
          shape,
          checkedColor,
          inline
        } = this.parent.data;
        const data = {
          shape,
          checkedColor,
          inline
        };
        const keys = Object.keys(data);
        const will = {};
        keys.forEach(key => {
          if (data[key] !== null && data[key] !== undefined && this.data[key] === null) {
            will[key] = data[key];
          }
        });
        this.setData(will);
        this.setData({
          isChecked: this.parent.data.value.indexOf(this.data.value) > -1,
          isFirst: this.parent.children.length === 1
        }); // disabled 单独设置

        this.checkDisabled();
      },

      unlinked() {
        this.parent = null;
      }

    }
  },
  props: {
    value: {
      type: null,

      observer(value) {
        if (value === null || value === undefined) {
          throw Error('checkbox\'s value can\'t be null or undefined');
        }

        if (!this.data.inited) return; // 组合使用走这个逻辑

        if (this.parent) {
          this.checkName();
          return this.parent.resetChildren();
        }

        this.setData({
          isChecked: value === this.data.trueValue
        });
      }

    },
    shape: {
      type: String,
      value: null,

      observer(target) {
        const type = ['circle', 'square', 'button'];
        if (type.indexOf(target) === -1) throw Error(`shape must be one of ${type.toString()}`);
      }

    },
    checkedColor: {
      type: String,
      value: null
    },
    disabled: {
      type: Boolean,
      value: false,

      observer() {
        this.checkDisabled();
      }

    },
    trueValue: {
      type: null,
      value: true
    },
    falseValue: {
      type: null,
      value: false
    }
  },
  data: {
    isChecked: false,
    inited: false,
    isFirst: false,
    finalDisabled: false,
    inline: null
  },
  methods: {
    /**
     * @description 检测checkbox绑定的value是否和其它checkbox的value冲突
     * @param {Object} self 自身
     * @param  myName 自己的标识符
     */
    checkName(self = this, myName = this.data.value) {
      this.parent && this.parent.children.forEach(node => {
        if (node !== self && node.data.value === myName) {
          throw Error(`The checkbox's bound value: ${myName} has been used`);
        }
      });
    },

    /**
     * @description 点击checkbox的Event handle
     */
    toggle() {
      const {
        value,
        finalDisabled,
        trueValue,
        falseValue
      } = this.data;
      if (finalDisabled) return; // 复选框单独使用时点击反选，并且在checkbox上触发change事件

      if (this.parent) {
        this.parent.changeValue(value);
      } else {
        const newVal = value === trueValue ? falseValue : trueValue;
        this.setData({
          value: newVal
        });
        this.$emit('change', newVal);
      }
    },

    /**
     * @description 检查设置实际 disabled 情况，需要考虑父组件的 min, max 和 value.length 的关系
     */
    checkDisabled() {
      if (this.parent) {
        const {
          min,
          max,
          disabled,
          value
        } = this.parent.data;
        this.setData({
          finalDisabled: this.data.disabled || disabled || min && value.length <= min && this.data.isChecked || max && value.length >= max && !this.data.isChecked
        });
      } else {
        this.setData({
          finalDisabled: this.data.disabled
        });
      }
    }

  },

  created() {
    if (this.data.value === null) throw Error('checkbox\'s value must be set');
    this.setData({
      inited: true
    });
  },

  mounted() {
    // 如果没有父组件，设置 isChecked
    if (!this.parent) {
      this.setData({
        isChecked: this.data.value === this.data.trueValue,
        isFirst: true
      });
    }
  }

});