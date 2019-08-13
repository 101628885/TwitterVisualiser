const Twitter = require('twitter');
const moment = require('moment');
const mongoController = require('./mongoController');
var tweetMelb = mongoController.tweetMelb;
var tweetChicago = mongoController.tweetChicago;

const Promise = require('bluebird')
const SqliteDAO = require('./sqliteController')
const SqliteRepository = require('./sqliteRepo')



//Creates a connection to the Twitter API
var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

//Renders the page
exports.renderView = async (req, res) => {
    tweets = "";
    res.render('lookup', {
        data: tweets
    });
};

//Pulls tweets from the public Twitter API.
exports.getAPITweetsView = async (req, res) => {
    //To be used by auto controller to store Tweets from TwitterAPI
    function storeTweets(tweets, geo) {
        let results = [];
        for (let i in tweets.statuses) {
            let tweet = {
                "created_at": tweets.statuses[i].created_at,
                "id": tweets.statuses[i].id,
                "full_text": tweets.statuses[i].full_text,
                "user_id": tweets.statuses[i].user.id,
                "user_name": tweets.statuses[i].user.name,
                "user_location": tweets.statuses[i].user.location,
                "user_verified": tweets.statuses[i].user.verified,
                "user_profile_image_url": tweets.statuses[i].user.profile_image_url,
                "geo": tweets.statuses[i].geo,
                "coordinates": tweets.statuses[i].coordinates,
                "place": tweets.statuses[i].place,
                "checked": false,
                "crime": null
            };
            results.push(tweet);
        }
        mongoController.storeTweets(results, req.body.location);
    }

    let geo = "";
    if (req.body.location === "melbourne") {
        console.log("Location is set to Melbourne...");
        geo = `-37.8136,144.9631,${req.body.dist || 40}km`;
    } else if (req.body.location === "chicago") {
        console.log("Location is set to Chicago...");
        geo = `41.881832,-87.623177,${req.body.dist || 25}km`;
    } else {
        console.log("Invalid form data, setting location to Melbourne...");
        geo = `-37.8136,144.9631,${req.body.dist || 40}km`;
    }

    //Sets parameters for the query.
    var params = {
        q: req.body.dbResults,
        geocode: geo,
        count: 100,
        lang: 'en',
        tweet_mode: 'extended',
    };

    //Calls Twitter API
    client.get('search/tweets', params, function (error, tweets, response) {
        if (!error) {
            if (!req.body.shouldStoreTweets) {
                // dont format time if we're storing tweets in the DB
                for (tweet in tweets.statuses) {
                    tweets.statuses[tweet].created_at = moment(tweets.statuses[tweet].created_at).startOf('hour').fromNow();
                }
            }

            let wordCount = {};
            for (word in req.body.words) {
                for (tweet in tweets.statuses) {
                    if (tweets.statuses[tweet].full_text.includes(req.body.words[word])) {
                        if (wordCount.hasOwnProperty(req.body.words[word])) {
                            wordCount[req.body.words[word]] = wordCount[req.body.words[word]] + 1;
                        } else {
                            wordCount[req.body.words[word]] = 1;
                        }
                    }
                }
            }

            if (req.body.shouldStoreTweets) {
                storeTweets(tweets, geo);
            }
            res.render('lookup', {
                data: tweets.statuses,
                searchwords: req.body.dbResults,
                wordCount: wordCount
            });
        } else {
            res.send(error);
        }
    });
};

//Gets all tweets from the database with a given set of parameters.
//If no parameters default values are set.
exports.getDBTweetsView = async (req, res) => {
    let query = {};
    let limit = 0;
    let skip = 0;

    if (!req.body.db_crime) {
        query.checked = (req.body.db_checked === "on");
    } else {
        query.crime = true;
    }

    // default to 20 number of tweets
    limit = (req.body.db_count) ? parseInt(req.body.db_count) : 20;

    //returns random results
    if (req.body.db_random) {
        skip = Math.floor(Math.random() * limit);
    }

    dbToQuery = (req.body.db_location === "melbourne") ? tweetMelb : tweetChicago;

    dbToQuery.find(query).limit(limit).skip(skip).lean().exec()
        .then(tweets => {
            res.render('lookup', {
                data: tweets.map(tweet => ({
                    geo: tweet.geo,
                    full_text: tweet.full_text,
                    created_at: tweet.created_at,
                    user: {
                        name: tweet.user_name,
                        profile_image_url: tweet.user_profile_image_url
                    }
                }))
            });
        })
        .catch(function (err) {
            console.log(err)
        });
};


//Gets images from the database with a given set of parameters.
//If no parameters default values are set.
exports.getDBImagesView = async (req, res) => {

    const dao = new SqliteDAO('./../../../classifybot/imageClassified.db')
    const SqliteRepo = new SqliteRepository(dao)

        crimeNumTypesArr = {
            '0': "No Crime",
            '1': "Assault",
            '2': "Murder",
            '3': "Theft",
            '4': "Kidnap",
            '5': "Scene",
            '99': "Other"
        }

    query = ""
    query = `SELECT * FROM images`
    switch (req.body.word) {
        case 'assault':
            query += " WHERE crimeType=1"
            break;
        case 'murder':
            query += " WHERE crimeType=2"
            break;
        case 'theft':
            query += " WHERE crimeType=3"
            break;
        case 'kidnap':
            query += " WHERE crimeType=4"
            break;
        case 'scene':
            query += " WHERE crimeType=5"
            break;
        case 'other':
            query += " WHERE crimeType=99"
            break;
        default:
            break;
    }
    if (typeof req.body.db_crime !== 'undefined'){
        query += " LIMIT "+req.body.db_count
    }else{
        query += " LIMIT 30"
    }

    console.log(query)

    dao.all(query)
        .then(images => {
            res.render('lookup', {
                //first 30
                data: images.map(image => ({
                    geo: image.caption,
                    full_text: (": " + image.caption),
                    created_at: "",
                    user: {
                        name: (crimeNumTypesArr[image.crimeType]),
                        profile_image_url: ("../" + image.filename)
                    }
                }))
            });
        })
        .catch(function (err) {
            console.log(err)
        });
};