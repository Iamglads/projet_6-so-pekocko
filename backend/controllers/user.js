const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()

/*
    Explication 
    On export la fonction signup qui prend en parametre req, res, next
    avec la method hash de bcrypt on hash le mot de passe
    On sauvegarder l'utilisateur crée dans la BD
    on renvoie un message de succès ou d'erreur
*/

exports.signup = (req, res, next) => {

    const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-]/

    // nouvelle couche de vérification des inputs 
    if (req.body.email == null || req.body.password == null) {
        return res.status(400).json({ 'Error': 'Veuillez remplir tous les champs!'})
    }
    else if (!EMAIL_REGEX.test(req.body.email)) {
        return res.status(400).json({ 'Error': 'Votre email est invalide!'})
    }
    else {
         bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user.save()
                .then(() => res.status(201).json({ message: 'bonjour, Votre compte a été crée avec succès!' }))
                .catch(error => res.status(400).json(console.log(error)));
        })
        .catch(error => res.status(400).json({ error }));
    }
}

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (!user) {
                return res.status(401).json({ message: 'Utilisateur non trouvé !' })
            }
            bcrypt.compare(req.body.password, user.password)
                .then((valid) => {
                    if (!valid) {
                        return res.status(401).json({ message: 'Votre mot de passe est inccorect!' });
                    } else {
                        res.status(200).json({
                            userId: user._id,
                            token: jwt.sign( // la fonction sign de jwt est utilisé pour encoder un nouveau token
                                { userId: user._id },
                                process.env.JWT_TOKEN,
                                { expiresIn: '2h' }
                            )
                        })
                        console.log('Vous êtes bien connecté!')
                    }
                })
                .catch((error) => res.status(400).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
};