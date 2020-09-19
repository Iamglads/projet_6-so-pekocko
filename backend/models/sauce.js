const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({

    name :          { type: String, require: true},
    manufacturer :  { type: String, require: true},
    description :   { type: String, require: true},
    mainPepper :    { type: String, require: true}, // ingrédiant principale 
    imageUrl :      { type: String, require: true},
    userId :        { type: String, require: true},
    heat :          { type: Number, require: true}, // Notre du niveau de piquant de la sauce
    likes :         { type: Number, default: 0},
    dislikes :      { type: Number, default: 0},
    usersLiked :    [{ type: String}],
    usersDislikes :  [{ type: String}],
})


module.exports = mongoose.model('Sauces', sauceSchema);

