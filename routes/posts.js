var express = require('express');
var router = express.Router();
var Post = require('../models/Post');

// Index
router.get('/', (req, res) => {
    Post.find({})
        .sort('-createdAt')
        .exec((err, posts) => {
            if (err) return res.json(err);
            res.render('posts/index', { posts: posts });
        });
});

// New
router.get('/new', (req, res) => {
    res.render('posts/new');
});

// Create
function createNewPost(req, res) {
    return Post.create(req.body, (err, post) => {
        if (err) return res.json(err);
        return res.json({ result: 'success' });
    });
}

router.post('/', (req, res) => {
    createNewPost(req, res)
});

// Show
router.get('/:id', (req, res) => {
    Post.findOne({ _id: req.params.id }, (err, post) => {
        if (err) return res.json(err);
        res.render('posts/show', { post: post });
    });
});

// Edit
router.get('/:id/edit', (req, res) => {
    Post.findOne({ _id: req.params.id }, (err, post) => {
        if (err) return res.json(err);
        res.render('posts/edit', { post: post });
    });
});

// Update
router.put('/:id', (req, res) => {
    req.body.updatedAt = Date.now();
    Post.findOneAndUpdate({ _id: req.params.id }, req.body, (err, post) => {
        if (err) return res.json(err);
        res.redirect("/posts/" + req.params.id);
    });
});

// Destroy
router.delete('/:id', (req, res) => {
    Post.deleteOne({ _id: req.params.id }, (err) => {
        if (err) return res.json(err);
        res.redirect('/posts');
    });
});

module.exports = router;