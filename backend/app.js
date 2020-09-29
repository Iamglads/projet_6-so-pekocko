const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path')
// HELMET 
const helmet = require('helmet')

// APPLICATION EXPRESS
const app = express()

require('dotenv').config()


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

// security HTTP headers
app.use(helmet())


app.use(bodyParser.json())
app.use('/images', express.static(path.join(__dirname, 'images')));


// USE ROUTES
app.use('/api/auth', userRoute)
app.use('/api/sauces', saucesRoute)


module.exports = app