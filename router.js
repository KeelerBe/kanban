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
    const tasks = JSON.parse(data)
    tasks.push(task)
    fs.writeFile(DATA_FILE, JSON.stringify(tasks, null, 2), () => {
      res.json({ success: 'New card added.' })
    })
  })
})

router.put('/', (req, res) => {
  fs.readFile(DATA_FILE, (err, data) => {
    const tasks = JSON.parse(data)
    tasks.map((task) => {
      if (task.id !== req.body.id) return task

      task.title = req.body.title
      return task
    })
    fs.writeFile(DATA_FILE, JSON.stringify(tasks, null, 2), () => {
      res.json({ success: 'Task updated.' })
    })
  })
})

router.delete('/', (req, res) => {
  fs.readFile(DATA_FILE, (err, data) => {
    const tasks = JSON.parse(data)
    const filteredTasks = tasks.filter((task) => task.id !== req.body.id)
    fs.writeFile(DATA_FILE, JSON.stringify(filteredTasks, null, 2), () => {
      res.json({ success: 'Task deleted.' })
    })
  })
})

module.exports = router