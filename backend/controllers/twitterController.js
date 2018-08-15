const Twitter = require('twitter');
const moment = require('moment');
const mongoController = require('./mongoController');

var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

exports.home = async(req,res) =>
{
	tweets = "";
	res.render('index', {data: tweets});

}

exports.getTweets = async(req,res) => 
{

	function storeTweets(tweets, geo)
	{
		let results = [];
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
            };

            results.push(tweet);

        }
        mongoController.storeTweets(results, req.body.location);
	}

	let geo = "";
	if (req.body.location === "melbourne")
	{
		console.log("Location is set to Melbourne...");
		geo = `-37.8136,144.9631,${req.body.dist || 100}km`;
	}
	else if (req.body.location === "chicago")
	{
		console.log("Location is set to Chicago...");
		geo = `41.881832,-87.623177,${req.body.dist || 320}km`;
	}
	else
	{
		console.log("Invalid form data, setting location to Melbourne...");
		geo = `-37.8136,144.9631,${req.body.dist || 100}km`;
	}

	var params = {
			q: req.body.dbResults,
			geocode: geo,
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
				storeTweets(tweets, geo);
			}

	    	res.render('index', {data: tweets.statuses, searchwords: req.body.dbResults, wordCount: wordCount})
	  	} else
	  	{
	  		res.send(error)
	  	}
	});
}


