const mongoController = require('./mongoController'); 
const mongoose = require('mongoose');
const tweet = require('../models/tweet_schema');
var db = mongoose.connection;

exports.getUncheckedTweets = async (req,res) => 
{
	Math.floor((Math.random() * 50) + 1);
	var tweet = db.model('tweets', tweet);
    tweet.find({checked: false}).sort({'date': -1}).limit(20).skip(Math.floor((Math.random() * 50) + 1)).exec(function(err, posts) 
    {
        if(!err)
        {
            res.render('verify', {data: posts});
        }  
    });    	
}
exports.checkTweets = async (req,res) => 
{
	var tweet = db.model('tweets', tweet);
	for(let i in req.body)
	{
		if(req.body[i] != "")
		{
			let query = {id: i};
			tweet.update(query, { checked: true, crime: req.body[i]}, function(err) 
	    	{
		        if(!err)
		        {
		            console.log("Successfully updated")
		        }  
	    	});
		}	
	}
	tweet.find({checked: false}).sort({'date': -1}).limit(20).skip(Math.floor((Math.random() * 50) + 1)).exec(function(err, posts) 
    {
        if(!err)
        {
            res.render('verify', {data: posts});
        }  
    });  	
}