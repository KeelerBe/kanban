import React from 'react'
import PropTypes from 'prop-types'
import './TasksDashboard.css'

const TasksDashboard = ({ children }) => (
	<div id="dashboard">
    <i className="fas fa-plus"></i>
		{children}
	</div>
)

TasksDashboard.propTypes = {
  children: PropTypes.node.isRequired
}

export default TasksDashboard