export const filterByStatus = (tasks) => {
  const todoList = []
  const doingList = []
  const doneList = []

  tasks.forEach((task) => {
    if (task.status === "todo") todoList.push(task)
    if (task.status === "doing") doingList.push(task)
    if (task.status === "done") doneList.push(task)
  })

  return {
    todoList,
    doingList,
    doneList
  }
}