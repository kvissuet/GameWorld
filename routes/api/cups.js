

const express = require('express');
const router = express.Router();
const passport = require('passport');


// Import model
const CupsGame = require('../../models/CupsGame');

// //Import validator
// const validatePostInput = require('../../validation/post')
// const validateCommentInput = require('../../validation/comment')

// @route   GET api/cups/test
// @desc    Test cups route
// @access   Public
router.get('/test',(req, res) => res.json({msg:"Cups Works"}));

// @route   Post api/cups/
// @desc    Create Game
// @access   Private
router.post('/', passport.authenticate('jwt',{session:false}), (req,res)=> {
    const newCupsGame = new CupsGame({
        player1: req.user.id,
        avatar1: req.user.avatar,
        player1name: req.user.name
    });

    newCupsGame.save().then(game => res.json(game))
});

// @route   Post api/cups/join/:id
// @desc    Join Game
// @access   Private
router.post('/join/:id', passport.authenticate('jwt',{session:false}), (req,res)=> {
    CupsGame.findOne({_id: req.params.id})
        .then(game => {

            if (!game.player2 === "None"){
                res.status(400).json({cantjoin:"Game is full"})
            }

            if (game.player1 === req.user.id){
                res.status(400).json({cantjoin:"You can't join your own game"})
            }

            game.player2 = req.user.id;
            game.avatar2 =  req.user.avatar;
            game.player2name = req.user.name;

            game.save().then(game => res.json(game))

            })
        .catch(err => res.status(404).json({nopostfound:"No game with id found"}))
});

// @route   Post api/cups/join/:id
// @desc    Join Game
// @access   Private
router.get('/:id', (req,res)=> {
    CupsGame.findOne({_id: req.params.id})
        .then(game => {

            game.save().then(game => res.json(game))

        })
        .catch(err => res.status(404).json({nopostfound:"No game with id found"}))
});

// @route   Post api/cups/move/:id
// @desc    Join Game
// @access   Private
router.post('/move/:id', passport.authenticate('jwt',{session:false}), (req,res)=> {
    CupsGame.findOne({_id: req.params.id})
        .then(game => {

            if (game.winner) {
                res.status(400).json({gameisover:"Game has already ended"})
            }

            let player = -1;

            if (game.player2 === req.user.id){
                player = 2
            }

            if (game.player1 === req.user.id){
                player = 1
            }

            if (player ===-1){
                res.status(405).json({notyourgame:"This is not your fight"})
            }

            const {player1Currency, player2Currency} = game;

            if (player===1){
                if (player1Currency<req.body.value || req.body.value >100 || req.body.value <= 0){
                    res.status(400).json({illegalmove:"Illegal Move"})
                }
                game.player1Currency = player1Currency - req.body.value;

                if (game.history.length === 0 || game.history[game.history.length-1].player1move){
                    game.history.push({player1move:req.body.value})
                } else {
                    game.history[game.history.length-1].player1move= req.body.value
                }
            }

            if (player===2) {
                if (player2Currency < req.body.value || req.body.value > 100 || req.body.value <= 0) {
                    res.status(400).json({illegalmove: "Illegal Move"})
                }
                game.player2Currency = player2Currency - req.body.value;

                if (game.history.length === 0 || game.history[game.history.length - 1].player2move) {
                    game.history.push( {player2move:req.body.value})
                } else {
                    game.history[game.history.length - 1].player2move = req.body.value
                }
            }

            if (game.history[game.history.length - 1].player2move && game.history[game.history.length - 1].player1move) {
                if (game.history[game.history.length - 1].player2move>game.history[game.history.length - 1].player1move) {
                    game.score++
                } else if(game.history[game.history.length - 1].player2move && game.history[game.history.length - 1].player1move) {
                    game.score--
                } else {
                    game.score = game.score+ game.tieBreaker;
                    game.tieBreaker = -game.tieBreaker
                }
            }

            if (game.score === 4 || game.player2Currency ===0 ) {
                game.winner = game.player1
            } else if (game.score === -4 || game.player1Currency === 0) {
                game.winner = game.player2
            }

            game.save().then(game => res.json(game))

        })
        .catch(err => res.status(404).json({nopostfound:"No game with id found"}))
});



module.exports = router;