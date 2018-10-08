const fs = require('fs');
const request = require('request');
var moment = require('moment');
const mongoose = require('mongoose');
var schemas = require('./mongoController');
var chicagoCrime = schemas.chicagoCrime;
var tweetChicago = schemas.tweetChicago;

exports.saveCrimeData = async () =>
{
	if (process.env.DISABLE_DEVELOPER_MODE)
	{
		console.log("Querying Chicago Crime DB...");
		options =
			{
				method: "GET",
				url: `https://data.cityofchicago.org/resource/6zsd-86xi.geojson`,
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
					console.log("Valid entry, storing ID", result.features[feature].properties.id);
					chicagoCrime.findOne({ID: result.features[feature].properties.id}).lean().exec().then(async function (res) {

						if (!res)
						{
							console.log("Saving...");
							let doc = new chicagoCrime();

							doc.ID = result.features[feature].properties.id;
							doc.Case_Number = result.features[feature].properties.case_number;
							doc.Date = moment(result.features[feature].properties.date).utcOffset(-360).utc().format(); 
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
	}
	else
	{
		console.log("Preventing database updates: developer mode enabled")
	}

};

//Get map data based on query if no query then just gets 2018
exports.getMapData = async(query) =>
{
	let timeStart = new Date()
	let baseLimit = 5000;

	result = [];

	if(query.Date != undefined)
	{
		query.Date.$gte = moment(query.Date.$gte, "MMM DD, YYYY")
		query.Date.$lt = query.Date.$lt == "" ?  moment(query.Date.$gte, "MMM DD, YYYY").add(1, "days") : moment(query.Date.$lt, "MMM DD, YYYY")
	} else 
	{
		query.Date = {};
		query.Date.$gte = moment().subtract(1, "months");
		query.Date.$lt = moment();
	}
	console.log(query) 

	var limit = query.limit || 1000

	delete query.limit;

	//Checking if empty, if empty set query {Year: 2018}
	query = Object.keys(query).length === 0 && query.constructor === Object ? {Year: 2018} : query;

	let promises = [];

	if (limit > baseLimit)
	{
		for(let i =0; i < Math.ceil(limit / baseLimit); i++)
		{
			let newLimit = baseLimit
			let skip = i * baseLimit;
			if(skip + baseLimit > limit) newLimit = baseLimit - (skip + baseLimit - limit);
			console.log("New Limit: " + newLimit)
			console.log("Skip: " + skip)
			console.log("i: " + i)

			promises.push(new Promise((resolve, reject) => 
			{
				console.log("Query", query)
				var pChicagoCrime = schemas.chicagoCrime;
				pChicagoCrime.find(query)
				.lean()
				.limit(parseInt(newLimit))
				.skip(skip)
				.sort({Date: 1})
				.exec()
				.then((res) => 
				{
					result = result.concat(res);
					resolve();
				})
				.catch((err) => {console.log(err); reject()});
	        }));
		}
	}else
	{
		console.log("Query", query)
		await chicagoCrime.find(query)
		.lean()
		.limit(parseInt(limit))
		.sort({Date: 1})
		.exec()
		.then((res) => {result = result.concat(res);})
		.catch((err) => {console.log(err)});
	}

	if(promises.length == 0)
	{
		console.log(`Query time: ${new Date() - timeStart}ms`)
		return result;
	}
	else
	{
		await Promise.all(promises);
		console.log(`Query time: ${new Date() - timeStart}ms`)
		return result;
	}
}

exports.getChicagoTweetsWithLocation = async () =>
{
	let result = [];
	await tweetChicago.where("coordinates").ne(null).sort({created_at: 1}).lean().exec().then((res) => {result = res; });
	return result;
};

