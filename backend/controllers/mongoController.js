const mongoose = require('mongoose');
//Load tweet schema
const tweet = require('../models/tweet_schema');
const ObjectId = require('mongodb').ObjectId;
const database = { url : "mongodb://team:swinburne@144.6.226.34/tweets", type: "Production"};
//const database = { url : "mongodb://localhost:27017/tweets", type: "Testing"};

mongoose.connect(database.url);

var db = mongoose.connection;

db.on('error', function()
{
    console.log("An error occurred while connecting to the " + database.type + " DB at " + database.url);
});

db.once('open', function(){
    console.log("Connected to " + database.type + " DB at " + database.url);
    //exports.removeDuplicates();
});


exports.storeTweets = function(tweetToStore)
{
    var dbTweet = new tweet();

    tweet.find({full_text : tweetToStore.full_text}, function (err, existing)
    {
       if (existing.length)
       {
           console.log("Already have tweet...");
       }
       else
       {
           console.log("Saving tweet...");
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
       }

    });



    /*
    tweet.findOne({ full_text: tweetToStore.full_text }, 'full_text id', function (err, existingTweet)
    {
        if (!err & !existingTweet)
        {
            console.log("Saving tweet...");
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
        }
        else if (existingTweet)
        {
            console.log("Already have tweet...");
        }
    });
    */
};

exports.removeDuplicates = async() =>
{
    console.log("Starting duplicate check...");
    tweet.find().lean().exec(function(err, tweets)
    {
        var count_outer = 0;

        for (var i in tweets)
        {
            var count_inner = 0;
            var first_instance = true;
            for (var j in tweets)
            {
                if (tweets[count_outer].full_text === tweets[count_inner].full_text)
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

}
