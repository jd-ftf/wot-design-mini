Page({
  data: {
    tags: [
      {
        plain: true,
        closable: true,
        type: 'primary',
        size: 'small',
        value: '标签一'
      },
      {
        plain: true,
        closable: true,
        type: 'primary',
        size: '',
        value: '标签二'
      },
      {
        plain: true,
        closable: true,
        type: 'primary',
        size: 'large',
        value: '标签三'
      }
    ]
  },
  handleClick ({ currentTarget: { dataset: { index } } }) {
    this.data.tags.splice(index, 1)
    console.log('click:index' + index)
  },
  handleClose ({ currentTarget: { dataset: { index } } }) {
    this.data.tags.splice(index, 1)
    this.setData({
      tags: this.data.tags
    })
    console.log('close:index' + index)
  }
})