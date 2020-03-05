import VueComponent from '../common/component';
VueComponent({
  data: {
    style: ''
  },
  props: {
    span: {
      type: Number,
      value: 24,
      observer: 'check'
    },
    offset: {
      type: Number,
      value: 0,
      observer: 'check'
    }
  },
  relations: {
    '../row/index': {
      type: 'ancestor',

      linked(target) {
        this.parent = target;
      },

      unlinked() {
        this.parent = null;
      }

    }
  },
  methods: {
    check() {
      const {
        span,
        offset
      } = this.data;

      if (span < 0 || offset < 0) {
        console.warn('Attribute span/offset must be greater than or equal to 0');
      }
    },

    setGutter(gutter) {
      const padding = `${gutter / 2}px`;
      const style = gutter ? `padding-left: ${padding}; padding-right: ${padding};` : '';

      if (style !== this.data.style) {
        this.setData({
          style
        });
      }
    }

  }
});