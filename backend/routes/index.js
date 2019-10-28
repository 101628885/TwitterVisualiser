// gets express module and its router
var express = require('express');
var router = express.Router();

// getting all controllers
const datamuseController      = require("../controllers/datamuseController");
const tweetSearchController        = require("../controllers/tweetSearchController");
const verifyController        = require("../controllers/verifyController");
const nlpTrainingController   = require("../controllers/nlpTrainingController");
const autoController          = require("../controllers/autoController");
const tweetMapController      = require("../controllers/tweetMapController");
const cacheController		  = require("../controllers/cacheController");
const scanController		  = require("../controllers/scanController");
const imageSearchController   = require("../controllers/imageSearchController");
const visualisationController = require('../controllers/visualisationController');

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
router.get('/lookup', tweetSearchController.getAPITweetsView);
router.post('/lookup', datamuseController.getCombination, tweetSearchController.getAPITweetsView);
router.get('/lookup/api', tweetSearchController.getAPITweetsView);
router.post('/lookup/api', datamuseController.getCombination, tweetSearchController.getAPITweetsView);
router.get('/lookup/db', tweetSearchController.getDBTweetsView);
router.post('/lookup/db', datamuseController.getCombination, tweetSearchController.getDBTweetsView);

// auto controller
router.get('/auto', autoController.autoGet);
router.post('/auto', autoController.autoPost);

router.get('/scan', scanController.scanGet);
router.post('/scan', scanController.scanPost);

// verify controller
router.get('/check', verifyController.getUncheckedTweets);
router.post('/check/:id/:value/:geo', verifyController.checkTweets);
router.post('/check/:id/:value/:location/:type/:geo', verifyController.checkTweets);

//new endpoints for NLP
router.get('/nlpTraining/:count/checked/:checked', nlpTrainingController.returnNLPData);
router.get('/nlpTraining/:count/crime/:crime', nlpTrainingController.returnNLPData);
router.get('/nlpTraining', nlpTrainingController.returnAllData);
router.get('/nlpRun', nlpTrainingController.runNLP);

//searching image by tag
router.get('/imagesearch', imageSearchController.searchImages);
router.post('/imagesearch', imageSearchController.searchImages);

/**
 * tweetmap controller routes
 * handles the generation of trajectories to be displayed on the layered map
 */
router.get('/tweetMap', cacheController.getTrajectories);
router.post('/tweetMap', cacheController.getTrajectories);
router.get('/update', nlpTrainingController.test);
router.get('/mlmap', tweetMapController.getMlMapData);


router.get('/visualisations', visualisationController.getVisualisationView);
// exports the controllers
module.exports = router;
