Component({
  properties: {
    checked: null,
    loading: Boolean,
    disabled: Boolean,
    activeColor: String,
    inactiveColor: String,
    currentColor:String,
    test:Boolean,
    backgroundColor:String,
    size: {
      type: String,
      value: '30px'
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
      this.bgColorControl();
    },

  },
  created() {
    this.setData({ value: this.data.checked });
    
  },

  methods: {
    handleClick() {
      const { activeValue, inactiveValue } = this.data;
      
      this.setData({
        checked:!this.data.checked 
      });

      if (!this.data.disabled && !this.data.loading) {
        const checked = this.data.checked === activeValue;
        const value = checked ? inactiveValue : activeValue;
        this.triggerEvent('input', value);
        this.triggerEvent('change', value);
      }
    },
    bgColorControl(){
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