# 阿凡达小程序开发经验

## 坑

### 生命周期
>`∅`代表禁止利用此特性
>`_`包裹的内容表示存在争议

* <u>父组件和子组件的paint顺序不固定。</u>
* `∅`小程序的内部私有属性禁止使用，有可能会变。
* `∅`小程序在初始化的时候，会把properties按照代码顺序放入栈中，所以properties的observer在初始化时会倒序执行，针对此特性需要做好边界处理。

### 原生API

#### 自定义组件

* 可以通过自定义组件实力上的`this.selectComponent(arg:String)`选中引用的组件，注意`selectComponent`可选中的范围如下示例
在A组件中使用B组件，B组件中使用C组件，此时在A组件中无法直接`this.selectComponent(C)`，可以`this.selectComponent(B).selectComponent(C)`来选中C组件。

### properties

#### Array

* 在基础库v1.9.91版本时，以下情况`observer`中拿到的value为''(空字符串)
```html
<view value=""></view>
```

```javascript
Page({
  props: {
    value: {
      type: [Number, String],
      value: 0,
      observer (value) {

      }
    }
  }
})
```

### Function

* 设置props的value为function在JM读不到
* 设置props的value为function时,function的this始终被强制绑定为全局data
* 父组件无法将自己的function类型的props透传给子组件
* props如果要接收function，把function写在data里，type设置为null

### pickerView组件

* 如果某一列(以下简称列)中有10个选项，而且列当前选中第10项。如果此时把列的选项个数修改后还剩下3个，那么选中项会由第10项滑落到第3项，同时出发change事件。
* 修改原生pickerView的columns，当手动触发change事件时，callback中的的event.detail表示的数组长度是修改columns之前的长度,所以event.detail的长度并不会跟随并不会columns缩减。

### javascript runtime

| ECMA262      | 支持语法的小程序基础库版本 |
|--------------|---------------------- |
| Array.prototype.flat | v2.9.3 |

### textarea
1. 没有rows属性
2. textarea在真机上无法被遮挡
  解决办法：用`cover-view` 标签 代替 `view`
  原因： `textarea`是原生组件无法被遮盖，层级是最高的，[官网链接](https://developers.weixin.qq.com/miniprogram/dev/component/native-component.html)
## BUG

### vConsole

#### print
>在京麦debug时，使用JSON.stringify打印Object类型时，无法解决循环引用问题，引起抛错导致js线程崩溃。

子组件和父组件建立relations时互相保存了对方的实例，这种情况就构成了子父组件的实例中都包含了对方。
在移动端进行调试时，如果console.log了实例，系统会调用JSON.stringify()把实例转换为json，此时就造成了上述问题。
`代码片段如下`
* 子组件代码
```javascript
Component({
  relations: {
    '../parent/index': {
      type: 'parent',
      linked (target) {
        this.parent = target
      },
      unlinked () {
        this.parent = null
      }
    }
  }
})
```
* 父组件代码
```javascript
Component({
  relations: {
    '../child/index': {
      type: 'child',
      linked (target) {
        this.children = this.children || []
        this.children.push(target)
      },
      unlinked (target) {
        this.children = this.children.filter(child => child !== target)
      }
    }
  },
  ready () {
    console.log(this.children)
  }
})
```
### input
* input获取焦点闪烁

### properties

####  disabled
properties传值时不支持 `disabled`单键值，必须写成
```
<view disabled="{{true}}"></view>

```

####  loading
properties传值时不支持 `loading`单键值，必须写成
```
<view loading="{{true}}"></view>

```
#### Function

* props的type设置为null，并且传入了function，那么在debugger模式console.log会显示null，但实际上是一个function。

### CSS

#### 非法选择器

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
