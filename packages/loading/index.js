import VueComponent from '../common/component'
import base64 from '../common/base64'

const icon = {
  'circle-outline' (color = '#4D80F0') {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42 42"><defs><linearGradient x1="100%" y1="0%" x2="0%" y2="0%" id="a"><stop stop-color="#FFF" offset="0%" stop-opacity="0"/><stop stop-color="#FFF" offset="100%"/></linearGradient></defs><g fill="none" fill-rule="evenodd"><path d="M21 1c11.046 0 20 8.954 20 20s-8.954 20-20 20S1 32.046 1 21 9.954 1 21 1zm0 7C13.82 8 8 13.82 8 21s5.82 13 13 13 13-5.82 13-13S28.18 8 21 8z" fill="${color}"/><path d="M4.599 21c0 9.044 7.332 16.376 16.376 16.376 9.045 0 16.376-7.332 16.376-16.376" stroke="url(#a)" stroke-width="3.5" stroke-linecap="round"/></g></svg>`
  },
  circle (color = '#000000') {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-23 -23 46 46"><circle cx="0" cy="0" r="20" stroke="${color}" stroke-width="3" fill="none"><animate attributeName="stroke-dasharray" begin="0s" dur="1.5s" repeatCount="indefinite" values="1 200;90 150;90 150" keyTimes="0;0.5;1"/><animate attributeName="stroke-dashoffset" begin="0s" dur="1.5s" repeatCount="indefinite" values="0;-40;-120" keyTimes="0;0.5;1"/></circle></svg>`
  }
}

VueComponent({
  data: {
    svg: ''
  },
  props: {
    type: {
      type: String,
      value: 'circle-outline'
    },
    color: {
      type: String,
      value: '#4D80F0',
      observer: 'buildSvg'
    },
    size: {
      type: Number,
      value: 32
    }
  },
  methods: {
    buildSvg () {
      const { type, color } = this.data
      if (type !== 'circle-outline' && type !== 'circle') return
      const svg = icon[type](color)
      const svgStr = `"data:image/svg+xml;base64,${base64(svg)}"`
      this.setData({ svg: svgStr })
    }
  },
  created () {
    this.buildSvg()
  }
})