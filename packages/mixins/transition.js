import { isObj } from '../common/util'

const getClassNames = name => {
  if (!name) {
    return {
      enter: 'enter-class enter-active-class',
      'enter-to': 'enter-to-class enter-active-class',
      leave: 'leave-class leave-active-class',
      'leave-to': 'leave-to-class leave-active-class'
    }
  }

  return {
    enter: `wd-${name}-enter wd-${name}-enter-active`,
    'enter-to': `wd-${name}-enter-to wd-${name}-enter-active`,
    leave: `wd-${name}-leave wd-${name}-leave-active`,
    'leave-to': `wd-${name}-leave-to wd-${name}-leave-active`
  }
}

const requestAnimationFrame = (cb = () => void 0) => {
  return new Promise((resolve, reject) => {
    jd.createSelectorQuery()
      .selectViewport()
      .boundingClientRect()
      .exec(() => {
        resolve()
        cb()
      })
  })
}

export default function () {
  return {
    props: {
      show: {
        type: Boolean,
        observer: 'observerShow'
      },
      duration: {
        type: null,
        value: 300
      },
      name: String,
      customStyle: String
    },
    data: {
      inited: false,
      display: false
    },
    created () {
      if (this.data.show) {
        this.enter()
      }
    },
    methods: {
      observerShow (value) {
        value ? this.enter() : this.leave()
      },
      enter () {
        const { duration } = this.data
        const classNames = getClassNames(this.data.name)
        const currentDuration = isObj(duration) ? duration.enter : duration

        this.status = 'enter'
        this.$emit('beforeenter')

        requestAnimationFrame(() => {
          this.checkStatus('enter')
          this.$emit('enter')

          this.setData({
            inited: true,
            display: true,
            classes: classNames.enter,
            currentDuration
          }, () => {
            requestAnimationFrame(() => {
              this.checkStatus('enter')
              this.transitionEnded = false

              this.setData({
                classes: classNames['enter-to']
              })
            })
          })
        })
      },
      leave () {
        if (!this.data.display) return

        const { duration } = this.data
        const classNames = getClassNames(this.data.name)
        const currentDuration = isObj(duration) ? duration.leave : duration

        this.status = 'leave'
        this.$emit('beforeleave')

        requestAnimationFrame(() => {
          this.checkStatus('leave')
          this.$emit('leave')

          this.setData({
            classes: classNames.leave,
            currentDuration
          })

          requestAnimationFrame(() => {
            this.checkStatus('leave')
            this.transitionEnded = false
            setTimeout(() => this.onTransitionEnd(), currentDuration)

            this.setData({
              classes: classNames['leave-to']
            })
          })
        })
      },
      checkStatus (status) {
        if (status !== this.status) {
          throw new Error(`incongruent status: ${status}`)
        }
      },
      onTransitionEnd () {
        if (this.transitionEnded) return

        this.transitionEnded = true
        this.$emit(`after${this.status}`)

        const { show, display } = this.data
        if (!show && display) {
          this.setData({
            display: false
          })
        }
      }
    }
  }
}