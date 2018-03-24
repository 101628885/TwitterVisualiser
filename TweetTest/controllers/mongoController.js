const mongoose = require('mongoose');

//Load tweet schema
const tweet = require('../models/tweet_schema');
const url = 'mongodb://team:swinburne@144.6.226.34/tweets';

mongoose.connect(url);

var db = mongoose.connection;


db.on('error', function()
{
    console.log("An error occurred while connecting to the DB. Please check that the MongoDB service is running on localhost!");
});

db.once('open', function(){
    console.log("Connected to DB");
});


exports.getLastId = function(tweetToStore)
{
    return db.tweets.find().limit(1).sort({$natural:-1}).id
}
exports.storeTweets = function(tweetToStore)
{
    
    //console.log(tweetToStore.full_text);
    var dbTweet = new tweet();
    tweet.findOne({id: tweetToStore.id},function(err,existingTweet)
    {
        if (!err && !existingTweet)
        {
            console.log('Storing tweet...');
            dbTweet.created_at = tweetToStore.created_at;
            dbTweet.id = tweetToStore.id;
            dbTweet.full_text = tweetToStore.full_text;
            dbTweet.user_id = tweetToStore.user_id;
            dbTweet.user_name = tweetToStore.user_name;
            dbTweet.user_location = tweetToStore.user_location;
            dbTweet.user_verified = tweetToStore.user_verified;
            dbTweet.user_profile_image_url = tweetToStore.user_profile_image_url;
            dbTweet.geo = tweetToStore.geo;
            dbTweet.coordinates = tweetToStore.coordinates;
            dbTweet.place = tweetToStore.place;
            dbTweet.checked = 0;
            dbTweet.crime = null;
            dbTweet.save(function(err)
            {
                if (err)
                {
                    console.log(err);
                }
            });
        } else if (!err)
        {
            console.log('Already have tweet...');
        }
    });
};
