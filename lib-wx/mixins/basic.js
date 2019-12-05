export default {
  methods: {
    $emit(...args) {
      this.triggerEvent(...args);
    },

    /**
     * @description 获取节点的样式
     * @param {String} selector -选择器
     * @param {Boolean} all -selectAll
     * @return {Promise<Object | Array<Object>>} 样式对象，或者所有节点样式的集合
     */
    getRect(selector, all = false) {
      return new Promise(resolve => {
        wx.createSelectorQuery().in(this)[all ? 'selectAll' : 'select'](selector).boundingClientRect(rect => {
          if (all && Array.isArray(rect) && rect.length) {
            resolve(rect);
          }

          if (!all && rect) {
            resolve(rect);
          }
        }).exec();
      });
    }

  }
};