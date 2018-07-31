const mongoose = require("mongoose");
const tweet = require('../models/tweet_schema');
const db = mongoose.connection;
const nlp = require('./nlpTrainingController');

exports.getTweetMap = function(req, res)
{
    res.render('tweetmap');
};
