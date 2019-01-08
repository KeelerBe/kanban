import React, { Component } from 'react'
import PropTypes from 'prop-types'

class TaskInput extends Component {
  state = {
    value: this.props.task.title || ''
  }

  textInput = React.createRef()

  handleChange = (e) => {
    this.setState({ value: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.onSubmit(
      this.props.task.id,
      this.state.value
    )
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
          autoFocus={true}
        />
      </form>
    )
  }
}

TaskInput.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  }).isRequired,
  onSubmit: PropTypes.func.isRequired

}

export default TaskInput