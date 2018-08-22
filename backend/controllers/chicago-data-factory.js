const fs = require('fs');
const request = require('request');
var moment = require('moment');

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
    		consloe.log(error)
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
	console.log("Checking...")
	
	if (fs.existsSync(gCurrentDataDir)) 
	{
    	console.log("Directory Exists")
    	getCrimeData();
	}
	else 
	{
		console.log("Directory Creating...")
		fs.mkdirSync(gCurrentDataDir);
		getCrimeData();
		res.send(data)		
	}
	res.sendStatus(200)
}

