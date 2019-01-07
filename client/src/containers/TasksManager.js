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

  render() {
    const { todoList, doingList, doneList } = filterByStatus(this.state.tasks)
    return (
      <TasksDashboard>
        <div>
          <Tasks title="To Do" tasks={todoList} />
          <Tasks title="Doing" tasks={doingList} />
          <Tasks title="Done" tasks={doneList} />
        </div>
      </TasksDashboard>
    )
  }
}

export default TasksManager