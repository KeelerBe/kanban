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

		const columnIds = Array.from(this.state[column]).filter(
			(id) => id !== taskId
		)

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
		let sourceKey = ''
		let destinationKey = ''

		if (destination) {
			sourceKey = helpers.getColumn(source.droppableId)
			destinationKey = helpers.getColumn(destination.droppableId)
		} else return

		if (
			destinationKey === sourceKey &&
			destination.index === source.index
		)
			return

    const sourceCopy = Array.from(this.state[sourceKey])
    const destinationCopy = sourceKey !== destinationKey 
      ? Array.from(this.state[destinationKey])
      : sourceCopy
    
    sourceCopy.splice(source.index, 1)
    destinationCopy.splice(destination.index, 0, draggableId)

    this.setState({ [sourceKey]: sourceCopy })
    
    if (sourceKey !== destinationKey) 
      this.setState({ [destinationKey]: destinationCopy })

		client.updateLists(
			sourceKey,
			destinationKey,
			source.index,
			destination.index,
			draggableId
		)
	}

	render() {
		const { todoList, doingList, doneList } = helpers.getLists(this.state)
		return (
			<TasksDashboard onAdd={this.handleAdd} onDragEnd={this.handleDragEnd}>
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
