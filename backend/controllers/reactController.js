const mongoController = require('./mongoController'); 
const mongoose = require('mongoose');
const tweet = require('../models/tweet_schema');
var db = mongoose.connection;

exports.shanesAndCoreySpecialsEndPoint = async (req,res) => 
{
	var tweet = db.model('tweets', tweet);
    tweet.find({checked: false}).sort({'date': -1}).limit(parseInt(req.params.count)).skip(Math.floor((Math.random() * 50) + 1)).exec(function(err, posts) 
    {
        if(!err)
        {
            res.send(posts);
        }
        else
        {
        	console.log(err);
        }  
    }); 
}