const mongoose = require('mongoose');
const tweet = require('../models/tweet_schema');
var db = mongoose.connection;


exports.shanesAndCoreySpecialsEndPoint = async (req,res) => 
{
	var tweet = db.model('tweets', tweet);
    tweet.find({checked: false}).sort({'date': -1}).limit(parseInt(req.params.count)).skip(Math.floor((Math.random() * 50) + 1)).exec(function(err, posts) 
    {
        if(!err)
        {
            res.send(posts);
        }
        else
        {
        	console.log(err);
        }  
    }); 
}

exports.stefansPieChartEndPoint = async (req, res) =>
{
    var tweet = db.model('tweets', tweet);
    tweet.find({checked: true}).sort({'date': -1}).limit(parseInt(req.params.count)).skip(Math.floor((Math.random() * 50) + 1)).exec(function(err, posts)
    {
        if (!err)
        {
            res.send(posts);
        }
        else
        {
            console.log(err);
        }
    });
}

exports.getStoredTweets = async (req,res) =>
{

    let query = {};
    let count;


    if (req.params.checked)
    {
        query.checked = req.params.checked;
    }

    if (req.params.crime)
    {
        query.crime = req.params.crime;
    }


    if (req.params.count)
    {
        count = req.params.count;
    }
    else
    {
        count = Number.MAX_SAFE_INTEGER; //get all the tweets
    }


    tweet.find(query).sort({'date': -1}).limit(parseInt(req.params.count)).lean().exec(function(err, posts)
    {
        if(!err)
        {
            res.send(posts);
        }
        else
        {
            console.log(err);
        }
    });
}


exports.getCrimeWordCount = async (req,res, next) => 
{
    var tweet = db.model('tweets', tweet);
    words = {};
    tweet.find({crime: true}).limit(10000).exec(function(err, posts) 
    {
        let tweetNum = posts.length;
        let uniqueWords = 0;
        let wordsFound = 0;
        if(!err)
        {
            for (tweet in posts)
            {
                let temp = posts[tweet].full_text.toString().replace(/[^a-z0-9']/gi,' ').split(" ");
                for (i in temp)
                {
                    wordsFound += 1;
                    word = temp[i]
                    if(!words.hasOwnProperty(word) && word.length > 2)
                    {
                        words[word] = 1;
                        uniqueWords += 1;
                    } else 
                    {
                        words[word] += 1;
                    }
                }
            }

            var sortedWords = [];
            for (var word in words) {
                sortedWords.push([word, words[word]]);
            }

            sortedWords.sort(function(a, b) {
                return b[1] - a[1];
            });

            res.send({crime_tweets: tweetNum, unique_words: uniqueWords, words_found: wordsFound, words: sortedWords});
        }  
    });     
}