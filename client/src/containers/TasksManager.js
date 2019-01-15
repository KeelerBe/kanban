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
    const filteredTasks = 
      Object.values(this.state.tasksById).filter((task) => 
        task.id !== taskId)
    const tasksById = helpers.createTasksObject(filteredTasks)
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
    const tasks = Object.values(this.state.tasksById).map((task) => {
      if (task.id !== taskId) return task

      task.title = newTitle
			return task
    })

    this.setState({ 
      tasksById: helpers.createTasksObject(tasks)
    })
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