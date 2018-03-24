var mongoose = require('mongoose');

//Tweet schema

var tweetSchema = mongoose.Schema({

    created_at:{
        type: String
    },
    id: {
        type: Number
    },
    full_text: {
        type: String
    },
    user_name: {
        type: String
    },
    user_location: {
        type: String
    },
    user_verified: {
        type: Boolean
    },
    user_profile_image_url: {
        type: String
    },
    geo: {
        type: String
    },
    coordinates: {
        type: Number
    },
    place: {
        type: String
    },
    checked: {
        type: Boolean
    },
    crime: {
        type: String
    }



});



var tweet = module.exports = mongoose.model('tweets',tweetSchema);
