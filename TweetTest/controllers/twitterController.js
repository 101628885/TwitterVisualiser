var Twitter = require('twitter');
const moment = require('moment');
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
			q: req.body.word, 
			result_type: "recent", 
			geocode: `-37.8136,144.9631,${req.body.dist || 10}km`,
			count: 100,
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
	    	res.render('index', {data: tweets.statuses})
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