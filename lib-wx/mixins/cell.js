export default Behavior({
  methods: {
    /**
     * @description 从cellGroup获取此组件的索引
     * @return {Number} 此组件的索引
     */
    getIndex() {
      if (!this.parent) return;
      return this.parent.children.indexOf(this);
    },

    /**
     * @description 为所有索引非0的组件设置刘海线，此方法由cellGroup调用
     */
    setIndexAndStatus() {
      const index = this.getIndex();
      if (!index || index === 0) return;
      this.setData({
        noHair: false
      });
    }

  }
});