var Twitter = require('twitter');
const moment = require('moment');
const request = require('request');
const D3Node = require('d3-node')
const fs = require('fs');
const mongoController = require('./mongoController'); 
const autoController = require ('./autoController');
const helpers = require ('../helpers');

var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

exports.test = async(req,res) => 
{
	tweets = ""
	res.render('index', {data: tweets});
}

exports.getBulkTweetsOld = (req,res) => 
{
	let reptitions = 50000000000000000;
	let tweetCount = 0;
	let reptitionsCompleted = 0;
	//Center of aus with radius 2000km get most of aus 
	var params = {
			q: "crime OR delinquency OR syndicate OR spree OR thriller OR mafia OR prevention OR policing OR crimes AND -filter:retweets AND -filter:replies", 
			geocode: `-25.2744,133.7751,${req.body.dist || 2000}km`,
			count: 100,
			lang: 'en',
			result_type: 'recent',
			tweet_mode: 'extended',
	};

	//This loop for set reptitions
	function getNextBatch(maxid)
	{
		params.max_id = maxid;
		//console.log(params);
		client.get('search/tweets', params, function(error, tweets, response) 
		{
		  	if (!error) 
		  	{
		  		//Strip unecessary data and create a JSON with what we want
		  		for(let i in tweets.statuses)
		  		{
		  			let tweet = {
						"created_at": tweets.statuses[i].created_at,
						"id": tweets.statuses[i].id,
						"full_text": tweets.statuses[i].full_text,
						"user_id": tweets.statuses[i].user.id,
						"user_name": tweets.statuses[i].user.name,
						"user_location": tweets.statuses[i].user.location,
						"user_verified": tweets.statuses[i].user.verified,
						"user_profile_image_url": tweets.statuses[i].user.profile_image_url,	
						"geo": tweets.statuses[i].geo,
						"coordinates": tweets.statuses[i].coordinates,
						"place": tweets.statuses[i].place,
						"checked": false,
						"crime": null
					}
					mongoController.storeTweets(tweet);
		  		}

				tweetCount += [tweets.statuses].length 
				reptitionsCompleted += 1;
				console.log(`Tweet Count: ${tweetCount} \nReptition: ${reptitionsCompleted}`)

				//Keep calling until reptitions count reached 
				if (reptitionsCompleted < reptitions)
				{
					getNextBatch(tweets.statuses[tweets.statuses.length-1].id);
				}
		  	} else
		  	{
		  		console.log(error)
		  		res.send(error)
		  	}
		});
	}
	getNextBatch(100000000000000000000000000000000000000000000000000000000000000);
}

exports.getBulkTweetsNew = async(req,res) => 
{
	let reptitions = 5;
	let tweetCount = 0;
	let reptitionsCompleted = 0;
	let params = []
	let pwords = []

	for(let i = 0; i < req.body.words.length; i++)
	{
		pwords.push(req.body.words[i])
		if(pwords.length % 10 == 0)
		{
			params.push(helpers.createTwitterParams(pwords));
			pwords = [];
		}
	}
	
	for(let i = 0; i < params.length; i++)
	{
		function getNextBatch(since_id, reps)
		{
			reps += 1;
			params[i].since_id = since_id;
			console.log(params[i].q);
			client.get('search/tweets', params[i], function(error, tweets, response) 
			{
			  	if (!error && res) 
			  	{
			  		//Strip unecessary data and create a JSON with what we want
			  		for(let i in tweets.statuses)
			  		{
			  			let tweet = {
							"created_at": tweets.statuses[i].created_at,
							"id": tweets.statuses[i].id,
							"full_text": tweets.statuses[i].full_text,
							"user_id": tweets.statuses[i].user.id,
							"user_name": tweets.statuses[i].user.name,
							"user_location": tweets.statuses[i].user.location,
							"user_verified": tweets.statuses[i].user.verified,
							"user_profile_image_url": tweets.statuses[i].user.profile_image_url,	
							"geo": tweets.statuses[i].geo,
							"coordinates": tweets.statuses[i].coordinates,
							"place": tweets.statuses[i].place,
							"checked": false,
							"crime": null
						}
						mongoController.storeTweets(tweet);
			  		}

					tweetCount += [tweets.statuses].length 
					reptitionsCompleted += 1;

					//Keep calling until reptitions count reached 
					if (reps < reptitions && tweets.statuses[tweets.statuses.length-1] != undefined)
					{
						getNextBatch(tweets.statuses[tweets.statuses.length-1].id, reps);
					}
			  	} else {
			  		console.log(error)
			  		res.send(error)
			  	}
			});
		}
		getNextBatch(100000000000000000000000000000000000000000000000000000000000000, 0);
	}
}

