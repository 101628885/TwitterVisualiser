const fs = require('fs');
const skmeans = require("skmeans");
const chicagoDataFactory = require('./chicagoDataFactory');
const moment = require('moment')
exports.getTweetMap = function (req, res) {
    let chicagoTestData = JSON.parse(fs.readFileSync('poc_chicago.json'));

    res.render('tweetmap', {
        chicagoTestData: chicagoTestData,
    })
};


calculateTrajectoryGEOJSON = (data) =>
{
    let timeStart = new Date();
    let tTimeThreshold = 180;
    let tDistThreshold = 1000;
    let otherData = data.slice(0, data.length);
    
    let finalGeoJSON = [
        {
            "type": "FeatureCollection",
            "features": []
        }
    ];
    let trajectoryOnlyGeoJSON = [];

    data.forEach((trajectory)=>
    {
        if (trajectory.Longitude != "" && trajectory.Latitude != "") 
        {
            let coords = [[[trajectory.Longitude, trajectory.Latitude]]];
            otherData.forEach((othertrajectory)=>
            {

                if(othertrajectory.Primary_Type == trajectory.Primary_Type 
                    && trajectory != othertrajectory)
                {
                    let timeDiff = getTimeDifferenceBetweenPoints(othertrajectory, trajectory);
                    let distDiff = getDistanceBetweenPoints(othertrajectory, trajectory);
                    if (Math.abs(timeDiff) <= tTimeThreshold && Math.abs(distDiff) <= tDistThreshold)
                    {
                        coords[0].push([othertrajectory.Longitude, othertrajectory.Latitude])
                    }
                }
            })
            let coords_final = coords
            if(coords[0].length < 2)
            {
                coords_final = coords[0][0]
            }

            // Uncomment if required, fixing merge conflict
            // finalGeoJSON[0].features.push({
            //     "type": "Feature",
            //     "geometry": {
            //         "type": "MultiLineString",
            //         "coordinates": coords,
            //     },
            //     "properties": {
            //         "date_text": moment(trajectory.Date).format('MMMM Do YYYY, h:mm:ss a'),   
            //         "primary_type": trajectory.Primary_Type,
            //         "description": trajectory.Description,
            //         "year": trajectory.Year,
            //         "lineWidth": 0.3,
            //         "Longitude": trajectory.Longitude,
            //         "Latitude": trajectory.Latitude,
            //         "date": trajectory.Date,
            //         "location_description": trajectory.Location_Description  
            //     }
            // });

            switch(trajectory.Primary_Type) 
            {
                case "BATTERY":
                    trajectory.Primary_Type = "ASSAULT";
                    break;
                case "BURGLARY":
                    trajectory.Primary_Type = "THEFT";
                    break;
                case "CRIM SEXUAL ASSAULT":
                    trajectory.Primary_Type = "SEX OFFENSE";
                    break;
                case "CRIMINAL TRESPASS":
                    trajectory.Primary_Type = "OTHER OFFENSE";
                    break;
                case "DECEPTIVE PRACTICE":
                    trajectory.Primary_Type = "OTHER OFFENSE";
                    break;
                case "INTERFERENCE WITH PUBLIC OFFICER":
                    trajectory.Primary_Type = "OTHER OFFENSE";
                    break;
                case "INTIMIDATION":
                    trajectory.Primary_Type = "ASSAULT";
                    break;
                case "LIQUOR LAW VIOLATION":
                    trajectory.Primary_Type = "OTHER OFFENSE";
                    break;
                case "MOTOR VEHICLE THEFT":
                    trajectory.Primary_Type = "THEFT";
                    break;
                case "PUBLIC PEACE VIOLATION":
                    trajectory.Primary_Type = "OTHER OFFENSE";
                    break;
                case "ROBBERY":
                    trajectory.Primary_Type = "THEFT";
                    break;
                case "STALKING":
                    trajectory.Primary_Type = "SEX OFFENSE";
                    break;
                case "WEAPONS VIOLATION":
                    trajectory.Primary_Type = "ASSAULT";
                    break;
            }

            finalGeoJSON[0].features.push({
                "type": "Feature",
                "geometry": {
                    "type": `${coords[0].length > 1 ? "MultiLineString" : "Point"}`,
                    "coordinates": coords_final,
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

            if (coords[0].length > 1)
                coords.map((i) => trajectoryOnlyGeoJSON.push(i));

            //Delete checked value
            otherData.pop(trajectory);
        }

        //Delete checked value
        otherData.pop(trajectory);
    });
    

    let centroids = calculateCentroid(trajectoryOnlyGeoJSON);
    
    console.log(`Trajectory calculation time: ${new Date() - timeStart}ms`)
    return {finalGeoJSON, centroids};
} 

calculateCentroid = (trajectories) => {
    return {
                "type": "FeatureCollection",
                "features": [{
                    "type": "Feature",
                    "geometry": {
                        "type": "MultiLineString",
                        "coordinates": [trajectories.map((i) => skmeans(i, 1).centroids[0])],
                    },
                    "properties": {
                        "primary_type": "Centroid",
                        "description": "a given centroid calculation",
                        "lineWidth": 0.6,
                    }
                }]
            };
}

generateTwitterGEOJSON = (data) =>
{
    let tweetfinalGeoJSON = [
        {
            "type": "FeatureCollection",
            "features": []
        }
    ];

    data.forEach((tweet)=>
    {
        let coords = [tweet.coordinates[0].coordinates[0], tweet.coordinates[0].coordinates[1]];
        tweetfinalGeoJSON[0].features.push({
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": coords,
            },
            "properties": {
                "Longitude": tweet.coordinates[0].coordinates[0],
                "Latitude": tweet.coordinates[0].coordinates[1],
                "Date": new Date(tweet.created_at)
            }
        });
    });
    return tweetfinalGeoJSON;
}

exports.initMapData = async (req, res) => {
    
    let trajectoryGeoJSON = calculateTrajectoryGEOJSON(await chicagoDataFactory.getMapData(req.body));    
    let tweetGeoJSON = generateTwitterGEOJSON(await chicagoDataFactory.getChicagoTweetsWithLocation());
    res.send({trajectory: trajectoryGeoJSON, tweets: tweetGeoJSON});
}

exports.queryMapData = async (req, res) => {
    
    let trajectoryGeoJSON = calculateTrajectoryGEOJSON(await chicagoDataFactory.getMapData(req.body));    
    res.send({trajectory: trajectoryGeoJSON});
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
