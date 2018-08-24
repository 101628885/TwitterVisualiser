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
const chicagoDataFactory = require("../controllers/chicago-data-factory");

const chicago_data_factory = require("../controllers/chicago-data-factory");

// get homepage
router.get('/', function (req, res) {
  res.render('home');
});

// twitter controller
// router.get('/', twitterController.tweetindex);
// router.get('/getTweets', twitterController.tweetindex);

// auto controller
router.get('/auto', autoController.autoGet);
router.post('/auto', autoController.autoPost);
router.post('/getTweets', dbpediaController.getCombination, twitterController.getTweets);

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

// tweetmap controller
router.get('/tweetMap', tweetMapController.getTweetMap);

// listview Controller
router.get('/list', listviewController.listTweets);
router.post('/list', listviewController.findTweets);

// historic crime controller
router.get('/chicago', historicCrimeController.chicagoHandler); 
router.get('/seattle', historicCrimeController.seattleHandler); 
router.get('/baltimore', historicCrimeController.baltimoreHandler); 

router.get('/checkData', chicago_data_factory.checkLocalData); 

// test dummy data
router.post('/trajectoryData', chicagoDataFactory.getDummyData);

module.exports = router;
