const mongoose = require('mongoose')
const { Schema } = mongoose

const taskSchema = new Schema({
  task: String,
})

mongoose.model('tasks', taskSchema)