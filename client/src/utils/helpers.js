/*eslint-disable */
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

const getColumn = (heading) => {
  let column = ""
  
  switch (heading) {
    case "To Do":
      return column = "todoIds"
    case "Doing":
      return column = "doingIds"
    case "Done":
      return column = "doneIds"
    default:
      return column = null
  }

  return column
}

export default {
  getLists,
  createTask,
  getColumn
}