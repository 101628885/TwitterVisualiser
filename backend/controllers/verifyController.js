const mongoController = require('./mongoController'); 
const mongoose = require('mongoose');
const tweet = require('../models/tweet_schema');
var db = mongoose.connection;

exports.getUncheckedTweets = async (req,res, next) => 
{
	Math.floor((Math.random() * 50) + 1);
	var tweet = db.model('tweets', tweet);
    tweet.find({checked: false}).sort({'date': -1}).limit(1).skip(Math.floor((Math.random() * 50) + 1)).exec(function(err, posts) 
    {
        if(!err)
        {
            res.render('verify', {data: posts});
        }  
    });    	
}
exports.checkTweets = async (req,res, next) => 
{
	let tweetid= req.params.id;
	let value = req.params.value;
	var tweet = db.model('tweets', tweet);
	let query = {id: tweetid};

	tweet.update(query, { checked: true, crime: value}, function(err) 
	{
        if(!err)
        {
            console.log("Successfully updated")
            tweet.find({checked: false}).sort({'date': -1}).limit(1).skip(Math.floor((Math.random() * 50) + 1)).exec(function(err, posts) 
		    {
		        if(!err)
		        {
		            res.send({data: posts});
		        }  
		    });    	
        }  
	});
}