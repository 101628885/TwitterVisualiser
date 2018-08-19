const fs = require('fs');

exports.getTweetMap = function(req, res)
{
    let chicagoTestData = JSON.parse(fs.readFileSync('poc_chicago.json'));

    res.render('tweetmap', {
        chicagoTestData: chicagoTestData,
    })
};