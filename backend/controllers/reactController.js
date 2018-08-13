const mongoose = require('mongoose');
const tweet = require('../models/tweet_schema');
const nlp = require('./nlpTrainingController');
var db = mongoose.connection;



exports.getPredictedData = async (req, res) =>
{
    nlp.runNLP(function(result){res.send(result)});
};

exports.queryDB = async(query, limit) =>
{
    let result = [];
    await tweet.find(query).sort({'date': -1}).lean().limit(parseInt(limit)).exec().then(function(res){result = res}).catch(function(err){console.log(err)});
    return result;



};

exports.getStoredTweets = async (req, res) =>
{
    //var tweet = db.model('tweets', tweet);
    let query = {};
    let count = 0;
    let result = [];

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
        count = Number.MAX_SAFE_INTEGER;
    }

    await exports.queryDB(query, count).then(function(res){result = res});

    res.send(result);


};



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
                    word = temp[i];
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
};
