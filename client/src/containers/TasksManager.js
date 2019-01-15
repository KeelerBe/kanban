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
    const column = helpers.getColumn(heading)
    const tasksById = {}
    Object.values(this.state.tasksById).forEach((task) => {
      if (task.id !== taskId) tasksById[task.id] = task
    })

    const columnIds = Array.from(this.state[column]).filter((id) => id !== taskId)

    this.setState({ tasksById, [column]: columnIds })
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

  handleDragEnd = (result) => {
    const { destination, source, draggableId } = result
    let sourceColumn = ""
    let destinationColumn = ""

    if (destination) {
      sourceColumn = helpers.getColumn(source.droppableId)
      destinationColumn = helpers.getColumn(destination.droppableId)
    } else return

    if (destinationColumn === sourceColumn &&
        destination.index === source.index) return

    if (destinationColumn === sourceColumn) {
      const columnCopy = Array.from(this.state[sourceColumn])
      columnCopy.splice(source.index, 1)
      columnCopy.splice(destination.index, 0, draggableId)
      return this.setState({ [sourceColumn]: columnCopy })
    }

    const sourceCopy = Array.from(this.state[sourceColumn])
    sourceCopy.splice(source.index, 1)
    const destinationCopy = Array.from(this.state[destinationColumn])
    destinationCopy.splice(destination.index, 0, draggableId)

    this.setState({
      [sourceColumn]: sourceCopy,
      [destinationColumn]: destinationCopy
    })
  }

  render() {
    const { todoList, doingList, doneList } = helpers.getLists(this.state)
    return (
      <TasksDashboard onAdd={this.handleAdd} onDragEnd={this.handleDragEnd} >
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