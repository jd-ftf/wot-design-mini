Component({
  properties: {
    disabled: Boolean,
    asyncChange: Boolean,
    minusDisabled:Boolean,
    plusDisabled:Boolean,
    inputDisabled:Boolean,

    minusLock:Boolean,
    plusLock:Boolean,
    inputLock:Boolean,

    integer:Boolean,
    
    // input：'number' / 'digit'
    type: {
      type: String,
      value: "number"
    },

    value: {
      type: Number,
      value: 1
    },
    min: {
      type: Number,
      value: -Infinity
    },
    max: {
      type: Number,
      value: Infinity
    },
    step: {
      type: Number,
      value: 1
    }
  },
  observers:{
    value() {
      const { min } = this.data;
      const { disabled } = this.data;
      const { max } = this.data;
      let { value } = this.data;

      this.lock(this.data.inputLock,( value <=  min ||  value>= max ||  disabled ),"inputDisabled");
      this.lock(this.data.minusLock ,( value <=  min ||  disabled ),"minusDisabled");
      this.lock(this.data.plusLock,( value >=  max ||  disabled ),"plusDisabled");

      if (value > max) {
        this.setData({
          value : max
        })
      } else if (value < min) {
        this.setData({
          value : min
        })
      }
    }
  },
  methods: {
    /**
     * value 过滤
     * @param value
     * @returns {number}
     */
    range(value) {
      value = String(value).replace(/[^0-9.-]/g, '');
      return Math.max(Math.min(this.data.max, value), this.data.min);
    },
    /**
     * 管理禁用状态
     * @param isLock  上锁属性
     * @param express  表达式
     * @param key  键名
     */
    lock(isLock,express,key) {
      if (isLock) {
        this.setData({[key]:true});
      } else {
        if (express) {
          this.setData({[key]:true});
        } else {
          this.setData({[key]:false});
        }
      }
    },
    /**
     * 数据处理：避免二进制表示数值时发生round-off error
     * @param  value
     * @param  step
     */
    addNum (value, step) {
      let valueLength, stepLength, m;
      try {
        valueLength = value.toString().split('.')[1].length;
      }
      catch (e) {
        valueLength = 0;
      }
      try {
        stepLength = step.toString().split('.')[1].length;
      }
      catch (e) {
        stepLength = 0;
      }
      m = Math.pow(10, Math.max(valueLength, stepLength));
      return (Math.round(value * m) + Math.round(step * m)) / m;
    },
    handleFocus(e) {
      this.triggerEvent('focus', e.detail);
    },
    /**
     * 加减操作引发的change
     * @param e
     * @param type
     */
    handleChangeStep(e, type) {
      const { dataset = {} } = e.currentTarget;
      const { disabled } = dataset;
      const { step } = this.data;
      let { value } = this.data;

      if (disabled) return null;

      if (type === 'minus') {
        value = this.addNum(value, -step);
      } else if (type === 'plus') {
        value = this.addNum(value, step);
      }

      if (value < this.data.min || value > this.data.max) return null;

      this.handleEmit(value, type);
    },
    handleInput(e){
      this.triggerEvent('input', e.detail);
    },
    /**
     * 减
     * @param e
     */
    handleMinus(e) {
      this.handleChangeStep(e, 'minus');
    },
    /**
     * 点击添加按钮触发 加
     * @param e
     */
    handlePlus(e) {
      this.handleChangeStep(e, 'plus');
    },
    /**
     * 监听input
     * @param e
     */
    handleBlur(e) {
      let { value } = e.detail;
      value = this.range(value);
      this.handleEmit(value);
      this.triggerEvent('blur', e.detail);
    },
    /**
     * 向父组件传值
     * @param value
     * @param type
     */
    handleEmit (value, type) {
      const data = {
        value: value
      };
      this.setData({
        value: this.data.asyncChange ? this.data.value : value
      });
      if (type) data.type = type;
      this.triggerEvent('change', data);
    }
  }
});