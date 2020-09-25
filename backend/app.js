const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path')
const helmet = require('helmet')
//const session = require('express-session')
const app = express()

const log = console.log


// routes
const userRoute = require('./routes/user')
const saucesRoute = require('./routes/sauces')



// CONFIGURATION CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
  next()
})


const { MONGO_URI} = require('./config')
//CONNECT MONGOOSE WITH mongoDB
mongoose.connect( MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => log('Connecté à mongoDB! :)'))
.catch(() => log('Connexion à mongoDB échouée!'))

app.use(helmet())
app.use(bodyParser.json())
app.use('/images', express.static(path.join(__dirname, 'images')));

// session 

/* let expiryDate = new Date(Date.now() + 60 * 60 * 1000) // 1h
app.use(session({
  name: 'session',
  keys: ['key1', 'key2'],
  cookie: {
      secure: true,
      httpOnly: true,
      domain: "localhost:4200",
      path: '/api/sauces',
      expires: expiryDate
  }
})) */

// USE ROUTES
app.use('/api/auth', userRoute)
app.use('/api/sauces', saucesRoute)


module.exports = app