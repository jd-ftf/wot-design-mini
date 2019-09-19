Component({
  properties: {
    title: String,
    ver: Number,
    hor: Number
  },
  data: {
    style: 'margin: 10px 15px;'
  },
  observers: {
    'ver, hor': function (ver, hor) {
      this.setData({
        style: 'margin: ' + ver + 'px ' + hor + 'px;'
      })
    }
  }
});
