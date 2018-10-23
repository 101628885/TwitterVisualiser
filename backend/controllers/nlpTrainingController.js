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

exports.test = async(req, res) =>{
    this.runNLP(null, null);
}

exports.runNLP = async (req, res) => {
    const pyProcess = pty.spawn("/usr/local/bin/python3", [process.cwd() + '/spaCy_NLP/TwitterNLP.py']);
    var dataToSend = "";

    pyProcess.on("data", (data) => {
        dataToSend += data;
    });

    pyProcess.on("exit", (exitCode) => {
        console.log("TwitterNLP.py exiting with code " + exitCode);

        try {
            res.send(dataToSend);
        } catch(e) {
            console.log("Res failed, this function was called internally. Calling DB update");
            db.insertNLPData(dataToSend);
        }
        

    });
}