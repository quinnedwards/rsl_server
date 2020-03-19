let express = require('express');
let router = express.Router();
let Store = require('../db').import('../models/store');

router.get('/', (req, res) => {
    Store.findAll()
    .then(store => res.status(200).json(store))
    .catch(err => res.status(500).json({
        error: err
    }))
})

module.exports = router;