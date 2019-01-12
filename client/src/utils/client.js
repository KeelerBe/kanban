import axios from 'axios'

const getTasks = (onSuccess) => {
  axios.get('/api/tasks')
    .then((response) => response.data)
    .then(onSuccess)
    .catch((error) => console.log(error))
}

const addTask = (task) => {
  axios.post('/api/tasks', { task })
    .then((response) => response)
    .catch((error) => console.log(error))
}

const deleteTask = (taskId) => {
  axios.delete('/api/tasks', {
    data: { id: taskId }
  })
    .then((response) => response)
    .catch((error) => console.log(error))
}

const updateTask = (taskId, newTitle) => {
  axios.put('/api/tasks', {
    id: taskId,
    title: newTitle
  })
    .then((response) => response)
    .catch((error) => console.log(error))
}

export default {
  getTasks,
  addTask,
  deleteTask,
  updateTask
}