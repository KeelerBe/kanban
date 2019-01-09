import React, { Component } from 'react'
import axios from 'axios'

class Test extends Component {
  state = {
    tasks: []
  }

  componentDidMount() {
    axios.get('/api/tasks')
      .then((response) => {
        const tasks = response.data
        this.setState({ tasks })
      })
      .catch((err) => console.log(err))
    // this.setState({ tasks })
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.tasks.map((task) => 
            <li key={task.id}>{task.title}</li>
          )}
        </ul>
			</div>
    )
  }
}

export default Test