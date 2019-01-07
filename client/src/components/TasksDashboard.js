import React from 'react'
import PropTypes from 'prop-types'
import './TasksDashboard.css'

const TasksDashboard = ({ children }) => 
  <div id="dashboard">
    <h3>New +</h3>
    {children}
  </div>

TasksDashboard.propTypes = {
  children: PropTypes.node.isRequired
}

export default TasksDashboard