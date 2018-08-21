let historicCoords = {}
let gMarkers = [];
let trajectoryData = {}
dataMap= null;
var histCentre = [41.881832, -87.623177]

function setHistoricCoords(coords, centre)
{
  historicCoords = coords;
  histCentre = centre;
}

function setTrajectoryData(data)
{
	trajectoryData = data;
}

function initMap() {
  var defaultRegion = new google.maps.LatLng(-37.81361, 144.96305);

  dataMap = new google.maps.Map(
	document.getElementById('map'), 
	{
	  zoom: 5, 
	  center: defaultRegion,
	  mapTypeId: google.maps.MapTypeId.ROADMAP
	}
  );
  
  fetch("http://144.6.226.34:3000/nlpTrainingEndpoint/100/true")
  .then(res => res.json())
  .then(tweetData => {
	var infoWin = new google.maps.InfoWindow();
	var markers = tweetData.map(function(tweet) {
	  var latLong = {lat: tweet.location[0].latitude, lng: tweet.location[0].longitude};
	  var marker = new google.maps.Marker({
		position: latLong
	  });
	  google.maps.event.addListener(marker, 'click', function(evt) {
		infoWin.setContent(tweet.full_text);
		infoWin.open(dataMap, marker);
	  })
	  return marker;
	});
	console.log(markers)

	var markerCluster = new MarkerClusterer(dataMap, markers, {
	  imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
	});
  })

  .catch((error) => {
	console.error(error); 
  });
}

function initHistoricMap() 
{
	var defaultRegion = new google.maps.LatLng(histCentre[0], histCentre[1]);
	dataMap = new google.maps.Map(
	document.getElementById('map'), 
	{
		zoom: 15, 
		center: defaultRegion,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	});

	var infoWin = new google.maps.InfoWindow();
	var markers = `historicCoords`.map(function(val) 
	{
		if(val.location != undefined && val.location.coordinates[0] !=null && val.location.coordinates[1] !=null)
		{
			var latLong = {lat: val.location.coordinates[1], lng: val.location.coordinates[0]};

			var marker = new google.maps.Marker(
			{
				position: latLong,
				map: dataMap
			});

			google.maps.event.addListener(marker, 'click', function(evt) {
				infoWin.setContent(val.text);
				infoWin.open(dataMap, marker);
			})
			
			return {marker: marker, text: val.text};
		}
	});
	gMarkers = markers
}

// NEED TO MOVE THIS TO NODE JS and Just send trajectory data for render.
getDistanceBetweenPoints = (e, d) => {
	let lat1 = e.coordinates[1];
	let lon1 = e.coordinates[0];
	let lat2 = d.coordinates[1];
	let lon2 = d.coordinates[0];

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
		if (!(crimeCategories.get(trajectoryData.data[i].type_of_crime))) {
			crimeCategories.set(trajectoryData.data[i].type_of_crime, [trajectoryData.data[i]]);
		} else
		{
			crimeCategories.set(trajectoryData.data[i].type_of_crime, 
				Array.from(crimeCategories.get(trajectoryData.data[i].type_of_crime)).concat(trajectoryData.data[i]));
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
	createTrajectories(crimeTrajectories);
}

createTrajectories = (crimeTrajectories) => {
	dataMap = new google.maps.Map(document.getElementById('map'), 
		{
			zoom: 10, 
			center: {lat: 41.881832, lng: -87.623177},
			mapTypeId: google.maps.MapTypeId.ROADMAP
		});

	for(const i of crimeTrajectories) {
		// console.log(i, i.length);
		if(i.length == 2)
		{
			var aTrajectory = [
				{lat: i[0].coordinates[1], lng: i[0].coordinates[0]},
				{lat: i[1].coordinates[1], lng: i[1].coordinates[0]},
			];
			
			var lineSymbol = {
				path: google.maps.SymbolPath.CIRCLE,
				scale: 8,
				strokeColor: '#393'
			  };

			animateTrajectory(new google.maps.Polyline({
				path: aTrajectory,
				geodesic: true,
				strokeColor: '#FF0000',
				strokeOpacity: 1.0,
				strokeWeight: 4,
				icons: [{
					icon: lineSymbol,
					offset: '100%'
				}],
				map: dataMap,
			}));
		}

		i.map((t) => {
			let marker = new google.maps.Marker({
				position: {lat: t.coordinates[1], lng: t.coordinates[0]},
				map: dataMap,
				title: `${t.type_of_crime} ${t.time}`,
			})
			
			marker.addListener('click', () => {
				new google.maps.InfoWindow({
					content: 
						`Type: ${t.type_of_crime} <br /> 
						Time: ${t.time}  <br /> 
						Coordinates: ${t.coordinates[1]},${t.coordinates[0]}`
				}).open(dataMap, marker);
			});
		});
	}
}

animateTrajectory = (line) => {
	var count = 0;
	window.setInterval(function() {
	  count = (count + 1) % 200;

	  var icons = line.get('icons');
	  icons[0].offset = (count / 2) + '%';
	  line.set('icons', icons);
  }, 20);
}

function hideMarkers(crime)
{
	gMarkers.forEach((val) => 
	{
		if(val != undefined)
		{
			if(crime == "All")
			{
				val.marker.setMap(dataMap);
			}else if(val.text.split(':')[0] == crime)
			{
				val.marker.setMap(dataMap);
			}else
			{
				val.marker.setMap(null);
			}
		}
	});
}