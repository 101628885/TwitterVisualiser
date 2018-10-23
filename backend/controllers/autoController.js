const request = require('request');
const fs = require('fs');
const chicagoAuto = require('./chicagoDataFactory');
var shouldRun = false;
var query = [];
var autoCollect = false;
var shouldResume = false;
var querySelect = 0;
var geo = "melbourne";

//Checks for preferences file and then updates whether the autocollector should be running
//Try loading the preferences file from disk
if (fs.existsSync(process.cwd() + "/preferences")) {
    
    if (fs.existsSync(process.cwd() + "/preferences/auto.json")) //Check if resume file exists
    {
        let data = JSON.parse(fs.readFileSync(process.cwd() + "/preferences/auto.json", 'utf-8'));
        query = data.query;
        shouldRun = data.shouldResume;
        autoCollect = data.shouldResume;
        shouldResume = data.shouldResume;
    }
}

//Sets a collection interval for Twitter data to run every 12 seconds.
//If file loaded or collector started from web interface start firing on a 12 second timer
setInterval(function(){
    if (shouldRun)
    {
        collect(query[querySelect], geo);

        if (querySelect < query.length - 1)
        {
            querySelect++;
        }
        else if (querySelect >= query.length -1)
        {
            querySelect = 0;

	        if (geo === "melbourne")
	        {
	            //console.log("Finished run, setting location to Chicago");
		        geo = "chicago";
	        }
	        else if(geo === "chicago")
	        {
	            //console.log("Finished run, setting location to Melbourne");
		        geo = "melbourne";
	        }
        }
    }
}, 12000);

//Sets a collection interval for Chicago data to run every 2 hours.
setInterval(function(){
	chicagoAuto.saveCrimeData().catch((err) => console.log(err));
}, 7200000);

//Changes state of whether we should be collecting.
exports.updateState = function(autoCollect)
{
	shouldRun = autoCollect;
};

//Collects data from Twitter API.
//Do a POST on the lookup page with shouldStoreTweets set to true to store the data in a DB
function collect(query, geo)
{
    if (!query)
    {
        console.log("Query length is 0, its gone wrong...");
    }
    else
    {
	    request.post({
		    headers: {'content-type' : 'application/x-www-form-urlencoded'},
		    url:     'http://localhost:3000/lookup/api',
		    form:    { word: query, shouldStoreTweets: true, location: geo }
	    }, function(error, response, body){
		    //console.log(err);
	    });
    }
}

//Changes state of web page based on whether we are collecting data or not.
//Handles drawing the auto page
exports.autoGet = function(req, res)
{
    if (autoCollect)
    {
        let resumeText = "";
        if (shouldResume)
        {
            resumeText = "VisCrime will automatically resume data collection if it restarts.";
        }
        else
        {
            resumeText = "Data collection will be stopped if VisCrime restarts."
        }

        res.render('auto', {toggle: 'Stop', status: 'Data Collection in Progress...', isHidden: true, monitoredWord: "Monitored word: " + query.join(', '), shouldResume: resumeText});
    } else {
        query.length = 0;
        res.render('auto', {toggle: 'Start', status: 'Idle...', isHidden: false, monitoredWord: "Queries to monitor: ", shouldResume: ""});
    }
};

//Sets keywords to be used for Twitter API calling.
//Handle receiving auto form query and writing pref file to disk if needed
exports.autoPost = function(req, res)
{
	//hold value in between POSTs
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

    //Use default set of words if form is empty
    if (query.length === 0)
    {
        //default search term if no entry is specified
        query.push("crime");
        query.push("assault");
        query.push("murder");
        query.push("rape");
        query.push("theft");
    }

	//Write a preference file to disk if asked to resume
	if (req.body.resume)
	{
		//handle writing params to disk
        shouldResume = true;
		let data = {shouldResume: true, query: query};

		fs.writeFile(process.cwd()+"/preferences/auto.json", JSON.stringify(data), function(err){
			if (err)
			{
				//console.log(err);
			}
		})
	}
	else
	{
	    shouldResume = false;
		let data = {shouldResume: false, query: []};

		fs.writeFile(process.cwd()+"/preferences/auto.json", JSON.stringify(data), function(err){
			if (err)
			{
				//console.log(err);
			}
		})
	}
    exports.updateState(autoCollect);

    res.redirect('/auto');
};
