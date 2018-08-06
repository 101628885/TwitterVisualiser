const tweet = require('../models/tweet_schema');

exports.listTweets = async(req,res) =>
{
	res.render('list', {data: ""});
};

exports.findTweets = async(req,res) =>
{

	//Start building query to DB...
	query = {};
	limit = 0;

	if (req.body.count)
	{
		limit = req.body.count;
	}

	console.log("Form crime ", req.body.crime);


	if (!req.body.crime)
	{
		query.checked = req.body.checked;
	}
	else
	{
		query.crime = true;
	}


	tweet.find(query).limit(limit).lean().exec()
	.then(function(result){
		res.render('list', {data: result});
	})
	.catch(function(err){console.log(err)});







};