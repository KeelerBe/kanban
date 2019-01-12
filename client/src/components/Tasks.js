import React from 'react'
import PropTypes from 'prop-types'
import Task from './Task'

const Tasks = ({ heading, tasks, onDelete, onSubmit }) => 
  <div>
    <h1>{heading}</h1>
    {tasks.map((task) => 
      <Task 
        key={task.id} 
        task={task}
        onDelete={() => onDelete(task.id)}
        onSubmit={onSubmit}
      />
    )}
  </div>

Tasks.propTypes = {
  heading: PropTypes.string.isRequired,
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default Tasks