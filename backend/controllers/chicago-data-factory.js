const fs = require('fs');
const request = require('request');
var moment = require('moment');
const mongoose = require('mongoose');
var schemas = require('./mongoController');
var chicagoCrime = schemas.chicagoCrime;

const gCurrentDataDir = `../vision-map/src/data/`

async function getCrimeData()
{
	options =
        {
            method: "GET",
            url: `https://data.cityofchicago.org/resource/6zsd-86xi.geojson`,
            headers: {
				'X-App-Token': process.env.CHICAGO_TOKEN
			},
		    data: {
		      "$limit" : 100000
		    }
        }

    await request(options, function (error, response, body)
    {
    	if(error)
    	{
    		console.log(error)
    	}
    	else 
    	{
    		let primary_types = [...new Set(JSON.parse(body).features.map(item => item.properties.primary_type))]
    		primary_types.forEach((type) => {
    			let json = { "type": "FeatureCollection", "features": []}
    			json.features = JSON.parse(body).features.filter(crime => crime.properties.primary_type == type);
    			json.features.forEach((val) => delete val.properties["updated_on"])
    			var fs = require('fs');
				fs.writeFile(`${gCurrentDataDir}/${type.toLowerCase().replace(/ /g, "-")}-chicago-crime.json`, JSON.stringify(json), 'utf8');
    		})
    	}
    })
}

exports.checkLocalData = async(req,res, next) =>
{
	console.log("Checking...");
	
	if (fs.existsSync(gCurrentDataDir)) 
	{
    	console.log("Directory Exists");
    	getCrimeData();
	}
	else 
	{
		console.log("Directory Creating...");
		fs.mkdirSync(gCurrentDataDir);
		getCrimeData();
		res.send(data)		
	}
	res.sendStatus(200)
};

/*
Endpoint for kepler trajectory modelling.

Example requests that it can process (send it as an AJAX request)

Example 1:

Query by type of crime and the year it occurred. Year parameter is optional.
{
	"crimes": [{
			"crime": "BATTERY", //If year is not specified it won't be included in the search
			"count": 50
		},
		{
			"crime": "BURGLARY",
			"year": "2014", //specifying year
			"count": 20
		}
	]
}

Example 2:

Simplest query, search just by year. (year:count)

{
  "2007": 400,
  "2008": 200
}

TODO: Move this to the docs...

*/
exports.getDummyData = async(req,res) =>
{
	let query = req.body;
	let result = [];
	let total = 0;
	let rejected = {"Query Rejected": "Requested result set too large. Please limit size to less than 10000"};

	if (query["crimes"]) //complex query consisting of an array of crime:crimetype, year:year and count:count
	{

		for (let term in query["crimes"])
		{
			total += query["crimes"][term].count;
		}

		if (total > 10000)
		{
			res.send(rejected)
		}
		else
		{
			for (let term in query["crimes"])
			{

				if (query["crimes"][term].year) //Check if year member exists
				{
					await chicagoCrime.find({Primary_Type: query["crimes"][term].crime, Year: query["crimes"][term].year})
						.lean()
						.limit(parseInt(query["crimes"][term].count))
						.exec()
						.then((res) => {result = result.concat(res)})
						.catch((err) => {console.log(err)});
				}
				else
				{
					await chicagoCrime.find({Primary_Type: query["crimes"][term].crime})
						.lean()
						.limit(parseInt(query["crimes"][term].count))
						.exec()
						.then((res) => {result = result.concat(res)})
						.catch((err) => {console.log(err)});
				}


			}
			res.send(result);
		}

	}
	else //simple query (just year:count)
	{
		for (let year in query)
		{
			if (query.hasOwnProperty(year))
			{
				total += query[year];
			}
		}

		if (total > 10000)
		{
			res.send(rejected);
		}
		else
		{

			for (let year in query) {

				if (query.hasOwnProperty(year))
				{
					await chicagoCrime.find({Year: year})
						.lean()
						.limit(parseInt(query[year]))
						.exec()
						.then((res) => {result = result.concat(res);})
						.catch((err) => {console.log(err)});
				}

			}
			res.send(result);
		}
	}
};