exports.getTweets = async(req,res) => 
{

	function storeTweets(tweets)
	{
        for(let i in tweets.statuses) {
            let tweet = {
                "created_at": tweets.statuses[i].created_at,
                "id": tweets.statuses[i].id,
                "full_text": tweets.statuses[i].full_text,
                "user_id": tweets.statuses[i].user.id,
                "user_name": tweets.statuses[i].user.name,
                "user_location": tweets.statuses[i].user.location,
                "user_verified": tweets.statuses[i].user.verified,
                "user_profile_image_url": tweets.statuses[i].user.profile_image_url,
                "geo": tweets.statuses[i].geo,
                "coordinates": tweets.statuses[i].coordinates,
                "place": tweets.statuses[i].place,
                "checked": false,
                "crime": null
            }
            mongoController.storeTweets(tweet);
        }
	}

	var params = {
			q: req.body.dbResults, 
			 
			geocode: `-37.8136,144.9631,${req.body.dist || 10}km`,
			count: 100,
			lang: 'en',
			tweet_mode: 'extended',
		};
	console.log(params);
	client.get('search/tweets', params, function(error, tweets, response) 
	{
	  	if (!error) 
	  	{
	  		if (!req.body.shouldStoreTweets) //dont format time if we're storing tweets in the DB
			{
                for(tweet in tweets.statuses)
                {
                    tweets.statuses[tweet].created_at = moment(tweets.statuses[tweet].created_at).startOf('hour').fromNow();
                }
			}

	  		let wordCount = {};
	  		for(word in req.body.words)
	  		{
	  			for(tweet in tweets.statuses)
	  			{

	  				if(tweets.statuses[tweet].full_text.includes(req.body.words[word]))
	  				{
	  					if(wordCount.hasOwnProperty(req.body.words[word]))
	  					{
	  						wordCount[req.body.words[word]] = wordCount[req.body.words[word]] + 1;
	  					} else 
	  					{
	  						wordCount[req.body.words[word]] = 1;
	  					}
	  					
	  				}
	  			}
	  		}

	  		if (req.body.shouldStoreTweets)
			{
				storeTweets(tweets);
			}

	    	res.render('index', {data: tweets.statuses, searchwords: req.body.dbResults, wordCount: wordCount})
	  	} else
	  	{
	  		res.send(error)
	  	}
	});
}

exports.getTweetsForUser = async(req,res) => 
{
	var params = {screen_name: req.body.twitterName};
	client.get('statuses/user_timeline', params, function(error, tweets, response) 
	{
	  	if (!error) 
	  	{
	    	res.render('d3test', {data: tweets})
	  	}
	});
}

exports.getFilterTweets = async(req,res) => 
{
	var params = {
			track: "crime",
		};
	client.post('/statuses/filter', params, function(error, tweets, response) 
	{
	  	if (!error) 
	  	{
	  		
	  		for(tweet in tweets.statuses)
	  		{
	  			tweets.statuses[tweet].created_at = moment(tweets.statuses[tweet].created_at).startOf('hour').fromNow(); 
	  		}
	    	res.render('index', {data: tweets.statuses})
	  	} else
	  	{
	  		res.send(error)
	  	}
	});
}

