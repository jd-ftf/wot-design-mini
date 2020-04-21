import VueComponent from '../common/component';
VueComponent({
  props: {
    size: {
      type: String,
      value: '32px'
    },
    type: {
      type: String,
      value: 'circle'
    },
    color: String,
    customStyle: String
  }
});