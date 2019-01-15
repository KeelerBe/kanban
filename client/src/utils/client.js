import axios from 'axios'

const getTasks = (onSuccess) => {
  axios.get('/api/tasks')
    .then(checkStatus)
    .then((response) => onSuccess(response.data))
    // .catch(onError)
}

const addTask = (task) => {
  axios.post('/api/tasks', { task })
    .then(checkStatus)
    // .catch(onError)
}

const deleteTask = (taskId, column) => {
  axios.delete('/api/tasks', {
    data: { 
      id: taskId,
      column 
    }
  })
    .then(checkStatus)
    .catch(onError)
}

const updateTask = (taskId, newTitle) => {
  axios.put('/api/tasks', {
    id: taskId,
    title: newTitle
  })
    .then(checkStatus)
    .catch(onError)
}

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
   return response
  }
}

const onError = ({ response }) => {
  const { status, statusText } = response.request
  const error = new Error(`HTTP Error: ${status} ${statusText}`)
  error.status = statusText
  error.response = response
  console.log(error)
  throw error
}

export default {
  getTasks,
  addTask,
  deleteTask,
  updateTask
}