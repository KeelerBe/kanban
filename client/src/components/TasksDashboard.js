import React from 'react'
import TodoList from './TodoList'
import DoingList from './DoingList'
import DoneList from './DoneList'
import './TasksDashboard.css'

const TasksDashboard = () => 
  <div id="dashboard">
    <h3>New +</h3>
    <div>
      <TodoList />
      <DoingList />
      <DoneList />
    </div>
  </div>

export default TasksDashboard