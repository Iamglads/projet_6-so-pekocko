const express = require('express');
const router = express.Router();


const userController = require('../controllers/user');

router.post('/api/auth/signup', userController.signup);

module.exports = router;