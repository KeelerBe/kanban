import React from 'react'
import PropTypes from 'prop-types'
import DeleteButton from './DeleteButton'
import StatusButton from './StatusButton'

const Task = ({ task }) => (
	<div id="task">
		<div>
			<DeleteButton />
			<StatusButton />
		</div>
		<div>
			<p>{task}</p>
		</div>
	</div>
)

Task.propTypes = {
	task: PropTypes.string.isRequired
}

export default Task