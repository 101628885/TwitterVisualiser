const mongoose = require('mongoose');
//Load tweet schema
const tweet = require('../models/tweet_schema');

const ObjectId = require('mongodb').ObjectId;
const database = { url : "mongodb://team:swinburne@144.6.226.34/tweets", type: "Production"};
//const database = { url : "mongodb://localhost:27017/tweets", type: "Testing"};
const spawn = require('threads').spawn;


//Create a connection for querying the DB /////////////////////////////////////////////////////////////////////////////
mongoose.connect(database.url);

var db = mongoose.connection;

db.on('error', function()
{
	console.log("An error occurred while connecting to the " + database.type + " DB at " + database.url);

});

db.once('open', function(){
	console.log("Connected to " + database.type + " DB at " + database.url);

});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


exports.storeTweets = function(tweetsToStore)
{
	let id = Math.floor(Math.random() * Math.floor(25));

	const thread = spawn(function(input, done, progress) {
		const process = require('process');
		let filteredArray = [];
		let resultArray = [];

		const mongoose = require('mongoose');
		const tweet = require(process.cwd() + "/models/tweet_schema");

		mongoose.connect(input.database.url);

		let writeConnection = mongoose.connection;

		writeConnection.on('error', function ()
		{
			console.log("An error occurred while establishing a write connection to the", input.database.type, "database.");
			done();
		});

		writeConnection.on('open', async () =>
		{
			let writeModel = writeConnection.model('tweets');

			let alreadyInArray;

			for (let post in input.tweetsToStore) //This nested for loop checks that we don't have any duplicates in the array we get from Twitter
			{

				for (let j in filteredArray)
				{
					alreadyInArray = (input.tweetsToStore[post].full_text === input.tweetsToStore[j].full_text);

					if (alreadyInArray)
					{
						break;
					}

				}
				if (!alreadyInArray)
				{
					filteredArray.push(input.tweetsToStore[post]);
				}
			}

			progress(25);

			for (let post in filteredArray) //Check that items in the array aren't already in the DB
			{
				await writeModel.find({full_text: filteredArray[post].full_text}).lean().exec().then(function (result)
				{
					if (result.length === 0)
					{
						resultArray.push(filteredArray[post]);
					}
				})
			}

			progress(50);

			for (let post in resultArray) { //Save the documents to the DB one by one
				var dbTweet = new tweet();
				dbTweet.created_at = resultArray[post].created_at;
				dbTweet.id = resultArray[post].id;
				dbTweet.full_text = resultArray[post].full_text;
				dbTweet.user_id = resultArray[post].user_id;
				dbTweet.user_name = resultArray[post].user_name;
				dbTweet.user_location = resultArray[post].user_location;
				dbTweet.user_verified = resultArray[post].user_verified;
				dbTweet.user_profile_image_url = resultArray[post].user_profile_image_url;
				dbTweet.geo = resultArray[post].geo;
				dbTweet.coordinates = resultArray[post].coordinates;
				dbTweet.place = resultArray[post].place;
				dbTweet.checked = 0;
				dbTweet.crime = null;
				await dbTweet.save().catch(function(err){console.log(err)});
			}
			progress(100);
			done({}); //Notify parent we're done
		});
	});

	//Spawn worker thread then kill it once its done
	thread.send({tweetsToStore: tweetsToStore, database: database})
		.on('progress', function(progress){console.log("Processing storage request ID ", id, ": ", progress, "% complete.")})
		.on('message', function(){thread.kill()});
};



exports.removeDuplicates = async function() //deprecated
{
    let tweets = {};
    let dupsRemoved = 0;
    console.log("Retrieving DB...");
    await tweet.find().lean().exec().then(function(result){tweets = result});

    console.log("Done");

    console.log("Checking DB for duplicates...");

    let count_outer = 0;
    for (let i in tweets)
    {
        let count_inner = 0;
        let first_instance = true;
        for (let j in tweets)
        {
            if (tweets[count_outer].full_text === tweets[count_inner].full_text)
            {
                if (!first_instance)
                {
                    dupsRemoved += 1;
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


    console.log("Removed " + dupsRemoved + " duplicates.");

};
