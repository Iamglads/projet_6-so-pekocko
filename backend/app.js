const express = require('express');
const mongoose = require('mongoose');
const { MONGO_URI} = require('./config');

const app = express();

const log = console.log;

const userRoute = require('./routes/user');


// parametrage CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Same Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
  
//Connect mongoDB with mongoose
mongoose.connect( MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => log('Connecté à mongoDB! :)'))
.catch(() => log('Connexion à mongoDB échouée!'))





app.use('/api/auth/signup', userRoute);



module.exports = app;