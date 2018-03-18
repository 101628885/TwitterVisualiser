var Twitter = require('twitter');

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
