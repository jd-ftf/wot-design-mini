Page({
  options: {
    multipleSlots: true
  },
  data: {
    value1: ["item1"],
    value2: "item1",
    value3: ["item1"],
    value4: false
  },
  handleInput({ detail }) {
    
  },
  handleChange1({ detail }) {
    this.setData({ value1: detail })
  },
  handleChange2({ detail }) {
    this.setData({ value2: detail })
  },
  handleChange3({ detail }) {
    this.setData({ value3: detail })
  },
  handleChange4({ detail }) {
    this.setData({ value4: detail })
  }
});
