const mongoController = require('./mongoController');
const mongoose = require('mongoose');
const tweet = require('../models/tweet_schema');
var db = mongoose.connection;

exports.returnNLPDataSet = async (req,res) =>
{
    var tweet = db.model('tweets', tweet);
    tweet.find({checked: true}).sort({'date': -1}).limit(parseInt(req.params.count)).skip(Math.floor((Math.random() * 50) + 1)).lean().exec(function(err, posts)
    {
        if(!err)
        {
            var post;
            var result = new Array();
            console.log(posts.length);
            var count = 0;
            for (var i in posts)
            {
                post = {
                    "full_text": posts[count].full_text,
                    "crime": posts[count].crime
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
