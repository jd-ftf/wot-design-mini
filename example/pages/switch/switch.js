
Page({
  data: {
    checked1: true,
    checked2: true,
    checked3:true
  },

  onChange({ detail }) {
    this.setData({ checked: detail });
  },

  onChange2({ detail }) {
   
  }
});