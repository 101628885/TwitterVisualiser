const request = require('request-promise');

let cachedRequestList = []; //members: url, contents{}, expiry

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

exports.testCache = async(req, res) => //move to unit testing
{
	options =
		{
			method: "GET",
			url: `https://api.datamuse.com/words?rel_trg=test`
		};


	let result = await exports.getJSON(options);
	res.send(result);


};