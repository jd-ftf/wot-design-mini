## ImgCropper 图片裁剪

- 1、上传图片(demo)
- 2、图片裁剪
- 3、支持拖拽，用于移动图片使其位于对应位置
- 4、支持缩放，用于截取限定区域
- 5、支持旋转，用于截取对应角度
- 6、支持预览裁剪后的图片(demo)

### 引入

```json
{
  "usingComponents": {
    "wd-img-cropper": "/wot-design/img-cropper/index"
  }
}
```

### 基本用法

图片裁剪组件需要绑定 `show` 来控制组件的显示与隐藏，通过属性 `img-src` 控制展示的图片资源位，也可以通过函数 `resetImg` 来控制组件图片的初始化。进入组件后，可以对图片进行拖拽、双指缩放、旋转等操作。监听 `bind:confirm` 事件获取选中值。

> *注意：在使用组件时，最好在一个新页面中使用图片裁剪组件，图片裁剪保持`show`为true，完成裁剪时，返回上一页。*

```html
<wd-img-cropper
  show="{{show}}"
  img-src="{{src}}"
  bind:cancel="handleCancel"
  bind:confirm="handleConfirm">
</wd-img-cropper>
<view class="profile">
  <wd-img round width="200px" height="200px" src="{{ imgSrc }}" mode="aspectFit" custom-class="profile-img" bindtap="preview" />
  <wd-button bindtap="upload">上传图片</wd-button>
</view>
```

```JavaScript
Page({
  data: {
    src: '',
    imgSrc: '',
    show: false
  },
  upload () {
    const that = this
    jd.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        jd.showLoading({
          title: '加载中'
        })
        const tempFilePaths = res.tempFilePaths[0]
        // 重置图片角度、缩放、位置
        jd.hideLoading()
        that.setData({
          show: true,
          src: tempFilePaths
        })
      }
    })
  },
  handleCancel (event) {
    console.log('取消', event)
  },
  handleConfirm (event) {
    const { url } = event.detail
    this.setData({
      src: url,
      imgSrc: url
    })
  },
  preview () {
    jd.previewImage({
      current: this.data.imgSrc, // 当前显示图片的http链接
      urls: [this.data.imgSrc] // 需要预览的图片http链接列表
    })
  }
})
```

### Attributes

| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |  是否必填 | 最低版本 |
|---------- |------------------------------------ |---------- |------------- |-------- |-------- |-------- |
| show | 打开图片裁剪组件 | Boolean | - | false | 是 |2.3.0|
| img-src | 图片资源链接 | String | - | - | 否 |2.3.0|
| img-width | 截屏预览图片的初始宽度，默认单位为px；`1、设置宽度不设置高度，按照宽度等比缩放；2、如果都不设置，预览时图片大小会根据裁剪框大小进行等比缩放，进行锁边处理；` | Number / String | - | - | 否 |2.3.0|
| img-height | 截屏预览图片的初始高度，默认单位为px；`1、设置高度不设置宽度，按照高度等比缩放；2、如果都不设置，预览时图片大小会根据裁剪框大小进行等比缩放，进行锁边处理；` | Number / String | - | - | 否 |2.3.0|
| disabled-rotate | 禁止图片旋转 | Boolean | - | false | 否 |2.3.0|
| export-scale | 设置导出图片尺寸 | Number | - | 2 | 否 |2.3.0|
| max-scale | 最大缩放倍数 | Number | - | 3 | 否 |2.3.0|
| cancel-button-text | 取消按钮文案 | string | - | '取消' | 否 |2.3.0|
| confirm-button-text | 确认按钮文案 | string | - | '完成' | 否 |2.3.0|
| quality | 生成的图片质量 [wx.canvasToTempFilePath属性介绍](https://developers.weixin.qq.com/miniprogram/dev/api/canvas/wx.canvasToTempFilePath.html#%E5%8F%82%E6%95%B0) | Number | 0/1 | 1 | 否 |2.3.0|
| fileType | 目标文件的类型，[wx.canvasToTempFilePath属性介绍](https://developers.weixin.qq.com/miniprogram/dev/api/canvas/wx.canvasToTempFilePath.html#%E5%8F%82%E6%95%B0) | string | - | 'png'| 否  |2.3.0|

### Events

| 事件名称      | 说明                                 | 参数     | 最低版本 |
|------------- |------------------------------------ |--------- |-------- |
| bind:confirm | 完成截图时触发 | event.detail = {res, url, width, height} 分别为canvas截屏参数、生成地址、生成图片宽、生成图片高|2.3.0|
| bind:cancel | 当取消截图时触发 | - |2.3.0|
| bind:imgloaderror | 当图片加载错误时触发 | event.detail = {err} |2.3.0|
| bind:imgloaded | 当图片加载完成时触发 | event.detail = {res} |2.3.0|

### Methods

对外暴露函数

| 事件名称      | 说明                                 | 参数     | 最低版本 |
|------------- |------------------------------------ |--------- |-------- |
| setRoate | 设置图片旋转角度 | deg (设置的旋转角度)|2.3.0|
| resetImg | 重置图片的角度、缩放、位置 | - |2.3.0|

### 外部样式类

| 类名     | 说明                | 最低版本 |
|---------|---------------------|-------- |
| custom-class | 根结点样式 |2.3.0|
