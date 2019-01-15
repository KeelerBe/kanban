import uuidv4 from 'uuid/v4'

const getLists = ({ tasksById, todoIds, doingIds, doneIds }) => {
  const todoList = todoIds.map((todoId) => tasksById[todoId])
  const doingList = doingIds.map((doingId) => tasksById[doingId])
  const doneList = doneIds.map((doneId) => tasksById[doneId])

  return {
    todoList,
    doingList,
    doneList
  }
}

const createTask = () => {
  const task = {
    id: uuidv4(),
    title: ""
  }

  return task
}

// const getTaskList = (tasksObj) => {
//   const taskList = Object.values(tasksObj).map((task) => task)
//   return taskList
// }

const createTasksObject = (tasksArray) => {
  const tasksById = {}
  tasksArray.forEach((task) => tasksById[task.id] = task)
  return tasksById
}

export default {
  getLists,
  createTask,
  // getTaskList,
  createTasksObject
}