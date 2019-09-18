const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const bodyParser = require('body-parser')
const cookieSession = require('cookie-session')
const path = require('path')
require('colors')
require('./models/User')
require('./services/passport')
const keys = require('./config/keys')
const authRoutes = require('./routes/authRoutes')
const router = require('./router')

mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true
})
const app = express()

app.use(cookieSession({
  maxAge: 30 * 24 * 60 * 60 * 1000,
  keys: [keys.cookieKey]
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

authRoutes(app)
app.use('/api', router)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')))
  app.get('*', (req, res) => {
    res.sendfile(path.join(__dirname, 'client/build/index.html'))
  })
}

app.get('/', (req, res) => {
  res.send({ app: 'kanban' })
})

const PORT = process.env.PORT || 8000
app.listen(PORT, () => 
  console.log(`***** Listening on port ${PORT} *****` .bgRed))
