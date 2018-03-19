var Twitter = require('twitter');
const moment = require('moment');
const request = require('request');

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

exports.getTweets = async(req,res) => 
{
	var params = {
			q: req.body.dbResults, 
			result_type: "recent", 
			geocode: `-37.8136,144.9631,${req.body.dist || 10}km`,
			count: 100,
			lang: 'en'
		};
	console.log(params);
	client.get('search/tweets', params, function(error, tweets, response) 
	{
	  	if (!error) 
	  	{
	  		for(tweet in tweets.statuses)
	  		{
	  			tweets.statuses[tweet].created_at = moment(tweets.statuses[tweet].created_at).startOf('hour').fromNow(); 
	  		}

	  		let wordCount = {};
	  		for(word in req.body.words)
	  		{
	  			for(tweet in tweets.statuses)
	  			{
	  				if(tweets.statuses[tweet].text.includes(req.body.words[word]))
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
	    	res.render('index', {data: tweets})
	  	}
	});
}

exports.getFilterTweets = async(req,res) => 
{
	var params = {
			track: "crime",
		};
	console.log(params);
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
