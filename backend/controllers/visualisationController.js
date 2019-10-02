const mongoController = require('./mongoController');
var images = mongoController.images;

//Gets all images from the .
//If no parameters default values are set.
exports.getVisualisationView = async (req, res) => {
    res.render('visualisations');
};