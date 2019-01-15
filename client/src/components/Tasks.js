import React from 'react'
import PropTypes from 'prop-types'
import { Droppable } from 'react-beautiful-dnd'
import Task from './Task'

const Tasks = ({ heading, tasks, onDelete, onSubmit }) => 
  <div>
    <h1>{heading}</h1>
    <Droppable droppableId={heading}>
      {(provided) =>
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}>
          {tasks.map((task, index) => 
           <Task
              key={task.id}
              index={index}
              task={task}
              onDelete={() => onDelete(task.id, heading)}
              onSubmit={onSubmit}
            />
          )}
          {provided.placeholder}
        </div>
      }
    </Droppable>
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