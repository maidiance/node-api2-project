// implement your posts router here
const { Router } = require('express');
const User = require('./posts-model');

const router = Router();

router.get('/', (req, res) => {
    User.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(() => {
            res.status(500).json({message: 'The posts information could not be retrieved'})
        })
})