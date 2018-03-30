var express = require('express');
var router = express.Router();

const twitterController = require("../controllers/twitterController");
const dbpediaController = require("../controllers/dbpediaController");
const verifyController = require("../controllers/verifyController");
const reactController = require("../controllers/reactController");

/* GET home page. */
router.get('/', twitterController.test)
router.get('/auto', twitterController.autoGet)
router.post('/auto', twitterController.autoPost)
router.post('/getTweets', dbpediaController.getDataMuse, twitterController.getTweets)
router.get('/fliterTweets', twitterController.getFilterTweets)
router.get('/getDBPedia', dbpediaController.getDBPedia)
router.get('/bulk', twitterController.getBulkTweetsOld)
router.get('/check', verifyController.getUncheckedTweets)
router.post('/check/:id/:value', verifyController.checkTweets)

router.get('/shanesAndCoreysSpecialEndPoint/:count', reactController.shanesAndCoreySpecialsEndPoint)
module.exports = router;
