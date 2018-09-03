const fs = require('fs');
const chicagoDataFactory = require('./chicagoDataFactory');
const moment = require('moment')
exports.getTweetMap = function (req, res) {
    let chicagoTestData = JSON.parse(fs.readFileSync('poc_chicago.json'));

    res.render('tweetmap', {
        chicagoTestData: chicagoTestData,
    })
};

exports.getChicagoTweetsPOC = async (req, res) => {
    
    let sortedTrajectoryData = await chicagoDataFactory.getMapData(req.body);    

    console.log(sortedTrajectoryData);

    // let crimeCategories = new Map();
    // let crimeTrajectories = new Array();
    let finalGeoJSON = [
        {
            "type": "FeatureCollection",
            "features": []
        }
    ];

    let tweetfinalGeoJSON = [
        {
            "type": "FeatureCollection",
            "features": []
        }
    ];
    let tweetData = await chicagoDataFactory.getChicagoTweetsWithLocation();

    tweetData.forEach((tweet)=>
    {
        let coords = [[[tweet.coordinates[0].coordinates[0], tweet.coordinates[0].coordinates[1]]]];
        tweetfinalGeoJSON[0].features.push({
            "type": "Feature",
            "geometry": {
                "type": "MultiLineString",
                "coordinates": coords,
            },
            "properties": {
                "Longitude": tweet.coordinates[0].coordinates[0],
                "Latitude": tweet.coordinates[0].coordinates[1],
                "Date": new Date(tweet.created_at)
            }
        });
    });


    // let defaultRegion = new google.maps.LatLng( 41.881832, -87.623177);
    // let n = 48;
    let tTimeThreshold = 180;
    let tDistThreshold = 1000;

    // for (const i in sortedTrajectoryData) {
    //     if (!(crimeCategories.get(sortedTrajectoryData[i].Primary_Type))) {
    //         crimeCategories.set(sortedTrajectoryData[i].Primary_Type, [sortedTrajectoryData[i]]);
    //     } else {
    //         crimeCategories.set(sortedTrajectoryData[i].Primary_Type,
    //             Array.from(crimeCategories.get(sortedTrajectoryData[i].Primary_Type)).concat(sortedTrajectoryData[i]));
    //     }
    // }

    // sortedTrajectoryData.forEach((trajectory)=>
    // {
    //     if (!(crimeCategories.get(trajectory.Primary_Type))) {
    //         crimeCategories.set(trajectory.Primary_Type, [trajectory]);
    //     } else {
    //         crimeCategories.set(trajectory.Primary_Type,
    //             Array.from(crimeCategories.get(trajectory.Primary_Type)).concat(trajectory));
    //     }
    // })
    // console.log(crimeCategories)

    sortedTrajectoryData.forEach((trajectory)=>
    {
        let coords = [[[trajectory.Longitude, trajectory.Latitude]]];
        sortedTrajectoryData.forEach((othertrajectory)=>
        {
            if(othertrajectory.Primary_Type == trajectory.Primary_Type 
                && trajectory != othertrajectory
                && !othertrajectory.trajectoryCheck)
            {
                let timeDiff = getTimeDifferenceBetweenPoints(othertrajectory, trajectory);
                let distDiff = getDistanceBetweenPoints(othertrajectory, trajectory);
                if (Math.abs(timeDiff) <= tTimeThreshold && Math.abs(distDiff) <= tDistThreshold)
                {
                    trajectory.trajectoryCheck = true;
                    coords[0].push([othertrajectory.Longitude, othertrajectory.Latitude])
                }
            }
        })
        finalGeoJSON[0].features.push({
            "type": "Feature",
            "geometry": {
                "type": "MultiLineString",
                "coordinates": coords,
            },
            "properties": {
                "date_text": moment(trajectory.Date).format('MMMM Do YYYY, h:mm:ss a'),   
                "primary_type": trajectory.Primary_Type,
                "description": trajectory.Description,
                "year": trajectory.Year,
                "lineWidth": 0.1,
                "Longitude": trajectory.Longitude,
                "Latitude": trajectory.Latitude,
                "date": trajectory.Date,
                "location_description": trajectory.Location_Description  
            }
        });
    });

    // var count = 0;
    // var noCount = 0;
    // for (const i of crimeCategories.keys()) {
    //     var prevData = {};
    //     var firstTime = true;
    //     // finalGeoJSON.push(
    //     //     {
    //     //         "type": "FeatureCollection",
    //     //         "features": []
    //     //     }
    //     // );
    //     for (const c of crimeCategories.get(i)) {
    //         if (firstTime) {
    //             prevData = c;
    //             firstTime = false;
    //         } else {
    //             let timeDiff = getTimeDifferenceBetweenPoints(prevData, c);
    //             let distDiff = getDistanceBetweenPoints(prevData, c);

    //             if ((timeDiff >= tTimeThreshold ? false : distDiff >= tDistThreshold ? false : true)) {
    //                 crimeTrajectories.push([prevData, c]);
    //                 // console.log(prevData.Latitude, prevData.Latitude);
    //                 finalGeoJSON[0].features.push({
    //                     "type": "Feature",
    //                     "geometry": {
    //                         "type": "MultiLineString",
    //                         "coordinates": [[[prevData.Longitude, prevData.Latitude], [c.Longitude, c.Latitude]]]
                            
    //                     },
    //                     "properties": {
    //                         "lineWidth": 0.1,
    //                         "primary_type": c.Primary_Type,
    //                         "Longitude": c.Longitude,
				// 			"Latitude": c.Latitude,
				// 			"date": c.Date,
				// 			"description": c.Description,
				// 			"year": c.Year,
				// 			"location_description": c.Location_Description
							
    //                     }
    //                 });
    //             } else {
    //                 crimeTrajectories.push([c]);
    //                 finalGeoJSON[0].features.push({
    //                     "type": "Feature",
    //                     "geometry": {
    //                         "type": "Point",
    //                         "coordinates": [c.Longitude, c.Latitude],
    //                     },
    //                     "properties": {
    //                         "lineWidth": 0.1,
    //                         "primary_type": c.Primary_Type,
    //                         "Longitude": c.Longitude,
				// 			"Latitude": c.Latitude,
				// 			"date": c.Date,
				// 			"description": c.Description,
				// 			"year": c.Year,
				// 			"location_description": c.Location_Description
    //                     }
    //                 });
                        
    //                 prevData = c;
    //             }
    //         }
    //     }
    // }

    // console.log(finalGeoJSON.map((i) => i.features[0].geometry));
    // console.log("sent", finalGeoJSON);

    res.send({trajectory: finalGeoJSON, tweets: tweetfinalGeoJSON});
}

getDistanceBetweenPoints = (point1, point2) => {
    let lat1 = point1.Latitude;
    let lon1 = point1.Longitude;
    let lat2 = point2.Latitude;
    let lon2 = point2.Longitude;

    //Calc Distance in terms of metres between Two Points
    let R = 6371e3;
    let φ1 = lat1 * Math.PI / 180;
    let φ2 = lat2 * Math.PI / 180;
    let λ1 = (lat2 - lat1) * Math.PI / 180;
    let λ2 = (lon2 - lon1) * Math.PI / 180;
    let a = Math.sin(λ1 / 2) * Math.sin(λ1 / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(λ2) * Math.sin(λ2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
}

getTimeDifferenceBetweenPoints = (a, b) => {
    let time1 = new Date(a.Date);
    let time2 = new Date(b.Date);

    return (((((time2 - time1) / 60) / 60) / 1000) * 60);
}
