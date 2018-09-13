const mongoose = require('mongoose');
const tweet = require('../models/tweet_schema');
const pythonShell = require('python-shell');
const db = mongoose.connection;

// Returns all checked: true
exports.returnNLPDataSet = async (req,res) => {
    var tweet = db.model('tweets', tweet);

    let query = {};

    if (req.params.crime)
    {
        query.crime = req.params.crime;
        query.checked = true;
    }

    tweetMelb.find(query).sort({'date': -1}).limit(parseInt(req.params.count)).lean().exec(function(err, posts)
    {
        if(!err)
        {
            let post;
            let result = [];
            let count = 0;
            for (let i in posts)
            {
                post = {
                    "full_text": posts[count].full_text,
                    "crime": posts[count].crime,
                    "type_of_crime" : posts[count].type_of_crime,
                    "location" : posts[count].location
                };
                count += 1;
                result.push(post);
            }
            res.send(result);
        }
        else
        {
            console.log(err);
        }
    });
};

exports.runNLP = function(next)
{
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

	pythonShell.run('TwitterNLP.py', options, function (err, jsonRes) {
		if (err) throw err;
		next(jsonRes);
	});
};

