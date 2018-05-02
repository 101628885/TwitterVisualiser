const mongoController = require('./mongoController');
const mongoose = require('mongoose');
const tweet = require('../models/tweet_schema');
var db = mongoose.connection;

// Returns relevant data based on the params value
exports.returnNLPDataSetCount = async (req,res) =>
{
    var query = {
        checked: true
    };


    if (req.params.crime)
    {
        query.crime = req.params.crime;
    }

    tweet.find(query).sort({'date': -1}).limit(parseInt(req.params.count)).lean().exec(function(err, posts)
    {
        if(!err)
        {
            var post;
            var result = [];
            var count = 0;
            for (var i in posts)
            {
                post = {
                    "full_text": posts[count].full_text,
                    "crime": posts[count].crime,
                    "type_of_crime" : posts[count].type_of_crime,
                    "location" : posts[count].location
                };
                count += 1;
                result.push(post);

            }

            res.send(result);
        }
        else
        {
            console.log(err);
        }
    });
}

// Returns all relevant data
exports.returnNLPDataSet = async (req,res) => {
    var tweet = db.model('tweets', tweet);
    
    await tweet.find({checked: true}).lean().exec(function(err, posts) {
        if(!err) {
            let count = 0;
            let post;
            let newRes = new Array();
            
            for (let i in posts) {
                post = {
                    "full_text": posts[count].full_text,
                    "crime": posts[count].crime,
                    "type_of_crime" : posts[count].type_of_crime,
                    "location" : posts[count].location
                };

                count += 1;
                newRes.push(post);
            }

            res.send(newRes);
        } else {
            console.log(err);
        }
    });
}
