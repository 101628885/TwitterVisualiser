const expect = require('chai').expect;
var mongo = require('../controllers/mongoController');
var tweetMelb = mongo.tweetMelb;
var tweetChicago = mongo.tweetChicago;
const chicagoCrime = mongo.chicagoCrime;
const timeout = ms => new Promise(res => setTimeout(res, ms));
const should = require('chai').should();


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

		mongo.storeTweets(testArray, "melbourne");

		await timeout(2800); //Bit hacky but we have to give the DB a moment to save the test items

		//ACTION, ask mongoController to return items from DB.

		let sample1FromDB = {};
		let sample2FromDB = {};

		await tweetMelb.findOne({id: "9999"}).lean().exec().then(function(res){sample1FromDB = res});
		await tweetMelb.findOne({id: "99999"}).lean().exec().then(function(res){sample2FromDB = res});

		//CLEANUP

		await tweetMelb.remove({id: "9999"}).exec();
		await tweetMelb.remove({id: "99999"}).exec();



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

		mongo.storeTweets(testArray, "melbourne");

		await timeout(2500);

		let result = [];

		await tweetMelb.find({id: "9999"}).lean().exec().then(function(res){result = res});
		await tweetMelb.remove({id: "9999"}).exec();



		//ASSERT
		expect(result.length).to.be.equal(1);
	});
});


describe('storeTweets()', function(){
	it('should write a tweet to the DB specified', async()=>{

		//SETUP, create 2 separate tweets
		let sampleTweetMelb = {
			"created_at": new Date("2017-03-24 15:15:06.000"),
			"id": "1111",
			"full_text": "Melbourne Test Tweet",
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

		let sampleTweetChicago = {
			"created_at": new Date("2018-03-24 13:15:06.000"),
			"id": "2222",
			"full_text": "Chicago Test Tweet",
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



		let melbArray = [];
		let chicagoArray = [];

		melbArray.push(sampleTweetMelb);
		chicagoArray.push(sampleTweetChicago);


		//ACTION
		mongo.storeTweets(melbArray, "melbourne");
		mongo.storeTweets(chicagoArray, "chicago");

		await timeout(2800);

		let melbTweetFromMelbDB = {};
		let melbTweetFromChicagoDB = {};
		let chicagoTweetFromChicagoDB = {};
		let chicagoTweetFromMelbDB = {};

		await tweetMelb.findOne({id: "1111"}).lean().exec().then(function (res) {melbTweetFromMelbDB = res}); //Try to get melb tweet from Melb DB
		await tweetMelb.findOne({id: "2222"}).lean().exec().then(function (res) {chicagoTweetFromMelbDB = res}); //Try to get chicago tweet from Melb DB
		await tweetChicago.findOne({id: "2222"}).lean().exec().then(function (res) {chicagoTweetFromChicagoDB = res}); //Try to get chicago tweet from Chicago DB
		await tweetChicago.findOne({id: "1111"}).lean().exec().then(function (res) {melbTweetFromChicagoDB = res}); //Try to get melb tweet from Chicago DB

		await tweetMelb.remove({id: "1111"}).exec();

		await tweetChicago.remove({id: "2222"}).exec();


		//ASSERT
		expect(melbTweetFromMelbDB.full_text).to.be.equal(sampleTweetMelb.full_text); //should return
		should.not.exist(chicagoTweetFromMelbDB);

		expect(chicagoTweetFromChicagoDB.full_text).to.be.equal(sampleTweetChicago.full_text);
		should.not.exist(chicagoTweetFromMelbDB);


	})
});
/*
describe('getDummyData()', function(){

	it('should return only chicago crime documents that match the query', async function(){

		//SETUP, create a sample simple and complex query
		let simpleRes = {};
		let complexRes = {};

		let simpleQuery = {"2007": 4, "2014": 2};
		let complexQuery = {
			"crimes": [{
				"crime": "BATTERY", //If year is not specified it won't be included in the search
				"count": 50
			},
				{
					"crime": "BURGLARY",
					"year": "2014", //specifying year
					"count": 20
				}
			]
		};

		//ACTION
		await chicagoCrime.find(simpleQuery).lean().exec().then((res) => {simpleRes = res});

		await chicagoCrime.find(complexQuery).lean().exec()







	})
});
*/
