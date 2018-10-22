var mongoose = require('mongoose');

//Crime schema
//All labels with associated types.

var crimeSchema = mongoose.Schema({

	ID:{type: Number},
	Case_Number: {type: String},
	Date: {type: Date},
	Block: {type: String},
	IUCR: {type: String},
	Primary_Type: {type: String},
	Description: {type: String},
	Location_Description: {type: String},
	Arrest: {type: String},
	Domestic:{type: String},
	Beat: {type: Number},
	District: {type: Number},
	Ward: {type: Number},
	Community_Area: {type: Number},
	FBI_Code: {type: String},
	X_Coordinate: {type: Number},
	Y_Coordinate: {type: Number},
	Year: {type: Number},
	Updated_On: {type: Date},
	Latitude: {type: Number},
	Longitude: {type: Number},
	Location: {type: String}
});

var crime = module.exports = mongoose.model('crime',crimeSchema);