const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//Import model
const Post = require('../../models/Post')
const Profile = require('../../models/Profile')

//Import validator
const validatePostInput = require('../../validation/post')

// @route   GET api/posts/test
// @desc    Test posts route
// @access   Public
router.get('/test',(req, res) => res.json({msg:"Posts Works"}));

// @route   Post api/posts
// @desc    Create Post
// @access   Private
router.post('/', passport.authenticate('jwt',{session:false}), (req,res)=> {
    const {errors, isValid} = validatePostInput(req.body);

    if(!isValid){
        res.status(400).json(errors)
    }

    const newPost = new Post({
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id,
        title: req.body.title
        });

    newPost.save().then(post => res.json(post));
});

// @route   Get api/posts
// @desc    Get all posts
// @access   Public
router.get('/', (req,res)=> {
    Post.find().sort({date:-1})
        .then(posts => res.json(posts))
        .catch(err => res.status(404).json({nopostfound:"No posts found"}));
});

// @route   Get api/posts/:post_id
// @desc    Create Post
// @access   Public
router.get('/:post_id', (req,res)=> {
    Post.findOne({_id: req.params.post_id})
        .then(posts => res.json(posts))
        .catch(err => res.status(404).json({nopostfound:"No post with id found"}))
});

// @route   Delete api/posts/:post_id
// @desc    Delete Post
// @access   Private
router.delete('/:post_id', passport.authenticate('jwt',{session:false}), (req,res)=> {
    Post.findById(req.params.post_id)
        .then(post => {
            if (post.user.toString() !== req.user.id) {
                res.status(401).json({notauthorized: "You can only delete your own posts"})
            }

            //Delete
            post.remove().then(() => res.json({success:true}))
        })
        .catch( err => res.status(404).json({postnotfound: "No post found with id"}))
});

module.exports = router;
