const mongoose = require('mongoose');
var db = require('./mongoController');
const pythonShell = require('python-shell');
const pty = require('node-pty');

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

exports.returnAllData = async (req, res) => {
    let result = [];

    await db.getStoredTweets("chicago", {}, 0, 0).then((res) => {
        res.map((i) => {
            result.push({ "id": i.id, "full_text": i.full_text, "checked": i.checked, "crime": i.crime, "type_of_crime": i.type_of_crime, "location": i.location });
        })
    })
    
    await db.getStoredTweets("melbourne", {}, 0, 0).then((res) => {
        res.map((i) => {
            result.push({ "id": i.id, "full_text": i.full_text, "checked": i.checked, "crime": i.crime, "type_of_crime": i.type_of_crime, "location": i.location });
        })
    })
    
    res.send(result)
}

// exports.runNLP = function(next) {
//     var options = {
//         mode: 'binary',
//         // This is server use
//         // pythonPath: '/usr/bin/python3',
//         pythonPath: '/usr/local/bin/python3',
//         //pythonPath: '/usr/local/bin/python3',
//         pythonOptions: ['-u'],
//         // make sure you use an absolute path for scriptPath
//         // This is for server use
//         scriptPath: process.cwd() + '/spaCy_NLP'
//     };

//     pythonShell.run('TwitterNLP.py', options, function(err, jsonRes) {
//         if (err) throw next(err);
//         // next(jsonRes);
//         console.log(jsonRes, "yess");
//     }).receive((res) => next(res));
// };

exports.runNLP = async (req, res) => {
    const pyProcess = pty.spawn("/usr/local/bin/python3", [process.cwd() + '/spaCy_NLP/TwitterNLP.py']);
    var dataToSend = "";
    console.log("less go.. pls");

    pyProcess.on("data", (data) => {
        dataToSend += data;
        console.log(data);
    });

    pyProcess.on("exit", (exitCode) => {
        console.log("TwitterNLP.py exiting with code " + exitCode);
        res.send(dataToSend);
    });
}