Component({
  externalClasses: ["hover-class","node-class","input-class"],
  properties: {
    checked: null,
    loading: Boolean,
    disabled: Boolean,
    asyncChange: Boolean,

    backgroundColor:String,
    fontColor:String,
    display:{
      type: String,
      value: 'inline-block'
    },
    // 激活状态
    activeValue: {
      type: null,
      value: true
    },
    // 关闭状态
    inactiveValue: {
      type: null,
      value: false
    }
  },
  observers:{
    checked(value) {
      this.setData({ value });
    },

  },
  created() {
    this.setData({ value: this.data.checked });
  },

  methods: {
    handleClick() {
      const { activeValue, inactiveValue,disabled } = this.data;

        if (!disabled) {
          const checked = this.data.checked === activeValue;
          const value = checked ? inactiveValue : activeValue;
          
          this.setData({
            checked:this.data.asyncChange ? this.data.checked : !this.data.checked 
          });
          this.triggerEvent('change', value);
        }
    },
  }
});