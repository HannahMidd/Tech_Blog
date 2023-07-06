// requiring express, post models, and authenticate variable
const router = require('express').Router();
const { Post } = require('../models');
const authenticate = require('../utils/auth');

// Get request, middleware, fetching all posts and converting to plain JS
router.get('/', authenticate, async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: {
                userId: req.session.userId,
            },
        });

        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('all-posts-admin', {
            layout: 'dashboard',
            posts,
        });
    } catch (err) {
        res.redirect('login');
    }
});

// render post view and post to dashboard layout
router.get('/new', authenticate, (req, res) => {
    res.render('new-post', {
        layout: 'dashboard',
    });
});

// Edit post. If successful, show dashboard, if unsuccessful, redirect to login.
router.get('/edit/:id', authenticate, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id);

        if (postData) {
            const post = postData.get({ plain: true });

            res.render('edit-post', {
                layout: 'dashboard',
                post,
            });
        } else {
            res.status(404).end();
        }
    } catch (err) {
        res.redirect('login');
    }
});

module.exports = router;
