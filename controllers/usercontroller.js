let router = require('express').Router();
let User = require('../db').import('../models/user');
let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');

router.post('/signup', (req, res) => {
    console.log(req.body)
    User.create({
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 10)
    
    })
    .then(
        createSuccess = (user) => {
            let token = jwt.sign({
                id: user.id
            }, process.env.JWT_SECRET, {
                expiresIn: 60*60*24
            });
            res.json({
                user: user,
                message: 'created',
                sessionToken: token
            });
        },
        createError = (err) => {
            res.send(500, err.message);
        }
    );
})

router.post('/login',(req, res) => {
    User.findOne({
        where:{
            username: req.body.user.username
        }
    }).then(user => {
        if(user){
            bcrypt.compare(req.body.passwordhas, user.passwordhash, (err, matches) => {
                if(matches){
                    let token = jwt.sign({
                        id: user.id
                    }, process.env.JWT_SECRET, {
                        expiresIn: 60*60*24
                    })
                    res.json({
                        user: user,
                        message: 'login success',
                        sessionToken: token
                    })
                } else{
                    res.status(502).send({error: 'bad gateway'})
                }
            })
        }else {
            res.status(500).send({error: 'failed to authenticate'})
        }
    }, err => status(501).send({error: 'failed to process'}))
})
module.exports = router;