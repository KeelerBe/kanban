import React from 'react'
import PropTypes from 'prop-types'
import { Draggable } from 'react-beautiful-dnd'
// import StatusButton from './StatusButton'
import TaskInput from './TaskInput'

const DeleteButton = ({ onDelete }) => 
	<span onClick={onDelete}>
    <i className="fas fa-times-circle" />
	</span>

const StatusButton = ({ onStatus }) => 
	<span onClick={onStatus}>
		<i className="fas fa-chevron-circle-down" />
	</span>

const Task = ({ task, index, onDelete, onSubmit }) => 
	<Draggable 
		draggableId={task.id} 
		index={index}
	>
		{(provided) => 
			<div
				id="task"
				ref={provided.innerRef}
				{...provided.draggableProps}
				{...provided.dragHandleProps}
			>
					<div>
						<DeleteButton onDelete={onDelete} />
						<StatusButton />
					</div>
					<div>
						<TaskInput task={task} onSubmit={onSubmit} />
					</div>
			</div>
		}
	</Draggable>


Task.propTypes = {
	task: PropTypes.object.isRequired,
	index: PropTypes.number.isRequired,
	onDelete: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired
}

export default Task