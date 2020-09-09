// sauces 
const express = require('express')
const router = express.Router()

const auth = require('../middlewares/auth')
const multer = require('../middlewares/multer')

const saucesControllers = require('../controllers/sauces')

router.get('/', auth, saucesControllers.getAllSauces)
router.get('/:id', auth, saucesControllers.getOneSauce)

router.post('/', auth, multer, saucesControllers.postOneSauce)

router.put('/:id', auth, multer, saucesControllers.updateOneSauce)
router.delete('/:id', auth, saucesControllers.deleteOneSauce)


// route like sauce 

router.post('/:id/like', saucesControllers.likeSauce)



module.exports = router;