const mongoose = require('mongoose');

//Load tweet schema
const tweet = require('../models/tweet_schema');

mongoose.connect('mongodb://localhost:27017/tweets');

var db = mongoose.connection;


db.on('error', function()
{
    console.log("An error occurred while connecting to the DB. Please check that the MongoDB service is running on localhost!");
});

db.once('open', function(){
    console.log("Connected to DB");
});

exports.storeTweets = function(tweetToStore)
{
    console.log('Storing tweet...');
    console.log(tweetToStore.full_text);
    var dbTweet = new tweet();


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


    dbTweet.save(function(err){
        console.log("Something went wrong :(");
    });

};
