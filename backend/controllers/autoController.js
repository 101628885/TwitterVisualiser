const request = require('request');
var shouldRun = false;
var query = [];
var autoCollect = false;
var querySelect = 0;

setInterval(function(){

    if (shouldRun)
    {
        console.log("Checking word: ", query[querySelect]);
        collect(query[querySelect]);

        if (querySelect < query.length - 1)
        {
            querySelect++;
        }
        else if (querySelect >= query.length -1)
        {
            querySelect = 0;
        }


    }
}, 8000);



function collect(query)
{

    request.post({
        headers: {'content-type' : 'application/x-www-form-urlencoded'},
        url:     'http://localhost:3000/getTweets',
        form:    { word: query, shouldStoreTweets: true }
    }, function(error, response, body){
        //console.log(err);
    });
}

exports.updateState = function(word, autoCollect)
{
    shouldRun = autoCollect;

};

exports.autoGet = function(req, res)
{
    if (autoCollect)
    {
        res.render('auto', {toggle: 'Stop', status: 'Data Collection in Progress...', isHidden: true, monitoredWord: "Monitored word: " + query.join(', ')});
    } else {
        query.length = 0;
        res.render('auto', {toggle: 'Start', status: 'Idle...', isHidden: false, monitoredWord: "Queries to monitor: "});
    }
};

exports.autoPost = function(req, res)
{
    autoCollect = !autoCollect; //toggle autoCollect

    if (req.body.word1 !== "")
    {
        query.push(req.body.word1);
    }

    if (req.body.word2 !== "")
    {
        query.push(req.body.word2);
    }

    if (req.body.word3 !== "")
    {
        query.push(req.body.word3);
    }

    if (req.body.word4 !== "")
    {
        query.push(req.body.word4);
    }

    if (req.body.word5 !== "")
    {
        query.push(req.body.word5);
    }

    if (query.length === 0)
    {
        query.push("crime");
        query.push("assault");
        query.push("murder");
        query.push("rape");
        query.push("theft");//default search therm if no entry is specified
    }


    exports.updateState(query, autoCollect);

    res.redirect('/auto');

};
