import React from 'react'
import PropTypes from 'prop-types'
import DeleteButton from './DeleteButton'
import StatusButton from './StatusButton'
import TaskInput from './TaskInput'

const Task = ({ task, onDelete, onSubmit }) => (
	<div id="task">
		<div>
			<DeleteButton onDelete={onDelete} />
			<StatusButton />
		</div>
		<div>
			<TaskInput task={task} onSubmit={onSubmit} />
		</div>
	</div>
)

Task.propTypes = {
	task: PropTypes.object.isRequired,
	onDelete: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired
}

export default Task