const fs = require('fs');
const chicagoDataFactory = require('./chicagoDataFactory');

exports.getTweetMap = function(req, res)
{
    let chicagoTestData = JSON.parse(fs.readFileSync('poc_chicago.json'));

    res.render('tweetmap', {
        chicagoTestData: chicagoTestData,
    })
};

exports.getChicagoTweetsPOC = (req, res) => {
    let unsortedTrajectoryData = {}; // Here we contact Ming's function and add data
    let sortedTrajectoryData = {}; 

    let crimeCategories = new Map();
    let crimeTrajectories = new Array();

	let defaultRegion = new google.maps.LatLng( 41.881832, -87.623177);
	let n = 48;
	let tTimeThreshold = 180;
	let tDistThreshold = 1000;

	for(const i in sortedTrajectoryData.data) {
		if (!(crimeCategories.get(sortedTrajectoryData.data[i].Primary_Type))) {
			crimeCategories.set(sortedTrajectoryData.data[i].Primary_Type, [sortedTrajectoryData.data[i]]);
		} else
		{
			crimeCategories.set(sortedTrajectoryData.data[i].Primary_Type, 
				Array.from(crimeCategories.get(sortedTrajectoryData.data[i].Primary_Type)).concat(sortedTrajectoryData.data[i]));
		}
	}

	var count = 0;
	let tDistThreshold = 1000;
	
	for(const i in sortedTrajectoryData.data) {
		if (!(crimeCategories.get(sortedTrajectoryData.data[i].Primary_Type))) {
			crimeCategories.set(sortedTrajectoryData.data[i].Primary_Type, [sortedTrajectoryData.data[i]]);
		} else
		{
			crimeCategories.set(sortedTrajectoryData.data[i].Primary_Type, 
				Array.from(crimeCategories.get(sortedTrajectoryData.data[i].Primary_Type)).concat(sortedTrajectoryData.data[i]));
		}
	}

	var count = 0;
	
	for(const i of crimeCategories.keys()) {
		var prevData = {};
		var firstTime = true;
		for(const c of crimeCategories.get(i)) {
			if (firstTime) {
				prevData = c;
				firstTime = false;
			} else {
				let timeDiff = getTimeDifferenceBetweenPoints(prevData, c);
				let distDiff = getDistanceBetweenPoints(prevData, c);
				
				if ((timeDiff >= tTimeThreshold ? false : distDiff >= tDistThreshold ? false : true)) {
					crimeTrajectories.push([prevData, c]);
				} else {
					crimeTrajectories.push([c]);
				}
				
				prevData = c;
			}
		}
	}
}

getDistanceBetweenPoints = (point1, point2) => {
	let lat1 = point1.coordinates[1];
	let lon1 = point1.coordinates[0];
	let lat2 = point2.coordinates[1];
	let lon2 = point2.coordinates[0];

	//Calc Distance in terms of metres between Two Points
	let R = 6371e3;
	let φ1 = lat1 * Math.PI / 180;
	let φ2 = lat2 * Math.PI / 180;
	let λ1 = (lat2 - lat1) * Math.PI / 180;
	let λ2 = (lon2 - lon1) * Math.PI / 180;
	let a = Math.sin(λ1/2) * Math.sin(λ1/2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(λ2) * Math.sin(λ2);
	let c = 2 * Math.atan2(Math.sqrt(a),Math.sqrt(1-a));
		
	return R*c;		
}

getTimeDifferenceBetweenPoints = (a,b) => {
	let time1 = new Date(a.time);
	let time2 = new Date(b.time);

	return (((((time2 - time1) / 60) / 60) / 1000) * 60);
}

initPOCTrajectoryAlgorithm = () =>
{
	let crimeCategories = new Map();
	let crimeTrajectories = new Array();

	let defaultRegion = new google.maps.LatLng( 41.881832, -87.623177);
	let n = 48;
	let tTimeThreshold = 180;
	let tDistThreshold = 1000;
	
	for(const i in trajectoryData.data) {
		if (!(crimeCategories.get(trajectoryData.data[i].Primary_Type))) {
			crimeCategories.set(trajectoryData.data[i].Primary_Type, [trajectoryData.data[i]]);
		} else
		{
			crimeCategories.set(trajectoryData.data[i].Primary_Type, 
				Array.from(crimeCategories.get(trajectoryData.data[i].Primary_Type)).concat(trajectoryData.data[i]));
		}
	}

	var count = 0;
	
	for(const i of crimeCategories.keys()) {
		var prevData = {};
		var firstTime = true;
		for(const c of crimeCategories.get(i)) {
			if (firstTime) {
				prevData = c;
				firstTime = false;
			} else {
				let timeDiff = getTimeDifferenceBetweenPoints(prevData, c);
				let distDiff = getDistanceBetweenPoints(prevData, c);
				
				if ((timeDiff >= tTimeThreshold ? false : distDiff >= tDistThreshold ? false : true)) {
					crimeTrajectories.push([prevData, c]);
				} else {
					crimeTrajectories.push([c]);
				}
				
				prevData = c;
			}
		}
	}
		
	console.log("Trajectoreis", crimeTrajectories);
}
