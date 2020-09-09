const multer = require('multer')

const MINE_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
}

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, 'images')
    }, 
    filename: (req, file, cb) => {
        const name = file.originalname.split('').join('_');
        const extension = MINE_TYPES[file.mimetype]
        cb(null, name + Date.now()+'.'+extension)
    }
})

module.exports = multer({ storage: storage }).single('image')