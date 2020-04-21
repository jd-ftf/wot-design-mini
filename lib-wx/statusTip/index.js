import VueComponent from '../common/component';
VueComponent({
  props: {
    type: {
      type: String,
      value: '',
      observer: 'checkType'
    },
    tip: {
      type: String,
      value: ''
    }
  },
  data: {
    imgType: ''
  },
  methods: {
    checkType() {
      const types = ['search', 'network', 'content', 'collect', 'comment', 'halo', 'message'];
      this.setData({
        imgType: types.includes(this.data.type) ? this.data.type : 'network'
      });
    }

  }
});