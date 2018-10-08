const request = require('request');
const fs = require('fs');
const chicagoAuto = require('./chicagoDataFactory');
var shouldRun = false;
var query = [];
var autoCollect = false;
var shouldResume = false;
var querySelect = 0;
var geo = "melbourne";



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



setInterval(function(){

    if (shouldRun)
    {

        //console.log("Checking word: ", query[querySelect], " in location ", geo);
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

setInterval(function(){

	chicagoAuto.saveCrimeData().catch((err) => console.log(err));

}, 7200000); //call once every 2 hours






exports.updateState = function(autoCollect)
{
	shouldRun = autoCollect;

};

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


exports.autoGet = function(req, res)
{
    if (autoCollect)
    {
        let resumeText = "";
        if (shouldResume)
        {
            resumeText = "VISION will automatically resume data collection if it restarts.";
        }
        else
        {
            resumeText = "Data collection will be stopped if VISION restarts."
        }

        res.render('auto', {toggle: 'Stop', status: 'Data Collection in Progress...', isHidden: true, monitoredWord: "Monitored word: " + query.join(', '), shouldResume: resumeText});
    } else {
        query.length = 0;
        res.render('auto', {toggle: 'Start', status: 'Idle...', isHidden: false, monitoredWord: "Queries to monitor: ", shouldResume: ""});
    }
};

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

    if (query.length === 0)
    {
        query.push("crime");
        query.push("assault");
        query.push("murder");
        query.push("rape");
        query.push("theft");//default search term if no entry is specified
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
