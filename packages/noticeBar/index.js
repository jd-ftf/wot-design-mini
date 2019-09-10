const FONT_COLOR = '#ed6a0c';
const BG_COLOR = '#fffbe8';

Component({
  
  properties: {
    ani:Object,
    text:String,
    textRect:Number,
    wrapRect:Number,
    delay: {
      type: Number,
      value: 1
    },
    speed: {
      type: Number,
      value: 100
    },
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
  },
  observers:{
    ani(){
      console.log("更改了",this.data.ani)
    }
  },
  ready() {
    this.init();
  },

  methods: {
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

      if (scrollable && wrapRect < textRect) {
        const duration = (textRect / speed) * 1000;
        let scrollWidth = textRect + wrapRect;
        this.initAnimation(duration, 'linear', delay, scrollWidth)
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
        ani:  animation.export()
      });
    },
    transitionEnd() {
      
      const _this = this;
      // 复位操作
      this.initAnimation(0, 'linear', 0, 0);
      // 延时，没有延时函数动画不生效,延时时间不能过短
      setTimeout(()=>{
        console.log("jieshu")
        _this.scroll();
      },20);
    },
  }
});