import Toast from '../../dist/toast/toast.js'

Page({
  data: {
    columns1: [
      {
        value: '1',
        label: '京麦'
      },
      {
        value: '2',
        label: '京东金融'
      },
      {
        value: '3',
        label: '京me'
      },
      {
        value: '4',
        label: '京麦'
      },
      {
        value: '5',
        label: '京东金融'
      },
      {
        value: '6',
        label: '京me'
      },
      {
        value: '7',
        label: '京麦'
      },
      {
        value: '8',
        label: '京东金融'
      },
      {
        value: '9',
        label: '京me'
      }
    ],
    columns2: [
      {
        value: '1',
        label: '京麦',
        disabled: true
      },
      {
        value: '2',
        label: '京东金融'
      },
      {
        value: '3',
        label: '京me'
      }
    ],
    value1: ['1'],
    value2: '1',
    value3: ['2'],
    value4: ['3'],
    value5: [],
    value6: [],
    value7: [],
    value8: [],
    value9: [],
    value10: [],
    value11: [],
    value12: ['3'],
    value13: ['2'],
    value14: ['1'],
    value15: ['3'],
    value16: ['2'],
    customShow: '京东金融',

    displayFormat (items, columns) {
      let showValue = ''
      columns.forEach(column => {
        items.forEach((item, index) => {
          if (column.value === item) {
            showValue += `${item}: ${column.label} ${index + 1 < items.length ? '--' : ''} `
          }
        })
      })
      return showValue
    },

    beforeConfirm (value, resolve) {
      if (value.length > 0) {
        Toast.error('暂时无法选择商品')
        resolve(false)
      } else {
        resolve(true)
      }
    }
  },

  handleChange ({ detail }) {
    Toast('选择了' + detail)
  },
  handleConfirm1 ({ detail }) {
    this.setData({
      value1: detail.value
    })
  },
  handleConfirm2 ({ detail }) {
    this.setData({
      value2: detail.value
    })
  },
  handleConfirm3 ({ detail }) {
    this.setData({
      value3: detail.value
    })
  },
  handleConfirm4 ({ detail }) {
    this.setData({
      value4: detail.value
    })
  },
  handleConfirm5 ({ detail }) {
    this.setData({
      value5: detail.value
    })
  },
  handleConfirm6 ({ detail }) {
    this.setData({
      value6: detail.value
    })
  },
  handleConfirm7 ({ detail }) {
    this.setData({
      value7: detail.value
    })
  },
  handleConfirm8 ({ detail }) {
    this.setData({
      value8: detail.value
    })
  },
  handleConfirm9 ({ detail }) {
    this.setData({
      value9: detail.value
    })
  },
  handleConfirm10 ({ detail }) {
    this.setData({
      value10: detail.value
    })
  },
  handleConfirm11 ({ detail }) {
    this.setData({
      value11: detail.value
    })
  },
  handleConfirm12 ({ detail }) {
    this.setData({
      value12: detail.value
    })
  },
  handleConfirm13 ({ detail }) {
    this.setData({
      value13: detail.value
    })
  },
  handleConfirm14 ({ detail }) {
    this.setData({
      value14: detail.value
    })
  },
  handleConfirm15 ({ detail }) {
    this.setData({
      value15: detail.value
    })
  },
  handleConfirm16 ({ detail }) {
    this.setData({
      value16: detail.value,
      customShow: detail.selectedItems.map(item => {
        return item.label
      }).join(', ')
    })
  }
})