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

export default {
  getLists,
  createTask
}