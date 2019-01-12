import React, { Component } from 'react'
import TasksDashboard from '../components/TasksDashboard'
import Tasks from '../components/Tasks'
import helpers from '../utils/helpers'
import client from '../utils/client'

class TasksManager extends Component {
  state = { 
    tasks: []
  }

  componentDidMount() {
    client.getTasks((tasks) => 
      this.setState({ tasks }))
  }

  handleAdd = () => {
    const task = helpers.createTask()
    const tasks = [...this.state.tasks, task]
    
    this.setState({ tasks })
    client.addTask(task)
  }

  handleDelete = (taskId) => {
    const tasks = this.state.tasks.filter((task) => task.id !== taskId)
    
    this.setState({ tasks })
    client.deleteTask(taskId)
  }

  handleSubmit = (taskId, newTitle) => {
    const tasks = this.state.tasks.map((task) => {
      if (task.id !== taskId) return task
      
      task.title = newTitle
      return task
    })
    this.setState({ tasks })
    client.updateTask(taskId, newTitle)
  }

  render() {
    const { todoList, doingList, doneList } = helpers.filterByStatus(this.state.tasks)
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