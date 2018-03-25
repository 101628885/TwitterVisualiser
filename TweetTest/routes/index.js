var express = require('express');
var router = express.Router();

const twitterController = require("../controllers/twitterController");
const dbpediaController = require("../controllers/dbpediaController");
const verifyController = require("../controllers/verifyController");

/* GET home page. */
router.get('/', twitterController.test)
router.post('/getTweets', dbpediaController.getDataMuse, twitterController.getTweets)
router.get('/fliterTweets', twitterController.getFilterTweets)
router.get('/getDBPedia', dbpediaController.getDBPedia)
router.get('/bulk', twitterController.getBulkTweetsOld)
router.get('/check', verifyController.getUncheckedTweets)
router.post('/check', verifyController.checkTweets)

module.exports = router;
