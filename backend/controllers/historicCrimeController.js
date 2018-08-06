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
    		let dates = [...new Set(JSON.parse(body).map(item => moment(item.date).format("lll")))]
    		let coords = [...new Set(JSON.parse(body).map(item => { return {location: item.location, text: `${item.primary_type}: ${item.description}`}}))]
	    	res.render('historicData', {
	    		primary_types: primary_types, 
	    		dates: dates, 
	    		coords: coords,
                centre: [41.881832 , -87.623177]
            })
    	}
    })
}


exports.seattleHandler = async(req,res) =>
{
    options =
        {
            method: "GET",
            url: `https://data.seattle.gov/resource/y7pv-r3kh.json`,
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
            let primary_types = [...new Set(JSON.parse(body).map(item => item.offense_type))]
            let dates = [...new Set(JSON.parse(body).map(item => moment(item.date_reported).format("lll")))]
            let coords = [...new Set(JSON.parse(body).map(item => { return {location: item.location, text: `${item.offense_type}: ${item.summarized_offense_description}`}}))]
            res.render('historicData', {
                primary_types: primary_types, 
                dates: dates, 
                coords: coords,
                centre: [47.608013, -122.335167]
            })
        }
    })
}

exports.baltimoreHandler = async(req,res) =>
{
    options =
        {
            method: "GET",
            url: `https://data.baltimorecity.gov/resource/4ih5-d5d5.json`,
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
            let primary_types = [...new Set(JSON.parse(body).map(item => item.description))]
            let dates = [...new Set(JSON.parse(body).map(item => moment(item.crimedate).format("lll")))]
            let coords = [...new Set(JSON.parse(body).map(item => { return {location: item.location_1, text: `${item.description}`}}))]
            res.render('historicData', {
                primary_types: primary_types, 
                dates: dates, 
                coords: coords,
                centre: [39.299236, -76.609383]
            })
        }
    })
}