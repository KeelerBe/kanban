import React, { Component } from 'react'

class TaskInput extends Component {
  state = {
    value: this.props.task || '',
    focused: false,
  }

  textInput = React.createRef()

  handleChange = (e) => {
    this.setState({ value: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.setState({ value: this.state.value})
    this.textInput.current.blur()
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input 
          className="temp"
          value={this.state.value}
          onChange={this.handleChange}
          ref={this.textInput}
          type="text"
          maxLength={25}
        />
      </form>
    )
  }
}

export default TaskInput