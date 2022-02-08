// implement your posts router here
const { Router } = require('express');
const post = require('./posts-model');

const router = Router();

router.get('/', (req, res) => {
    post.find()
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(() => {
            res.status(500).json({message: 'The posts information could not be retrieved'});
        })
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    post.findById(id)
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

router.post('/', (req, res) => {
    const body = req.body;
    if(!body.title || !body.contents){
        res.status(400).json({message: 'Please provide title and contents for the post'});
    } else {
        post.insert(body)
            .then(post => {
                res.status(201).json({
                    id: post.id,
                    ...body
                });
            })
            .catch(() => {
                res.status(500).json({message: 'There was an error while saving the post to the database'});
            })
    }
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const body = req.body;
    post.update(id, body)
        .then(post => {
            if(post == null) {
                res.status(404).json({message: 'The post with the specified ID does not exist'});
            } else if (!post.title || !post.contents) {
                res.status(400).json({message: 'Please provide title and contents for the post'});
            } else {
                res.status(200).json({
                    id: post.id,
                    ...body
                });
            }
        })
        .catch(() => {
            res.status(500).json({message: 'The post information could not be modified'});
        })
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const body = req.body;
    post.remove(id)
        .then(post => {
            if(post == null) {
                res.status(404).json({message: 'The post with the specified ID does not exist'});
            } else {
                res.status(200).json({
                    id: post.id,
                    ...body
                });
            }
        })
        .catch(() => {
            res.status(500).json({message: 'The post could not be removed'});
        })
});

router.get('/:id/comments', (req, res) => {
    const { id } = req.params;
    post.findCommentById(id)
        .then(post => {
            if(post == null) {
                res.status(404).json({message: 'The post with the specified ID does not exist'});
            } else {
                res.json(post);
            }
        })
        .catch(() => {
            res.status(500).json({message: 'The comments information could not be retrieved'});
        })
});

module.exports = router;