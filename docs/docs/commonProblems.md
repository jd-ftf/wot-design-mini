## 常见问题FAQ
本节介绍在小程序开发过程当中遇到的部分 **常见问题** 以及 **解决办法**

## 原生BUG
### input
#### input获取焦点时，文案闪烁 ?
已提交微信官方issue
#### password模式无法关闭 ？
```html
 <input password="{{ show }}" />
 ```
```javaScript
  data: {
    show: true
  },
  methods: {
    click () {
      this.setData({ show: !this.data.show }) // 置为 false 无法切换成普通模式
    }
  }
 ```
参考解决办法：
使用两个input来回切换
#### password模式下，安卓机输入焦点前移 ？
问题已提交京东小程序，待修复
### textarea
#### textarea在真机上无法被遮挡 ？
`textarea` 是原生组件无法被遮盖，层级是最高的，[官网链接](https://developers.weixin.qq.com/miniprogram/dev/component/native-component.html)
参考解决办法：
* 遮盖：用`cover-view` 标签 代替 `view`
* 隐藏：弹出式隐藏 `textarea`
### slot
#### 无法获取具名插槽的name属性 ?
参考解决办法：
设置 `插槽使用标志` ，使用组件时将标志置为 `true`
```html
  <view jd:if="{{ useSlotName }}">
    <slot name="name" />>
  </view>
```
## 样式
### 非法选择器 ？
在基础库v1.9.91版本下，当使用小程序不支持的CSS选择器时，整个GUI进程会崩掉，如下如所示。
```css
::-webkit-scrollbar {
  width:0;
  height:0;
  color:transparent;
}
```
以上代码会在控制台异常抛出错误，此BUG预计在基础库v2.7.3版本修复
```
Some selectors are not allowed in component wxss, including tag name selectors, ID selectors, and attribute selectors.
```
### 0.5px精度无法实现 ？
参考解决办法：
利用缩放(`scale`):将 `1px` 缩放 `50%` 达到 `0.5px` 的效果


### 如果您的问题不在上述列表中，请联系我们ftf@jd.com