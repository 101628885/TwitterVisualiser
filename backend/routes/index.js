// gets express module and its router
var express = require('express');
var router = express.Router();

// getting all controllers
const datamuseController      = require("../controllers/datamuseController");
const lookupController        = require("../controllers/lookupController");
const verifyController        = require("../controllers/verifyController");
const nlpTrainingController   = require("../controllers/nlpTrainingController");
const autoController          = require("../controllers/autoController");
const tweetMapController      = require("../controllers/tweetMapController");
const cacheController		  = require("../controllers/cacheController");

// get homepage
router.get('/', function(req, res) {
  res.render('home');
});

// get deckgl map
router.get('/deckmap', function(req, res) {
  res.render('deckmap');
});

/**
 * lookup controller routes
 * handles the returning of lists of tweets to display on the lookup view
 */
router.get('/lookup', lookupController.getAPITweetsView);
router.post('/lookup', datamuseController.getCombination, lookupController.getAPITweetsView);
router.get('/lookup/api', lookupController.getAPITweetsView);
router.post('/lookup/api', datamuseController.getCombination, lookupController.getAPITweetsView);
router.get('/lookup/db', lookupController.getDBTweetsView);
router.post('/lookup/db', datamuseController.getCombination, lookupController.getDBTweetsView);

// auto controller
router.get('/auto', autoController.autoGet);
router.post('/auto', autoController.autoPost);

// verify controller
router.get('/check', verifyController.getUncheckedTweets);
router.post('/check/:id/:value/:geo', verifyController.checkTweets);
router.post('/check/:id/:value/:location/:type/:geo', verifyController.checkTweets);

//new endpoints for NLP
router.get('/nlpTraining/:count/checked/:checked', nlpTrainingController.returnNLPData);
router.get('/nlpTraining/:count/crime/:crime', nlpTrainingController.returnNLPData);
router.get('/nlpTraining', nlpTrainingController.returnAllData);
router.get('/nlpRun', nlpTrainingController.runNLP);

/**
 * tweetmap controller routes
 * handles the generation of trajectories to be displayed on the layered map
 */
router.get('/tweetMap', cacheController.getTrajectories);
router.post('/tweetMap', cacheController.getTrajectories);

// exports the controllers
module.exports = router;
