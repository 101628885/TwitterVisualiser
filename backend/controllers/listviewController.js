const tweet = require('../models/tweet_schema');

exports.listTweets = async(req,res) =>
{
	res.render('list', {data: ""});
};

exports.findTweets = async(req,res) =>
{

	//Start building query to DB...
	let query = {};
	let limit = 0;
	let skip = 0;

	if (!req.body.crime)
	{
		query.checked = (req.body.checked === "on");
	}
	else
	{
		query.crime = true;
	}


	if (!req.body.count)
	{
		limit = 20; //return 20 tweets if not defined
	}
	else
	{
		limit = parseInt(req.body.count);
	}

	//returns random results
	if (req.body.random)
	{
		skip = Math.floor(Math.random() * limit);
	}


	tweet.find(query).limit(limit).skip(skip).lean().exec()
	.then(function(result){
		res.render('list', {data: result});
	})
	.catch(function(err){console.log(err)});

};