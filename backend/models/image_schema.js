var mongoose = require('mongoose');

//Images schema
//All labels with associated types.

var imageSchema = mongoose.Schema({
	File_Location:{type: String},
	Tags: {type: [String]},
});

var images = module.exports = mongoose.model('images', imageSchema);