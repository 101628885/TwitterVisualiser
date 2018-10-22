const request = require('request-promise');
const factory = require('./tweetMapController')
const timeout = ms => new Promise(res => setTimeout(res, ms));
let cachedRequestList = []; //members: url, contents{}, expiry
const cacheExpiryTime = 3600000; //1 hour
let trajectoryCacheState = { cachedTrajectories: [], isBuilding: false };

exports.getJSON = async (options) => {
    let result = {};
    let entryFound = false;

    for (let i = 0; i < cachedRequestList.length; i++) {
        if (cachedRequestList[i].url === options.url) {
            console.log("Response found in cache");
            result = cachedRequestList[i]; //return cached JSON object
            entryFound = true;
        }
    }

    if (!entryFound) {
        await request(options).then(function(response) {
            console.log("Response not found in cache");
            cachedRequestList.push({ url: options.url, response: response });
            result = response;
        }).catch(function(err) { console.log(err) });
    }

    return result;
};


exports.getTrajectories = async (req, res) => {
    
    let query = JSON.stringify(req.body);
    let result;

    let refreshTrajectoryData = async function() {
        trajectoryCacheState.isBuilding = true;

        let objectToCache = {}
        objectToCache.data = await factory.initMapData(req, res)
        objectToCache.refreshedTime = new Date();
        objectToCache.query = query;

        trajectoryCacheState.isBuilding = false;

        return objectToCache;
    }

    while (trajectoryCacheState.isBuilding) { //only one build request at a time
        //console.log("Waiting for other operations to finish...")
        await timeout(2000);
    }


    for (let i = 0; i < trajectoryCacheState.cachedTrajectories.length; i++) {
        if (trajectoryCacheState.cachedTrajectories[i].query == query) //found item
        {
            if ((new Date() - trajectoryCacheState.cachedTrajectories[i].refreshedTime) > cacheExpiryTime) { //expired, rebuild
                console.log("Trajectory data cache expired, rebuilding...");
                result = await refreshTrajectoryData();
                trajectoryCacheState.cachedTrajectories.splice(i, 1); //delete expired element
                trajectoryCacheState.cachedTrajectories.push(result);

            }
            else
            {
            	console.log("Returning stored trajectory data") //found unexpired match
            	result = trajectoryCacheState.cachedTrajectories[i];
            	console.log("Object refresh in:", Math.floor((cacheExpiryTime - (new Date() - trajectoryCacheState.cachedTrajectories[i].refreshedTime)) / 1000), "seconds");
            }

            
            break;
        }
    }

    if (!result) //no match found
    {
    	console.log("Building trajectory cache...");

    	result = await refreshTrajectoryData();

    	trajectoryCacheState.cachedTrajectories.push(result);
    }

    res.send(result.data);
}