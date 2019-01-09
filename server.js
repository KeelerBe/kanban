const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const fs = require('fs')
const colors = require('colors')

const app = express()
const port = process.env.PORT || 8000
const DATA_FILE = path.join(__dirname, 'tasks.json')

app.use('/', express.static(path.join(__dirname, 'client')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/api/tasks', (req, res) => {
	fs.readFile(DATA_FILE, (err, data) => {
    res.json(JSON.parse(data))
	})
})

app.post('/api/tasks', (req, res) => {
  fs.readFile(DATA_FILE, (err, data) => {
    const { task } = req.body
    const tasks = JSON.parse(data)
    tasks.push(task)
    fs.writeFile(DATA_FILE, JSON.stringify(tasks, null, 2), () => {
      res.json({ success: 'New card added.' })
    })
  })
})

app.delete('/api/tasks', (req, res) => {
  fs.readFile(DATA_FILE, (err, data) => {
    const tasks =  JSON.parse(data)
    const filteredTasks = tasks.filter((task) => task.id !== req.body.id)
    fs.writeFile(DATA_FILE, JSON.stringify(filteredTasks, null, 2), () => {
      res.json({ success: 'Task deleted.' })
    })
  })
})

app.listen(port, () => console.log(`Listening on port ${port}...`.inverse))