var mongoose = require('mongoose');

//Images schema
//All labels with associated types.

var viscrimeSchema = mongoose.Schema({
	_id:{type: String},
	image: {type: String},
	manualAnnotation: {type: [String]},
	objectLabels: {type: [String]},
	caption: {type: String},
	lstmPrediction: {type: String},
	tfidfPrediction: {type: String},
	fastaiPrediction: {type: String},
	coordinates: {type: String},
}, {collection: 'crimes'});

var viscrime = module.exports = mongoose.model('viscrime', viscrimeSchema);