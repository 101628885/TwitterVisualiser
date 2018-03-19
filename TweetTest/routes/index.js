var express = require('express');
var router = express.Router();

const twitterController = require("../controllers/twitterController");
const dbpediaController = require("../controllers/dbpediaController");
/* GET home page. */
router.get('/', twitterController.test)
router.post('/getTwitterName', twitterController.getTweetsForUser)
router.post('/getTweets', dbpediaController.getDataMuse, twitterController.getTweets)
router.get('/fliterTweets', twitterController.getFilterTweets)
router.get('/getDBPedia', dbpediaController.getDBPedia)

module.exports = router;
