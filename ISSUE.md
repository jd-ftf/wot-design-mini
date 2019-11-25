# 阿凡达小程序开发经验

## 坑
>`∅`代表禁止利用此特性  
>`_`包裹的内容表示存在争议

* <u>父组件和子组件的paint顺序不固定。</u>
* `∅`小程序的内部私有属性禁止使用，有可能会变。
* `∅`小程序在初始化的时候，会把properties按照代码顺序放入栈中，所以properties的observer在初始化时会倒序执行，针对此特性需要做好边界处理。

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

