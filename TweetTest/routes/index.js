var express = require('express');
var router = express.Router();

const twitterController = require("../controllers/twitterController");

/* GET home page. */
router.get('/', twitterController.test)
router.post('/getTwitterName', twitterController.getTweetsForUser)
router.post('/getTweets', twitterController.getTweets)

module.exports = router;
