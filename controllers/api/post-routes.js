const router = require('express').Router();
const { Post } = require('../../models/');
const authenticate = require('../../utils/auth');
const withAuth = require('../../utils/auth');

router.post('/', authenticate, async, (req, res) => {
    const body = req.body;

    // add trys, put and delete router
});
