const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const router = require('./router')

const app = express()
const port = process.env.PORT || 8000

app.use(express.static(path.join(__dirname, 'client/build')))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/api', router)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')))
  app.get('*', (req, res) => {
    res.sendfile(path.join(__dirname = 'client/build/index.html'))
  })
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/public/index.html'))
})

app.listen(port, () => console.log(`Listening on port ${port}...`))