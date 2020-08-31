
const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth')
const multer = require('../middlewares/multer')

const saucesControllers = require('../controllers/sauces');

router.get('/', auth, saucesControllers.getAllSauces);
router.get('/:id', auth, saucesControllers.getOneSauce);

// send sauce to DB
router.post('/', auth, multer, saucesControllers.postOneSauce);

router.put('/:id', auth, multer, saucesControllers.updateOneSauce);
router.delete('/:id', auth, saucesControllers.getAllSauces);



module.exports = router;