let express = require('express');
let router = express.Router();
let Rating = require('../db').import('../models/rating');

router.post('/create', (req, res) => {
    const ratingFromRequest = {
        description: req.body.description,
        location: req.body.location,
        name: req.body.name,
        userId: req.user.id
    }

    Rating.create(ratingFromRequest)
        .then(rating => res.status(200).json(rating))
        .catch(err => res.json({
            error: err
        }));
});

router.get('/', (req, res) => {
    User.findOne({
        where: {
            id: req.user.id},
            include: ['ratings']
    })
        .then(rating => res.status(200).json(rating))
        .catch(err => res.status(500).json({
            error: err
        }))
});

router.get('/:id', (req, res) => {
    Rating.findAll({
        where: {
            id: req.params.id
        }
    })
    .then(rating => res.status(200).json(rating))
    .catch(err => res.status(500).json({
        error: err
    }))
});

router.put('/:id', (req, res) => {
    Rating.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then(rating => res.status(200).json(rating))
    .catch(err => res.json(req.errors))
});

router.delete('/:id', (req, res) => {
    Rating.destroy({
        where: {
            id: req.params.id, 
            userId: req.user.id
        }
    })
    .then(rating => res.status(200).json(rating))
    .catch(err => res.json({
        error: err
    }))
})

module.exports = router;