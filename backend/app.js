const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path')
const helmet = require('helmet')
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

// USE ROUTES
app.use('/api/auth', userRoute)
app.use('/api/sauces', saucesRoute)


module.exports = app