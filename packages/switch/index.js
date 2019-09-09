Component({
  properties: {
    checked: null,
    loading: Boolean,
    disabled: Boolean,
    asyncChange: Boolean,

    activeColor: String,
    inactiveColor: String,
    activeTextColor: String,
    inactiveTextColor: String,
    backgroundColor:String,
    fontColor:String,

    inactiveText:String,
    activeText:String,
    activeTextColor: {
      type: String,
      value:'white'
    },
    inactiveTextColor: {
      type: String,
      value:'gray'
    },
    display:{
      type: String,
      value: 'inline-block'
    },
    size: {
      type: Number,
      value: 2
    },
    fontSize:{
      type: String,
      value:'12px'
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
      this.colorControl();
    },

  },
  created() {
    this.setData({ value: this.data.checked });
  },

  methods: {
    handleClick() {
      const { activeValue, inactiveValue,disabled } = this.data;
      let { loading } = this.data;

        if (!disabled) {
          const checked = this.data.checked === activeValue;
          const value = checked ? inactiveValue : activeValue;
          
          this.setData({
            checked:this.data.asyncChange ? this.data.checked : !this.data.checked 
          });

          this.triggerEvent('input', value);
          this.triggerEvent('change', value);
        }
      
    },
    colorControl(){
      // background-color
      // {{ (checked ? activeColor : inactiveColor) ? 'background-color: ' + (checked ? activeColor : inactiveColor ) : '' }}
      const { checked,activeColor,inactiveColor } = this.data;
      if ( activeColor ) {
        this.setData({
          backgroundColor : checked ? activeColor : inactiveColor
        })
      }
    }
  }
});