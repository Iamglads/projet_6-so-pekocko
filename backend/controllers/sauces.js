const Sauces = require('../models/sauce')
const fs = require('fs')
const log = console.log



// function get all sauces 
exports.getAllSauces = (req, res, next) => {
    Sauces.find()
        .then((sauces) => {
            res.status(200).json(sauces)
            log(sauces)
        })
        .catch((error) => res.status(400).json(log(error)))
}


// function get one sauce with id
exports.getOneSauce = (req, res, next) => {
    Sauces.findOne({ _id: req.params.id })
        .then((sauce) => {
            res.status(200).json(sauce)
            log(sauce)
        })
        .catch((error) => res.status(400).json(log(error)))
}


// function to add one sauce and save in mongoDB
// we need multer to upload image
exports.postOneSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauces({
        //name: req.body.name,
        //manufacturer: req.body.manufacturer,
        //description: req.body.description,
        //mainPapper: req.body.mainPapper,
        //heat: req.body.heat,
        //dislikes: req.body.dislikes,
        //usersLiked: req.body.usersLiked,
        //usersDislikes: req.body.usersDislikes,
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    })
    log(req.body.sauce)
    sauce.save()
        .then(() => {
            res.status(201).json()
            log('Sauce enregistrée avec succèss !')
        })
        .catch((error) => res.status(400).json(log(error)))
}


// function to modify one product with id
exports.updateOneSauce = (req, res, next) => {
    const sauceObject = req.file ?
        {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };
    Sauces.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
        .then(() => res.status(200).json(log('Sauce modifiée !')))
        .catch((error) => res.status(400).json(log(error)));
}


// function to delete one sauce with id 
exports.deleteOneSauce = (req, res, next) => {
    Sauces.findOne({ _id: req.params.id })
        .then((sauce) => {
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Sauces.deleteOne({ _id: req.params.id })
                    .then(() => {
                        res.status(200).json()
                        log('Votre sauce est bien supprimé !')
                    })
                    .catch((error) => res.status(400).json(log(error)))
            })
        })
        .catch((error) => res.status(500).json(log(error)))
}