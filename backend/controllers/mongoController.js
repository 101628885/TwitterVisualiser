const mongoose = require('mongoose');

//Load tweet schema
const tweet = require('../models/tweet_schema');
const url = 'mongodb://team:swinburne@144.6.226.34/tweets';
//const url = 'mongodb://localhost:27017/tweets';
const ObjectId = require('mongodb').ObjectID;
mongoose.connect(url);

var db = mongoose.connection;

db.on('error', function()
{
    console.log("An error occurred while connecting to the DB " + url);
});

db.once('open', function(){
    console.log("Connected to DB at " + url);
    exports.checkConsistency();
});

exports.getLastId = function(tweetToStore)
{
    return db.tweet.find().limit(1).sort({$natural:-1}).id
};

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

exports.checkConsistency = function()
{
    var tweet = db.model('tweets', tweet);

    console.log("Starting consistency check...");
    tweet.find().lean().exec(function(err, tweets)
    {
        var count_outer = 0;
        for (var i in tweets)
        {
            var count_inner = 0;
            var first_instance = true;
            for (var j in tweets)
            {
                if (tweets[count_outer].id === tweets[count_inner].id)
                {
                    if (!first_instance)
                    {
                        console.log("Removing duplicate...");
                        tweet.remove({_id: ObjectId(tweets[count_inner]._id)}).exec();
                    }
                    else
                        {
                        first_instance = false;
                    }
                }
                count_inner += 1;
            }

            count_outer += 1;


        }
    })

    tweet.find().lean().exec(function (err, tweets) {
        var count = 0;
        for (var i in tweets)
        {
            if ((tweets[count].full_text == null) || (tweets[count].created_at == null) || (tweets[count].user_name == null))
            {
                tweet.remove({_id: ObjectId(tweets[count]._id)}).exec();
            }

            if (tweets[count].type_of_crime === undefined) //required field doesn't exist
            {

                tweet.update({id : tweets[count].id}, {$set: {type_of_crime : null }}).exec(); //add field and set to null
            }

            if (tweets[count].location === undefined)
            {
                tweet.update({id : tweets[count].id}, {$set: {location : null }}).exec(); //add field and set to null
            }

            count += 1;
        }
    })
    console.log("Consistency checking complete.");
}
