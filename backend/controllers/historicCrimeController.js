const request = require('request')
const moment = require('moment')


exports.chicagoHandler = async(req,res) =>
{
	options =
        {
            method: "GET",
            url: `https://data.cityofchicago.org/resource/6zsd-86xi.json`,
            headers: {
				'X-App-Token': process.env.CHICAGO_TOKEN
			},
		    data: {
		      "$limit" : 1000
		    }
        }

    request(options, function (error, response, body)
    {
    	if(error)
    	{
    		consloe.log(error)
    	}
    	else 
    	{
    		let primary_types = [...new Set(JSON.parse(body).map(item => item.primary_type))]
    		let dates = [...new Set(JSON.parse(body).map(item => moment(item.date).format("llll")))]
    		let coords = [...new Set(JSON.parse(body).map(item => { return {location: item.location, text: `${item.primary_type}: ${item.description}`}}))]
	    	res.render('historicData', {
	    		primary_types: primary_types, 
	    		dates: dates, 
	    		coords: coords})
    	}
    })
}