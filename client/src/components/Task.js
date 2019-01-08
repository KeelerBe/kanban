import React from 'react'
import PropTypes from 'prop-types'
import DeleteButton from './DeleteButton'
import StatusButton from './StatusButton'

const Task = ({ task, onDelete }) => (
	<div id="task">
		<div>
			<DeleteButton onDelete={onDelete} />
			<StatusButton />
		</div>
		<div>
			<p>{task}</p>
		</div>
	</div>
)

Task.propTypes = {
	task: PropTypes.string.isRequired,
	onDelete: PropTypes.func.isRequired
}

export default Task