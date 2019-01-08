import React, { Component } from 'react'
import TasksDashboard from '../components/TasksDashboard'
import Tasks from '../components/Tasks'
import _TASKS from '../tasks.json'
import { filterByStatus } from '../helpers'

class TasksManager extends Component {
  state = { 
    tasks: []
  }

  componentDidMount() {
    this.setState({ tasks: _TASKS })
  }

  handleDelete = (taskId) => {
    const tasks = this.state.tasks.filter((task) => task.id !== taskId)
    this.setState({ tasks })
  }

  handleAdd = () => {
    console.log('Adding...')
  }

  render() {
    const { todoList, doingList, doneList } = filterByStatus(this.state.tasks)
    return (
      <TasksDashboard onAdd={this.handleAdd} >
        <div>
          <Tasks 
            title="To Do" 
            tasks={todoList} 
            onDelete={this.handleDelete} 
          />
          <Tasks 
            title="Doing" 
            tasks={doingList} 
            onDelete={this.handleDelete} 
          />
          <Tasks 
            title="Done" 
            tasks={doneList} 
            onDelete={this.handleDelete} 
          />
        </div>
      </TasksDashboard>
    )
  }
}

export default TasksManager