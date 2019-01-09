const express = require('express')
const bodyParser = require('body-parser')
const colors = require('colors')

const app = express()
const port = process.env.port || 8000

app.listen(port, () => console.log(`Listening on port ${port}...`.inverse))