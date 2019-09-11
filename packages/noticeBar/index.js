const FONT_COLOR = '#ed6a0c';
const BG_COLOR = '#fffbe8';

Component({
  externalClasses: ["hover-class"],
  properties: {
    animation:Object,
    text:String,
    textRect:Number,
    wrapRect:Number,
    mode:{
      type:String,
      value:""
    },
    // true : 多行显示 || false：单行
    wrapabled:{
      type:Boolean,
      value:false
    },
    showIcon:{
      type:Boolean,
      value:true
    },
    closeable:{
      type:Boolean,
      value:false
    },
    delay: {
      type: Number,
      value: 1
    },
    speed: {
      type: Number,
      value: 50
    },
    // 默认滚动
    scrollable: {
      type: Boolean,
      value: true
    },
    leftIcon: {
      type: String,
      value: ''
    },
    color: {
      type: String,
      value: FONT_COLOR
    },
    backgroundColor: {
      type: String,
      value: BG_COLOR
    },
    show:{
      type:Boolean,
      value:true
    }
  },
  observers:{
    wrapabled() {
      const { wrapabled } = this.data;
      if( wrapabled ) {
        this.setData({
          scrollable : false
        })
      }
    }
  },

  ready() {
    this.init();
  },

  methods: {
    /**
     * 微信小程序获取节点信息
     * @param select 选择器 
     */
    getRect(select) {
      const _this = this;
      return new Promise((resolve,reject)=>{
        _this.createSelectorQuery()
            .select(select)
            .boundingClientRect(rects => {
                if(rects){
                    resolve(Math.ceil(rects.width));
                }
        }).exec();
      })
    },

    init(){
      Promise.all([
        this.getRect('.jmd__noticeBarContainer--text'),
        this.getRect('.jmd__noticeBarContainer--textWrapper')
      ]).then( (arr) => {
        this.setData ({
          textRect : arr[0],
          wrapRect : arr[1]
        })        
        this.scroll();
      })
    },

    /**
     * 滚动动画
     * 如果外层宽度 大于 内层文字宽度 || 设定不滚动 ，则不需要动画
     */
    scroll(){
      const { speed, scrollable, delay, wrapRect, textRect } = this.data;

      if( wrapRect < textRect && scrollable) {
        const duration = (textRect / speed) * 1000;
        let scrollWidth = textRect + wrapRect;
        this.initAnimation(duration, 'linear', delay, scrollWidth);
      } else if (wrapRect >= textRect) {
        this.setData({
          scrollable : false
        });
      }

    },

    /**
     * 动画初始化函数 
     * @param duration 
     * @param timingFunction 
     * @param delay 
     * @param scrollWidth 
     */
    initAnimation(duration, timingFunction, delay, scrollWidth) {
      let animation = wx.createAnimation({
        duration: duration,
        timingFunction: timingFunction,
        delay: delay
      });
      animation.translateX(-scrollWidth).step();
      this.setData({
        animation:  animation.export()
      });
    },

    transitionEnd() {
      const _this = this;
      // 复位操作
      this.initAnimation(0, 'linear', 0, 0);
      // 延时，没有延时函数动画不生效,延时时间不能过短
      setTimeout(()=>{
        _this.scroll();
      },20);
    },
    closeNotice() {
        this.setData({
          show : false
        })
    }
  }
});