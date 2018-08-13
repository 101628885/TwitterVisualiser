const expect = require('chai').expect;
const mongo = require('../controllers/mongoController');
const mongoose = require('mongoose');
const db = mongoose.connection;
const tweet = require('../models/tweet_schema');
const sleep = require('sleep');
const timeout = ms => new Promise(res => setTimeout(res, ms));


describe('storeTweets()', function(){
	it('both tweet objects in the JSON array should be stored and retrieved correctly from the DB.', async() => {
		//SETUP, Create sample JSON object
		let sampleTweet1 = {
			"created_at": new Date("2018-03-24 15:15:06.000"),
			"id": "9999",
			"full_text": "This is the first test case, and should not be present in a production DB. Remove me if found.",
			"user_name": "test_user",
			"user_location": "test_loc",
			"user_verified": true,
			"user_profile_image_url": "http://sample.url/img.png",
			"geo": null,
			"coordinates": null,
			"place": null,
			"checked": false,
			"crime": null
		};

		let sampleTweet2 = {
			"created_at": new Date("2018-03-24 15:15:06.000"),
			"id": "99999",
			"full_text": "This is the second test case, and should not be present in a production DB. Remove me if found.",
			"user_name": "test_user2",
			"user_location": "test_loc",
			"user_verified": true,
			"user_profile_image_url": "http://sample.url/img.png",
			"geo": null,
			"coordinates": null,
			"place": null,
			"checked": false,
			"crime": null
		};

		let testArray = [];

		testArray.push(sampleTweet1);
		testArray.push(sampleTweet2);

		//ACTION, ask mongoController to store the array.

		mongo.storeTweets(testArray);

		await timeout(2800); //Bit hacky but we have to give the DB a moment to save the test items

		//ACTION, ask mongoController to return items from DB.

		let sample1FromDB = {};
		let sample2FromDB = {};

		await tweet.findOne({id: "9999"}).lean().exec().then(function(res){sample1FromDB = res});
		await tweet.findOne({id: "99999"}).lean().exec().then(function(res){sample2FromDB = res});

		//CLEANUP

		await tweet.remove({id: "9999"}).exec();
		await tweet.remove({id: "99999"}).exec();



		//ASSERTION
		expect(sample1FromDB.full_text).to.be.equal(sampleTweet1.full_text);
		expect(sample2FromDB.full_text).to.be.equal(sampleTweet2.full_text);

		expect(sample1FromDB.user_name).to.be.equal(sampleTweet1.user_name);
		expect(sample2FromDB.user_name).to.be.equal(sampleTweet2.user_name);

		expect(sample1FromDB.created_at.toISOString()).to.be.equal(sampleTweet1.created_at.toISOString());
		expect(sample2FromDB.created_at.toISOString()).to.be.equal(sampleTweet2.created_at.toISOString());

	})
});



describe('storeTweets()', function(){

	it('duplicate objects in the array should not be saved to the DB.', async() =>{

		//SETUP, create 2 of the same item

		let sampleTweet1 = {
			"created_at": new Date("2018-03-24 15:15:06.000"),
			"id": "9999",
			"full_text": "This is the first test case, and should not be present in a production DB. Remove me if found.",
			"user_name": "test_user",
			"user_location": "test_loc",
			"user_verified": true,
			"user_profile_image_url": "http://sample.url/img.png",
			"geo": null,
			"coordinates": null,
			"place": null,
			"checked": false,
			"crime": null
		};

		let sampleTweet2 = {
			"created_at": new Date("2018-03-24 15:15:06.000"),
			"id": "9999",
			"full_text": "This is the first test case, and should not be present in a production DB. Remove me if found.",
			"user_name": "test_user",
			"user_location": "test_loc",
			"user_verified": true,
			"user_profile_image_url": "http://sample.url/img.png",
			"geo": null,
			"coordinates": null,
			"place": null,
			"checked": false,
			"crime": null
		};


		let testArray = [];

		testArray.push(sampleTweet1);
		testArray.push(sampleTweet2);


		//ACTION

		mongo.storeTweets(testArray);

		await timeout(2500);

		let result = [];

		await tweet.find({id: "9999"}).lean().exec().then(function(res){result = res});
		await tweet.remove({id: "9999"}).exec();



		//ASSERT
		expect(result.length).to.be.equal(1);
	});
});

