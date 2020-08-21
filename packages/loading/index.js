import VueComponent from '../common/component'
import base64 from '../common/base64'
import { gradient, context } from '../common/util'

const svgDefineId = context.id++
const svgDefineId1 = context.id++
const svgDefineId2 = context.id++

const icon = {
  'circle-outline' (color = '#4D80F0') {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42 42"><defs><linearGradient x1="100%" y1="0%" x2="0%" y2="0%" id="${svgDefineId}"><stop stop-color="#FFF" offset="0%" stop-opacity="0"/><stop stop-color="#FFF" offset="100%"/></linearGradient></defs><g fill="none" fill-rule="evenodd"><path d="M21 1c11.046 0 20 8.954 20 20s-8.954 20-20 20S1 32.046 1 21 9.954 1 21 1zm0 7C13.82 8 8 13.82 8 21s5.82 13 13 13 13-5.82 13-13S28.18 8 21 8z" fill="${color}"/><path d="M4.599 21c0 9.044 7.332 16.376 16.376 16.376 9.045 0 16.376-7.332 16.376-16.376" stroke="url(#${svgDefineId}) " stroke-width="3.5" stroke-linecap="round"/></g></svg>`
  },
  circle (color = '#000000') {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-23 -23 46 46"><circle cx="0" cy="0" r="20" stroke="${color}" stroke-width="3" fill="none"><animate attributeName="stroke-dasharray" begin="0s" dur="1.5s" repeatCount="indefinite" values="1 200;90 150;90 150" keyTimes="0;0.5;1"/><animate attributeName="stroke-dashoffset" begin="0s" dur="1.5s" repeatCount="indefinite" values="0;-40;-120" keyTimes="0;0.5;1"/></circle></svg>`
  },
  'circular-ring' (color = '#4D80F0', intermediateColor = '#a6bff7') {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><linearGradient id="${svgDefineId1}" gradientUnits="userSpaceOnUse" x1="50" x2="50" y2="180"><stop offset="0" stop-color="${color}"></stop> <stop offset="1" stop-color="${intermediateColor}"></stop></linearGradient> <path fill="url(#${svgDefineId1})" d="M20 100c0-44.1 35.9-80 80-80V0C44.8 0 0 44.8 0 100s44.8 100 100 100v-20c-44.1 0-80-35.9-80-80z"></path> <linearGradient id="${svgDefineId2}" gradientUnits="userSpaceOnUse" x1="150" y1="20" x2="150" y2="180"><stop offset="0" stop-color="#fff" stop-opacity="0"></stop> <stop offset="1" stop-color="${intermediateColor}"></stop></linearGradient> <path fill="url(#${svgDefineId2})" d="M100 0v20c44.1 0 80 35.9 80 80s-35.9 80-80 80v20c55.2 0 100-44.8 100-100S155.2 0 100 0z"></path> <circle cx="100" cy="10" r="10" fill="${color}"></circle></svg>`
  }
}

VueComponent({
  data: {
    svg: '',
    intermediateColor: ''
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
      const { type, color, intermediateColor } = this.data
      if (type !== 'circle-outline' && type !== 'circle' && type !== 'circular-ring') return
      const svg = type === 'circular-ring' ? icon[type](color, intermediateColor) : icon[type](color)
      const svgStr = `"data:image/svg+xml;base64,${base64(svg)}"`
      this.setData({ svg: svgStr })
    }
  },
  created () {
    this.setData({
      intermediateColor: gradient(this.data.color, '#ffffff', 2)[1]
    })
    this.buildSvg()
  }
})