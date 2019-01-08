import React, { Component } from 'react'
import uuidv4 from 'uuid/v4'
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
    const task = {
      id: uuidv4(),
      title: "",
      status: "todo"
    }

    const tasks = [ ...this.state.tasks, task ]
    this.setState({ tasks })
  }

  handleSubmit = (taskId, newTitle) => {
    const tasks = this.state.tasks.map((task) => {
      if (task.id !== taskId) return task
      task.title = newTitle
      return task
    })
    this.setState({ tasks })
  }

  render() {
    const { todoList, doingList, doneList } = filterByStatus(this.state.tasks)
    return (
      <TasksDashboard onAdd={this.handleAdd} >
        <div>
          <Tasks 
            heading="To Do" 
            tasks={todoList} 
            onDelete={this.handleDelete}
            onSubmit={this.handleSubmit} 
          />
          <Tasks 
            heading="Doing" 
            tasks={doingList} 
            onDelete={this.handleDelete}
            onSubmit={this.handleSubmit} 
          />
          <Tasks 
            heading="Done" 
            tasks={doneList} 
            onDelete={this.handleDelete}
            onSubmit={this.handleSubmit} 
          />
        </div>
      </TasksDashboard>
    )
  }
}

export default TasksManager