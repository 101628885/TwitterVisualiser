var express = require('express');
var router = express.Router();

const twitterController = require("../controllers/twitterController");
const dbpediaController = require("../controllers/dbpediaController");
const mongoController = require("../controllers/mongoController");
const verifyController = require("../controllers/verifyController");
const reactController = require("../controllers/reactController");
const nlpTrainingController = require("../controllers/nlpTrainingController");
const autoController = require("../controllers/autoController");
const visualisationController = require("../controllers/visualisationController");
const cacheController = require("../controllers/cacheController");
const tweetMapController = require("../controllers/tweetMapController");
const historicCrimeController = require("../controllers/historicCrimeController");
const listviewController = require("../controllers/listViewController");
const chicagoDataFactory = require("../controllers/chicagoDataFactory");

const chicago_data_factory = require("../controllers/chicagoDataFactory");

// get homepage
router.get('/', function (req, res) {
  res.render('home');
});

// twitter controller
router.get('/browseTwitter', twitterController.browseTwitter);
router.get('/getTweets', twitterController.browseTwitter);
router.post('/getTweets', dbpediaController.getCombination, twitterController.getTweets);

// auto controller
router.get('/auto', autoController.autoGet);
router.post('/auto', autoController.autoPost);

// verify controller
router.get('/check', verifyController.getUncheckedTweets);
router.post('/check/:id/:value/:geo', verifyController.checkTweets);
router.post('/check/:id/:value/:location/:type/:geo', verifyController.checkTweets);

// nlp training controller
router.get('/nlpTrainingEndpoint/:count/:crime', nlpTrainingController.returnNLPDataSet);  //returns crime: true or false
router.get('/nlpTrainingEndpoint/:count/', nlpTrainingController.returnNLPDataSet);  //returns both checked and unchecked

// react controller
router.get('/getCrimeWordCount', reactController.getCrimeWordCount);
router.get('/getPredictedData', reactController.getPredictedData);
router.get('/getStoredTweets/:count/checked/:checked', reactController.getStoredTweets);  //returns checked: true or false
router.get('/getStoredTweets/:count/crime/:crime', reactController.getStoredTweets);  //returns crime: true or false
router.get('/getStoredTweets/:count', reactController.getStoredTweets);  //returns tweets from DB
router.get('/getStoredTweets/', reactController.getStoredTweets);  //returns all tweets stored in the DB

// visualisation controller
router.get('/visualisation', visualisationController.getVisualisation);
router.get('/visualisationData', visualisationController.getVisualisationData);
router.get('/nlpData', visualisationController.getNLPData);


//TweetMap Controller
router.get('/tweetMap', tweetMapController.getChicagoTweetsPOC);
router.post('/tweetMap', tweetMapController.getChicagoTweetsPOC);

// listview Controller
router.get('/list', listviewController.listTweets);
router.post('/list', listviewController.findTweets);

// historic crime controller
router.get('/chicago', historicCrimeController.chicagoHandler); 
router.get('/seattle', historicCrimeController.seattleHandler); 
router.get('/baltimore', historicCrimeController.baltimoreHandler); 

router.get('/checkData', chicago_data_factory.checkLocalData); 
router.get('/fixMapData', chicago_data_factory.fixMapData); 

router.get('/getChicagoTweetsPOC', tweetMapController.getChicagoTweetsPOC);

//Test dummy data
router.post('/trajectoryData', chicagoDataFactory.getDummyData);

//Test dummy data saving
router.get('/saveDummy', chicagoDataFactory.saveCrimeData);

module.exports = router;
