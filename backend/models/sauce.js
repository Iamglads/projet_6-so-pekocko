const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({

    userId : { type: String, require:true, unique:true},
    name : { type: String, require:true},
    manufacturer : { type: String, require:true},
    description : { type: String, require:true, unique:true},
    mainPepper : { type: String, require:true, unique:true}, // ingrédiant principale 
    imageUrl : { type: String, require:true},
    heat : { type: Number, require:true}, // Notre du niveau de piquant de la sauce
    likes : { type: Number},
    dislikes : { type: Number},
    usersLiked : { type: String},
    usersDilikes : { type: String}
})

