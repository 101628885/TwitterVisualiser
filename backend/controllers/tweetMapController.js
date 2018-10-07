const fs = require('fs');
const skmeans = require("skmeans");
const chicagoDataFactory = require('./chicagoDataFactory');
const moment = require('moment')
exports.getTweetMap = function(req, res) {
    let chicagoTestData = JSON.parse(fs.readFileSync('poc_chicago.json'));

    res.render('tweetmap', {
        chicagoTestData: chicagoTestData,
    })
};

//Why is this being called twice, fix
calculatetrajectorySameTypeGeoJSON = (data) => {
    let timeStart = new Date();
    let tTimeThreshold = 180;
    let tDistThreshold = 1000;
    let otherData = data.slice(0, data.length);

    let trajectorySameTypeGeoJSON, trajectoryAllTypeGeoJSON, crimeGeoPoints;
    
    trajectorySameTypeGeoJSON = [{
        "type": "FeatureCollection",
        "features": []
    }];

    trajectoryAllTypeGeoJSON = [{
        "type": "FeatureCollection",
        "features": []
    }];

    crimeGeoPoints = [{
        "type": "FeatureCollection",
        "features": []
    }];

    let trajectoryOnlySameTypeGeoJSON, trajectoryOnlyAllTypeGeoJSON 
    trajectoryOnlySameTypeGeoJSON = [];
    trajectoryOnlyAllTypeGeoJSON  = [];
    
    data.forEach((trajectory) => {
        if (trajectory.Longitude != "" && trajectory.Latitude != "" && trajectory.Longitude != null && trajectory.Latitude != null ) {
            let coordsSameType, coordsAllType;
            
            coordsSameType = [
                [
                    [trajectory.Longitude, trajectory.Latitude]
                ]
            ];

            coordsAllType = [
                [
                    [trajectory.Longitude, trajectory.Latitude]
                ]
            ];

            switch (trajectory.Primary_Type) {
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

            //Text Description of trajectory crimes
            trajectoryDescriptionTextSameType = [`${trajectory.Primary_Type} on ${moment(trajectory.Date).format('MMMM Do [at] h:mm:ss A')}`];
            trajectoryDescriptionTextAllType = [`${trajectory.Primary_Type} on ${moment(trajectory.Date).format('MMMM Do [at] h:mm:ss A')}`];


            //Creates only the point for each crime
            crimeGeoPoints[0].features.push({
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": coordsSameType[0][0],
                },
                "properties": {
                    "date_text": moment(trajectory.Date).format('MMMM Do YYYY, h:mm:ss A'),
                    "date_stats_text": moment(trajectory.Date).format('DD/MM/YY, h:mm A'),
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

            otherData.forEach((othertrajectory) => {

                if (othertrajectory.Primary_Type == trajectory.Primary_Type &&
                    trajectory != othertrajectory) {
                    let timeDiff = getTimeDifferenceBetweenPoints(othertrajectory, trajectory);
                    let distDiff = getDistanceBetweenPoints(othertrajectory, trajectory);
                    if (timeDiff < tTimeThreshold && timeDiff < 0 && Math.abs(distDiff) <= tDistThreshold) {
                        coordsSameType[0].push([othertrajectory.Longitude, othertrajectory.Latitude])
                        trajectoryDescriptionTextSameType.push(`${othertrajectory.Primary_Type} on ${moment(othertrajectory.Date).format('MMMM Do [at] h:mm:ss A')}`)
                    }
                }
                if(trajectory != othertrajectory)
                {
                    let timeDiff = getTimeDifferenceBetweenPoints(othertrajectory, trajectory);
                    let distDiff = getDistanceBetweenPoints(othertrajectory, trajectory);
                    if (timeDiff < tTimeThreshold && timeDiff < 0 && Math.abs(distDiff) <= tDistThreshold) {
                        coordsAllType[0].push([othertrajectory.Longitude, othertrajectory.Latitude])
                        trajectoryDescriptionTextAllType.push(`${othertrajectory.Primary_Type} on ${moment(othertrajectory.Date).format('MMMM Do [at] h:mm:ss A')}`)

                    }
                }
            })    

            //Add to same type trajectory
            if (coordsSameType[0].length > 1)
            {
                trajectorySameTypeGeoJSON[0].features.push({
                    "type": "Feature",
                    "geometry": {
                        "type": "MultiLineString",
                        "coordinates": coordsSameType,
                    },
                    "properties": {
                        "date_text": moment(trajectory.Date).format('MMMM Do YYYY, h:mm:ss a'),
                        "trajectory_description": trajectoryDescriptionTextSameType,
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
                coordsSameType.map((i) => trajectoryOnlySameTypeGeoJSON.push(i));
            }

            //Add to all type trajectory
            if (coordsAllType[0].length > 1)
            {
                trajectoryAllTypeGeoJSON[0].features.push({
                    "type": "Feature",
                    "geometry": {
                        "type": "MultiLineString",
                        "coordinates": coordsAllType,
                    },
                    "properties": {
                        "date_text": moment(trajectory.Date).format('MMMM Do YYYY, h:mm:ss a'),
                        "primary_type": trajectory.Primary_Type,
                        "trajectory_description": trajectoryDescriptionTextAllType,
                        "description": trajectory.Description,
                        "year": trajectory.Year,
                        "lineWidth": 0.1,
                        "Longitude": trajectory.Longitude,
                        "Latitude": trajectory.Latitude,
                        "date": trajectory.Date,
                        "location_description": trajectory.Location_Description
                    }
                });
                coordsAllType.map((i) => trajectoryOnlyAllTypeGeoJSON.push(i));
            }

            //Delete checked value
            otherData.pop(trajectory);
        }

        //Delete checked value
        otherData.pop(trajectory);
    });

    let centroidsSame = calculateCentroid(trajectoryOnlySameTypeGeoJSON);
    let centroidsAll = calculateCentroid(trajectoryOnlyAllTypeGeoJSON);
    console.log("Same count: " + trajectorySameTypeGeoJSON[0].features.length)
    console.log("All count: " + trajectoryAllTypeGeoJSON[0].features.length)
    //console.log(JSON.stringify(crimeGeoPoints, null, 2))
    console.log(`Trajectory calculation time: ${new Date() - timeStart}ms`)
    return { 
        trajectorySameTypeGeoJSON, 
        trajectoryAllTypeGeoJSON, 
        centroidsSame,
        centroidsAll, 
        crimeGeoPoints 
    }; //return final GeoJSON with trajectories and centroid data
}

calculateCentroid = (trajectories) => {
    let result = { type: "FeatureCollection", features: [], properties: "Centroid" };
    trajectories.map((i) => {
        result.features.push({
            type: "Feature",
            geometry: {
                "type": "Point",
                "coordinates": skmeans(i, 1).centroids[0]
            }
        })
    });

    return result;


    /*
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
}
    */
}

generateTwitterGEOJSON = (data) => {
    let tweettrajectorySameTypeGeoJSON = [{
        "type": "FeatureCollection",
        "features": []
    }];

    data.forEach((tweet) => {
        let coordsSameType = [tweet.coordinates[0].coordinates[0], tweet.coordinates[0].coordinates[1]];
        tweettrajectorySameTypeGeoJSON[0].features.push({
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": coordsSameType,
            },
            "properties": {
                "Longitude": tweet.coordinates[0].coordinates[0],
                "Latitude": tweet.coordinates[0].coordinates[1],
                "Date": new Date(tweet.created_at)
            }
        });
    });
    return tweettrajectorySameTypeGeoJSON;
}

//Initial rendering
exports.initMapData = async(req, res) => {
    let crimeGeoJSON = calculatetrajectorySameTypeGeoJSON(await chicagoDataFactory.getMapData(req.body));
    let tweetGeoJSON = generateTwitterGEOJSON(await chicagoDataFactory.getChicagoTweetsWithLocation());
    res.send({ crime: crimeGeoJSON, tweets: tweetGeoJSON });
}


//Update map when using Filter form
exports.queryMapData = async(req, res) => {

    let crimeGeoJSON = calculatetrajectorySameTypeGeoJSON(await chicagoDataFactory.getMapData(req.body));
    res.send({ crime: crimeGeoJSON });
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