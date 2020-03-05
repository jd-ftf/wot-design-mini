import VueComponent from '../common/component';
VueComponent({
  data: {
    text: '请检查您的网络重新加载吧'
  },
  props: {
    type: {
      type: String,
      value: 'network',
      observer: 'changeInfo'
    },
    tip: String
  },
  methods: {
    changeInfo(newType, oldType, changedPath) {
      const {
        type,
        tip
      } = this.data;
      const defaultTip = {
        search: '当前搜索无结果',
        notfound: '该页面暂时无法访问',
        network: '请检查您的网络重新加载吧',
        content: '暂无内容',
        collect: '暂无收藏',
        comment: '暂无评论',
        pay: '支付失败，请重新订购',
        subscribe: '已订阅全部消息'
      };

      if (tip && tip.length !== 0) {
        this.setData({
          text: tip
        });
      } else {
        this.setData({
          text: defaultTip[type]
        });
      }
    }

  }
});