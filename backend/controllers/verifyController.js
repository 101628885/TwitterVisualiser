var schemas = require('./mongoController');
var tweetMelb = schemas.tweetMelb;
var tweetChicago = schemas.tweetChicago;
const tweet = require('../models/tweet_schema');

var NodeGeocoder = require('node-geocoder');

var options = {
	httpAdapter: 'https',
	provider: 'google',
	apiKey: process.env.GOOGLE_PLACES_API,got
};

var geocoder = NodeGeocoder(options);

// Using callback


function sendNextTweet(req, res)
{
	if (req.params.geo === "chicago")
	{
		tweetChicago.find({checked: false}).sort({'date': -1}).limit(1).skip(Math.floor((Math.random() * 50) + 1)).exec(function(err, posts)
		{
			if(!err)
			{
				res.send({data: posts});
			}
		});
	}
	else
	{
		tweetMelb.find({checked: false}).sort({'date': -1}).limit(1).skip(Math.floor((Math.random() * 50) + 1)).exec(function(err, posts)
		{
			if(!err)
			{
				res.send({data: posts});
			}
		});
	}
}

exports.getUncheckedTweets = async (req,res, next) =>
{
	tweetMelb.find({checked: false}).sort({'date': -1}).limit(1).skip(Math.floor((Math.random() * 50) + 1)).exec(function(err, posts)
	{
		if(!err)
		{
			res.render('verify', {data: posts, title : "VISION: Check Tweets"});
		}
	});
};
exports.checkTweets = async (req,res, next) =>
{
	let tweetid= req.params.id;
	let value = req.params.value;
	let location = req.params.location;
	let type = req.params.type;
	let query = {id: tweetid};


	if (tweetid === "0")
	{
		sendNextTweet(req, res);
	}
	else
	{
		//If marked as true, use the geocoder to get a place object and update the tweet with type of crime and the place object
		if (value == "true")
		{
			console.log("Selected true for current tweet...");
			geocoder.geocode(location, function(error, place)
			{
				if(!error)
				{
					console.log(place);

					if (req.params.geo === "chicago")
					{
						tweetChicago.update(query, {checked: true, crime: value, type_of_crime: type, location: place}, function(err, doc)
						{
							if(!err)
							{
								console.log("Successfully updated: Chicago");
								sendNextTweet(req, res);
							}
						});
					}
					else
					{
						tweetMelb.update(query, {checked: true, crime: value, type_of_crime: type, location: place}, function(err, doc)
						{
							if(!err)
							{
								console.log("Successfully updated: Melbourne");
								sendNextTweet(req, res);
							}
						});
					}
				}
				else
				{
					console.log(error);
				}
			})
		}
		else
		{
			console.log("Selected false for current tweet...");
			if (req.params.geo === "chicago")
			{
				tweetChicago.update(query, { checked: true, crime: value}, function(err)
				{

					if(!err)
					{
						console.log("Successfully updated: Chicago");
						sendNextTweet(req, res);
					}
				});
			}
			else
			{
				tweetMelb.update(query, { checked: true, crime: value}, function(err)
				{

					if(!err)
					{
						console.log("Successfully updated: Melbourne");
						sendNextTweet(req, res);

					}
				});
			}
		}
	}

};
