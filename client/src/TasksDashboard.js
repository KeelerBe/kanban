import React from 'react'
import PropTypes from 'prop-types'
import { DragDropContext } from 'react-beautiful-dnd'
import './TasksDashboard.css'

const TasksDashboard = ({ children, onAdd, onDragEnd }) => (
	<DragDropContext onDragEnd={onDragEnd}>
		<div id="dashboard">
			<span className="addButton">
				<i className="fas fa-plus" onClick={onAdd} />
			</span>
			<button id="temp-button" disabled>
				Hello Jane!
			</button>
			{children}
		</div>
	</DragDropContext>
)

TasksDashboard.propTypes = {
	children: PropTypes.node.isRequired,
	onAdd: PropTypes.func.isRequired,
	onDragEnd: PropTypes.func.isRequired
}

export default TasksDashboard
