const fs = require('fs');
const request = require('request');
var moment = require('moment');
const mongoose = require('mongoose');
var schemas = require('./mongoController');
var chicagoCrime = schemas.chicagoCrime;

const gCurrentDataDir = `../vision-map/src/data/`

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
        };

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

exports.saveCrimeData = async () =>
{
	console.log("Querying Chicago Crime DB...");
	options =
		{
			method: "GET",
			url: `https://data.cityofchicago.org/resource/6zsd-86xi.geojson?%24limit=` + 50,
			headers: {
				'X-App-Token': process.env.CHICAGO_TOKEN
			},
		};

	request(options, async function (error, response, body)
	{
		let result = JSON.parse(body);
		//console.log(result.features[0]); //working

		for (let feature in result.features)
		{
			//console.log(result.features[feature]); //all good

			if (!(result.features[feature].properties.latitude == null)) //Don't bother saving if there is no location data
			{
				//console.log("Valid entry, storing ID", result.features[feature].properties.id);
				chicagoCrime.findOne({ID: result.features[feature].properties.id}).lean().exec().then(async function (res) {

					if (!res)
					{
						//console.log("Saving...");
						let doc = new chicagoCrime();

						doc.ID = result.features[feature].properties.id;
						doc.Case_Number = result.features[feature].properties.case_number;
						doc.Date = result.features[feature].properties.date;
						doc.Block = result.features[feature].properties.block;
						doc.IUCR = result.features[feature].properties.iucr;
						doc.Primary_Type = result.features[feature].properties.primary_type;
						doc.Description = result.features[feature].properties.description;
						doc.Location_Description = result.features[feature].properties.location_description;
						doc.Arrest = result.features[feature].properties.arrest;
						doc.Domestic = result.features[feature].properties.domestic;
						doc.Beat = result.features[feature].properties.beat;
						doc.District = result.features[feature].properties.district;
						doc.Ward = result.features[feature].properties.ward;
						doc.Community_Area = result.features[feature].properties.community_area;
						doc.FBI_Code = result.features[feature].properties.fbi_code;
						doc.X_Coordinate = result.features[feature].properties.x_coordinate;
						doc.Y_Coordinate = result.features[feature].properties.y_coordinate;
						doc.Year = result.features[feature].properties.year;
						doc.Updated_On = result.features[feature].properties.updated_on;
						doc.Latitude = result.features[feature].properties.latitude;
						doc.Longitude = result.features[feature].properties.longitude;
						doc.Location = "("+result.features[feature].properties.latitude+", "+result.features[feature].properties.longitude+")";
						await doc.save()
					}
					else
					{
						//console.log("Dupe...");
					}
				});
			}
			else
			{
				//console.log("No location data, skipping...")
			}
		}

	});
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
					await chicagoCrime.find({Year: query["crimes"][term].year, Primary_Type: query["crimes"][term].crime})
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

