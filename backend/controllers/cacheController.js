const request = require('request-promise');
const factory = require('./tweetMapController')
const timeout = ms => new Promise(res => setTimeout(res, ms));
let cachedRequestList = []; //members: url, contents{}, expiry
const cacheExpiryTime = 3600000; //1 hour
let trajectoryCacheState = {cachedTrajectory: {data:{}, refreshedTime:{}}, isBuilding: false};

exports.getJSON = async(options) =>
{
	let result = {};
	let entryFound = false;

	for (let i = 0; i < cachedRequestList.length; i++)
	{
		if (cachedRequestList[i].url === options.url)
		{
			console.log("Response found in cache");
			result = cachedRequestList[i]; //return cached JSON object
			entryFound = true;
		}
	}

	if (!entryFound)
	{
		await request(options).then(function(response)
			{
				console.log("Response not found in cache");
				cachedRequestList.push({url: options.url, response: response});
				result = response;
			}
		).catch(function(err){console.log(err)});
	}

	return result;
};


exports.getTrajectories = async(req, res) =>
{

	let refreshTrajectoryData = async function(){
		trajectoryCacheState.isBuilding = true;
		trajectoryCacheState.cachedTrajectory.data = await factory.initMapData(req, res);
		trajectoryCacheState.cachedTrajectory.refreshedTime = new Date();
		trajectoryCacheState.isBuilding = false;
	}

	while(trajectoryCacheState.isBuilding)
	{
		console.log("Waiting for cache to finish building...")
		await timeout(2000);
	}

	if (!Object.keys(trajectoryCacheState.cachedTrajectory.data).length) //Trajectory cache is empty
	{
		console.log("Building trajectory cache...");
		await refreshTrajectoryData(trajectoryCacheState.cachedTrajectory);
	}

	if (new Date() - trajectoryCacheState.cachedTrajectory.refreshedTime > cacheExpiryTime)
	{
		console.log("Trajectory data cache expired, rebuilding...");
		await refreshTrajectoryData(trajectoryCacheState.cachedTrajectory);
	}
	else
	{
		console.log("Returning cached trajectory data....");
	}

	console.log("Cache refresh in:", Math.floor((cacheExpiryTime - (new Date() - trajectoryCacheState.cachedTrajectory.refreshedTime))/1000), "seconds");


	res.send(trajectoryCacheState.cachedTrajectory.data);


}