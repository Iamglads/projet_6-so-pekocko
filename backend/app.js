const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path')
require('dotenv').config()
const helmet = require('helmet')

const app = express()

const log = console.log
const session = require('express-session')

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


//CONNECT MONGOOSE WITH mongoDB
mongoose.connect( process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => log('Connecté à mongoDB! :)'))
.catch(() => log('Connexion à mongoDB échouée!'))

app.use(helmet())
app.use(bodyParser.json())
app.use('/images', express.static(path.join(__dirname, 'images')));

// session 



// USE ROUTES
app.use('/api/auth', userRoute)
app.use('/api/sauces', saucesRoute)


module.exports = app