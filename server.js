const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
// const fs = require('fs')
const router = require('./router')
const colors = require('colors')

const app = express()
const port = process.env.PORT || 8000

app.use('/', express.static(path.join(__dirname, 'client')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/api', router)

app.listen(port, () => console.log(`Listening on port ${port}...`.inverse))