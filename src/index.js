import React from "react";
import ReactDOM from "react-dom";
import { whyDidYouUpdate } from 'why-did-you-update'

whyDidYouUpdate(React)

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

class Item extends React.PureComponent {
  render() {
    return (
      <li>{this.props.value}</li>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)