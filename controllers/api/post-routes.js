const router = require('express').Router();
const { Post } = require('../../models');
const authenticate = require('../../utils/auth');


// New post! Woohoo!
router.post('/', authenticate, async (req, res) => {
    const body = req.body;
    try {
        const newPost = await Post.create({
            ...body,
            userId: req.session.userId,
        });
        res.json(newPost);
    } catch (err) {
        res.status(500).json(err);
    }
});

//  Delete post
router.delete('/:id', authenticate, async (req, res) => {
    try {
        const [rowsImpacted] = Post.destroy({
            where: {
                id: req.params.id,
            },
        });
        if (rowsImpacted > 0) {
            res.status(200).end();
        } else {
            res.status(400).end();
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// Update put request
router.put('/:id', authenticate, async (req, res) => {
    try {
        const [rowsImpacted] = await Post.update(req.body, {
            where: {
                id: req.params.id,
            },
        });

        if (rowsImpacted > 0) {
            res.status(200).end();
        } else {
            res.status(404).end();
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
