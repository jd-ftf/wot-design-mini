import VueComponent from '../common/component'

VueComponent({
  externalClasses: [
    'custom-icon-class'
  ],
  props: {
    iconName: String,
    customIcon: Boolean,
    msg: String,
    position: String,
    show: Boolean,
    zIndex: Number
  }
})