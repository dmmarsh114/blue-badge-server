const router = require('express').Router();
const User = require('../db').import('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// USER SIGNUP
router.post('/signup', (req, res) => {
    let newUser = {
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 10),
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    }

    User.create(newUser)
        .then(createSuccess = user => {
            let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 });
            res.json({ user: user, message: 'user created!', sessionToken: token });
        },
            createError = err => res.send(500, err))
});

// USER LOGIN
router.post('/login', (req, res) => {
    User.findOne({ where: { username: req.body.username } })
        .then(user => {
            if (user) {
                bcrypt.compare(req.body.password, user.password, (err, matches) => {
                    if (matches) {
                        let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 25 });
                        res.json({
                            user: user,
                            message: `${user.username} successfully logged in!`,
                            sessionToken: token
                        });
                    } else { res.status(502).send({ error: 'bad gateway' }); }
                })
            } else { res.status(500).send({ error: 'failed to authenticate' }) }
        }, err => res.status(501).send({ error: 'failed to process' }))
});

module.exports = router;