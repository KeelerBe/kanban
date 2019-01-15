import React, { Component } from 'react'
import TasksDashboard from '../components/TasksDashboard'
import Tasks from '../components/Tasks'
import helpers from '../utils/helpers'
import client from '../utils/client'

class TasksManager extends Component {
  state = { 
    tasksById: {},
    todoIds: [],
    doingIds: [],
    doneIds: []
  }

  componentDidMount() {
    client.getTasks((tasks) => {
      const { tasksById, todoIds, doingIds, doneIds } = tasks
      this.setState({
        tasksById,
        todoIds,
        doingIds,
        doneIds
      })
    })
  }

  handleAdd = () => {
    const task = helpers.createTask()
    const { tasksById, todoIds } = this.state
    
    tasksById[task.id] = task
    todoIds.push(task.id)

    this.setState({ tasksById, todoIds })
    client.addTask(task)
  }

  handleDelete = (taskId, heading) => {
    const tasksById = {}
    Object.values(this.state.tasksById).forEach((task) => {
      if (task.id !== taskId) tasksById[task.id] = task
    })

    let { todoIds, doingIds, doneIds } = this.state
    let column = ""

    if (heading === "To Do") {
      todoIds = todoIds.filter((id) => id !== taskId)
      column = "todoIds"
    }

    if (heading === "Doing") {
      doingIds = doingIds.filter((id) => id !== taskId)
      column = "doingIds"
    }

    if (heading === "Done") {
      doneIds = doneIds.filter((id) => id !== taskId)
      column = "doneIds"
    }

    this.setState({ tasksById, todoIds, doingIds, doneIds })
    client.deleteTask(taskId, column)
  }

  handleSubmit = (taskId, newTitle) => {
    const { tasksById } = this.state
    Object.values(tasksById).forEach((task) => {
        if (task.id === taskId) tasksById[task.id].title = newTitle
    })

    this.setState({ tasksById })
    client.updateTask(taskId, newTitle)
  }

  render() {
    const { todoList, doingList, doneList } = helpers.getLists(this.state)
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