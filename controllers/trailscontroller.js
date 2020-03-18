const router = require('express').Router();
const Trail = require('../db').import('../models/trails');
const validateSession = require('../middleware/validate-session');

// POST 
router.post('/newlog', validateSession, (req, res) => {
    let newTrail = {
        name: req.body.name,
        location: req.body.location,
        difficulty: req.body.difficulty,
        rating: req.body.rating,
        notes: req.body.notes,
        userId: req.user.id
    }

    Trail.create(newTrail)
        .then(data => res.status(200).json(data))
        .catch(err => res.json({ error: err }))
});

// GET BY USER 
router.get('/mytrails', validateSession, (req, res) => {
    Trail.findAll({ where: { userId: req.user.id } })
        .then(data => res.status(200).json(data))
        .catch(err => res.json({ error: err }))
});

// GET ALL 
router.get('/all', (req, res) => {
    Trail.findAll()
        .then(trail => res.status(200).json(trail))
        .catch(err => res.status(500).json({ error: err }))
});

// UPDATE 
router.put('/update/:id', validateSession, (req, res) => {
    Trail.update(req.body, { where: { id: req.params.id } })
        .then(trail => res.status(200).send(`trail log updated!`))
        .catch(err => res.json({ error: err }))
});

// DELETE
router.delete('/delete/:id', validateSession, (req, res) => {
    Trail.destroy({ where: { id: req.params.id } })
        .then(trail => res.status(200).send(`trail log successfully deleted!`))
        .catch(err => res.json({ error: err }))
})

module.exports = router;