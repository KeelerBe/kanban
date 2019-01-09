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

app.delete('/api/tasks', (req, res) => {
  fs.readFile(DATA_FILE, (err, data) => {
    const tasks =  JSON.parse(data)
    const filteredTasks = tasks.filter((task) => task.id !== req.body.id)
    fs.writeFile(DATA_FILE, JSON.stringify(filteredTasks, null, 2), () => {
      res.json({})
    })
  })
})

app.listen(port, () => console.log(`Listening on port ${port}...`.inverse))