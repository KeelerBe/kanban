import React from 'react'
import PropTypes from 'prop-types'
import Task from './Task'

const Tasks = ({ title, tasks }) => 
  <div>
    <h1>{title}</h1>
    {tasks.map(({ id, task }) => <Task key={id} task={task} />)}
  </div>

Tasks.propTypes = {
  title: PropTypes.string.isRequired,
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      task: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired
    })
  ).isRequired
}

export default Tasks