Page({
  data: {
    value: [3, 1, 4],
    // columns: [
    //   { value: 1 },
    //   { value: 2 },
    //   { value: 3 }
    // ]
    // columns: [
    //   [1, 2, 3, 4, 5, 6, 7, 8, 9],
    //   [1, 2, 3, 4, 5, 6, 7, 8, 9],
    //   [1, 2, 3, 4, 5, 6, 7, 8, 9]
    // ]
    columns: [
      [
        { value: 1, label: 1 },
        { value: 2, label: 2 },
        { value: 3, label: 3 }
      ],
      [
        { value: 1, label: 1 },
        { value: 2, label: 2 },
        { value: 3, label: 3 }
      ]
    ]
  },
  handleChange (event) {
    console.log(event.detail)
  }
})