import React from "react";
import ReactDOM from "react-dom";
import { whyDidYouUpdate } from 'why-did-you-update'

whyDidYouUpdate(React)

class Todo extends React.Component {
  constructor() {
    super()
    this.state = {
      items: ['foo', 'bar'],
    }

    this.add = this.add.bind(this)
  }

  add(value) {
    const items = this.state.items.slice()
    items.push(value)

    this.setState({
      items,
    })
  }

  render() {
    console.log('renderParent')
    return (
      <div>
        <List items={this.state.items} />
        <Form add={this.add} />
      </div>
    )
  }
}

class List extends React.Component {
  render() {
    console.log('renderItem')
    return (
      <ul>
        {
          this.props.items.map(item =>
            <li key={item}>{item}</li>
          )
        }
      </ul>
    )
  }
}

class Form extends React.PureComponent {
  constructor() {
    super()
    this.state = {
      value: ''
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange({ target }) {
    this.setState({
      value: target.value,
    })
  }

  render() {
    console.log('renderForm')
    const { add } = this.props
    return (
      <div>
        <input
          value={this.state.value}
          onChange={this.handleChange}
        />
        <button onClick={() => add(this.state.value)}>+</button>
      </div>
    )
  }
}

ReactDOM.render(
  <Todo />,
  document.getElementById('root')
)