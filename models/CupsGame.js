const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const CupsGameSchema = new Schema({
    player1: {
        type: String,
        default: "None"
    },
    player2: {
        type: String,
        default: "None"
    },

    player1Currency: {
        type: String,
        default: "100"
    },
    player2Currency: {
        type: String,
        default: "100"
    },

    player1name: {
        type:String,
        default:"None"
    },

    player2name: {
        type:String,
        default:"None"
    },


    avatar1: {
        type: String,
        default: "None"
    },
    avatar2: {
        type: String,
        default: "None"
    },
    winner: {
        type: String,
    },

    history: [{
        player1move: {
            type: String,
            default: "Not Yet Submitted"
        },
        player2move: {
            type: String,
            default: "Not Yet Submitted"
        },
    }],

    score: {
        type: String,
        default: '0'
    },


});

module.exports = User = mongoose.model('cupsGames',CupsGameSchema);
