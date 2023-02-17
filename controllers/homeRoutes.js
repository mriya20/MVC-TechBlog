const router = require('express').Router();
const { Post, Comment, User } = require("../models");
const withAuth = require('../utils/auth.js')

// GET Route for home page.
router.get('/', async (req, res) => {

    try {
        // Logs the request to the terminal.
        console.log('test');
        const postData = await Post.findAll();
        console.log(postData);
        const posts = postData.map(post => post.get({ plain: true }));
        console.log(posts);
        res.render('homepage', { posts });
    } catch (err) {
        console.log(err);
    }
});

router.get('/posts/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
                {
                    model: Comment,
                    include: [User]
                }
            ],
        });

        const post = postData.get({ plain: true });

        res.render('post', {
            ...post,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {

    if (req.session.loggedIn) {

    }
    // Otherwise, render the 'login' Handlebars template
    res.render('login', {
        username: req.session.username,
    });
});


router.get('/signup', (req, res) => {

    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('signup', {
        username: req.session.username,
    });
});

router.get('/dashboard', withAuth, async (req, res) => {
    console.log(req.session);
    try {
        let userData = await User.findByPk(req.session.user_id, {
            attributes: {
                exclude: ['password']

            },
            include: [{
                model: Post
            }]
        })
        const user = userData.get({ plain: true });
        console.log(user);
        // res.status(200).json(user);

        res.render('dashboard', {
            ...user,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }

});

module.exports = router;