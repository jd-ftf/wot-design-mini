<template>
  <div>
    <side-bar parentKey="components"></side-bar>
    <div class="tab-content">
      <div class="content-flex" ref="demoBlock">
        <div class="wd-markdown">
          <router-view></router-view>
          <page-controller></page-controller>
        </div>
        <div class="demo-preview" ref="phone">
          <div class="demo-iframe">
            <div class="phone-header">
              <img class="phone-title" src="../assets/img/phtitle.png" />
              <input readonly v-model="demoLink" class="phone-link" />
            </div>
            <iframe frameborder="0" :src="demoLink" ref="iframe"></iframe>
          </div>
          <div class="demo-preview-item">
            <p>京东app扫码预览</p>
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
      bodyContent: null
    }
  },
  components: {
    SideBar,
    PageController
  },
  computed: {
    demoLink () {
      return `http://jdftf.top/wot-design/demo.html#${this.$route.meta.demo}`
    }
  },
  methods: {
    renderAnchorHref() {
      const anchors = document.querySelectorAll('h2 a,h3 a,h4 a,h5 a')
      const basePath = location.href.split('#').splice(0, 2).join('#')

      Array.prototype.slice.call(anchors).forEach(a => {
        const href = a.getAttribute('href')
        a.href = href.indexOf(basePath) > -1 ? href : (basePath + href)
      })
    },
    goAnchor () {
      if (location.href.match(/#/g).length > 1) {
        const anchor = location.href.match(/#[^#]+$/g)
        if (!anchor) return
        const elm = document.querySelector(anchor[0])
        if (!elm) return

        setTimeout(() => {
          this.bodyContent.scrollTop = elm.offsetTop
        }, 50)
      }
    }
  },
  mounted () {
    this.bodyContent = document.querySelector('.body-content')
    this.renderAnchorHref()
    this.goAnchor()
  },
  beforeRouteUpdate (to, from, next) {
    next()
    const toPath = to.path
    const fromPath = from.path
    if (toPath !== fromPath) {
      this.bodyContent.scrollTop = 0
    }
    setTimeout(() => {
      if (toPath === fromPath && to.hash) {
        this.goAnchor()
      }

      if (toPath !== fromPath) {
        this.renderAnchorHref()
      }
    }, 100)
  }
}
</script>

<style lang="scss">
.tab-content{
  margin: 0 410px 100px 375px;

  .content-flex {
    position: relative;
  }
  .wd-markdown {
    padding-top: 10px;
    margin-top: 10px;

    h1, h2, h3, h4, h5, h6 {
      position: relative;

      &:hover {
        .header-anchor {
          opacity: 0.4;
        }
      }
    }
    .header-anchor {
      float: left;
      margin-left: -15px;
      opacity: 0;
    }
  }
  .markdown-content {
    min-height: 600px;
  }
  .phone-header {
    padding: 10px 10px 12px 10px;
    background: #545456;
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

  .demo-iframe{
    font-size: 0;

    .phone-title{
      width: 100%;
    }
    iframe{
      width: 100%;
      height: 597px;
    }
  }
  .demo-preview {
    position: fixed;
    top: 60px;
    right: 120px;
    width: 375px;
    margin-top: 20px;
    text-align: center;
    font-size: 18px;
    box-shadow: 0 0 10px #cecece;
    overflow: hidden;

    .demo-preview-item {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      padding-top: 80px;
      z-index: 1;
      text-align: center;
      background-color: hsla(0,0%,100%,.95);
      opacity: 0;
      transition: .3s;

      &:last-child{
        margin-bottom: 0;
      }

      &:hover{
        opacity: 1;
      }
    }
    img {
      width: 150px;
    }
  }
}
@media (max-width: 1366px) {
  .tab-content {
    margin-left: 275px;
    margin-right: 420px;

    .demo-preview {
      right: 80px;
      width: 320px;
    }
  }
}
@media (max-width: 1000px) {
  .tab-content {
    margin-left: 275px;
    margin-right: 30px;

    .demo-preview {
      display: none;
    }
  }
}
@media (max-width: 773px) {
  .tab-content {
    margin: 0 15px 10px;
  }
  .side-bar {
    position: static;
    margin: 60px 15px 10px;
    padding-bottom: 0;
  }
  .wot-search-input {
    display: none;
  }
}
@media (max-height: 750px) {
  .tab-content {
    margin-bottom: 0;

    .demo-preview {
      iframe {
        height: 460px;
      }
    }
  }
}
</style>
