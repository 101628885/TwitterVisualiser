const mongoController = require('./mongoController'); 
const mongoose = require('mongoose');
const tweet = require('../models/tweet_schema');
var db = mongoose.connection;

var NodeGeocoder = require('node-geocoder');
 
var options = {
  httpAdapter: 'https', 
  provider: 'google',
  apiKey: process.env.GOOGLE_PLACES_API, 
};
 
var geocoder = NodeGeocoder(options);
 
// Using callback

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
	let location = req.params.location;
	let type = req.params.type;
	var tweet = db.model('tweets', tweet);
	let query = {id: tweetid};
	console.log(req.params)

	//If marked as true, use the geocoder to get a place object and update the tweet with type of crime and the place object
	if (value == "true")
	{
		geocoder.geocode(location, function(error, place) 
		{
			if(!error)
		    {
		    	console.log(place)
	  			tweet.update(query, {checked: true, crime: value, type_of_crime: type, location: place}, function(err, doc) 
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
		})	
	}
	else
	{
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
	
}