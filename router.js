const express = require('express')
const fs = require('fs')
const path = require('path')

const router = express.Router()
const DATA_FILE = path.join(__dirname, 'tasks.json')

router.get('/', (req, res) => {
  fs.readFile(DATA_FILE, (err, data) => {
    res.json(JSON.parse(data))
  })
})

router.post('/', (req, res) => {
  fs.readFile(DATA_FILE, (err, data) => {
    const { task } = req.body
    const kanban = JSON.parse(data)

    kanban.tasksById[task.id] = task
    kanban.todoIds.push(task.id)
    
    fs.writeFile(DATA_FILE, JSON.stringify(kanban, null, 2), () => {
      res.json({ success: 'New card added.' })
    })
  })
})

router.put('/', (req, res) => {
  fs.readFile(DATA_FILE, (err, data) => {
    const kanban = JSON.parse(data)
    Object.values(kanban.tasksById).forEach((task) => {
      if (task.id === req.body.id) 
        task.title = req.body.title
    })

    fs.writeFile(DATA_FILE, JSON.stringify(kanban, null, 2), () => {
      res.json({ success: 'Task updated.' })
    })
  })
})

router.delete('/', (req, res) => {
  fs.readFile(DATA_FILE, (err, data) => {
    const kanban = JSON.parse(data)
    const tasksById = {}
    Object.values(kanban.tasksById).forEach((task) => {
        if (task.id !== req.body.id) tasksById[task.id] = task
    })

    const filteredColumn = kanban[req.body.column].filter((id) => id !== req.body.id)

    kanban.tasksById = tasksById
    kanban[req.body.column] = filteredColumn

    fs.writeFile(DATA_FILE, JSON.stringify(kanban, null, 2), () => {
      res.json({ success: 'Task deleted.' })
    })
  })
})

module.exports = router