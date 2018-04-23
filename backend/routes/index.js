var express = require('express');
var router = express.Router();

const twitterController = require("../controllers/twitterController");
const dbpediaController = require("../controllers/dbpediaController");
const verifyController = require("../controllers/verifyController");
const reactController = require("../controllers/reactController");
const nlpTrainingController = require("../controllers/nlpTrainingController");

/* GET home page. */
router.get('/', twitterController.test)

//Twitter Controller
router.get('/auto', twitterController.autoGet)
router.post('/auto', twitterController.autoPost)
router.post('/getTweets', dbpediaController.getDataMuse, twitterController.getTweets)

router.get('/filterTweets', twitterController.getFilterTweets)
router.get('/getDBPedia', dbpediaController.getDBPedia)
router.get('/getWordsAPI', dbpediaController.getDataMuse, twitterController.getBulkTweetsNew)

router.get('/bulk', twitterController.getBulkTweetsOld)

//Dpedia Controller
router.get('/getDBPedia', dbpediaController.getDBPedia)

//Verify Controller
router.get('/check', verifyController.getUncheckedTweets)
router.post('/check/:id/:value', verifyController.checkTweets)
router.post('/check/:id/:value/:location/:type', verifyController.checkTweets)

//NLP Controller
router.get('/nlpTrainingEndpoint/:count', nlpTrainingController.returnNLPDataSet);

//ReactController
router.get('/shanesAndCoreysSpecialEndPoint/:count', reactController.shanesAndCoreySpecialsEndPoint)
router.get('/getCrimeWordCount', reactController.getCrimeWordCount)

module.exports = router;
