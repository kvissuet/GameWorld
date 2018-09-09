const express = require('express');
const router = express.Router();
const passport = require('passport');

//Import model
const Post = require('../../models/Post');

//Import validator
const validatePostInput = require('../../validation/post')
const validateCommentInput = require('../../validation/comment')

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
        name: req.user.name,
        avatar: req.user.avatar,
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

// @route   Post api/like/:post_id
// @desc    Add and Remove Likes
// @access   Private
router.post('/like/:post_id', passport.authenticate('jwt',{session:false}), (req,res)=> {
    Post.findById(req.params.post_id)
        .then(post => {
            if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0){
                return res.status(400).json({ alreadyliked: "User already liked this post"})
            }

            // Add user id to likes array
            post.likes.unshift({user:req.user.id});

            post.save().then(post => res.json(post));
        })
        .catch( err => res.status(404).json({postnotfound: "No post found with id"}))
});

// @route   Post api/unlike/:post_id
// @desc    Add and Remove Likes
// @access   Private
router.post('/unlike/:post_id', passport.authenticate('jwt',{session:false}), (req,res)=> {
    Post.findById(req.params.post_id)
        .then(post => {
            if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0){
                return res.status(400).json({ alreadyliked: "User hasn't liked this post"})
            }

            // Add user id to likes array
            post.likes= post.likes.filter(like => like.user.toString() !== req.user.id);

            post.save().then(post => res.json(post));
        })
        .catch( err => res.status(404).json({postnotfound: "No post found with id"}))
});

// @route   Post api/comment/:post_id
// @desc    Add comment
// @access   Private
router.post('/comment/:post_id', passport.authenticate('jwt',{session:false}), (req,res)=> {
    const {errors, isValid} = validateCommentInput(req.body);

    if(!isValid){
        res.status(400).json(errors)
    }

    Post.findById(req.params.post_id)
        .then(post => {

            const newComment = {
                text:req.body.text,
                name: req.body.name,
                avatar: req.body.avatar,
                user: req.user.id
            };

            // Add user id to likes array
            post.comments.unshift(newComment);

            post.save().then(post => res.json(post));
        })
        .catch( err => res.status(404).json({postnotfound: "No post found with id"}))
});

// @route   DELETE api/comment/:post_id/:comment_id
// @desc    Delete comment
// @access   Private
router.delete('/:post_id/:comment_id', passport.authenticate('jwt',{session:false}), (req,res)=> {
    Post.findById(req.params.post_id)
        .then(post => {

            const comment = post.comments.filter( comment => comment._id.toString() === req.params.comment_id);

            if (comment.length === 0){
                res.status(404).json({error:"No comment found"})
            }

            if (comment[0].user.toString() !== req.user.id){
                res.status(404).json({error:"You are not the comment creator"})
            }


            // Add user id to likes array
            post.comments = post.comments.filter( comment => comment._id.toString() !== req.params.comment_id);

            post.save().then(post => res.json(post));
        })
        .catch( err => res.status(404).json({postnotfound: "No post found with id"}))
});
module.exports = router;
