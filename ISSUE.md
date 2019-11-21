# 阿凡达小程序开发经验

## 坑
* 父组件和子组件的渲染顺序不固定。

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

