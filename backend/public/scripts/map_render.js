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

initPOCTrajectoryAlgorithm = () =>
{	
	console.log(trajectoryData);
	console.log("yp", trajectoryData.data[0].coordinates);

	let crimeCategories = [[]];

	let defaultRegion = new google.maps.LatLng( 41.881832, -87.623177);
	let n = 48;
	let dt = trajectoryData.data[0].time;
	let tTimeThreshold = 180;
	let tDistThreshold = 500;
	
	for(var i in trajectoryData.data) {
		//TODO: Tomorrow :P
	}

	// let lat1 = trajectoryData.data[0].coordinates[1]; //change to first latitude coord
	// let lon1 = trajectoryData.data[0].coordinates[0]; //change to first longitude coord
	// let lat2 = trajectoryData.data[1].coordinates[1]; //change to second latitude coord
	// let lon2 = trajectoryData.data[1].coordinates[0]; //change to second longitude coord	 
	dataMap = new google.maps.Map(
	document.getElementById('map'), 
	{
		zoom: 15, 
		center: defaultRegion,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	});



	//Calc Distance in terms of metres between Two Points
	let R = 6371e3;
	let φ1 = lat1 * Math.PI / 180;
	let φ2 = lat2 * Math.PI / 180;
  let λ1 = (lat2 - lat1) * Math.PI / 180;
	let λ2 = (lon2 - lon1) * Math.PI / 180;
	let a = Math.sin(λ1/2) * Math.sin(λ1/2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(λ2) * Math.sin(λ2);
	let c = 2 * Math.atan2(Math.sqrt(a),Math.sqrt(1-a));
	let d = R*c;
	console.log("THE D:", d);
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