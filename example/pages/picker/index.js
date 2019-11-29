const district = {
  0: [{
    label: '北京',
    value: '110000'
  }, {
    label: '广东省',
    value: '440000'
  }],
  110000: [{
    label: '北京',
    value: '110100'
  }],
  440000: [{
    label: '广州市',
    value: '440100'
  }, {
    label: '深圳市',
    value: '440300'
  }],
  110100: [{
    label: '东城区',
    value: '110101'
  }, {
    label: '西城区',
    value: '110102'
  }],
  440100: [{
    label: '荔湾区',
    value: '440103'
  }, {
    label: '越秀区',
    value: '440104'
  }],
  440300: [{
    label: '罗湖区',
    value: '440303'
  }, {
    label: '福田区',
    value: '440304'
  }]
}
Page({
  data: {
    columns0: ['选项1', '选项2', '选项3', '选项4', '选项5', '选项6', '选项7'],

    value1: '选项3',
    columns1: ['选项1', '选项2', '选项3', '选项4', '选项5', '选项6', '选项7'],

    value2: '选项4',
    columns2: ['选项1', '选项2', '选项3', '选项4', '选项5', '选项6', '选项7'],

    columns3: ['选项1', '选项2', '选项3', '选项4', '选项5', '选项6', '选项7'],

    value4: ['中南大学', '软件工程'],
    columns4: [
      ['中山大学', '中南大学', '华南理工大学'],
      ['计算机科学与技术', '软件工程', '通信工程', '法学', '经济学']
    ],

    value5: ['110000', '110100', '110102'],
    columns5: [
      district[0],
      district[district[0][0].value],
      district[district[district[0][0].value][0].value]
    ],

    value6: ['中南大学', '软件工程'],
    columns6: [
      ['中山大学', '中南大学', '华南理工大学'],
      ['计算机科学与技术', '软件工程', '通信工程', '法学', '经济学']
    ],

    onChangeDistrict (pickerView, value, columnIndex) {
      const item = value[columnIndex]
      if (columnIndex === 0) {
        pickerView.setColumnData(1, district[item.value])
        pickerView.setColumnData(2, district[district[item.value][0].value])
        return
      }
      if (columnIndex === 1) {
        pickerView.setColumnData(2, district[item.value])
      }
    },

    displayFormat (items) {
      return items.map(item => {
        return item.label
      }).join('-')
    }
  }
})