<template>
  <div>
    <side-bar parentKey="components"></side-bar>
    <div class="tab-content">
      <div class="content-flex" ref="demoBlock">
        <div class="wd-markdown">
          <router-view></router-view>
          <page-controller></page-controller>
        </div>
        <div class="demo-preview" ref="phone" :style="phoneStyle">
          <div class="demo-preview-item">
            <p>京东app预览</p>
            <img class="phone-title" src="../assets/img/jd.jpg" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from './sidebar'
import PageController from './pageController'

export default {
  data () {
    return {
      phoneStyle: {
        position: 'absolute',
        right: '0',
        top: '0'
      }
    }
  },
  components: {
    SideBar,
    PageController
  },
  computed: {
    demoLink () {
      let path = location.pathname.slice(0, location.pathname.lastIndexOf('/'))
      return location.protocol + '//' + location.host + (process.env.NODE_ENV === 'dev'
        ? `/examples#${this.$route.meta.demo}`
        : `${path}/examples.html#${this.$route.meta.demo}`)
    }
  },
  methods: {
    phoneListener () {
      let phoneHeight = this.$refs.phone.clientHeight

      if (this.$refs.demoBlock.clientHeight > phoneHeight) {
        let demoBlockRect = this.$refs.demoBlock.getBoundingClientRect()

        if (demoBlockRect.top - 60 < 0 && demoBlockRect.bottom - 60 > phoneHeight) {
          this.phoneStyle = {
            position: 'fixed',
            right: '120px',
            top: '60px'
          }
        } else if (demoBlockRect.top - 60 > 0) {
          this.phoneStyle = {
            position: 'absolute',
            right: '0',
            top: '0'
          }
        } else if (demoBlockRect.bottom - 60 < phoneHeight) {
          this.phoneStyle = {
            position: 'absolute',
            right: '0',
            bottom: '0'
          }
        }
      }
    }
  },
  mounted () {
    window.addEventListener('scroll', this.phoneListener)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.phoneListener)
  }
}
</script>

<style lang="scss">
.tab-content{
  margin: 0 120px 100px 375px;

  .content-flex {
    position: relative;
  }
  .wd-markdown {
    margin-right: 395px;
  }
  .markdown-content {
    min-height: 600px;
  }
  .phone-header {
    padding: 10px 10px 12px 10px;
    background: #545456;
  }
  .phone-title {
    width: 100%;
  }
  .phone-link {
    margin-top: 10px;
    width: 100%;
    padding: 0 6px;
    height: 28px;
    line-height: 28px;
    border-radius: 4px;
    box-sizing: border-box;
    outline: none;
    border: none;
    background: #a2a2a2;
    color: #fff;
    overflow: auto;
    line-height: 1.1;
  }
  .demo-preview {
    width: 375px;
    margin-left: 20px;
    margin-top: 20px;
    text-align: center;
    font-size: 18px;

    .demo-preview-item {
      margin-bottom: 60px;

      &:last-child{
        margin-bottom: 0;
      }
    }
    img {
      width: 150px;
    }
  }
}
</style>
