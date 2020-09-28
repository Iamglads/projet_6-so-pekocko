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
                Sauces.remove({ _id: req.params.id })
                    .then(() => res.redirect('/api/sauces'))
                    .then(() => {
                        res.status(201).json()
                        log('Votre sauce est bien supprimé !')
                    })
                    .catch((error) => res.status(400).json(log(error)))
            })
        })
        .catch((error) => res.status(500).json(log(error)))
}


exports.likeSauce = (req, res, next) => {

    const likeSauce = req.body.like
    const userId = req.body.userId
    const nameSauce = req.body.name
    const id = req.params.id
    //const usersLiked = req.body.usersLiked


    switch (likeSauce) {
        // CAS OU LA SAUCE EST AIMEE AJOUTER 1
        // AJOUTER LE USER QUI AIME LA SAUCE DANS userLiked
        case 1:
            Sauces.updateOne({ _id: req.params.id }, { $inc: { likes: 1 }, $push: { usersLiked: userId } })
                .then(() => res.status(200).json(log(`Vous aimez la sauce: ${nameSauce}`)))
                .catch((error) => res.status(400).json(log(error)))
            break;

        // CHOIX LA SAUCE N EST PAS AIMEE 
        // AJOUTER LE USER QUI N'AIME PAS LA SAUCE DANS userDislikes
        case -1:
            Sauces.updateOne({ _id: req.params.id }, { $inc: { dislikes: 1 }, $push: { usersDisliked: userId } })
                .then(() => res.status(200).json(log(`Vous n'aimez pas la sauce: ${nameSauce}`)))
                .catch((error) => res.status(400).json(log(error)))
            break;

        // CAS CHOIX ANNULE
        // RETIRER
        case 0:
            Sauces.findOne({ _id: req.params.id })
                .then((sauce) => {
                    if (sauce.usersLiked.includes(userId)) {
                        Sauces.updateOne({ _id: id }, { $pull: { usersLiked: userId }, $inc: { likes: -1 } })
                            .then(() => res.status(200).json(log('Sauce - 1 dans usersLiked')))
                            .catch((error) => res.status(400).json(log(error)))
                    }
                    if (sauce.usersDisliked.includes(userId)) {
                        Sauces.updateOne({ _id: id }, { $pull: { usersDisliked: userId }, $inc: { dislikes: -1 } })
                            .then(() => res.status(200).json(log('Sauce - 1 dans usersDisliked')))
                            .catch((error) => res.status(400).json(log(error)))
                    }
                })
                .catch((error) => res.status(500).json(log(error)))
            break;

        default:
            alert(error)
            break;
    }
}

