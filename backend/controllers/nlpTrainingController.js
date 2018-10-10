const mongoose = require('mongoose');
var db = require('./mongoController');
const pythonShell = require('python-shell');

exports.returnNLPData = async (req, res) => {
    let result = [];
    let query = {};
    let count = 0;

    if (req.params.checked) {
        query.checked = req.params.checked;
    }

    if (req.params.crime) {
        query.crime = req.params.crime;
    }

    if (req.params.count) {
        count = parseInt(req.params.count);
    } else {
        count = 100000000;
    }

    await db.getStoredTweets("chicago", query, count, 0).then((res) => {
        res.map((i) => {
            result.push({ "id": i.id, "full_text": i.full_text, "checked": i.checked, "crime": i.crime, "type_of_crime": i.type_of_crime, "location": i.location });
        })
    })

    await db.getStoredTweets("melbourne", query, count, 0).then((res) => {
        res.map((i) => {
            result.push({ "id": i.id, "full_text": i.full_text, "checked": i.checked, "crime": i.crime, "type_of_crime": i.type_of_crime, "location": i.location });
        })
    })

    res.send(result)


};


exports.runNLP = function(next) {
    var options = {
        mode: 'text',
        // This is server use
        pythonPath: '/usr/bin/python3',
        //pythonPath: '/usr/local/bin/python3',
        pythonOptions: ['-u'],
        // make sure you use an absolute path for scriptPath
        // This is for server use
        scriptPath: process.cwd() + '/spaCy_NLP'
    };

    pythonShell.run('TwitterNLP.py', options, function(err, jsonRes) {
        if (err) throw err;
        next(jsonRes);
    });
};