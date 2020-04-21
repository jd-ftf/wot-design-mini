import VueComponent from '../common/component';
let ARRAY = [];
VueComponent({
  data: {
    // 保存的永远是当前选中的值
    titleList: [],
    disabled: false,
    // -1表示折叠
    currentIndex: -1
  },
  props: {
    activeColor: {
      type: String,
      value: '#0083ff',
      observer: 'updateChildData'
    },
    zIndex: {
      type: Number,
      value: 12,
      observer: 'updateChildData'
    },
    direction: {
      type: String,
      value: 'down',

      observer(newValue) {
        if (newValue !== 'up' && newValue !== 'down') {
          this.setData({
            direction: 'down'
          });
          console.warn('direction must be \'up\' or \'down\'');
        }

        this.updateChildData();
      }

    },
    useDropMenuSlot: Boolean
  },
  relations: {
    '../dropMenuItem/index': {
      type: 'child',

      linked(target) {
        this.children = this.children || [];
        this.children.push(target);
      },

      unlinked(target) {
        this.children = this.children.filter(child => child !== target);
      }

    }
  },

  created() {
    const {
      windowHeight
    } = jd.getSystemInfoSync();
    this.windowHeight = windowHeight;
    this.children = [];
    ARRAY.push(this);
  },

  destroyed() {
    ARRAY = ARRAY.filter(item => item !== this);
  },

  mounted() {
    const {
      direction
    } = this.data;
    this.resetChooseValue();
    this.getRect('.wd-drop-menu').then(rect => {
      if (!rect) return;
      const {
        top,
        bottom
      } = rect;
      this.children.forEach(item => {
        if (direction === 'up') {
          item.set('positionStyle', `bottom: ${this.windowHeight - top}px`);
        } else {
          item.set('positionStyle', `top: ${bottom}px`);
        }
      });
    });
  },

  methods: {
    checkType(value) {
      return Object.prototype.toString.call(value).slice(8, -1);
    },

    updateChildData() {
      // 更改后触发子节点全部更新
      this.children && this.children.forEach((item, index) => {
        item.init();
      });
    },

    toggle(event) {
      // 如果重复展开相同的选项，则折叠选项卡
      const {
        index
      } = event.currentTarget.dataset;
      const child = this.children[index]; // 点击当前 menu, 关闭其他 menu

      if (!child.data.disabled) {
        ARRAY.forEach(item => {
          if (item && item !== this) {
            // 如果点击的不是当前 menu 关闭其他的 menu
            item.fold(-1);
          }
        });
        this.fold(index);
      }
    },

    /**
     * 控制菜单内容是否展开
     * @param {Number} currentIndex 当前选的索引
     */
    fold(currentIndex) {
      currentIndex = currentIndex === this.data.currentIndex ? -1 : currentIndex;
      this.setData({
        currentIndex
      }); // 选中当前关掉其他的

      this.children.forEach((item, index) => {
        currentIndex === index ? item.set('showPop', !item.data.showPop) : item.set('showPop', false);
      });
    },

    // 重设选中的 value 菜单列表
    resetChooseValue() {
      const titleList = [];
      this.children.forEach((item, index) => {
        const {
          options,
          disabled
        } = item.data;

        if (this.checkType(options) === 'Array') {
          options.forEach(option => option.value === item.data.value && titleList.push({
            title: option.text,
            disabled: disabled
          }));
        } else if (this.checkType(options) === 'String') {
          titleList.push({
            title: options,
            disabled: disabled
          });
        } else {
          throw Error('options must be \'String\' or \'Array\'');
        }
      });
      this.setData({
        titleList
      });
    }

  }
});