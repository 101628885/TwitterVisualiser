var express = require('express');
var router = express.Router();

// TODO: clean these up
const twitterController       = require("../controllers/twitterController");
const listviewController      = require("../controllers/listViewController");
const dbpediaController       = require("../controllers/dbpediaController");
const lookupController        = require("../controllers/lookupController");
const verifyController        = require("../controllers/verifyController");
const nlpTrainingController   = require("../controllers/nlpTrainingController");
const autoController          = require("../controllers/autoController");
const tweetMapController      = require("../controllers/tweetMapController");
const reactController         = require("../controllers/reactController");
const historicCrimeController = require("../controllers/historicCrimeController");
const cacheController 		  = require("../controllers/cacheController");
const chicagoDataFactory      = require("../controllers/chicagoDataFactory");
const db 					  = require("../controllers/mongoController");

router.get('/testNLP', nlpTrainingController.test);
router.get('/all/:location', db.getAll);

// get homepage
router.get('/', function(req, res) {
  res.render('home');
});

// get about page
router.get('/about', function(req, res) {
  res.render('about');
});

// get deckgl map
router.get('/deckmap', function(req, res) {
  res.render('deckmap');
});

// twitter controller
//router.get('/browseTwitter', twitterController.browseTwitter);
//router.get('/getTweets', twitterController.browseTwitter); Shouldn't need a GET for this endpoint anymore
router.post('/getTweets', dbpediaController.getCombination, twitterController.getTweets);

/**
 * lookup controller routes
 * handles the returning of lists of tweets to display on the lookup view
 */
router.get('/lookup', lookupController.getAPITweetsView);
router.post('/lookup', dbpediaController.getCombination, lookupController.getAPITweetsView);
router.get('/lookup/api', lookupController.getAPITweetsView);
router.post('/lookup/api', dbpediaController.getCombination, lookupController.getAPITweetsView);
router.get('/lookup/db', lookupController.getDBTweetsView);
router.post('/lookup/db', dbpediaController.getCombination, lookupController.getDBTweetsView);

// auto controller
router.get('/auto', autoController.autoGet);
router.post('/auto', autoController.autoPost);

// verify controller
router.get('/check', verifyController.getUncheckedTweets);
router.post('/check/:id/:value/:geo', verifyController.checkTweets);
router.post('/check/:id/:value/:location/:type/:geo', verifyController.checkTweets);

// nlp training controller
//router.get('/nlpTrainingEndpoint/:count/:crime', nlpTrainingController.returnNLPDataSet);  //returns crime: true or false
//router.get('/nlpTrainingEndpoint/:count/', nlpTrainingController.returnNLPDataSet);  //returns both checked and unchecked

//new endpoints for NLP
router.get('/nlpTraining/:count/checked/:checked', nlpTrainingController.returnNLPData);
router.get('/nlpTraining/:count/crime/:crime', nlpTrainingController.returnNLPData);
router.get('/nlpTraining', nlpTrainingController.returnAllData);
router.get('/getPredictedData', nlpTrainingController.runNLP);
//concat melb and chicago

/**
 * react controller routes
 * handles all interactions inteded for the react native mobile app
 * don't remove these, i think some parts in the web app actually use these
 */
router.get('/getCrimeWordCount', reactController.getCrimeWordCount);

/**
 * tweetmap controller routes
 * handles the generation of trajectories to be displayed on the layered map
 */
router.get('/tweetMap', cacheController.getTrajectories);
router.post('/tweetMap', cacheController.getTrajectories);

// listview Controller
router.get('/list', listviewController.listTweets);
router.post('/list', listviewController.findTweets);

/**
 * historiccrime controller routes
 * handles the supply of data from various historical records from various u.s. cities
 */
router.get('/chicago', historicCrimeController.chicagoHandler); 
router.get('/seattle', historicCrimeController.seattleHandler); 
router.get('/baltimore', historicCrimeController.baltimoreHandler); 

router.get('/checkData', chicagoDataFactory.checkLocalData); 

// test dummy data
router.post('/trajectoryData', chicagoDataFactory.getDummyData);

module.exports = router;
