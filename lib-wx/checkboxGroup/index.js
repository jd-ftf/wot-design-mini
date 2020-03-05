import VueComponent from '../common/component';
import { checkNumRange, debounce } from '../common/util';
VueComponent({
  relations: {
    '../checkbox/index': {
      type: 'descendant',

      linked(child) {
        this.children = this.children || [];
        this.children.push(child);
      },

      unlinked(target) {
        const index = this.children.indexOf(target);
        this.children = this.children.filter(child => child !== target); // 如果当前删除的组件为第一个组件，将剩下的组件的第一个设置isFirst为true

        if (index === 0 && this.children.length > 0) {
          this.children[0].setData({
            isFirst: true
          });
        }
      }

    }
  },
  props: {
    value: {
      type: Array,
      value: [],

      observer(value, oldVal) {
        // 传入的value数组中包括重复的元素，这种情况非法。
        if (new Set(value).size !== value.length) {
          throw Error('checkboxGroup\'s bound value includes same value');
        }

        if (value.length < this.data.min) {
          throw Error('checkboxGroup\'s bound value\'s length can\'t be less than min');
        }

        if (this.data.max !== 0 && value.length > this.data.max) {
          throw Error('checkboxGroup\'s bound value\'s length can\'t be large than max');
        } // 每次value变化都会触发重新匹配选中项


        this.children && this.children.length > 0 && this.resetChildren();
      }

    },
    shape: {
      type: String,
      value: 'circle',

      observer(value) {
        const type = ['circle', 'square', 'button'];
        if (type.indexOf(value) === -1) throw Error(`shape must be one of ${type.toString()}`);
        this.updateAllChild({
          shape: value
        });
      }

    },
    checkedColor: {
      type: String,
      value: '#0083ff',

      observer(value) {
        this.updateAllChild({
          checkedColor: value
        });
      }

    },
    disabled: {
      type: Boolean,
      value: false,

      observer() {
        // 当值修改时需要重新检测
        this.resetChildren();
      }

    },
    min: {
      type: Number,
      value: 0,

      observer(value) {
        checkNumRange(value, 'min'); // 当值修改时需要重新检测

        this.resetChildren();
      }

    },
    max: {
      type: Number,
      value: 0,

      observer(value) {
        checkNumRange(value, 'max'); // 当值修改时需要重新检测

        this.resetChildren();
      }

    },
    inline: {
      type: Boolean,
      value: false,

      observer(value) {
        this.updateAllChild({
          inline: value
        });
      }

    }
  },
  methods: {
    /**
     * @description 当和child建立relation后，用checkboxGroup的props覆盖checkbox中props值为null的属性。
     * @param {Object} data 属性键值对
     */
    updateAllChild(data) {
      const keys = Object.keys(data);
      this.children && this.children.forEach(child => {
        const will = {};
        keys.forEach(key => {
          if (data[key] !== null && data[key] !== undefined && child.data[key] === null) {
            will[key] = data[key];
          }
        });
        child.setData(will);
      });
    },

    /**
     * @description 修改父组件的 value，同时检查设置所有子组件
     * @param {*} value 子组件的 value
     */
    changeValue(value) {
      // slice 会导致 value 触发 observer
      const temp = this.data.value;
      const index = temp.indexOf(value);

      if (index > -1) {
        temp.splice(index, 1);
      } else {
        temp.push(value);
      }

      this.setData({
        value: temp
      });
      this.resetChildren(temp);
      this.$emit('change', temp);
    },

    /**
     * @description 检查设置子组件的 isChecked 和 finalDisabled
     * @param {array}} values
     */
    resetChildren(values) {
      values = values || this.data.value;
      const {
        min,
        max,
        disabled
      } = this.data;
      this.children && this.children.forEach(child => {
        const isChecked = values.indexOf(child.data.value) > -1;
        child.setData({
          isChecked,
          finalDisabled: child.data.disabled || disabled || min && values.length <= min && isChecked || max && values.length >= max && !isChecked
        });
      });
    }

  },

  beforeCreate() {
    // 设置防抖，避免修改 props(min, max, disabled) 触发多次
    this.resetChildren = debounce(this.resetChildren, 50);
  }

});