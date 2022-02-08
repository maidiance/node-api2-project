// implement your posts router here
const { Router } = require('express');
const Post = require('./posts-model');

const router = Router();

router.get('/', (req, res) => {
    Post.find()
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(() => {
            res.status(500).json({message: 'The posts information could not be retrieved'});
        })
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    Post.findById(id)
        .then(post => {
            if(post == null) {
                res.status(404).json({message: 'The post with the specified ID does not exist'});
            } else {
                res.json(post);
            }
        })
        .catch(() => {
            res.status(500).json({message: 'The post information could not be retrieved'});
        })
});