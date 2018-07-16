const mongoose = require("mongoose");
const tweet = require('../models/tweet_schema');
const db = mongoose.connection;
const nlp = require('./nlpTrainingController');

exports.getVisualisation = function (req,res)
{
    res.render('visualisation');
};

exports.getVisualisationData = async function (req,res)
{
	var tweet = db.model('tweets', tweet);

	let result = [];

	//query DB for number of Crime tweets
	await tweet
		.count({crime: true})
		.lean()
		.exec()
		.then(function(crimeTweets){result.push({type: "Crime", count: crimeTweets})})
		.catch(function(err){console.log(err)});

	await tweet //query DB for number of non-Crime tweets
		.count({crime: false})
		.lean()
		.exec()
		.then(function(nonCrimeTweets){result.push({type: "Non-Crime", count: nonCrimeTweets})})
		.catch(function(err){console.log(err)});

    res.send(result);


};

exports.getNLPData = async (req, res) =>
{
	//let data = nlp.runNLP();

	res.status(418);
	res.send("I'm a teapot"); //implement counting after JSON fixed

};

