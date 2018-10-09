性能优化实践之 —— 使用 why-did-you-update

### why-did-you-update 原理浅析

介绍下 [why-did-you-update](https://github.com/maicki/why-did-you-update) 这个库，它的作用是判断当前的元素是否进行了不必要的渲染。

它的核心原理：替代掉 React 原有的 `componentDidUpdate(prevProps, prevState)` 方法。为什么要选这个钩子呢？因为这个钩子位于 `render` 钩子的后面，它的传参是 `prevProps` 和 `prevState`, 它们能与 `currentProps` 以及 `currentState` 形成对比，要是比较结果是相同的则说明这次渲染是浪费的。

### 实践

```js
class App extends React.Component {
  constructor() {
    super()
    this.state = {
      items: ['foo', 'bar']
    }
    this.add = this.add.bind(this)
  }

  add() {
    const items = this.state.items.slice()
    items.push('baz')

    this.setState({
      items,
    })
  }

  render() {
    return (
      <div>
        <ul>
          {
            this.state.items.map(item =>
              <Item
                key={item}
                value={item}
              />
            )
          }
        </ul>
        <button onClick={this.add}>+</button>
      </div>
    )
  }
}

class Item extends React.Component {
  render() {
    return (
      <li>{this.props.value}</li>
    )
  }
}
```

点击 `+` 号，此时在控制台中可以看到不必要的重新渲染。(我倾向于将之称为不必要的 diff, 因为 render 方法中夹杂着 diff)

![](http://oqhtscus0.bkt.clouddn.com/9ef6d2aa27aca44490b09a9999be4bc6.jpg-300)

这时候可以怎么解决这个不必要的渲染呢，答案是用 PureComponent。作如下修改：

```js
class Item extends React.PureComponent {
  render() {
    return (
      <li>{this.props.value}</li>
    )
  }
}
```

此时，点击 `+` 号，控制台中打印出来的数据消失了。

> [PureComponent 原理](https://github.com/MuYunyun/blog/blob/master/%E4%BB%8E0%E5%88%B01%E5%AE%9E%E7%8E%B0React/7.PureComponent.md)