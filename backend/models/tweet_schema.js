var mongoose = require('mongoose');

//Tweet schema
//All labels with associated types.

var tweetSchema = mongoose.Schema({
    created_at: {type: Date},
    id: {type: String},
    full_text: {type: String},
    user_name: {type: String},
    user_location: {type: String},
    user_verified: {type: Boolean},
    user_profile_image_url: {type: String},
    geo: {type: Array},
    coordinates: {type: Array},
    place: {type: Array},
    checked: {type: Boolean},
    crime: {type: Boolean},
    type_of_crime: {type: String},
    location: {type: Object},
    nlp_checked: {type: Boolean},
    pred_crime: {type: String},
    pred_crime_type: {type: String},
    pred_crime_location: {type: String}
});

var tweet = module.exports = mongoose.model('tweets',tweetSchema);