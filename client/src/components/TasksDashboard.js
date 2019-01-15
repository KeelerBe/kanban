import React from 'react'
import PropTypes from 'prop-types'
import { DragDropContext } from 'react-beautiful-dnd'
import './TasksDashboard.css'
import injectSheet from 'react-jss'

const styles = {
	addButton: {
		color: '#999',
		'&:hover': {
			color: '#FDFEFE'
		}
	}
}

const handleDragEnd = (result) => {
	console.log(result)
}

const TasksDashboard = ({ classes, children, onAdd }) => 
	<DragDropContext onDragEnd={handleDragEnd}>
		<div id="dashboard">
			<span className={classes.addButton}>
				<i className="fas fa-plus" onClick={onAdd} />
			</span>
			{children}
		</div>
	</DragDropContext>

TasksDashboard.propTypes = {
	classes: PropTypes.object.isRequired,
	children: PropTypes.node.isRequired,
	onAdd: PropTypes.func.isRequired
}

export default injectSheet(styles)(TasksDashboard)